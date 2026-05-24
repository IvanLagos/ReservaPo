import { pool } from "../consultas.js";

// CREATE PROFESSIONAL
export const createProfessional = async (req, res, next) => {
    try {
        const { business_id, name, specialty, phone, image_url } = req.body;

        if (!business_id || !name || !specialty) {
            return res.status(400).json({
                error: "Negocio, nombre y especialidad son obligatorios",
            });
        }

        const businessResult = await pool.query(
            `
            SELECT id
            FROM businesses
            WHERE id = $1
            AND user_id = $2
            LIMIT 1
            `,
            [business_id, req.user.id]
        );

        if (businessResult.rows.length === 0) {
            return res.status(403).json({
                error: "No tienes permisos para crear profesionales en este negocio",
            });
        }

        const result = await pool.query(
            `
            INSERT INTO professionals
            (business_id, name, specialty, phone, image_url)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `,
            [business_id, name, specialty, phone || "", image_url || ""]
        );

        res.status(201).json({
            message: "Profesional creado correctamente",
            professional: result.rows[0],
        });
    } catch (error) {
        next(error);
    }
};

// GET ALL PROFESSIONALS
export const getProfessionals = async (req, res, next) => {
    try {
        const result = await pool.query(
            `
            SELECT
                p.id,
                p.business_id,
                p.name,
                p.specialty,
                p.phone,
                p.image_url,
                b.name AS business,
                b.category AS business_category,
                b.city AS business_city,
                b.image_url AS business_image_url,
                4.9 AS rating,
                '5 años de experiencia' AS experience
            FROM professionals p
            LEFT JOIN businesses b
            ON b.id = p.business_id
            ORDER BY p.id DESC
            `
        );

        res.json({
            professionals: result.rows,
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE PROFESSIONAL
export const updateProfessional = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, specialty, phone, image_url } = req.body;

        if (!name || !specialty) {
            return res.status(400).json({
                error: "Nombre y especialidad son obligatorios",
            });
        }

        const professionalResult = await pool.query(
            `
            SELECT p.id
            FROM professionals p
            INNER JOIN businesses b
            ON b.id = p.business_id
            WHERE p.id = $1
            AND b.user_id = $2
            LIMIT 1
            `,
            [id, req.user.id]
        );

        if (professionalResult.rows.length === 0) {
            return res.status(404).json({
                error: "Profesional no encontrado para este negocio",
            });
        }

        const result = await pool.query(
            `
            UPDATE professionals
            SET
                name = $1,
                specialty = $2,
                phone = $3,
                image_url = $4
            WHERE id = $5
            RETURNING *
            `,
            [name, specialty, phone || "", image_url || "", id]
        );

        res.json({
            message: "Profesional actualizado correctamente",
            professional: result.rows[0],
        });
    } catch (error) {
        next(error);
    }
};

// DELETE PROFESSIONAL
export const deleteProfessional = async (req, res, next) => {
    try {
        const { id } = req.params;

        const professionalResult = await pool.query(
            `
            SELECT p.id
            FROM professionals p
            INNER JOIN businesses b
            ON b.id = p.business_id
            WHERE p.id = $1
            AND b.user_id = $2
            LIMIT 1
            `,
            [id, req.user.id]
        );

        if (professionalResult.rows.length === 0) {
            return res.status(404).json({
                error: "Profesional no encontrado para este negocio",
            });
        }

        await pool.query(
            `
            DELETE FROM professionals
            WHERE id = $1
            `,
            [id]
        );

        res.json({
            message: "Profesional eliminado correctamente",
        });
    } catch (error) {
        next(error);
    }
};
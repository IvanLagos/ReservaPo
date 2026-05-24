import { pool } from "../consultas.js";

export const getBusinessServices = async (req, res, next) => {
    try {
        const businessResult = await pool.query(
            `
            SELECT id
            FROM businesses
            WHERE user_id = $1
            LIMIT 1
            `,
            [req.user.id]
        );

        if (businessResult.rows.length === 0) {
            return res.status(404).json({
                error: "No tienes un negocio asociado",
            });
        }

        const businessId = businessResult.rows[0].id;

        const result = await pool.query(
            `
            SELECT
                id,
                business_id,
                name,
                description,
                price,
                duration_minutes,
                category,
                is_active,
                created_at
            FROM services
            WHERE business_id = $1
            ORDER BY id DESC
            `,
            [businessId]
        );

        res.json({
            services: result.rows,
        });
    } catch (error) {
        next(error);
    }
};

export const getPublicServicesByBusiness = async (req, res, next) => {
    try {
        const { businessId } = req.params;

        const result = await pool.query(
            `
            SELECT
                id,
                business_id,
                name,
                description,
                price,
                duration_minutes,
                category,
                is_active
            FROM services
            WHERE business_id = $1
            AND is_active = true
            ORDER BY id ASC
            `,
            [businessId]
        );

        res.json({
            services: result.rows,
        });
    } catch (error) {
        next(error);
    }
};

export const createService = async (req, res, next) => {
    try {
        const {
            name,
            description,
            price,
            duration_minutes,
            category,
            is_active,
        } = req.body;

        if (!name) {
            return res.status(400).json({
                error: "El nombre del servicio es obligatorio",
            });
        }

        const businessResult = await pool.query(
            `
            SELECT id
            FROM businesses
            WHERE user_id = $1
            LIMIT 1
            `,
            [req.user.id]
        );

        if (businessResult.rows.length === 0) {
            return res.status(404).json({
                error: "No tienes un negocio asociado",
            });
        }

        const businessId = businessResult.rows[0].id;

        const result = await pool.query(
            `
            INSERT INTO services
            (
                business_id,
                name,
                description,
                price,
                duration_minutes,
                category,
                is_active
            )
            VALUES
            ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
            `,
            [
                businessId,
                name,
                description || "",
                Number(price) || 0,
                Number(duration_minutes) || 30,
                category || "",
                is_active ?? true,
            ]
        );

        res.status(201).json({
            message: "Servicio creado correctamente",
            service: result.rows[0],
        });
    } catch (error) {
        next(error);
    }
};

export const updateService = async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            name,
            description,
            price,
            duration_minutes,
            category,
            is_active,
        } = req.body;

        if (!name) {
            return res.status(400).json({
                error: "El nombre del servicio es obligatorio",
            });
        }

        const serviceResult = await pool.query(
            `
            SELECT s.id
            FROM services s
            INNER JOIN businesses b
            ON b.id = s.business_id
            WHERE s.id = $1
            AND b.user_id = $2
            LIMIT 1
            `,
            [id, req.user.id]
        );

        if (serviceResult.rows.length === 0) {
            return res.status(404).json({
                error: "Servicio no encontrado para este negocio",
            });
        }

        const result = await pool.query(
            `
            UPDATE services
            SET
                name = $1,
                description = $2,
                price = $3,
                duration_minutes = $4,
                category = $5,
                is_active = $6
            WHERE id = $7
            RETURNING *
            `,
            [
                name,
                description || "",
                Number(price) || 0,
                Number(duration_minutes) || 30,
                category || "",
                is_active ?? true,
                id,
            ]
        );

        res.json({
            message: "Servicio actualizado correctamente",
            service: result.rows[0],
        });
    } catch (error) {
        next(error);
    }
};

export const deleteService = async (req, res, next) => {
    try {
        const { id } = req.params;

        const serviceResult = await pool.query(
            `
            SELECT s.id
            FROM services s
            INNER JOIN businesses b
            ON b.id = s.business_id
            WHERE s.id = $1
            AND b.user_id = $2
            LIMIT 1
            `,
            [id, req.user.id]
        );

        if (serviceResult.rows.length === 0) {
            return res.status(404).json({
                error: "Servicio no encontrado para este negocio",
            });
        }

        await pool.query(
            `
            DELETE FROM services
            WHERE id = $1
            `,
            [id]
        );

        res.json({
            message: "Servicio eliminado correctamente",
        });
    } catch (error) {
        next(error);
    }
};
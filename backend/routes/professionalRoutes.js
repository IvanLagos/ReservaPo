import express from "express";
import { pool } from "../consultas.js";

import {
    createProfessional,
    getProfessionals,
    updateProfessional,
    deleteProfessional,
} from "../controllers/professionalController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { professionalSchema } from "../schemas/professionalSchema.js";

const router = express.Router();

// CREATE PROFESSIONAL
router.post(
    "/professionals",
    verifyToken,
    validateSchema(professionalSchema),
    createProfessional
);

// GET ALL PROFESSIONALS
router.get("/professionals", getProfessionals);

// GET PROFESSIONAL PROFILE BY ID
// IMPORTANTE: esta ruta debe ir antes de /professionals/:businessId
router.get("/professionals/profile/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

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
                'Profesional verificado' AS experience,
                'Profesional verificado disponible para reservas dentro de ReservaPo.' AS description
            FROM professionals p
            LEFT JOIN businesses b
            ON b.id = p.business_id
            WHERE p.id = $1
            LIMIT 1
            `,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Profesional no encontrado",
            });
        }

        res.json({
            professional: result.rows[0],
        });
    } catch (error) {
        next(error);
    }
});

// GET PROFESSIONALS BY BUSINESS
router.get("/professionals/:businessId", async (req, res, next) => {
    try {
        const { businessId } = req.params;

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
                b.image_url AS business_image_url
            FROM professionals p
            LEFT JOIN businesses b
            ON b.id = p.business_id
            WHERE p.business_id = $1
            ORDER BY p.id ASC
            `,
            [businessId]
        );

        res.json({
            professionals: result.rows,
        });
    } catch (error) {
        next(error);
    }
});

// UPDATE PROFESSIONAL
router.put("/professionals/:id", verifyToken, updateProfessional);

// DELETE PROFESSIONAL
router.delete("/professionals/:id", verifyToken, deleteProfessional);

export default router;
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
                b.city AS business_city
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
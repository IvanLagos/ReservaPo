import express
from "express";

import { pool }
from "../consultas.js";

import {

    createProfessional,

    getProfessionals,

    updateProfessional,

    deleteProfessional,

}
from "../controllers/professionalController.js";

import { verifyToken }
from "../middlewares/authMiddleware.js";

import { validateSchema }
from "../middlewares/validateSchema.js";

import { professionalSchema }
from "../schemas/professionalSchema.js";

const router =
    express.Router();

// CREATE
router.post(

    "/professionals",

    verifyToken,

    validateSchema(
        professionalSchema
    ),

    createProfessional
);

// GET ALL
router.get(

    "/professionals",

    getProfessionals
);

// GET BY BUSINESS
router.get(

    "/professionals/:businessId",

    async (req, res, next) => {

        try {

            const { businessId } =
                req.params;

            const result =
                await pool.query(

                    `
                    SELECT
                        id,
                        business_id,
                        name,
                        specialty,
                        phone,
                        image
                    FROM professionals
                    WHERE business_id = $1
                    ORDER BY id ASC
                    `,

                    [businessId]

                );

            res.json({

                professionals:
                    result.rows,

            });

        } catch (error) {

            next(error);

        }

    }

);

// UPDATE
router.put(

    "/professionals/:id",

    verifyToken,

    updateProfessional
);

// DELETE
router.delete(

    "/professionals/:id",

    verifyToken,

    deleteProfessional
);

export default router;
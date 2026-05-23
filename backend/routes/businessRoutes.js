import express from "express";

import { pool }
from "../consultas.js";

import {
    verifyToken,
}
from "../middlewares/authMiddleware.js";

const router = express.Router();

// DASHBOARD NEGOCIO
router.get(

    "/business/dashboard",

    verifyToken,

    async (req, res, next) => {

        try {

            // BUSCAR NEGOCIO DEL USUARIO
            const businessResult =
                await pool.query(

                    `
                    SELECT *
                    FROM businesses
                    WHERE user_id = $1
                    LIMIT 1
                    `,

                    [req.user.id]

                );

            if (
                businessResult.rows.length === 0
            ) {

                return res.status(404).json({

                    error:
                        "No tienes un negocio asociado",

                });

            }

            const business =
                businessResult.rows[0];

            // RESERVAS DEL NEGOCIO
            const reservationsResult =
                await pool.query(

                    `
                    SELECT

                        r.*,

                        u.name
                        AS client_name,

                        p.name
                        AS professional_name

                    FROM reservations r

                    LEFT JOIN users u
                    ON u.id = r.user_id

                    LEFT JOIN professionals p
                    ON p.id = r.professional_id

                    WHERE r.business_id = $1

                    ORDER BY
                        r.date ASC,
                        r.time ASC
                    `,

                    [business.id]

                );

            res.json({

                business,

                reservations:
                    reservationsResult.rows,

            });

        } catch (error) {

            next(error);

        }

    }

);

export default router;
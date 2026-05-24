import express from "express";

import { pool }
from "../consultas.js";

import {
    createReservation,
    getReservations,
    updateReservation,
    deleteReservation,
}
from "../controllers/reservationController.js";

import {
    verifyToken,
}
from "../middlewares/authMiddleware.js";

const router = express.Router();

// HORAS OCUPADAS
router.get(

    "/reservations/occupied",

    async (req, res, next) => {

        try {

            const {
                business_id,
                professional_id,
                reservation_date,
            } = req.query;

            if (
                !business_id ||
                !professional_id ||
                !reservation_date
            ) {

                return res.status(400).json({

                    error:
                        "Faltan datos",

                });

            }

            const result =
                await pool.query(

                    `
                    SELECT
                        reservation_time
                    FROM reservations
                    WHERE business_id = $1
                    AND professional_id = $2
                    AND reservation_date = $3
                    AND LOWER(status) != 'cancelled'
                    `,

                    [
                        business_id,
                        professional_id,
                        reservation_date,
                    ]

                );

            const occupiedHours =
                result.rows.map((item) => {

                    const time =
                        item.reservation_time
                            ?.toString()
                            .slice(0, 5);

                    return time;

                });

            res.json({

                occupiedHours,

            });

        } catch (error) {

            next(error);

        }

    }

);

// CREATE
router.post(

    "/reservations",

    verifyToken,

    createReservation
);

// GET
router.get(

    "/reservations",

    verifyToken,

    getReservations
);

// UPDATE
router.put(

    "/reservations/:id",

    verifyToken,

    updateReservation
);

// DELETE
router.delete(

    "/reservations/:id",

    verifyToken,

    deleteReservation
);

export default router;
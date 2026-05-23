import { pool }
from "../consultas.js";

import express
from "express";

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

const router =
    express.Router();

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

router.get(

    "/reservations/occupied",

    async (req, res, next) => {

        try {

            const {
                business_id,
                reservation_date,
            } = req.query;

            if (
                !business_id ||
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
                    WHERE
                        business_id = $1
                    AND
                        reservation_date = $2
                    AND
                        status != 'cancelled'
                    `,

                    [
                        business_id,
                        reservation_date,
                    ]

                );

            const occupiedHours =
                result.rows.map(
                    (item) =>
                        item.reservation_time
                );

            res.json({

                occupiedHours,

            });

        } catch (error) {

            next(error);

        }

    }

);

export default router;
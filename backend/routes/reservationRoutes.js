import express from "express";

import { pool } from "../consultas.js";

import {
    createReservation,
    getReservations,
    updateReservation,
    deleteReservation,
    updateBusinessReservationStatus,
} from "../controllers/reservationController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// HORAS OCUPADAS
router.get("/reservations/occupied", async (req, res, next) => {
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
                error: "Faltan datos",
            });
        }

        const result = await pool.query(
            `
            SELECT reservation_time
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

        const occupiedHours = result.rows.map((item) => {
            return item.reservation_time?.toString().slice(0, 5);
        });

        res.json({
            occupiedHours,
        });
    } catch (error) {
        next(error);
    }
});

// CREATE CLIENT RESERVATION
router.post("/reservations", verifyToken, createReservation);

// GET CLIENT RESERVATIONS
router.get("/reservations", verifyToken, getReservations);

// UPDATE CLIENT RESERVATION
router.put("/reservations/:id", verifyToken, updateReservation);

// CANCEL CLIENT RESERVATION
router.delete("/reservations/:id", verifyToken, deleteReservation);

// UPDATE STATUS FROM BUSINESS DASHBOARD
router.patch(
    "/business/reservations/:id/status",
    verifyToken,
    updateBusinessReservationStatus
);

export default router;
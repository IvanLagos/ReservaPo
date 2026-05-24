import express from "express";

import { pool } from "../consultas.js";

import {
    verifyToken,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET PUBLIC BUSINESSES
router.get(
    "/businesses",
    async (req, res, next) => {
        try {
            const result = await pool.query(
                `
                SELECT
                    id,
                    user_id,
                    name,
                    category,
                    city,
                    description,
                    image_url
                FROM businesses
                ORDER BY id ASC
                `
            );

            const businesses = result.rows.map(
                (business) => ({
                    ...business,

                    rating: 4.9,

                    reviews: 120,

                    services: [
                        {
                            name: "Corte clásico",
                            price: "$12.000",
                        },
                        {
                            name: "Corte + barba",
                            price: "$18.000",
                        },
                        {
                            name: "Perfilado de barba",
                            price: "$10.000",
                        },
                    ],
                })
            );

            res.json({
                businesses,
            });
        } catch (error) {
            next(error);
        }
    }
);

// BUSINESS DASHBOARD
router.get(
    "/business/dashboard",
    verifyToken,
    async (req, res, next) => {
        try {
            const businessResult = await pool.query(
                `
                SELECT
                    id,
                    user_id,
                    name,
                    category,
                    city,
                    description,
                    image_url
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

            const reservationsResult =
                await pool.query(
                    `
                    SELECT
                        r.id,
                        r.business_id,
                        r.user_id,
                        r.professional_id,

                        r.reservation_date AS date,

                        TO_CHAR(
                            r.reservation_time,
                            'HH24:MI'
                        ) AS time,

                        r.service,
                        r.status,
                        r.payment_status,

                        u.name AS client_name,

                        p.name AS professional_name,

                        p.specialty AS professional_specialty

                    FROM reservations r

                    LEFT JOIN users u
                    ON u.id = r.user_id

                    LEFT JOIN professionals p
                    ON p.id = r.professional_id

                    WHERE r.business_id = $1

                    ORDER BY
                        r.reservation_date ASC,
                        r.reservation_time ASC
                    `,
                    [business.id]
                );

            const professionalsResult =
                await pool.query(
                    `
                    SELECT
                        id,
                        business_id,
                        name,
                        specialty,
                        phone,
                        image_url
                    FROM professionals
                    WHERE business_id = $1
                    ORDER BY id ASC
                    `,
                    [business.id]
                );

            const stats = {
                totalReservations:
                    reservationsResult.rows.length,

                confirmedReservations:
                    reservationsResult.rows.filter(
                        (reservation) =>
                            String(
                                reservation.status || ""
                            ).toLowerCase() ===
                            "confirmed"
                    ).length,

                cancelledReservations:
                    reservationsResult.rows.filter(
                        (reservation) =>
                            String(
                                reservation.status || ""
                            ).toLowerCase() ===
                            "cancelled"
                    ).length,

                pendingReservations:
                    reservationsResult.rows.filter(
                        (reservation) => {
                            const status =
                                String(
                                    reservation.status || ""
                                ).toLowerCase();

                            return (
                                status !==
                                    "confirmed" &&
                                status !==
                                    "cancelled"
                            );
                        }
                    ).length,

                totalProfessionals:
                    professionalsResult.rows.length,
            };

            res.json({
                business,

                reservations:
                    reservationsResult.rows,

                professionals:
                    professionalsResult.rows,

                stats,
            });
        } catch (error) {
            next(error);
        }
    }
);

export default router;
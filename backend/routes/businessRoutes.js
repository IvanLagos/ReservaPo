import express from "express";
import { pool } from "../consultas.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/businesses", async (req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT
                b.id,
                b.user_id,
                b.name,
                b.category,
                b.city,
                b.description,
                b.image_url
            FROM businesses b
            ORDER BY b.id ASC
        `);

        const servicesResult = await pool.query(`
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
            WHERE is_active = true
            ORDER BY id ASC
        `);

        const businesses = result.rows.map((business) => ({
            ...business,
            rating: 4.9,
            reviews: 120,
            services: servicesResult.rows
                .filter((service) => service.business_id === business.id)
                .map((service) => ({
                    id: service.id,
                    name: service.name,
                    description: service.description,
                    price: `$${Number(service.price || 0).toLocaleString("es-CL")}`,
                    raw_price: service.price,
                    duration_minutes: service.duration_minutes,
                    category: service.category,
                    is_active: service.is_active,
                })),
        }));

        res.json({ businesses });
    } catch (error) {
        next(error);
    }
});

router.get("/business/dashboard", verifyToken, async (req, res, next) => {
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

        if (businessResult.rows.length === 0) {
            return res.status(404).json({
                error: "No tienes un negocio asociado",
            });
        }

        const business = businessResult.rows[0];

        const reservationsResult = await pool.query(
            `
            SELECT
                r.id,
                r.business_id,
                r.user_id,
                r.professional_id,
                r.reservation_date AS date,
                TO_CHAR(r.reservation_time, 'HH24:MI') AS time,
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
            ORDER BY r.id DESC
            `,
            [business.id]
        );

        const professionalsResult = await pool.query(
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

        const servicesResult = await pool.query(
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
            [business.id]
        );

        res.json({
            business,
            reservations: reservationsResult.rows,
            professionals: professionalsResult.rows,
            services: servicesResult.rows,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
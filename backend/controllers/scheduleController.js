import { pool } from "../consultas.js";

const defaultSchedule = [
    { day_of_week: 1, day_label: "Lunes", is_open: true, open_time: "09:00", close_time: "20:00" },
    { day_of_week: 2, day_label: "Martes", is_open: true, open_time: "09:00", close_time: "20:00" },
    { day_of_week: 3, day_label: "Miércoles", is_open: true, open_time: "09:00", close_time: "20:00" },
    { day_of_week: 4, day_label: "Jueves", is_open: true, open_time: "09:00", close_time: "20:00" },
    { day_of_week: 5, day_label: "Viernes", is_open: true, open_time: "09:00", close_time: "20:00" },
    { day_of_week: 6, day_label: "Sábado", is_open: true, open_time: "10:00", close_time: "16:00" },
    { day_of_week: 0, day_label: "Domingo", is_open: false, open_time: "09:00", close_time: "20:00" },
];

const getBusinessByUser = async (userId) => {
    const result = await pool.query(
        `
        SELECT id
        FROM businesses
        WHERE user_id = $1
        LIMIT 1
        `,
        [userId]
    );

    return result.rows[0];
};

const ensureDefaultSchedule = async (businessId) => {
    for (const item of defaultSchedule) {
        await pool.query(
            `
            INSERT INTO business_schedules
            (
                business_id,
                day_of_week,
                day_label,
                is_open,
                open_time,
                close_time
            )
            VALUES
            ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (business_id, day_of_week)
            DO NOTHING
            `,
            [
                businessId,
                item.day_of_week,
                item.day_label,
                item.is_open,
                item.open_time,
                item.close_time,
            ]
        );
    }
};

export const getMyBusinessSchedule = async (req, res, next) => {
    try {
        const business = await getBusinessByUser(req.user.id);

        if (!business) {
            return res.status(404).json({
                error: "No tienes un negocio asociado",
            });
        }

        await ensureDefaultSchedule(business.id);

        const result = await pool.query(
            `
            SELECT
                id,
                business_id,
                day_of_week,
                day_label,
                is_open,
                TO_CHAR(open_time, 'HH24:MI') AS open_time,
                TO_CHAR(close_time, 'HH24:MI') AS close_time
            FROM business_schedules
            WHERE business_id = $1
            ORDER BY
                CASE
                    WHEN day_of_week = 1 THEN 1
                    WHEN day_of_week = 2 THEN 2
                    WHEN day_of_week = 3 THEN 3
                    WHEN day_of_week = 4 THEN 4
                    WHEN day_of_week = 5 THEN 5
                    WHEN day_of_week = 6 THEN 6
                    WHEN day_of_week = 0 THEN 7
                END ASC
            `,
            [business.id]
        );

        res.json({
            schedule: result.rows,
        });
    } catch (error) {
        next(error);
    }
};

export const updateMyBusinessSchedule = async (req, res, next) => {
    const client = await pool.connect();

    try {
        const { schedule } = req.body;

        if (!Array.isArray(schedule)) {
            return res.status(400).json({
                error: "Formato de horario inválido",
            });
        }

        const business = await getBusinessByUser(req.user.id);

        if (!business) {
            return res.status(404).json({
                error: "No tienes un negocio asociado",
            });
        }

        await client.query("BEGIN");

        for (const item of schedule) {
            await client.query(
                `
                INSERT INTO business_schedules
                (
                    business_id,
                    day_of_week,
                    day_label,
                    is_open,
                    open_time,
                    close_time,
                    updated_at
                )
                VALUES
                ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
                ON CONFLICT (business_id, day_of_week)
                DO UPDATE SET
                    day_label = EXCLUDED.day_label,
                    is_open = EXCLUDED.is_open,
                    open_time = EXCLUDED.open_time,
                    close_time = EXCLUDED.close_time,
                    updated_at = CURRENT_TIMESTAMP
                `,
                [
                    business.id,
                    item.day_of_week,
                    item.day_label,
                    item.is_open,
                    item.open_time,
                    item.close_time,
                ]
            );
        }

        await client.query("COMMIT");

        res.json({
            message: "Horarios actualizados correctamente",
        });
    } catch (error) {
        await client.query("ROLLBACK");
        next(error);
    } finally {
        client.release();
    }
};

export const getPublicBusinessSchedule = async (req, res, next) => {
    try {
        const { businessId } = req.params;

        await ensureDefaultSchedule(businessId);

        const result = await pool.query(
            `
            SELECT
                business_id,
                day_of_week,
                day_label,
                is_open,
                TO_CHAR(open_time, 'HH24:MI') AS open_time,
                TO_CHAR(close_time, 'HH24:MI') AS close_time
            FROM business_schedules
            WHERE business_id = $1
            ORDER BY day_of_week ASC
            `,
            [businessId]
        );

        res.json({
            schedule: result.rows,
        });
    } catch (error) {
        next(error);
    }
};
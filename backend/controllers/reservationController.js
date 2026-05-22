import { pool }
from "../consultas.js";

// CREATE RESERVATION
export const createReservation =
    async (req, res, next) => {

        try {

            const {

                business_id,

                professional_id,

                service,

                reservation_date,

                reservation_time,

            } = req.body;

            // VALIDATION
            if (

                !business_id ||

                !professional_id ||

                !service ||

                !reservation_date ||

                !reservation_time

            ) {

                return res
                    .status(400)
                    .json({

                        error:
                            "Todos los campos son obligatorios",

                    });

            }

            // INSERT
            const result =
                await pool.query(

                    `
                    INSERT INTO reservations
                    (
                        user_id,
                        business_id,
                        professional_id,
                        service,
                        reservation_date,
                        reservation_time,
                        status,
                        payment_status
                    )
                    VALUES
                    (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6,
                        $7,
                        $8
                    )
                    RETURNING *
                    `,

                    [

                        req.user.id,

                        business_id,

                        professional_id,

                        service,

                        reservation_date,

                        reservation_time,

                        "Pendiente",

                        "Pendiente",

                    ]

                );

            res.status(201).json({

                message:
                    "Reserva creada correctamente",

                reservation:
                    result.rows[0],

            });

        } catch (error) {

            next(error);

        }

    };

// GET RESERVATIONS
export const getReservations =
    async (req, res, next) => {

        try {

            const result =
                await pool.query(

                    `
                    SELECT

                        reservations.id,

                        reservations.service,

                        reservations.reservation_date,

                        reservations.reservation_time,

                        reservations.status,

                        reservations.payment_status,

                        businesses.name
                        AS business_name,

                        professionals.name
                        AS professional_name

                    FROM reservations

                    INNER JOIN businesses
                    ON reservations.business_id =
                    businesses.id

                    INNER JOIN professionals
                    ON reservations.professional_id =
                    professionals.id

                    WHERE reservations.user_id = $1

                    ORDER BY reservations.id DESC
                    `,

                    [req.user.id]

                );

            res.json({

                reservations:
                    result.rows,

            });

        } catch (error) {

            next(error);

        }

    };

// UPDATE RESERVATION
export const updateReservation =
    async (req, res, next) => {

        try {

            const { id } =
                req.params;

            const {

                service,

                reservation_date,

                reservation_time,

                status,

            } = req.body;

            // CHECK OWNER
            const reservation =
                await pool.query(

                    `
                    SELECT *
                    FROM reservations
                    WHERE id = $1
                    AND user_id = $2
                    `,

                    [
                        id,
                        req.user.id,
                    ]

                );

            if (
                reservation.rows.length === 0
            ) {

                return res
                    .status(404)
                    .json({

                        error:
                            "Reserva no encontrada",

                    });

            }

            // UPDATE
            const result =
                await pool.query(

                    `
                    UPDATE reservations
                    SET

                        service = $1,

                        reservation_date = $2,

                        reservation_time = $3,

                        status = $4

                    WHERE id = $5

                    RETURNING *
                    `,

                    [

                        service,

                        reservation_date,

                        reservation_time,

                        status,

                        id,

                    ]

                );

            res.json({

                message:
                    "Reserva actualizada correctamente",

                reservation:
                    result.rows[0],

            });

        } catch (error) {

            next(error);

        }

    };

// DELETE RESERVATION
export const deleteReservation =
    async (req, res, next) => {

        try {

            const { id } =
                req.params;

            // CHECK OWNER
            const reservation =
                await pool.query(

                    `
                    SELECT *
                    FROM reservations
                    WHERE id = $1
                    AND user_id = $2
                    `,

                    [
                        id,
                        req.user.id,
                    ]

                );

            if (
                reservation.rows.length === 0
            ) {

                return res
                    .status(404)
                    .json({

                        error:
                            "Reserva no encontrada",

                    });

            }

            // DELETE
            await pool.query(

                `
                DELETE FROM reservations
                WHERE id = $1
                `,

                [id]

            );

            res.json({

                message:
                    "Reserva eliminada correctamente",

            });

        } catch (error) {

            next(error);

        }

    };
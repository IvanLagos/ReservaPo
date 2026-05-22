import { pool }
from "../consultas.js";

// CREATE
export const createProfessional =
    async (req, res, next) => {

        try {

            const {

                business_id,

                name,

                specialty,

                phone,

                image_url,

            } = req.body;

            const result =
                await pool.query(

                    `
                    INSERT INTO professionals
                    (
                        business_id,
                        name,
                        specialty,
                        phone,
                        image_url
                    )
                    VALUES
                    ($1, $2, $3, $4, $5)
                    RETURNING *
                    `,

                    [
                        business_id,
                        name,
                        specialty,
                        phone,
                        image_url,
                    ]

                );

            res.status(201).json({

                professional:
                    result.rows[0],

            });

        } catch (error) {

            next(error);

        }

    };

// GET ALL
export const getProfessionals =
    async (req, res, next) => {

        try {

            const result =
                await pool.query(
                    `
                    SELECT *
                    FROM professionals
                    ORDER BY id DESC
                    `
                );

            res.json({

                professionals:
                    result.rows,

            });

        } catch (error) {

            next(error);

        }

    };

// UPDATE
export const updateProfessional =
    async (req, res, next) => {

        try {

            const { id } =
                req.params;

            const {

                name,

                specialty,

                phone,

                image_url,

            } = req.body;

            const result =
                await pool.query(

                    `
                    UPDATE professionals
                    SET

                        name = $1,

                        specialty = $2,

                        phone = $3,

                        image_url = $4

                    WHERE id = $5

                    RETURNING *
                    `,

                    [
                        name,
                        specialty,
                        phone,
                        image_url,
                        id,
                    ]

                );

            res.json({

                professional:
                    result.rows[0],

            });

        } catch (error) {

            next(error);

        }

    };

// DELETE
export const deleteProfessional =
    async (req, res, next) => {

        try {

            const { id } =
                req.params;

            await pool.query(

                `
                DELETE FROM professionals
                WHERE id = $1
                `,

                [id]

            );

            res.json({

                message:
                    "Profesional eliminado",

            });

        } catch (error) {

            next(error);

        }

    };
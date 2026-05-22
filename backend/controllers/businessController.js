import { pool }
from "../consultas.js";

// CREATE
export const createBusiness =
    async (req, res, next) => {

        try {

            const {

                user_id,

                name,

                category,

                city,

                description,

                image_url,

            } = req.body;

            const result =
                await pool.query(

                    `
                    INSERT INTO businesses
                    (
                        user_id,
                        name,
                        category,
                        city,
                        description,
                        image_url
                    )
                    VALUES
                    ($1, $2, $3, $4, $5, $6)
                    RETURNING *
                    `,

                    [
                        user_id,
                        name,
                        category,
                        city,
                        description,
                        image_url,
                    ]

                );

            res.status(201).json({

                business:
                    result.rows[0],

            });

        } catch (error) {

            next(error);

        }

    };

// GET
export const getBusinesses =
    async (req, res, next) => {

        try {

            const result =
                await pool.query(

                    `
                    SELECT *
                    FROM businesses
                    ORDER BY id DESC
                    `
                );

            res.json({

                businesses:
                    result.rows,

            });

        } catch (error) {

            next(error);

        }

    };

// UPDATE
export const updateBusiness =
    async (req, res, next) => {

        try {

            const { id } =
                req.params;

            const {

                name,

                category,

                city,

                description,

                image_url,

            } = req.body;

            const result =
                await pool.query(

                    `
                    UPDATE businesses
                    SET

                        name = $1,

                        category = $2,

                        city = $3,

                        description = $4,

                        image_url = $5

                    WHERE id = $6

                    RETURNING *
                    `,

                    [
                        name,
                        category,
                        city,
                        description,
                        image_url,
                        id,
                    ]

                );

            res.json({

                business:
                    result.rows[0],

            });

        } catch (error) {

            next(error);

        }

    };

// DELETE
export const deleteBusiness =
    async (req, res, next) => {

        try {

            const { id } =
                req.params;

            await pool.query(

                `
                DELETE FROM businesses
                WHERE id = $1
                `,

                [id]

            );

            res.json({

                message:
                    "Negocio eliminado",

            });

        } catch (error) {

            next(error);

        }

    };
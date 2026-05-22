import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import {

    findUserByEmail,

    createUser,

}
from "../services/authService.js";

import { SECRET_KEY }
from "../secretKey.js";

// REGISTER
export const register =
    async (req, res) => {

        try {

            const {
                name,
                email,
                password,
                role,
            } = req.body;

            // CHECK USER
            const userExists =
                await findUserByEmail(
                    email
                );

            if (userExists) {

                return res
                    .status(400)
                    .json({

                        error:
                            "El usuario ya existe",

                    });

            }

            // HASH PASSWORD
            const hashedPassword =
                await bcrypt.hash(
                    password,
                    10
                );

            // CREATE USER
            const user =
                await createUser(

                    name,

                    email,

                    hashedPassword,

                    role

                );

            res.status(201).json({

                message:
                    "Usuario creado correctamente",

                user,

            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                error:
                    "Error del servidor",

            });

        }

    };

// LOGIN
export const login =
    async (req, res) => {

        try {

            const {
                email,
                password,
            } = req.body;

            // FIND USER
            const user =
                await findUserByEmail(
                    email
                );

            // USER NOT FOUND
            if (!user) {

                return res
                    .status(404)
                    .json({

                        error:
                            "Usuario no encontrado",

                    });

            }

            // CHECK PASSWORD
            const validPassword =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!validPassword) {

                return res
                    .status(401)
                    .json({

                        error:
                            "Contraseña incorrecta",

                    });

            }

            // JWT
            const token =
                jwt.sign(

                    {
                        id: user.id,
                        email: user.email,
                        role: user.role,
                    },

                    SECRET_KEY,

                    {
                        expiresIn: "1h",
                    }

                );

            res.json({

                message:
                    "Login exitoso",

                token,

                user: {

                    id: user.id,

                    name: user.name,

                    email: user.email,

                    role: user.role,

                },

            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                error:
                    "Error del servidor",

            });

        }

    };
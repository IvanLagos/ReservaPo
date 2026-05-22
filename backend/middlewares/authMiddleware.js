import jwt from "jsonwebtoken";

import { SECRET_KEY }
from "../secretKey.js";

export const verifyToken =
    (req, res, next) => {

        try {

            const authHeader =
                req.headers.authorization;

            // TOKEN MISSING
            if (!authHeader) {

                return res
                    .status(401)
                    .json({

                        error:
                            "Token no proporcionado",

                    });

            }

            // FORMAT
            const token =
                authHeader.split(" ")[1];

            // VERIFY
            const decoded =
                jwt.verify(
                    token,
                    SECRET_KEY
                );

            req.user = decoded;

            next();

        } catch (error) {

            return res
                .status(401)
                .json({

                    error:
                        "Token inválido",

                });

        }

    };

export const verifyRole =
    (...allowedRoles) => {

        return (
            req,
            res,
            next
        ) => {

            try {

                const userRole =
                    req.user.role;

                // CHECK ROLE
                if (
                    !allowedRoles.includes(
                        userRole
                    )
                ) {

                    return res
                        .status(403)
                        .json({

                            error:
                                "No tienes permisos",

                        });

                }

                next();

            } catch (error) {

                return res
                    .status(500)
                    .json({

                        error:
                            "Error del servidor",

                    });

            }

        };

    };
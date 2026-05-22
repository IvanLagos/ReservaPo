import express from "express";

import {
    register,
    login,
}
from "../controllers/authController.js";

import {
    verifyToken,
    verifyRole,
}
from "../middlewares/authMiddleware.js";

import { validateSchema }
from "../middlewares/validateSchema.js";

import {

    registerSchema,

    loginSchema,

}
from "../schemas/authSchema.js";

const router =
    express.Router();

// REGISTER
router.post(

    "/register",

    validateSchema(
        registerSchema
    ),

    register
);

// LOGIN
router.post(

    "/login",

    validateSchema(
        loginSchema
    ),

    login
);

// ADMIN
router.get(

    "/admin",

    verifyToken,

    verifyRole("admin"),

    async (req, res) => {

        res.json({

            message:
                "Bienvenido administrador",

        });

    }
);

export default router;
import "dotenv/config";

import express from "express";

import cors from "cors";

import { pool }
from "./consultas.js";

import {
    verifyToken,
}
from "./middlewares/authMiddleware.js";

import authRoutes
from "./routes/authRoutes.js";

import reservationRoutes
from "./routes/reservationRoutes.js";

import professionalRoutes
from "./routes/professionalRoutes.js";

import { errorHandler }
from "./middlewares/errorMiddleware.js";

import businessRoutes
from "./routes/businessRoutes.js";

import serviceRoutes
from "./routes/serviceRoutes.js";

import scheduleRoutes
from "./routes/scheduleRoutes.js";

import userRoutes
from "./routes/userRoutes.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://reserva-po.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

// ROUTES
app.use(authRoutes);

app.use(reservationRoutes);

app.use(professionalRoutes);

app.use(businessRoutes);

app.use("/", serviceRoutes);

app.use("/", scheduleRoutes);

app.use("/", userRoutes);

// TEST DB
app.get(

    "/test-db",

    async (req, res) => {

        try {

            const result =
                await pool.query(
                    "SELECT NOW()"
                );

            res.json(
                result.rows
            );

        } catch (error) {

            console.log(error);

            res.status(500).json({

                error:
                    "Error conectando PostgreSQL",

            });

        }

    }
);

// ROOT
app.get(

    "/",

    (req, res) => {

        res.json({

            message:
                "ReservaPo backend funcionando 🚀",

        });

    }
);

// PROFILE
app.get(

    "/profile",

    verifyToken,

    async (req, res, next) => {

        try {

            const result =
                await pool.query(

                    `
                    SELECT

                        id,

                        name,

                        email,

                        role

                    FROM users

                    WHERE id = $1
                    `,

                    [req.user.id]

                );

            res.json({

                user:
                    result.rows[0],

            });

        } catch (error) {

            next(error);

        }

    }
);

// GLOBAL ERROR HANDLER
app.use(errorHandler);

const PORT = 3000;

if (
    process.env.NODE_ENV !== "test"
) {

    app.listen(PORT, () => {

        console.log(
            `Servidor corriendo en puerto ${PORT}`
        );

    });

}

export default app;
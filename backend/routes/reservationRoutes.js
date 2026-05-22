import express
from "express";

import {

    createReservation,

    getReservations,

    updateReservation,

    deleteReservation,

}
from "../controllers/reservationController.js";

import {
    verifyToken,
}
from "../middlewares/authMiddleware.js";

const router =
    express.Router();

// CREATE
router.post(

    "/reservations",

    verifyToken,

    createReservation
);

// GET
router.get(

    "/reservations",

    verifyToken,

    getReservations
);

// UPDATE
router.put(

    "/reservations/:id",

    verifyToken,

    updateReservation
);

// DELETE
router.delete(

    "/reservations/:id",

    verifyToken,

    deleteReservation
);

export default router;
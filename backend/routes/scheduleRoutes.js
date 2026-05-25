import express from "express";

import {
    getMyBusinessSchedule,
    updateMyBusinessSchedule,
    getPublicBusinessSchedule,
} from "../controllers/scheduleController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
    "/business/schedule",
    verifyToken,
    getMyBusinessSchedule
);

router.put(
    "/business/schedule",
    verifyToken,
    updateMyBusinessSchedule
);

router.get(
    "/businesses/:businessId/schedule",
    getPublicBusinessSchedule
);

export default router;
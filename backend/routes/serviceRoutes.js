import express from "express";

import {
    getBusinessServices,
    getPublicServicesByBusiness,
    createService,
    updateService,
    deleteService,
} from "../controllers/serviceController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
    "/business/services",
    verifyToken,
    getBusinessServices
);

router.get(
    "/services/business/:businessId",
    getPublicServicesByBusiness
);

router.post(
    "/business/services",
    verifyToken,
    createService
);

router.put(
    "/business/services/:id",
    verifyToken,
    updateService
);

router.delete(
    "/business/services/:id",
    verifyToken,
    deleteService
);

export default router;
import express
from "express";

import {

    createBusiness,

    getBusinesses,

    updateBusiness,

    deleteBusiness,

}
from "../controllers/businessController.js";

import { verifyToken }
from "../middlewares/authMiddleware.js";

import { validateSchema }
from "../middlewares/validateSchema.js";

import { businessSchema }
from "../schemas/businessSchema.js";

const router =
    express.Router();

// CREATE
router.post(

    "/businesses",

    verifyToken,

    validateSchema(
        businessSchema
    ),

    createBusiness
);

// GET
router.get(

    "/businesses",

    getBusinesses
);

// UPDATE
router.put(

    "/businesses/:id",

    verifyToken,

    updateBusiness
);

// DELETE
router.delete(

    "/businesses/:id",

    verifyToken,

    deleteBusiness
);

export default router;
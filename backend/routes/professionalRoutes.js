import express
from "express";

import {

    createProfessional,

    getProfessionals,

    updateProfessional,

    deleteProfessional,

}
from "../controllers/professionalController.js";

import { verifyToken }
from "../middlewares/authMiddleware.js";

import { validateSchema }
from "../middlewares/validateSchema.js";

import { professionalSchema }
from "../schemas/professionalSchema.js";

const router =
    express.Router();

// CREATE
router.post(

    "/professionals",

    verifyToken,

    validateSchema(
        professionalSchema
    ),

    createProfessional
);

// GET
router.get(

    "/professionals",

    getProfessionals
);

// UPDATE
router.put(

    "/professionals/:id",

    verifyToken,

    updateProfessional
);

// DELETE
router.delete(

    "/professionals/:id",

    verifyToken,

    deleteProfessional
);

export default router;
import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import { submitResponse, getResponses, } from "../controllers/responseController.js";

const router = express.Router();

/* Public */
router.post("/:formId", submitResponse);

/* Admin */
router.get("/:formId", authMiddleware, getResponses);

export default router;

import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {createForm, getForms, getFormBySlug} from "../controllers/formController.js";

const router = express.Router();

router.post("/", authMiddleware, createForm);

router.get("/", authMiddleware, getForms);

router.get("/:slug", getFormBySlug);

export default router;

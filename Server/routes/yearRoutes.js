import express from "express";

import {
  createYear,
  getYears,
  getYearById,
  updateYear,
   deleteYear,
} from "../controllers/yearController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createYear);
router.get("/", authMiddleware, getYears);
router.get("/:yearId", authMiddleware, getYearById);
router.patch("/:yearId", authMiddleware, updateYear);
router.delete("/:yearId", authMiddleware, deleteYear);

export default router;
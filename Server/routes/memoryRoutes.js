import express from "express";

import {
  createMemory,
  getMemoriesByYear,
  uploadMedia,
  getMemoryById,
  updateMemory,
  deleteMemory,
  toggleFavorite,
  toggleShareable,
   getFavoriteMemories,
    getTimelineMemories,
    getStorageUsage,
} from "../controllers/MemoryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  upload.array("media", 10),
  uploadMedia
);

router.post("/", authMiddleware, createMemory);
router.get("/storage", authMiddleware, getStorageUsage);


router.get(
  "/favorites",
  authMiddleware,
  getFavoriteMemories
);

router.get(
  "/timeline",
  authMiddleware,
  getTimelineMemories
);
router.get("/year/:yearId", authMiddleware, getMemoriesByYear);
router.get("/:memoryId", authMiddleware, getMemoryById);

router.patch(
  "/:memoryId/favorite",
  authMiddleware,
  toggleFavorite
);

router.patch(
  "/:memoryId/shareable",
  authMiddleware,
  toggleShareable
);

router.put("/:memoryId", authMiddleware, updateMemory);
router.delete("/:memoryId", authMiddleware, deleteMemory);

export default router;
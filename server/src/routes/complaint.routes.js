import express from "express";

import {
  createComplaintController,
  getAllComplaints,
  getComplaintById,
  getMyComplaints,
} from "../controllers/complaint.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/new", protect, createComplaintController);

router.get("/all", protect, getAllComplaints);

router.get("/my", protect, getMyComplaints);

router.get("/:id", protect, getComplaintById);

export default router;

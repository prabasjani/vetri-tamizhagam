import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  updateOnboarding,
  completeOnboarding,
  profile,
} from "../controllers/user.controller.js";
import { requireOnboarding } from "../middleware/onboard.middleware.js";
import User from "../models/user.model.js";

const router = express.Router();

router.put("/onboarding", protect, updateOnboarding);
router.post("/complete-onboarding", protect, completeOnboarding);

router.get("/profile", protect, profile);

export default router;

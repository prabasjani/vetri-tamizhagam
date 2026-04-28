import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  updateOnboarding,
  completeOnboarding,
} from "../controllers/user.controller.js";
import { requireOnboarding } from "../middleware/onboard.middleware.js";

const router = express.Router();

router.put("/onboarding", protect, updateOnboarding);
router.post("/complete-onboarding", protect, completeOnboarding);

// Sample Route
router.get("/me", protect, requireOnboarding, (req, res) => {
  res.status(200).json({message: "Hello User"})
})

export default router;

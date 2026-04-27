import express from "express";
import {
  register,
  login,
  refresh,
  logout,
} from "../controllers/auth.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

// Sample routes
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route",
    user: req.user,
  });
});

router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Admin access granted" });
});

export default router;

import User from "../models/user.model.js";
import { encrypt } from "../utils/encryption.js";
import {
  isValidMobile,
  isValidAadhaar,
  isValidVoterId,
} from "../utils/validators.js";
import { ALLOWED_INTERESTS } from "../constants/interests.js";

export const updateOnboarding = async (req, res, next) => {
  try {
    const { step, data } = req.body;

    if (!step || !data) {
      return res.status(400).json({
        success: false,
        message: "Step and data are required",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent skipping steps
    if (step !== user.onboardingStep + 1) {
      return res.status(400).json({
        success: false,
        message: `Invalid step. Expected step ${user.onboardingStep + 1}`,
      });
    }

    let updateData = {};

    // STEP-WISE HANDLING
    switch (step) {
      case 2:
        const { fullname, gender, dob, mobile } = data;

        if (!fullname || !gender || !dob) {
          return res.status(400).json({
            success: false,
            message: "All fields required for step 2",
          });
        }

        if (!isValidMobile(mobile)) {
          return res.status(400).json({
            message: "Invalid mobile number",
          });
        }

        updateData = { fullname, gender, dob };
        break;

      case 3:
        const { state, district, area } = data;

        if (!state || !district || !area) {
          return res.status(400).json({
            success: false,
            message: "All fields required for step 3",
          });
        }

        updateData = { state, district, area };
        break;

      case 4:
        const { identityType, identityNumber } = data;

        if (!identityType || !identityNumber) {
          return res.status(400).json({
            success: false,
            message: "Identity details required",
          });
        }

        // Valid Identity only
        if (identityType === "aadhaar") {
          if (!isValidAadhaar(identityNumber)) {
            return res.status(400).json({
              success: false,
              message: "Invalid Aadhaar number (must be 12 digits)",
            });
          }
        }

        if (identityType === "voterId") {
          if (!isValidVoterId(identityNumber)) {
            return res.status(400).json({
              success: false,
              message: "Invalid Voter ID format",
            });
          }
        }

        //  Encrypt identity
        updateData = {
          identityType,
          identityNumber: encrypt(identityNumber),
        };
        break;

      case 5:
        const { interests } = data;

        if (!Array.isArray(interests) || interests.length === 0) {
          return res.status(400).json({
            success: false,
            message: "At least one interest required",
          });
        }

        // Validate ALLOWED_INTERESTS only
        const invalid = interests.filter((i) => !ALLOWED_INTERESTS.includes(i));

        if (invalid.length > 0) {
          return res.status(400).json({
            success: false,
            message: `Invalid interests: ${invalid.join(", ")}`,
          });
        }

        updateData = { interests };
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid onboarding step",
        });
    }

    // Update user
    user.set(updateData);
    user.onboardingStep = step;

    await user.save();

    res.json({
      success: true,
      stepCompleted: step,
    });
  } catch (err) {
    next(err);
  }
};

export const completeOnboarding = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.onboardingStep < 5) {
      return res.status(400).json({
        success: false,
        message: "Complete all steps first",
      });
    }

    user.hasCompletedOnboarding = true;

    await user.save();

    res.json({
      success: true,
      message: "Onboarding completed",
    });
  } catch (err) {
    next(err);
  }
};

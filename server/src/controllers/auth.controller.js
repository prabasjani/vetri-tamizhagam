import cookieOptions from "../config/cookies.js";
import User from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

// REGISTER
export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with email!",
      });
    }

    // Hash password
    const hashed = await hashPassword(password);

    // Create user
    const user = await User.create({
      email,
      password: hashed,
      onboardingStep: 1,
    });

    // Generate tokens
    const payload = {
      userId: user._id,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Save refresh token
    user.refreshToken = refreshToken;
    await user.save();

    // Set cookies
    res
      .cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000, // 15 min
      })
      .cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

    // Response
    res.status(201).json({
      success: true,
      message: "User Registered Successful",
      user, // password auto removed via toJSON
    });
  } catch (err) {
    next(err);
  }
};

// LOGIN
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = { userId: user._id, role: user.role };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();

    res
      .cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000, // 15 min
      })
      .cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

    res.json({ success: true, message: "Logged In", accessToken, user });
  } catch (err) {
    next(err);
  }
};

// REFRESH TOKEN
export const refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = verifyRefreshToken(token);

    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== token) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const newAccessToken = generateAccessToken({
      userId: user._id,
      role: user.role,
    });

    const newRefreshToken = generateRefreshToken({
      userId: user._id,
      role: user.role,
    });

    user.refreshToken = newRefreshToken;
    await user.save();

    res
      .cookie("accessToken", newAccessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000, // 15 min
      })
      .cookie("refreshToken", newRefreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

    res.json({
      success: true,
      message: "Token Refreshed",
      accessToken: newAccessToken,
    });
  } catch (err) {
    next(err);
  }
};

// LOGOUT
export const logout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (token) {
      const decoded = verifyRefreshToken(token);

      await User.findByIdAndUpdate(decoded.userId, {
        $unset: { refreshToken: 1 },
      });
    }

    res.clearCookie("refreshToken").clearCookie("accessToken");
    res.json({ success: true, message: "Logged Out" });
  } catch (err) {
    next(err);
  }
};

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
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    // remove password before return userdata
    const userData = user.toObject();
    delete userData.password;

    res
      .status(201)
      .json({ success: true, message: "Registered Successfull", userData });
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
      .cookie("refreshToken", refreshToken, cookieOptions)
      .cookie("accessToken", accessToken, cookieOptions);

    const userData = user.toObject();
    delete userData.password;
    delete userData.refreshToken;

    res.json({ success: true, message: "Logged In", accessToken, userData });
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
      .cookie("refreshToken", newRefreshToken, cookieOptions)
      .cookie("accessToken", newAccessToken, cookieOptions);

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


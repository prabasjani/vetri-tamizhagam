import { verifyAccessToken } from "../utils/jwt.js";

export const protect = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = verifyAccessToken(token);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Forbidden: insufficient permissions",
        });
      }

      next();
    } catch (err) {
      return res.status(500).json({ message: "Authorization error" });
    }
  };
};

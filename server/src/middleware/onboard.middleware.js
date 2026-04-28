import User from "../models/user.model.js";

export const requireOnboarding = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const user = await User.findById(req.user.userId);

  if (!user.hasCompletedOnboarding) {
    return res.status(403).json({
      msg: "Complete onboarding first",
    });
  }

  next();
};

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Step 1 (Account Setup)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    // Step 2 (Basic Info)
    fullname: { type: String },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    dob: { type: Date },
    mobile: {
      type: String,
      unique: true,
    },

    // Step 3 (Location)
    state: { type: String },
    district: { type: String },
    area: { type: String },

    // Step 4 (Identity)
    identityType: {
      type: String,
      enum: ["aadhaar", "voterId"],
    },
    identityNumber: { type: String },

    // Step 5 (Interests)
    interests: [
      {
        type: String,
        enum: [
          "education",
          "health",
          "transport",
          "corruption",
          "infrastructure",
          "employment",
          "agriculture",
        ],
      },
    ],

    // Onboarding Tracking
    onboardingStep: {
      type: Number,
      default: 1,
    },

    hasCompletedOnboarding: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["citizen", "admin", "officer"],
      default: "citizen",
    },

    refreshToken: String,
  },
  { timestamps: true },
);

// Hide sensitive fields
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.refreshToken;
  delete obj.identityNumber; // important
  return obj;
};

const User = mongoose.model("User", userSchema);
export default User;

import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema(
  {
    url: {
      type: String,
    },

    type: {
      type: String,
    },
  },
  {
    _id: false,
  },
);

const timelineSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    _id: false,
  },
);

const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    citizen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },

    category: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Emergency"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Under Review",
        "Assigned",
        "In Progress",
        "Resolved",
        "Rejected",
        "Escalated",
        "Reopened",
      ],
      default: "Pending",
    },

    isAnonymous: {
      type: Boolean,
      default: false,
    },

    location: {
      address: String,

      district: String,

      state: {
        type: String,
        default: "Tamil Nadu",
      },

      //   coordinates: {
      //     lat: Number,
      //     lng: Number,
      //   },
    },

    attachments: [attachmentSchema],

    assignedOfficer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    timeline: [timelineSchema],

    resolution: {
      message: String,
      proofImages: [String],
    },
  },
  {
    timestamps: true,
  },
);

export const Complaint = mongoose.model("Complaint", complaintSchema);

import { Complaint } from "../models/complaint.model.js";
import { createComplaintService } from "../services/complaint.service.js";

// CREATE NEW COMPLAINT
export const createComplaintController = async (req, res, next) => {
  try {
    const complaint = await createComplaintService(req.body, req.user.userId);

    return res.status(201).json({
      success: true,
      message: "Complaint created successfully",
      data: complaint,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL COMPLAINTS
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });

    if (!complaints) {
      return res
        .status(404)
        .json({ success: false, message: "No Complaints Available!" });
    }

    res.status(200).json({
      success: true,
      message: "Complaint List Fetched!",
      complaints,
    });
  } catch (err) {
    next(err);
  }
};

// GET MY COMPLAINTS
export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      citizen: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    if (!complaints) {
      return res
        .status(404)
        .json({ success: false, message: "No Complaints Available!" });
    }

    res.status(200).json({
      success: true,
      message: "Your Complaints List Fetched!",
      complaints,
    });
  } catch (err) {
    next(err);
  }
};

// GET SINGLE COMPLAINT
export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate(
      "citizen",
      "name email",
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    // Hide identity for anonymous complaints
    if (complaint.isAnonymous) {
      complaint.citizen = {
        name: "Anonymous Citizen",
      };
    }

    res.status(200).json({
      success: true,
      message: "Complaint Detail Fetched",
      complaint,
    });
  } catch (err) {
    next(err);
  }
};

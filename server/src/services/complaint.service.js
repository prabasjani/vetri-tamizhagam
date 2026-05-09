import { Complaint } from "../models/complaint.model.js";

import {
  generateComplaintId,
  getDepartmentByCategory,
} from "../utils/complaint.utils.js";

export const createComplaintService = async (payload, userId) => {
  const complaintId = await generateComplaintId();
  const department = getDepartmentByCategory(payload.category);

  const isAnonymous = payload.category === "Corruption" ? true : false;

  const complaint = await Complaint.create({
    complaintId,
    citizen: userId,
    title: payload.title,
    description: payload.description,
    category: payload.category,
    department,
    priority: payload.priority,
    isAnonymous,
    location: payload.location,
    timeline: [
      {
        status: "Pending",
        message: "Complaint submitted successfully.",
        updatedBy: userId,
      },
    ],
  });

  if (complaint.isAnonymous) {
    complaint.citizen = null;
  }

  return complaint;
};

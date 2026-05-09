import { Complaint } from "../models/complaint.model.js";
import { CATEGORY_DEPARTMENT_MAP } from "../constants/complaint.constants.js";

export const generateComplaintId = async () => {
  const year = new Date().getFullYear();

  // Find latest complaint for current year
  const latestComplaint = await Complaint.findOne({
    complaintId: {
      $regex: `TVK-${year}`,
    },
  })
    .sort({ createdAt: -1 })
    .select("complaintId");

  let sequenceNumber = 1;

  if (latestComplaint?.complaintId) {
    const lastSequence = latestComplaint.complaintId.split("-")[2];
    sequenceNumber = Number(lastSequence) + 1;
  }

  const paddedSequence = String(sequenceNumber).padStart(7, "0");

  return `TVK-${year}-${paddedSequence}`;
};

// Auto detect department by category
export const getDepartmentByCategory = (category) => {
  return CATEGORY_DEPARTMENT_MAP[category] || "General Administration";
};

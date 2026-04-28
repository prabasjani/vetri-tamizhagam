// 📱 Indian mobile validation (10 digits, starts 6–9)
export const isValidMobile = (mobile) => {
  return /^[6-9]\d{9}$/.test(mobile);
};

// 🪪 Aadhaar = 12 digits
export const isValidAadhaar = (aadhaar) => {
  return /^\d{12}$/.test(aadhaar);
};

// 🪪 Voter ID (EPIC) basic pattern (can vary)
export const isValidVoterId = (voterId) => {
  return /^[A-Z]{3}[0-9]{7}$/.test(voterId);
};

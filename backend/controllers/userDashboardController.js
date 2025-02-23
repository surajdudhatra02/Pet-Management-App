const PetAdmission = require("../models/PetAdmissionModel.js");
const mongoose = require("mongoose");

exports.userDashboardController = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from JWT token

    // Convert userId to ObjectId for proper querying
    const objectId = new mongoose.Types.ObjectId(userId);

    // Find all pet admissions linked to this user
    const admissions = await PetAdmission.find({ userId: objectId });

    if (!admissions || admissions.length === 0) {
      return res.status(404).json({ success: false, message: "No pet admissions found for this user" });
    }

    res.status(200).json({ success: true, admissions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

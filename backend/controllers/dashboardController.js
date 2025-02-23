const User = require("../models/UserModel");
const PetModel = require("../models/PetAdmissionModel")

exports.getAllUsers = async (req, res) => {
  try {
    const users = await PetModel.find({}, "-password"); // Exclude passwords

    res.status(200).json({
      success: true,
      message: "All users retrieved successfully!",
      users
    });
  } catch (error) {
    console.error("Admin Dashboard Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

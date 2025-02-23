const PetAdmission = require("../models/PetAdmissionModel.js");
const User = require("../models/UserModel.js");
const bcrypt = require("bcryptjs");

exports.petAdmissionController = async (req, res) => {
  try {
    // Get admin user from auth middleware
    const adminUser = req.user;

    if (!adminUser || adminUser.role !== "admin") {
      return res.status(403).json({ message: "Only admins can perform this action." });
    }

    const {
      ownerName,
      ownerEmail,
      password,
      address,
      contactNumber,
      whatsappNumber,

      dogName,
      dogAge,
      dogWeight,
      vaccinationDate,
      admissionDate,
      numberOfDays,
      serviceType,
      payment,
      dietPreference,
      healthComplaints,
      agreementSigned,
    } = req.body;

    let user = await User.findOne({ email: ownerEmail });

    if (!user) {
      let hashedPassword;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }

      user = new User({
        name: ownerName,
        email: ownerEmail,
        password: hashedPassword || "defaultpassword",
        role: "user",
        contactNumber,
        address,
      });

      await user.save();
    }

    // Normalize diet preference
    let normalizedDietPreference =
      dietPreference.toLowerCase().includes("veg") ? "Vegetarian" : "Non Vegetarian";

    const newPetAdmission = new PetAdmission({
      ownerName,
      ownerEmail,
      password: user.password,
      address,
      contactNumber,
      whatsappNumber: whatsappNumber || contactNumber,

      dogName,
      dogAge,
      dogWeight,
      vaccinationDate,
      admissionDate,
      numberOfDays,
      serviceType,
      payment,
      dietPreference: normalizedDietPreference,
      healthComplaints: healthComplaints || "None",
      agreementSigned,

      userId: user._id, // Link pet admission to the user
    });

    const savedAdmission = await newPetAdmission.save();

    // Update user's profileAdmissionId if it's their first pet admission
    if (!user.profileAdmissionId) {
      user.profileAdmissionId = savedAdmission._id;
      await user.save();
    }

    res.status(201).json({
      message: "Pet admission recorded successfully and user data updated",
      data: savedAdmission,
    });

  } catch (error) {
    console.error("Error in pet admission:", error);

    if (error.name === "ValidationError") {
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      return res.status(400).json({ message: "Validation failed", errors: validationErrors });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate information detected",
        error: `The ${Object.keys(error.keyPattern)[0]} is already in use.`,
      });
    }

    res.status(500).json({ message: "Server error", error: error.message });
  }
};

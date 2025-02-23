const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    contactNumber: { type: String },
    address: { type: String },
    profileAdmissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PetAdmission",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

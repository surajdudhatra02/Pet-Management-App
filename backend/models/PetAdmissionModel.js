const mongoose = require("mongoose");

const PetAdmissionModel = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true,
  },
  ownerEmail: {
    type: String,
    required: true,
    // Remove unique constraint since multiple pets could have same owner
    match: [/.+\@.+\..+/, 'Please provide a valid email address']
  },

  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  whatsappNumber: {
    type: String,
    required: false,
  },

  dogName: {
    type: String,
    required: true,
  },
  dogAge: {
    type: String,
    required: true,
  },
  dogWeight: {
    type: Number,
    required: true,
  },
  vaccinationDate: {
    type: Date,
    required: true,
  },
  admissionDate: {
    type: Date,
    required: true,
  },
  numberOfDays: {
    type: Number,
    required: true,
  },
  serviceType: {
    type: String,
    enum: ["Training", "Hostel", "Training & Hostel"],
    required: true,
  },
  payment: {
    advance: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  dietPreference: {
    type: String,
    enum: ["Vegetarian", "Non Vegetarian"],
    required: true,
  },
  healthComplaints: {
    type: String,
    default: "None",
  },
  agreementSigned: {
    type: Boolean,
    required: true,
    default: false,
  },

  // Reference to the associated user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create virtual property for full payment amount
PetAdmissionModel.virtual('totalPayment').get(function () {
  return this.payment.advance + this.payment.balance;
});

module.exports = mongoose.model("PetAdmission", PetAdmissionModel);

const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    // Profile details
    fullName: { type: String, default: "" },
    phone: { type: String, default: "" },
    dob: { type: String, default: "" },
    gender: { type: String, default: "" },
    aadhaar: { type: String, default: "" },
    pan: { type: String, default: "" },
    address: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminUser", adminSchema, "adminusers");
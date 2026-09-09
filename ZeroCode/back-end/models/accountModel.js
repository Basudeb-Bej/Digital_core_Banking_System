// back-end/models/accountModel.js
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true, maxlength: 10, minlength: 10 },
    accNo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    aadhaar: { type: String, required: true, unique: true, maxlength: 12, minlength: 12 },
    aadhaardoc: { type: String, required: true },
    pan: { type: String, required: true, unique: true, maxlength: 10, minlength: 10 },
    pandoc: { type: String, required: true },
    accountType: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    signature: { type: String, required: true },
    photo: { type: String, default: "" },
    language: { type: String, default: "English" },
    consent: { type: Boolean, default: false },
    status: { type: String, enum: ["pending", "active", "freeze", "frozen", "closed", "rejected"], default: "pending" },
    balance: { type: Number, default: 0},
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema, "accounts");
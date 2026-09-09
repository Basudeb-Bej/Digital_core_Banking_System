// back-end/models/transactionModel.js — full file
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
  recipientName: { type: String, required: true },
  recipientAccount: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  status: { type: String, enum: ["Pending", "Success", "Failed"], default: "Pending" },
  type: { type: String, enum: ["Credit", "Debit"], required: true },
},
  { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema, "transactions");
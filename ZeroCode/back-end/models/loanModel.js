const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    interestRate: { type: Number, required: true, default: 8.5 }, 
    termMonths: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected", "Closed"], default: "Pending" },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    remarks: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Loan", loanSchema, "loans");
// back-end/controllers/userController.js
const mongoose = require("mongoose");
const Account = require("../models/accountModel");
const Transaction = require("../models/transactionModel");
let User;
try {
  User = require("../models/userModel");
} catch (e) {
  // in case userModel is not used
}
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../utils/emailService");

exports.getUserDashboard = async (req, res) => {
  try {
    const userId = req.params.senderId;

    // 1. Fetch user account with balance and accountType
    const account = await Account.findById(userId).select("balance accountType accNo");
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Convert userId to ObjectId so MongoDB aggregate can match it
    const userObjectId = mongoose.Types.ObjectId.isValid(userId)
      ? new mongoose.Types.ObjectId(userId)
      : userId;

    // Match criteria for the user as sender (matches both ObjectId & string format)
    const senderMatchCriteria = {
      $or: [
        { senderId: userObjectId },
        { senderId: userId },
        { userId: userObjectId },
        { userId: userId }
      ]
    };

    // Case-tolerant status filter (includes "Success", "success", "Completed", or transactions without status)
    const validStatusCriteria = {
      $or: [
        { status: { $in: ["Success", "success", "Completed", "completed"] } },
        { status: { $exists: false } }
      ]
    };

    // Date range setup
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

    /* ==========================================
       1. MONTHLY SPENDING (Debits this month)
    ========================================== */
    const monthlySpendingAgg = await Transaction.aggregate([
      {
        $match: {
          ...senderMatchCriteria,
          type: { $in: ["Debit", "debit"] },
          createdAt: { $gte: startOfMonth },
          ...validStatusCriteria,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: { $toDouble: "$amount" } },
        },
      },
    ]);

    const monthlySpending = monthlySpendingAgg[0]?.total || 0;

    /* ==========================================
       2. TODAY TRANSACTIONS (Today's activity)
       - Option A: Total spent today (Debits only)
       - Option B: Total volume today (All user txns)
    ========================================== */
    // Calculating today's spending (debits):
    const todayAgg = await Transaction.aggregate([
      {
        $match: {
          ...senderMatchCriteria,
          type: { $in: ["Debit", "debit"] },
          createdAt: { $gte: startOfToday },
          ...validStatusCriteria,
        },
      },
      {
        $group: {
          _id: null,
          totalToday: { $sum: { $toDouble: "$amount" } },
        },
      },
    ]);

    const todayTransactions = todayAgg[0]?.totalToday || 0;

    // If you prefer "Today Transactions" to reflect all turnover (credits + debits today):
    /*
    const todayAllAgg = await Transaction.aggregate([
      {
        $match: {
          $or: [
            { senderId: userObjectId },
            { senderId: userId },
            { recipientId: userObjectId },
            { recipientId: userId }
          ],
          createdAt: { $gte: startOfToday },
          ...validStatusCriteria,
        },
      },
      {
        $group: {
          _id: null,
          totalToday: { $sum: { $toDouble: "$amount" } },
        },
      },
    ]);
    const todayTransactions = todayAllAgg[0]?.totalToday || 0;
    */

    res.json({
      totalBalance: account.balance,
      accountType: account.accountType,
      accNo: account.accNo,
      monthlySpending,
      todayTransactions,
    });
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
};

/* ===========================
   GET USER PROFILE
=========================== */
exports.getProfile = async (req, res) => {
  try {
    const user = await Account.findById(req.params.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ===========================
   MULTER CONFIG
=========================== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
exports.upload = multer({ storage });

/* ===========================
   UPDATE PROFILE IMAGE
=========================== */
exports.updateProfileImage = async (req, res) => {
  try {
    const imagePath = `/uploads/${req.file.filename}`;

    await Account.findByIdAndUpdate(req.params.userId, {
      photo: imagePath,
    });

    res.json({
      message: "Profile image updated",
      photo: imagePath,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await Account.findById(userId);

    if (!user && User) {
      user = await User.findById(userId);
    }

    if (!user) {
      return res.status(404).json({ message: "User account not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({ message: "Server error updating password" });
  }
};

exports.contactSupport = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required." });
    }

    // Send email to ZeroBank Administrator
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: `[ZeroBank Support] ${subject || "Customer Inquiry"} from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
          <h2 style="color: #0d6efd; margin-top: 0;">New Support Request</h2>
          <p><strong>Customer Name:</strong> ${name}</p>
          <p><strong>Customer Email:</strong> ${email}</p>
          <p><strong>Mobile Number:</strong> ${phone || "Not provided"}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <h4 style="margin-bottom: 8px;">Message / Issue Details:</h4>
          <div style="background: #f8f9fa; padding: 14px; border-left: 4px solid #0d6efd; border-radius: 4px; white-space: pre-wrap;">
            ${message}
          </div>
        </div>
      `,
    });

    res.status(200).json({ message: "Your message has been sent to ZeroBank Support." });
  } catch (error) {
    console.error("Error sending contact email:", error);
    res.status(500).json({ message: "Server error sending message. Please try again later." });
  }
};
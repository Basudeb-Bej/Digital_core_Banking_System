// back-end/controllers/userController.js
const mongoose = require("mongoose");
const Account = require("../models/accountModel");
const Transaction = require("../models/transactionModel");
const AdminUser = require("../models/adminModel");
let User;
try {
  User = require("../models/userModel");
} catch (e) {
  // in case userModel is not used
}
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

/* ===========================================================
   FORGOT PASSWORD — STEP 1: VERIFY IDENTITY
   - Customers (role "user"): Name, Account Number, Email, Phone
     must all match an active Account record.
   - Admins (role "admin"): Name, Email, Phone, Aadhaar, PAN and
     Date of Birth must all match an AdminUser record.
   Only a match issues a short-lived verification token — nobody
   else can proceed to the "send request" step.
=========================================================== */
exports.verifyForgotPasswordIdentity = async (req, res) => {
  try {
    const { role, name, email, phone } = req.body;

    if (!role || !name || !email || !phone) {
      return res.status(400).json({
        message: "Name, Email and Phone are required for verification.",
      });
    }

    const cleanName = String(name).trim().toLowerCase();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = String(phone).replace(/\D/g, "");

    let record = null;
    let tokenIdentifier = null;

    if (role === "admin") {
      const { aadhaar, pan, dob } = req.body;

      if (!aadhaar || !pan || !dob) {
        return res.status(400).json({
          message: "Aadhaar, PAN and Date of Birth are also required to verify an admin.",
        });
      }

      const cleanAadhaar = String(aadhaar).replace(/\s/g, "");
      const cleanPan = String(pan).trim().toUpperCase();
      const cleanDob = String(dob).trim().toLowerCase();

      // Email is unique for AdminUser, so it's a safe lookup key
      const admin = await AdminUser.findOne({ email: cleanEmail });
      if (
        admin &&
        (admin.fullName || "").trim().toLowerCase() === cleanName &&
        (admin.phone || "").replace(/\D/g, "") === cleanPhone &&
        (admin.aadhaar || "").replace(/\s/g, "") === cleanAadhaar &&
        (admin.pan || "").trim().toUpperCase() === cleanPan &&
        (admin.dob || "").trim().toLowerCase() === cleanDob
      ) {
        record = admin;
        tokenIdentifier = cleanEmail;
      }
    } else if (role === "user") {
      const { identifier } = req.body;

      if (!identifier) {
        return res.status(400).json({ message: "Account Number is required for verification." });
      }

      const cleanIdentifier = String(identifier).trim();
      const account = await Account.findOne({ accNo: cleanIdentifier });
      if (
        account &&
        account.status === "active" &&
        (account.fullName || "").trim().toLowerCase() === cleanName &&
        (account.email || "").trim().toLowerCase() === cleanEmail &&
        (account.mobile || "").replace(/\D/g, "") === cleanPhone
      ) {
        record = account;
        tokenIdentifier = cleanIdentifier;
      }
    } else {
      return res.status(400).json({ message: "Invalid role specified." });
    }

    // Deliberately generic message so we never reveal which record/field
    // caused the mismatch to someone who isn't an actual ZeroBank customer/admin.
    if (!record) {
      return res.status(404).json({
        message:
          "We couldn't verify those details against our records. Please double-check the information and try again.",
      });
    }

    const verificationToken = jwt.sign(
      { role, identifier: tokenIdentifier, purpose: "forgot-password-verified" },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    return res.status(200).json({
      message: "Identity verified successfully. You may now submit your request.",
      verificationToken,
    });
  } catch (err) {
    console.error("Forgot password verification error:", err);
    return res.status(500).json({ message: "Server error during verification. Please try again." });
  }
};

/* ===========================================================
   FORGOT PASSWORD — STEP 2: SEND VERIFIED REQUEST
   Requires the short-lived token issued by
   verifyForgotPasswordIdentity above. Requests without a valid,
   unexpired token are rejected, so this step can never be
   reached by someone who hasn't been verified as an existing
   ZeroBank user/admin.
=========================================================== */
exports.sendForgotPasswordRequest = async (req, res) => {
  try {
    const { verificationToken, message } = req.body;

    if (!verificationToken) {
      return res.status(401).json({
        message: "Identity verification is required before a request can be sent.",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(verificationToken, process.env.JWT_SECRET);
    } catch (e) {
      return res.status(401).json({
        message: "Your verification has expired or is invalid. Please verify your details again.",
      });
    }

    if (decoded.purpose !== "forgot-password-verified") {
      return res.status(401).json({ message: "Invalid verification token." });
    }

    const { role, identifier } = decoded;

    let record = null;
    if (role === "admin") {
      record = await AdminUser.findOne({ email: identifier });
    } else if (role === "user") {
      record = await Account.findOne({ accNo: identifier });
    }

    if (!record) {
      return res.status(404).json({ message: "We could no longer locate your verified account record." });
    }

    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: `[ZeroBank Support] Verified Password Recovery Request (${role.toUpperCase()})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
          <h2 style="color: #0d6efd; margin-top: 0;">Verified Password Recovery Request</h2>
          <p><strong>Role:</strong> ${role === "admin" ? "Admin" : "Customer"}</p>
          <p><strong>Name:</strong> ${record.fullName}</p>
          ${
            role === "admin"
              ? `<p><strong>Admin Username:</strong> ${record.username || "N/A"}</p>
                 <p><strong>Aadhaar:</strong> ${record.aadhaar || "N/A"}</p>
                 <p><strong>PAN:</strong> ${record.pan || "N/A"}</p>
                 <p><strong>Date of Birth:</strong> ${record.dob || "N/A"}</p>`
              : `<p><strong>Account Number:</strong> ${identifier}</p>`
          }
          <p><strong>Registered Email:</strong> ${record.email}</p>
          <p><strong>Registered Phone:</strong> ${role === "admin" ? record.phone : record.mobile}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <h4 style="margin-bottom: 8px;">Message / Issue Details:</h4>
          <div style="background: #f8f9fa; padding: 14px; border-left: 4px solid #0d6efd; border-radius: 4px; white-space: pre-wrap;">
            ${message || "I forgot my password and cannot access my account. Please help me reset it."}
          </div>
        </div>
      `,
    });

    return res.status(200).json({
      message: "Your verified request has been submitted. The ZeroBank support team will contact you directly.",
    });
  } catch (error) {
    console.error("Error sending forgot password request:", error);
    return res.status(500).json({ message: "Server error sending request. Please try again later." });
  }
};
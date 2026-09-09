// back-end/controllers/adminController.js
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Account = require("../models/accountModel");
const Transaction = require("../models/transactionModel");
const AdminUsers = require("../models/adminModel");
const { sendApprovalEmail, sendRejectionEmail } = require("../utils/emailService");

async function hashPasswordIfNeeded(data) {
  const updatedData = { ...data };
  if (data.password) {
    const salt = await bcrypt.genSalt(10);
    updatedData.password = await bcrypt.hash(data.password, salt);
  }
  return updatedData;
}

const generateAccNo = () => {
  return "20" + Math.floor(10000000 + Math.random() * 90000000);
};

/* ========================================================
   APPROVE ACCOUNT (ONLY ONE DEFINITION)
======================================================== */
exports.approveAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Assign account number if missing
    if (!account.accNo) {
      account.accNo = generateAccNo();
    }

    account.status = "active";
    await account.save();

    // Check if User model entry exists
    const existingUser = await User.findOne({ email: account.email });
    let newUser = existingUser;

    if (!existingUser) {
      const username = (account.fullName || "user").replace(/\s+/g, "").toLowerCase();
      const newUserData = {
        username: username,
        email: account.email,
        password: account.password || "123456",
      };

      const hashedData = await hashPasswordIfNeeded(newUserData);
      newUser = new User(hashedData);
      await newUser.save();
    }

    // Send Approval Email to user's registered Gmail
    try {
      console.log(`[ZeroBank] Sending approval email to: ${account.email}`);
      await sendApprovalEmail(account);
      console.log(`[ZeroBank] Approval email successfully sent to: ${account.email}`);
    } catch (emailErr) {
      console.error("[ZeroBank] Error sending approval email:", emailErr);
    }

    res.status(200).json({
      message: "Account approved and login details sent via email.",
      account,
      user: newUser,
    });
  } catch (err) {
    console.error("Error approving account:", err);
    res.status(500).json({ message: "Error approving account" });
  }
};

/* ========================================================
   REJECT ACCOUNT
======================================================== */
exports.rejectAccount = async (req, res) => {
  try {
    const { reason } = req.body;

    const account = await Account.findByIdAndUpdate(
      req.params.id,
      {
        status: "rejected",
        rejectionReason: reason || "Documents could not be verified.",
      },
      { new: true }
    );

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    try {
      console.log(`[ZeroBank] Sending rejection email to: ${account.email}`);
      await sendRejectionEmail(
        account,
        reason || "Documents provided during account opening could not be verified."
      );
      console.log(`[ZeroBank] Rejection email sent to: ${account.email}`);
    } catch (emailErr) {
      console.error("[ZeroBank] Error sending rejection email:", emailErr);
    }

    res.status(200).json({
      message: "Account rejected and notification email sent to user.",
      account,
    });
  } catch (err) {
    console.error("Error rejecting account:", err);
    res.status(500).json({ message: "Error rejecting account" });
  }
};

/* ========================================================
   DASHBOARD STATS
======================================================== */
exports.getDashboardStats = async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments();
    const activeAccounts = await Account.countDocuments({ status: "active" });
    const pendingApprovals = await Account.countDocuments({ status: "pending" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const transactionsToday = await Transaction.aggregate([
      {
        $match: {
          createdAt: { $gte: today, $lt: tomorrow },
          status: "Success",
        },
      },
      {
        $group: { _id: null, totalAmount: { $sum: "$amount" } },
      },
    ]);

    const totalAmountToday =
      transactionsToday.length > 0 ? transactionsToday[0].totalAmount : 0;

    res.json({
      totalCustomers,
      activeAccounts,
      transactionsToday: totalAmountToday,
      pendingApprovals,
    });
  } catch (err) {
    console.error("Error in getDashboardStats:", err);
    res.status(500).json({ message: "Server error while fetching stats" });
  }
};

/* ========================================================
   TRANSACTIONS & ACCOUNTS
======================================================== */
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (err) {
    console.error("Error fetching accounts:", err);
    res.status(500).json({ message: "Server error while fetching accounts" });
  }
};

exports.freezeAccount = async (req, res) => {
  try {
    const account = await Account.findByIdAndUpdate(
      req.params.id,
      { status: "frozen" },
      { new: true }
    );
    if (!account) return res.status(404).json({ message: "Account not found" });

    res.status(200).json(account);
  } catch (err) {
    console.error("Error freezing account:", err);
    res.status(500).json({ message: "Error freezing account" });
  }
};

/* ========================================================
   ADMIN PROFILE & PASSWORD
======================================================== */
exports.changeAdminPassword = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await AdminUsers.findById(adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    await admin.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error changing admin password:", err);
    res.status(500).json({ message: "Server error while changing password" });
  }
};

exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await AdminUsers.findById(req.user.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.status(200).json(admin);
  } catch (err) {
    console.error("Error fetching admin profile:", err);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
};

exports.updateAdminProfile = async (req, res) => {
  try {
    const allowedFields = [
      "fullName", "email", "phone", "dob", "gender",
      "aadhaar", "pan", "address", "image",
    ];
    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    });

    const admin = await AdminUsers.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.status(200).json({ message: "Profile updated successfully", admin });
  } catch (err) {
    console.error("Error updating admin profile:", err);
    res.status(500).json({ message: "Server error while updating profile" });
  }
};

/* ========================================================
   USER CRUD
======================================================== */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const data = await hashPasswordIfNeeded(req.body);
    const newUser = new User(data);
    await newUser.save();
    res.json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updateData = await hashPasswordIfNeeded(req.body);
    await User.findByIdAndUpdate(req.params.id, updateData);
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
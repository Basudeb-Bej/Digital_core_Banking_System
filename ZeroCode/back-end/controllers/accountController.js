// back-end/controllers/accountController.js
const Account = require("../models/accountModel");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const PDFDocument = require("pdfkit");
const Transaction = require("../models/transactionModel");

const generateAccountNumber = async () => {
  let accNo;
  let exists = true;

  while (exists) {
    accNo = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    exists = await Account.findOne({ accNo });
  }

  return accNo;
};

const createAccount = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobile,
      aadhaar,
      pan,
      accountType,
      state,
      city,
      password,
      language,
      consent,
      gender,
    } = req.body;

    // 1. Validate required text fields
    if (!fullName || !email || !mobile || !password || !gender || !state || !city) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }

    // 2. Sanitize and validate length/format
    const cleanMobile = String(mobile || "").replace(/\D/g, ""); // digits only
    const cleanAadhaar = String(aadhaar || "").replace(/\s/g, ""); // strip spaces
    const cleanPan = String(pan || "").trim().toUpperCase();

    if (cleanMobile.length !== 10) {
      return res.status(400).json({ message: "Mobile number must be exactly 10 digits." });
    }
    if (cleanAadhaar.length !== 12) {
      return res.status(400).json({ message: "Aadhaar number must be exactly 12 digits." });
    }
    if (cleanPan.length !== 10) {
      return res.status(400).json({ message: "PAN number must be exactly 10 characters." });
    }

    // 3. Extract uploaded files
    const aadhaardoc = req.files?.aadhaardoc?.[0]?.filename || null;
    const pandoc = req.files?.pandoc?.[0]?.filename || null;
    const signature = req.files?.signature?.[0]?.filename || null;
    const photo = req.files?.photo?.[0]?.filename || "";

    if (!aadhaardoc || !pandoc || !signature) {
      return res.status(400).json({
        message: "Please upload all mandatory documents (Aadhaar, PAN, and Signature).",
      });
    }

    // 4. Pre-check for duplicate records to avoid 500 error
    const duplicateCheck = await Account.findOne({
      $or: [
        { email: email.toLowerCase().trim() },
        { mobile: cleanMobile },
        { aadhaar: cleanAadhaar },
        { pan: cleanPan },
      ],
    });

    if (duplicateCheck) {
      if (duplicateCheck.email === email.toLowerCase().trim()) {
        return res.status(400).json({ message: "An account with this Email already exists." });
      }
      if (duplicateCheck.mobile === cleanMobile) {
        return res.status(400).json({ message: "An account with this Mobile Number already exists." });
      }
      if (duplicateCheck.aadhaar === cleanAadhaar) {
        return res.status(400).json({ message: "An account with this Aadhaar Number already exists." });
      }
      if (duplicateCheck.pan === cleanPan) {
        return res.status(400).json({ message: "An account with this PAN Number already exists." });
      }
    }

    // 5. Generate Account Number and Hash Password
    const accNo = await generateAccountNumber();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAccount = new Account({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      mobile: cleanMobile,
      aadhaar: cleanAadhaar,
      aadhaardoc: `/uploads/${aadhaardoc}`,
      pan: cleanPan,
      pandoc: `/uploads/${pandoc}`,
      accountType: accountType || "Savings",
      state,
      city,
      signature: `/uploads/${signature}`,
      photo: photo ? `/uploads/${photo}` : "",
      language: language || "English",
      consent: consent === "true" || consent === true,
      status: "pending",
      accNo,
      password: hashedPassword,
      gender,
      balance: 0,
    });

    await newAccount.save();

    return res.status(201).json({
      message: "Account application submitted successfully!",
      accNo,
    });
  } catch (err) {
    console.error("Account creation failed:", err);

    // Specific handler for MongoDB Duplicate Key (E11000)
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || "field";
      return res.status(400).json({
        message: `An account with this ${field.toUpperCase()} already exists in our system.`,
      });
    }

    // Specific handler for Mongoose Validation Errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    return res.status(500).json({ message: "Server error creating account. Please try again." });
  }
};

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({
      status: { $in: ["pending", "active", "frozen"] },
    }).sort({ createdAt: -1 });

    res.status(200).json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ message: "Failed to fetch accounts" });
  }
};

const getPendingAccounts = async (req, res) => {
  try {
    const pending = await Account.find({ status: "pending" }).sort({
      createdAt: -1,
    });

    res.status(200).json(pending);
  } catch (error) {
    console.error("Error fetching pending accounts:", error);
    res.status(500).json({ message: "Failed to fetch pending accounts" });
  }
};

const approveAccount = async (req, res) => {
  try {
    const acc = await Account.findById(req.params.id);
    if (!acc) return res.status(404).json({ message: "Account not found" });

    acc.status = "active";
    await acc.save();

    res.status(200).json({ message: "Account approved successfully" });
  } catch (error) {
    console.error("Error approving account:", error);
    res.status(500).json({ message: "Failed to approve account" });
  }
};

const freezeAccount = async (req, res) => {
  try {
    const acc = await Account.findById(req.params.id);
    if (!acc) return res.status(404).json({ message: "Account not found" });

    acc.status = "frozen";
    await acc.save();

    res.status(200).json({ message: "Account frozen successfully" });
  } catch (error) {
    console.error("Error freezing account:", error);
    res.status(500).json({ message: "Failed to freeze account" });
  }
};

const getAccountByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    const account = await Account.findOne({ email }).select("-password");

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (account.status !== "active") {
      return res.status(403).json({ message: "Account not active" });
    }

    res.json(account);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const downloadStatement = async (req, res) => {
  try {
    const { accNo } = req.params;

    // Fetch account
    const account = await Account.findOne({ accNo });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Fetch SUCCESS transactions related to this account
    const transactions = await Transaction.find({
      status: "Success",
      $or: [
        { recipientAccount: accNo },     // Credit
        { senderId: account._id.toString() } // Debit
      ]
    }).sort({ createdAt: -1 });

    // Create PDF
    const doc = new PDFDocument({ margin: 40, size: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=statement-${accNo}.pdf`
    );

    doc.pipe(res);

    // ===== HEADER =====
    doc.fontSize(18).text("ZeroBank Account Statement", { align: "center" });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Account Holder: ${account.fullName}`);
    doc.text(`Account Number: ${account.accNo}`);
    doc.text(`Email: ${account.email}`);
    doc.text(`Current Balance: ₹${account.balance}`);
    doc.moveDown();

    // ===== TABLE HEADER =====
    doc.font("Helvetica-Bold");
    doc.text("Date                              Type         Amount          Description");
    doc.moveDown(0.5);
    doc.font("Helvetica");

    // ===== TRANSACTIONS =====
    transactions.forEach(tx => {
      doc.text(
        `${tx.createdAt.toDateString()}         ${tx.type.padEnd(6)}        ₹${tx.amount}                 ${tx.description || "-"}`
      );
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate statement" });
  }
};

const getAccountByAccNo = async (req, res) => {
  try {
    const rawAccNo = String(req.params.accNo).trim();

    // Check if account exists
    const account = await Account.findOne({
      $or: [{ accNo: rawAccNo }, { accNo: Number(rawAccNo) || 0 }],
    }).select("fullName accNo status");

    if (!account) {
      return res.status(404).json({
        message: `Account number ${rawAccNo} was not found in bank records.`,
      });
    }

    if (account.status !== "active") {
      return res.status(400).json({
        message: `Account ${rawAccNo} is currently '${account.status}' and cannot receive transfers.`,
      });
    }

    res.status(200).json({
      account: {
        fullName: account.fullName,
        accNo: account.accNo,
        status: account.status,
      },
    });
  } catch (error) {
    console.error("Error fetching account by number:", error);
    res.status(500).json({ message: "Server error fetching account" });
  }
};

module.exports = {
  createAccount,
  getAllAccounts,
  getPendingAccounts,
  approveAccount,
  freezeAccount,
  getAccountByEmail,
  downloadStatement,
  getAccountByAccNo
};

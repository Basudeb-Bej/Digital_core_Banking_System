// back-end/routes/accountRoutes.js 
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const {
  createAccount,
  getPendingAccounts,
  getAccountByEmail,
  downloadStatement,
  getAccountByAccNo,
  getAllAccounts
} = require("../controllers/accountController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.post(
  "/accounts",
  upload.fields([
    { name: "aadhaardoc", maxCount: 1 },
    { name: "pandoc", maxCount: 1 },
    { name: "signature", maxCount: 1 },
    { name: "photo", maxCount: 1 },
  ]),
  createAccount
);

// 1. Static and specific routes FIRST
router.get("/accounts", getAllAccounts);
router.get("/admin/accounts/pending", getPendingAccounts);
router.get("/accounts/email/:email", getAccountByEmail);
router.get("/accounts/:accNo/statement", downloadStatement);

// 2. Wildcard parameter route LAST
router.get("/accounts/:accNo", getAccountByAccNo);

module.exports = router;
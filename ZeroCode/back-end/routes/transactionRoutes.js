// routes/transactionRoutes.js
const express = require("express");
const router = express.Router();
const { transferFunds, getRecentTransactions, getDeposits, getWithdrawals, getDepositHistory, getWithdrawalHistory } = require("../controllers/transactionController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

router.post("/transfer", transferFunds);
router.get("/recent/:userId", getRecentTransactions);

router.get("/deposits/:userId", getDeposits);
router.get("/withdrawals/:userId", getWithdrawals);

router.get("/admin/deposits", verifyToken, requireRole("admin"), getDepositHistory);
router.get("/admin/withdrawals", verifyToken, requireRole("admin"), getWithdrawalHistory);

module.exports = router;
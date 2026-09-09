// back-end/routes/adminRoutes.js
const express = require("express");
const {
  getAllAccounts,
  getAllTransactions,
  approveAccount,
  rejectAccount,
  freezeAccount,
  getDashboardStats,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  changeAdminPassword,
  getAdminProfile,
  updateAdminProfile,
} = require("../controllers/adminController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(verifyToken, requireRole("admin"));

// ==============================
// Admin account management
// ==============================
router.get("/accounts", getAllAccounts);
router.get("/admin/transactions", getAllTransactions);
router.post("/accounts/:id/approve", approveAccount);
router.post("/accounts/:id/reject", rejectAccount);
router.post("/accounts/:id/freeze", freezeAccount);
router.get("/dashboard-stats", getDashboardStats);
router.put("/change-password", changeAdminPassword);

// ==============================
// Admin profile
// ==============================
router.get("/profile", getAdminProfile);
router.put("/profile", updateAdminProfile);

// ==============================
// User management routes
// ==============================
router.get("/users", getUsers);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
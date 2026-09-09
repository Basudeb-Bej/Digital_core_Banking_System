// back-end/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminUser = require("../models/adminModel");
const User = require("../models/accountModel");

const loginUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "Missing username, password or role" });
  }

  try {
    let userDoc;

    if (role === "admin") {
      userDoc = await AdminUser.findOne({ username });
    } else if (role === "user") {
      userDoc = await User.findOne({ accNo: username });
    } else {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    if (!userDoc) {
      return res.status(404).json({ message: `${role} not found` });
    }

    const isMatch = await bcrypt.compare(password, userDoc.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: userDoc._id, role: role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.status(200).json({
      message: `${role} login successful`,
      token,
      redirectUrl: role === "admin" ? "/adminDashboard" : "/userDashboard",
      user: {
        id: userDoc._id,
        username: userDoc.username || userDoc.accNo,
        email: userDoc.email || "",
        fullName: userDoc.fullName || "",
        role: role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginUser };
// back-end/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectdb = require('./config/db');
const adminRoutes = require("./routes/adminRoutes");
const accountRoutes = require("./routes/accountRoutes");
//const employeeRoutes = require("./routes/employeeRoutes");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
//app.use('/uploads', express.static('uploads')); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectdb();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", adminRoutes);
app.use("/api", accountRoutes);
//app.use("/api/employees", employeeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Banking System");
});

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

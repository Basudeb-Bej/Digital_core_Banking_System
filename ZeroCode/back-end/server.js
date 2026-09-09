// back-end/server.js

// --- PERMANENT RENDER IPV6 FIX START ---
const dns = require('dns');
const os = require('os');

// 1. Force Node's lookup to prefer IPv4
dns.setDefaultResultOrder('ipv4first');

// 2. Hide IPv6 interfaces so Nodemailer's internal checks disable IPv6 entirely
const originalNetworkInterfaces = os.networkInterfaces;
os.networkInterfaces = () => {
  const interfaces = originalNetworkInterfaces.call(os);
  for (const name of Object.keys(interfaces)) {
    interfaces[name] = interfaces[name].filter(
      (iface) => iface.family !== 'IPv6' && iface.family !== 6
    );
  }
  return interfaces;
};

// 3. Block c-ares IPv6 queries (forces fallback to IPv4)
dns.resolve6 = (hostname, options, callback) => {
  const cb = typeof options === 'function' ? options : callback;
  const err = new Error(`queryAaaa ENODATA ${hostname}`);
  err.code = 'ENODATA';
  return cb(err, []);
};
if (dns.promises && dns.promises.resolve6) {
  dns.promises.resolve6 = async () => {
    const err = new Error('queryAaaa ENODATA');
    err.code = 'ENODATA';
    throw err;
  };
}
// --- PERMANENT RENDER IPV6 FIX END ---

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});








// // back-end/server.js
// const dns = require('dns');
// dns.setDefaultResultOrder('ipv4first');
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// dotenv.config();
// const connectdb = require('./config/db');
// const adminRoutes = require("./routes/adminRoutes");
// const accountRoutes = require("./routes/accountRoutes");
// //const employeeRoutes = require("./routes/employeeRoutes");
// const userRoutes = require("./routes/userRoutes");
// const transactionRoutes = require("./routes/transactionRoutes");
// const path = require("path");

// const app = express();
// const port = process.env.PORT || 8000;

// app.use(cors());
// app.use(express.json({ limit: "100mb" }));
// app.use(express.urlencoded({ limit: "100mb", extended: true }));
// //app.use('/uploads', express.static('uploads')); 
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// connectdb();

// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/admin", adminRoutes);
// app.use("/api", accountRoutes);
// //app.use("/api/employees", employeeRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/transactions", transactionRoutes);

// app.get("/", (req, res) => {
//   res.send("Welcome to the Banking System");
// });

// app.use(express.json({ limit: "100mb" }));
// app.use(express.urlencoded({ limit: "100mb", extended: true }));

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

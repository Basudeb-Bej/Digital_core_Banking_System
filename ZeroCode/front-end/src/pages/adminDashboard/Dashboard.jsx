// front-end/src/pages/adminDashboard/Dashboard.jsx
import { useEffect, useState } from "react";
import adminApi from "../../api/adminApi";
import {
  FaUsers,
  FaUniversity,
  FaMoneyBillWave,
  FaFileInvoice,
  FaCogs,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeAccounts: 0,
    transactionsToday: 0,
    pendingApprovals: 0,
  });

  const [username, setUsername] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (!role || role !== "admin" || !token) {
      alert("Access denied. Please log in as Admin.");
      navigate("/");
      return;
    }

    setUsername(storedUsername || "Admin");
  }, [navigate]);

  useEffect(() => {
    adminApi
      .get("/dashboard-stats")
      .then((res) => setStats(res.data))
      .catch((err) => {
        console.error("Error fetching stats:", err);
      });
  }, []);

  useEffect(() => {
    adminApi
      .get("/admin/transactions")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 4 Cards instead of 5
  const statCards = [
    {
      id: "users",
      title: "Total Customers",
      value: stats.totalCustomers,
      icon: <FaUsers className="text-primary fs-5" />,
    },
    {
      id: "accounts",
      title: "Active Accounts",
      value: stats.activeAccounts,
      icon: <FaUniversity className="text-success fs-5" />,
    },
    {
      id: "transactions",
      title: "Transactions Today",
      value: `₹${Number(stats.transactionsToday || 0).toLocaleString()}`,
      icon: <FaMoneyBillWave className="text-warning fs-5" />,
    },
    {
      id: "pending",
      title: "Pending Approvals",
      value: stats.pendingApprovals,
      icon: <FaFileInvoice className="text-danger fs-3" />,
    },
  ];

  const quickActions = [
    {
      id: "manageUsers",
      title: "Manage Users",
      icon: <FaUsers />,
      path: "/adminDashboard/ManageUsers",
    },
    {
      id: "manageAccounts",
      title: "Manage Accounts",
      icon: <FaUniversity />,
      path: "/adminDashboard/accounts/ViewAccounts",
    },
    {
      id: "systemSettings",
      title: "System Settings",
      icon: <FaCogs />,
      path: "/adminDashboard/settings",
    },
  ];

  return (
    <div
      className="container mt-4 py-4"
      style={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="fw-bold mb-1">Welcome back, {username}!</h2>
          <p className="text-muted mb-0">
            Monitor bank operations and manage users efficiently.
          </p>
        </div>
      </div>

      {/* Stats Cards (4 Columns) */}
      <div className="row g-3 mb-4">
        {statCards.map((stat) => (
          <div key={stat.id} className="col-6 col-md-3">
            <div className="card shadow-sm rounded-4 p-3 text-center h-100">
              <div className="mb-1">{stat.icon}</div>
              <h6 className="fw-semibold">{stat.title}</h6>
              <p className="fs-4 fw-bold mb-0">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="fw-bold mb-3">Quick Actions</h3>
      <div className="row g-3 mb-4">
        {quickActions.map((action) => (
          <div key={action.id} className="col-6 col-md-3">
            <button
              className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2 py-4"
              onClick={() => action.path && navigate(action.path)}
            >
              {action.icon} {action.title}
            </button>
          </div>
        ))}
      </div>

      <h3 className="fw-bold mb-3">View Transactions / Alerts</h3>
      <div className="card shadow-sm p-3 rounded-4">
        <table className="table table-striped mb-0">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Name</th>
              <th>Account</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((txn) => (
                <tr key={txn._id}>
                  <td>{txn._id.slice(-6).toUpperCase()}</td>
                  <td>{txn.recipientName}</td>
                  <td>****{txn.recipientAccount.slice(-4)}</td>
                  <td>₹{txn.amount.toLocaleString()}</td>
                  <td
                    className={
                      txn.status === "Success"
                        ? "text-success"
                        : txn.status === "Failed"
                        ? "text-danger"
                        : "text-warning"
                    }
                  >
                    {txn.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
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

  const statCards = [
    {
      id: "users",
      title: "Total Customers",
      value: stats.totalCustomers,
      icon: <FaUsers className="text-primary fs-5" />,
      bg: "rgba(13, 110, 253, 0.1)",
    },
    {
      id: "accounts",
      title: "Active Accounts",
      value: stats.activeAccounts,
      icon: <FaUniversity className="text-success fs-5" />,
      bg: "rgba(25, 135, 84, 0.1)",
    },
    {
      id: "transactions",
      title: "Transactions Today",
      value: `₹${Number(stats.transactionsToday || 0).toLocaleString()}`,
      icon: <FaMoneyBillWave className="text-warning fs-5" />,
      bg: "rgba(255, 193, 7, 0.14)",
    },
    {
      id: "pending",
      title: "Pending Approvals",
      value: stats.pendingApprovals,
      icon: <FaFileInvoice className="text-danger fs-5" />,
      bg: "rgba(220, 53, 69, 0.1)",
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
    <div className="zb-admin-dash py-4" style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <style>{`
        @keyframes zb-icon-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .zb-tabular { font-variant-numeric: tabular-nums; }
        .zb-admin-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
        }
        .zb-admin-card:hover {
          transform: translateY(-4px);
          border-color: #93c5fd;
          box-shadow: 0 12px 26px rgba(15, 23, 42, 0.08);
        }
        .zb-admin-icon-box {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.65rem;
          animation: zb-icon-float 4s ease-in-out infinite;
        }
        .zb-action-btn {
          border-radius: 14px;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .zb-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(13, 110, 253, 0.14);
        }
      `}</style>

      <div className="container py-2">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1 text-dark">Welcome back, {username}!</h2>
            <p className="text-muted mb-0">
              Monitor bank operations and manage users efficiently.
            </p>
          </div>
        </div>

        {/* Stats Cards (4 Columns) */}
        <div className="row g-3 g-md-4 mb-4 mb-md-5">
          {statCards.map((stat) => (
            <div key={stat.id} className="col-12 col-sm-6 col-lg-3">
              <div className="card zb-admin-card p-3 p-md-4 text-center h-100">
                <div className="zb-admin-icon-box" style={{ background: stat.bg }}>
                  {stat.icon}
                </div>
                <h6 className="fw-semibold text-muted mb-1">{stat.title}</h6>
                <p className="fs-3 fw-bold mb-0 text-dark zb-tabular">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <h4 className="fw-bold mb-3 text-dark">Quick Actions</h4>
        <div className="row g-3 mb-4 mb-md-5">
          {quickActions.map((action) => (
            <div key={action.id} className="col-12 col-sm-6 col-md-4">
              <button
                type="button"
                className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2 py-3 py-md-4 fw-semibold zb-action-btn bg-white"
                onClick={() => action.path && navigate(action.path)}
              >
                {action.icon} {action.title}
              </button>
            </div>
          ))}
        </div>

        <h4 className="fw-bold mb-3 text-dark">View Transactions / Alerts</h4>
        <div className="zb-admin-card overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="py-3 ps-3 text-nowrap">Transaction ID</th>
                  <th className="py-3 text-nowrap">Name</th>
                  <th className="py-3 text-nowrap">Account</th>
                  <th className="py-3 text-nowrap">Amount</th>
                  <th className="py-3 pe-3 text-nowrap">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  transactions.map((txn) => (
                    <tr key={txn._id}>
                      <td className="ps-3 font-monospace zb-tabular text-nowrap">
                        {txn._id.slice(-6).toUpperCase()}
                      </td>
                      <td className="text-nowrap">{txn.recipientName}</td>
                      <td className="font-monospace zb-tabular text-nowrap">
                        ****{txn.recipientAccount?.slice(-4)}
                      </td>
                      <td className="fw-semibold zb-tabular text-nowrap">
                        ₹{Number(txn.amount || 0).toLocaleString()}
                      </td>
                      <td
                        className={`pe-3 fw-semibold text-nowrap ${
                          txn.status === "Success"
                            ? "text-success"
                            : txn.status === "Failed"
                            ? "text-danger"
                            : "text-warning"
                        }`}
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
      </div>
    </div>
  );
}

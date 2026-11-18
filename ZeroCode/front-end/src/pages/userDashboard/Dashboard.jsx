// front-end/src/pages/userDashboard/Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  FaUniversity,
  FaWallet,
  FaCreditCard,
  FaPiggyBank,
  FaExchangeAlt,
  FaFileInvoice,
  FaUserFriends,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function UserDashboard() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    totalBalance: 0,
    monthlySpending: 0,
    todayTransactions: 0,
  });

  const [transactions, setTransactions] = useState([]);
  const [accountInfo, setAccountInfo] = useState(null);

  // Get user info from localStorage
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const fullname = localStorage.getItem("fullName");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (userId) {
      axios
        .get(`${BASE_URL}/api/users/dashboard/${userId}`)
        .then((res) => {
          setUserData({
            totalBalance: res.data.totalBalance || 0,
            monthlySpending: res.data.monthlySpending || 0,
            todayTransactions: res.data.todayTransactions || 0,
          });

          // Set account info dynamically
          setAccountInfo({
            accountType: res.data.accountType,
            balance: res.data.totalBalance,
            accNo: res.data.accNo || "1234567890",
          });
        })
        .catch((err) => console.error("Account fetch error:", err));
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`${BASE_URL}/api/transactions/recent/${userId}`)
        .then((res) => {
          setTransactions(res.data);
        })
        .catch((err) => console.error("Recent activity fetch error:", err));
    }
  }, [userId]);

  return (
    <div className="zb-dash-wrapper py-4">
      <style>{`
        .zb-dash-wrapper {
          background-color: #f8fafc;
          color: #0f172a;
          min-height: 75vh;
          overflow-x: hidden;
        }

        @keyframes zb-icon-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }

        .zb-tabular {
          font-variant-numeric: tabular-nums;
        }

        .zb-dash-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
        }

        .zb-dash-card:hover {
          transform: translateY(-4px);
          border-color: #93c5fd;
          box-shadow: 0 12px 26px rgba(15, 23, 42, 0.08);
        }

        .zb-dash-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          animation: zb-icon-float 4s ease-in-out infinite;
          transition: transform 0.22s ease;
        }

        .zb-dash-card:hover .zb-dash-icon-box {
          transform: scale(1.08) rotate(-3deg);
        }

        .zb-summary-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.22s ease;
        }

        .zb-dash-card:hover .zb-summary-icon {
          transform: scale(1.1);
        }

        .zb-table-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
          overflow: hidden;
        }
      `}</style>

      <div className="container py-2">
        {/* Header Section */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-4">
          <div>
            <h2 className="fw-bold mb-1 text-dark">Welcome back, {fullname || ""}!</h2>
            <p className="text-muted mb-0">Here’s your account overview at a glance.</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="row g-3 g-md-4 mb-4 mb-md-5">
          <div className="col-12 col-md-4">
            <div className="card zb-dash-card p-3 p-md-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="text-muted fw-semibold mb-0">Total Balance</h6>
                <span className="zb-summary-icon bg-primary bg-opacity-10 text-primary">
                  <FaWallet size={18} />
                </span>
              </div>
              <p className="fs-3 fw-bold text-dark mb-1 zb-tabular">
                ₹{(userData.totalBalance || 0).toLocaleString()}
              </p>
              <small className="text-muted">Updated just now</small>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <div className="card zb-dash-card p-3 p-md-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="text-muted fw-semibold mb-0">Monthly Spending</h6>
                <span className="zb-summary-icon bg-danger bg-opacity-10 text-danger">
                  <FaCreditCard size={18} />
                </span>
              </div>
              <p className="fs-3 fw-bold text-dark mb-1 zb-tabular">
                ₹{(userData.monthlySpending || 0).toLocaleString()}
              </p>
              <small className="text-muted">Updated just now</small>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <div className="card zb-dash-card p-3 p-md-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="text-muted fw-semibold mb-0">Today Transactions</h6>
                <span className="zb-summary-icon bg-success bg-opacity-10 text-success">
                  <FaExchangeAlt size={18} />
                </span>
              </div>
              <p className="fs-3 fw-bold text-dark mb-1 zb-tabular">
                ₹{(userData.todayTransactions || 0).toLocaleString()}
              </p>
              <small className="text-muted">Updated just now</small>
            </div>
          </div>
        </div>

        {/* Account Overview */}
        <h4 className="fw-bold mb-3 text-dark">Account Overview & Quick Access</h4>
        <div className="row g-3 g-md-4 mb-4 mb-md-5">
          {/* Savings / Current Account (Dynamic) */}
          {accountInfo && accountInfo.accountType === "Savings" && (
            <div className="col-12 col-sm-6 col-lg-4">
              <div className="card text-center zb-dash-card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="zb-dash-icon-box bg-primary bg-opacity-10 text-primary mb-3">
                    <FaWallet size={24} />
                  </div>
                  <h5 className="fw-semibold text-dark">Savings Account</h5>
                  <p className="fs-5 fw-bold text-dark mb-1 zb-tabular">
                    ₹{(accountInfo.balance || 0).toLocaleString()}
                  </p>
                  <p className="text-muted small mb-2 zb-tabular">
                    ****{accountInfo.accNo.slice(-4)}
                  </p>
                </div>
                <small className="text-success fw-semibold">Active</small>
              </div>
            </div>
          )}

          {accountInfo && accountInfo.accountType === "Current" && (
            <div className="col-12 col-sm-6 col-lg-4">
              <div className="card text-center zb-dash-card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="zb-dash-icon-box bg-success bg-opacity-10 text-success mb-3">
                    <FaUniversity size={24} />
                  </div>
                  <h5 className="fw-semibold text-dark">Current Account</h5>
                  <p className="fs-5 fw-bold text-dark mb-1 zb-tabular">
                    ₹{(accountInfo.balance || 0).toLocaleString()}
                  </p>
                  <p className="text-muted small mb-2 zb-tabular">
                    ****{accountInfo.accNo.slice(-4)}
                  </p>
                </div>
                <small className="text-success fw-semibold">Active</small>
              </div>
            </div>
          )}

          {/* Services Card */}
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card text-center zb-dash-card p-4 h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="zb-dash-icon-box bg-info bg-opacity-10 text-info mb-3">
                  <FaUniversity size={24} />
                </div>
                <h5 className="fw-semibold text-dark mb-2">Banking Services</h5>
                <p className="text-muted small mb-3">Loans & Insurance</p>
              </div>

              <div className="d-flex gap-2 justify-content-center mt-auto">
                <button
                  type="button"
                  className="btn w-100 btn-outline-primary btn-sm py-2 fw-semibold"
                  onClick={() => navigate("/loan")}
                >
                  Loan
                </button>

                <button
                  type="button"
                  className="btn w-100 btn-outline-success btn-sm py-2 fw-semibold"
                  onClick={() => navigate("/insurance")}
                >
                  Insurance
                </button>
              </div>
            </div>
          </div>

          {/* Fund Transfer Card */}
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card text-center zb-dash-card p-4 h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="zb-dash-icon-box bg-warning bg-opacity-10 text-warning mb-3">
                  <FaExchangeAlt size={24} />
                </div>
                <h5 className="fw-bold text-dark mb-1">Fund Transfer</h5>
                <p className="text-muted small mb-3">
                  Send money securely to any bank account
                </p>
              </div>

              <div>
                <button
                  type="button"
                  className="btn btn-outline-warning btn-sm px-4 py-2 fw-semibold w-100"
                  onClick={() => navigate("/userDashboard/fund-transfer")}
                >
                  Transfer Now
                </button>

                <small className="text-secondary d-block mt-3">24×7 Instant Transfer</small>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <h4 className="fw-bold mb-3 text-dark">Recent Activity</h4>
        <div className="zb-table-card">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="py-3 ps-3 text-nowrap">Date</th>
                  <th className="py-3">Description</th>
                  <th className="py-3 pe-3 text-end text-nowrap">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <tr key={tx._id}>
                      <td className="ps-3 text-nowrap zb-tabular text-muted small">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </td>
                      <td className="text-dark">{tx.description || tx.recipientName}</td>
                      <td
                        className={`pe-3 text-end text-nowrap fw-semibold zb-tabular ${
                          tx.type === "Debit" ? "text-danger" : "text-success"
                        }`}
                      >
                        {tx.type === "Debit" ? "-" : "+"}₹{tx.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-muted py-4">
                      No recent activity
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

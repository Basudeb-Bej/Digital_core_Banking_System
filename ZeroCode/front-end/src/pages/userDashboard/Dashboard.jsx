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
import { useNavigate } from "react-router-dom"; // make sure to import this

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
  const role = localStorage.getItem("role"); // ADD THIS LINE

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8000/api/users/dashboard/${userId}`)
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
            accNo: res.data.accNo || "1234567890" // fallback if accNo not returned
          });
        })
        .catch((err) => console.error("Account fetch error:", err));
    }
  }, [userId]);


  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8000/api/transactions/recent/${userId}`)
        .then((res) => {
          setTransactions(res.data);
        })
        .catch((err) =>
          console.error("Recent activity fetch error:", err)
        );
    }
  }, [userId]);

  return (
    <div className="container mt-4 py-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="fw-bold mb-1">
            Welcome back, {fullname}!
          </h2>
          <p className="text-muted mb-0">
            Here’s your account overview at a glance.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card text-center shadow-sm rounded-4 text-dark p-3">
            <h5>Total Balance</h5>
            <p className="fs-4 fw-bold">
              ₹{(userData.totalBalance || 0).toLocaleString()}
            </p>
            <small>Updated just now</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow-sm rounded-4 text-dark p-3">
            <h5>Monthly Spending</h5>
            <p className="fs-4 fw-bold">
              ₹{(userData.monthlySpending || 0).toLocaleString()}
            </p>
            <small>Updated just now</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow-sm rounded-4 text-dark p-3">
            <h5>Today Transactions</h5>
            <p className="fs-4 fw-bold">
              ₹{(userData.todayTransactions || 0).toLocaleString()}
            </p>
            <small>Updated just now</small>
          </div>
        </div>
      </div>

      {/* Account Overview */}
      <h3 className="fw-bold mb-3">Account Overview & Quick Access</h3>
      <div className="row g-3 mb-4">

        {/* Savings / Current Account (Dynamic) */}
        {accountInfo && accountInfo.accountType === "Savings" && (
          <div className="col-md-3">
            <div className="card text-center shadow-sm rounded-4 p-3">
              <FaWallet className="text-primary fs-3 mb-2" />
              <h5 className="fw-semibold">Savings Account</h5>
              <p className="fw-bold">
                ₹{accountInfo.balance.toLocaleString()}
              </p>
              <p className="text-muted mb-1">
                ****{accountInfo.accNo.slice(-4)}
              </p>
              <small className="text-secondary">Active</small>
            </div>
          </div>
        )}

        {accountInfo && accountInfo.accountType === "Current" && (
          <div className="col-md-3">
            <div className="card text-center shadow-sm rounded-4 p-3">
              <FaUniversity className="text-success fs-3 mb-2" />
              <h5 className="fw-semibold">Current Account</h5>
              <p className="fw-bold">
                ₹{accountInfo.balance.toLocaleString()}
              </p>
              <p className="text-muted mb-1">
                ****{accountInfo.accNo.slice(-4)}
              </p>
              <small className="text-secondary">Active</small>
            </div>
          </div>
        )}

        {/* Services Card */}
        <div className="col-md-3">
          <div className="card text-center shadow-sm rounded-4 p-3 h-100 d-flex flex-column">
            <FaUniversity className="text-info fs-3 mb-2" />
            <h5 className="fw-semibold mb-2">Banking Services</h5>

            <p className="text-muted mb-3">Loans & Insurance</p>

            <div className="d-flex gap-2 justify-content-center mt-auto">
              <button
                className="btn w-100 btn-outline-primary btn-sm"
                onClick={() => navigate("/loan")}
              >
                Loan
              </button>

              <button
                className="btn w-100 btn-outline-success btn-sm"
                onClick={() => navigate("/insurance")}
              >
                Insurance
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm rounded-4 p-3 h-100">
            <FaExchangeAlt className="text-warning fs-3" />
            <h5 className="fw-bold mb-1">Fund Transfer</h5>
  
            <p className="text-muted small mb-3">
              Send money securely to any bank account
            </p>

            <button
              className="btn btn-outline-warning btn-sm px-4 mt-auto"
              onClick={() => navigate("/userDashboard/fund-transfer")}
            >
              Transfer Now
            </button>

            <small className="text-secondary d-block mt-3">
              24×7 Instant Transfer
            </small>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <h3 className="fw-bold mb-3">Recent Activity</h3>
      <div className="card shadow-sm p-3 rounded-4">
        <table className="table table-striped mb-0">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr key={tx._id}>
                  <td>{new Date(tx.createdAt).toLocaleDateString()}</td>
                  <td>{tx.description || tx.recipientName}</td>
                  <td className={tx.type === "Debit" ? "text-danger" : "text-success"}>
                    {tx.type === "Debit" ? "-" : "+"}₹{tx.amount.toLocaleString()}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No recent activity
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

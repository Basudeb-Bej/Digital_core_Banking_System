// front-end/src/pages/userDashboard/FundTransfer.jsx
import React, { useState } from "react";
import { FaUser, FaWallet, FaRupeeSign, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { Card, Button, Alert } from "react-bootstrap";
import axios from "axios";

export default function FundTransfer() {
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientAccount: "",
    amount: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const senderAccNo = localStorage.getItem("username");

  const lookupAccount = async (accNo) => {
    const cleanAcc = String(accNo).trim();
    if (!cleanAcc || cleanAcc.length < 10) return;

    if (cleanAcc === senderAccNo) {
      setFormData((prev) => ({ ...prev, recipientName: "" }));
      setMessage({
        type: "danger",
        text: "You cannot transfer funds to your own account.",
      });
      return;
    }

    try {
      setVerifying(true);
      setMessage({ type: "", text: "" });

      const res = await axios.get(`http://localhost:8000/api/accounts/${cleanAcc}`);
      const foundAccount = res.data?.account || res.data;

      if (foundAccount?.fullName) {
        setFormData((prev) => ({
          ...prev,
          recipientName: foundAccount.fullName,
        }));
        setMessage({ type: "", text: "" });
      }
    } catch (err) {
      setFormData((prev) => ({ ...prev, recipientName: "" }));
      const serverMsg =
        err.response?.data?.message ||
        `Account ${cleanAcc} does not exist or is inactive.`;
      setMessage({
        type: "danger",
        text: serverMsg,
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "recipientAccount") {
      const clean = value.trim();
      // Auto-trigger verification when 12 digits are reached
      if (clean.length === 12) {
        lookupAccount(clean);
      } else if (clean.length < 12) {
        setFormData((prev) => ({ ...prev, recipientName: "" }));
        if (message.type === "danger") setMessage({ type: "", text: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!senderAccNo) {
      return setMessage({
        type: "danger",
        text: "Session expired. Please log in again.",
      });
    }

    if (!formData.recipientName || !formData.recipientAccount || !formData.amount) {
      return setMessage({
        type: "danger",
        text: "Please enter a valid active recipient account number and amount.",
      });
    }

    if (Number(formData.amount) <= 0) {
      return setMessage({ type: "danger", text: "Amount must be greater than 0." });
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/api/transactions/transfer", {
        senderAccNo,
        ...formData,
      });

      setMessage({ type: "success", text: response.data.message });
      setFormData({
        recipientName: "",
        recipientAccount: "",
        amount: "",
        description: "",
      });
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong!";
      setMessage({ type: "danger", text: errMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 p-3">
      <Card className="shadow-sm rounded-4 p-4 border-0 bg-light">
        <Card.Header className="bg-primary text-white rounded-3 d-flex align-items-center mb-3 py-3">
          <FaWallet className="me-2 fs-5" />
          <h4 className="mb-0">Fund Transfer</h4>
        </Card.Header>

        {message.text && (
          <Alert variant={message.type} className="text-center">
            {message.text}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Recipient Account Input */}
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Recipient Account*</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><FaWallet /></span>
                <input
                  type="text"
                  name="recipientAccount"
                  placeholder="Enter 12-digit account number"
                  className="form-control"
                  value={formData.recipientAccount}
                  onChange={handleChange}
                  onBlur={() => lookupAccount(formData.recipientAccount)}
                  maxLength={12}
                  required
                />
              </div>
            </div>

            {/* Recipient Name (Auto-filled + verified badge) */}
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Recipient Name</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><FaUser /></span>
                <input
                  type="text"
                  name="recipientName"
                  placeholder={verifying ? "Checking bank records..." : "Auto-filled when account is entered"}
                  className="form-control bg-white"
                  value={formData.recipientName}
                  disabled
                />
                {verifying && (
                  <span className="input-group-text bg-white text-primary">
                    <FaSpinner className="spinner-border spinner-border-sm" />
                  </span>
                )}
                {formData.recipientName && !verifying && (
                  <span className="input-group-text bg-white text-success" title="Verified Account">
                    <FaCheckCircle />
                  </span>
                )}
              </div>
            </div>

            {/* Amount */}
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Amount (₹)*</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><FaRupeeSign /></span>
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter amount"
                  className="form-control"
                  value={formData.amount}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Description</label>
              <input
                type="text"
                name="description"
                placeholder="e.g. Rent, Grocery, Bill payment"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <Button
              type="submit"
              variant="primary"
              className="px-5 py-2 fw-semibold rounded-3"
              disabled={loading || verifying || !formData.recipientName}
            >
              {loading ? "Transferring..." : "Transfer Money"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
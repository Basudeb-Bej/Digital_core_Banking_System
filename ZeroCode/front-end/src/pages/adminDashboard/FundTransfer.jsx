// front-end/src/pages/adminDashboard/FundTransfer.jsx
import { useState } from "react";
import axios from "axios";
import { FaWallet, FaRupeeSign } from "react-icons/fa";
import Card from "react-bootstrap/Card";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function AdminFundTransfer() {
  const [formData, setFormData] = useState({
    senderAccNo: "",
    recipientName: "",
    recipientAccount: "",
    amount: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.senderAccNo || !formData.recipientAccount || !formData.amount) {
      setError("Sender account, recipient account and amount are required.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/transactions/transfer`, formData);
      alert(res.data.message);
      setFormData({ senderAccNo: "", recipientName: "", recipientAccount: "", amount: "", description: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Error creating transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <Card className="shadow rounded-4 p-3">
        <Card.Header className="bg-primary text-white rounded-top-4 d-flex align-items-center mb-3">
          <FaWallet className="me-2" />
          <h4 className="mb-0">Administrator Fund Transfer</h4>
        </Card.Header>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small">Sender Account Number</label>
              <input
                type="text"
                className="form-control"
                name="senderAccNo"
                placeholder="Enter sender account number"
                value={formData.senderAccNo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small">Recipient Account Number</label>
              <input
                type="text"
                className="form-control"
                name="recipientAccount"
                placeholder="Enter recipient account number"
                value={formData.recipientAccount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small">Recipient Name</label>
              <input
                type="text"
                className="form-control"
                name="recipientName"
                placeholder="Enter recipient name"
                value={formData.recipientName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small">Amount</label>
              <div className="input-group">
                <span className="input-group-text"><FaRupeeSign /></span>
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-12">
              <label className="form-label small">Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                placeholder="Optional description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary px-4" disabled={loading}>
              {loading ? "Processing..." : "Execute Transfer"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
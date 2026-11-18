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
      setFormData({
        senderAccNo: "",
        recipientName: "",
        recipientAccount: "",
        amount: "",
        description: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error creating transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-3 py-md-4" style={{ maxWidth: "860px" }}>
      <Card className="shadow-sm border rounded-4 p-3 p-md-4">
        <Card.Header className="bg-primary bg-gradient text-white rounded-3 d-flex align-items-center mb-3 py-3 border-0">
          <FaWallet className="me-2 fs-5" />
          <h4 className="mb-0 fw-bold">Administrator Fund Transfer</h4>
        </Card.Header>

        {error && <div className="alert alert-danger small py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label small fw-semibold">Sender Account Number</label>
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

            <div className="col-12 col-md-6">
              <label className="form-label small fw-semibold">Recipient Account Number</label>
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

            <div className="col-12 col-md-6">
              <label className="form-label small fw-semibold">Recipient Name</label>
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

            <div className="col-12 col-md-6">
              <label className="form-label small fw-semibold">Amount</label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <FaRupeeSign className="text-success" />
                </span>
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
              <label className="form-label small fw-semibold">Description</label>
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

          <div className="d-grid d-sm-flex justify-content-sm-center mt-4">
            <button
              type="submit"
              className="btn btn-primary px-5 py-2 fw-semibold rounded-3"
              disabled={loading}
            >
              {loading ? "Processing..." : "Execute Transfer"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

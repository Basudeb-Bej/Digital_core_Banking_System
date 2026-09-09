// front-end/src/pages/adminDashboard/WithdrawalHistory.jsx
import { useEffect, useState } from "react";
import adminApi from "../../api/adminApi";
import Card from "react-bootstrap/Card";
import { Form, Spinner } from "react-bootstrap";

import transactionApi from "../../api/transactionApi";

export default function AdminWithdrawalHistory() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      // const res = await adminApi.get("/transactions/admin/withdrawals");
      const res = await transactionApi.get("/admin/withdrawals");
      setWithdrawals(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching withdrawal history:", err);
      setError("Failed to fetch withdrawal history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const filteredWithdrawals = withdrawals.filter((w) =>
    w.recipientAccount?.replace(/\s+/g, "").includes(searchTerm.replace(/\s+/g, ""))
  );

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading withdrawal history...</p>
      </div>
    );
  }

  if (error) return <p className="text-danger text-center mt-3">{error}</p>;

  return (
    <div className="container mt-4">
      <Card className="shadow rounded-4 p-3">
        <Card.Header className="bg-primary text-white rounded-top-4 d-flex align-items-center justify-content-between mb-3">
          <h4 className="mb-0">Withdrawal History - Admin View</h4>

          <Form className="d-flex" style={{ maxWidth: "300px" }}>
            <Form.Control
              type="text"
              placeholder="Search by Account No."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-3"
            />
          </Form>
        </Card.Header>

        <div className="table-responsive">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Account</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredWithdrawals.length > 0 ? (
                filteredWithdrawals.map((w) => (
                  <tr key={w._id}>
                    <td>{w.senderId?.fullName || "N/A"}</td>
                    <td>****{w.recipientAccount?.slice(-4)}</td>
                    <td>₹{Number(w.amount || 0).toLocaleString()}</td>
                    <td>{new Date(w.createdAt).toLocaleDateString()}</td>
                    <td className="text-danger">{w.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-3">
                    No withdrawals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
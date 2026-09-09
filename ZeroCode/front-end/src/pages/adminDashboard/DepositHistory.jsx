// front-end/src/pages/adminDashboard/DepositHistory.jsx
import { useEffect, useState } from "react";
import adminApi from "../../api/adminApi";
import Card from "react-bootstrap/Card";
import { Form, Spinner } from "react-bootstrap";

import transactionApi from "../../api/transactionApi";

export default function AdminDepositHistory() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchDeposits = async () => {
    try {
      setLoading(true);
      // const res = await adminApi.get("/transactions/admin/deposits");
       const res = await transactionApi.get("/admin/deposits");
      setDeposits(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching deposit history:", err);
      setError("Failed to fetch deposit history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  const filteredDeposits = deposits.filter((d) =>
    d.recipientAccount?.replace(/\s+/g, "").includes(searchTerm.replace(/\s+/g, ""))
  );

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading deposit history...</p>
      </div>
    );
  }

  if (error) return <p className="text-danger text-center mt-3">{error}</p>;

  return (
    <div className="container mt-4">
      <Card className="shadow rounded-4 p-3">
        <Card.Header className="bg-primary text-white rounded-top-4 d-flex align-items-center justify-content-between mb-3">
          <h4 className="mb-0">Deposit History - Admin View</h4>

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
              {filteredDeposits.length > 0 ? (
                filteredDeposits.map((d) => (
                  <tr key={d._id}>
                    <td>{d.senderId?.fullName || "N/A"}</td>
                    <td>****{d.recipientAccount?.slice(-4)}</td>
                    <td>₹{Number(d.amount || 0).toLocaleString()}</td>
                    <td>{new Date(d.createdAt).toLocaleDateString()}</td>
                    <td className="text-success">{d.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-3">
                    No deposits found.
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
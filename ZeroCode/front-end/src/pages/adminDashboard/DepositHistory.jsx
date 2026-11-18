// front-end/src/pages/adminDashboard/DepositHistory.jsx
import { useEffect, useState } from "react";
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
      <div className="text-center mt-5 py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Loading deposit history...</p>
      </div>
    );
  }

  if (error) return <p className="text-danger text-center mt-3">{error}</p>;

  return (
    <div className="container py-3 py-md-4">
      <Card className="shadow-sm border rounded-4 p-3 p-md-4">
        <Card.Header className="bg-primary bg-gradient text-white rounded-3 d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-2 mb-3 py-3 border-0">
          <h4 className="mb-0 fw-bold">Deposit History - Admin View</h4>

          <Form className="d-flex w-100" style={{ maxWidth: "300px" }}>
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
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="text-nowrap">Customer</th>
                <th className="text-nowrap">Account</th>
                <th className="text-nowrap">Amount</th>
                <th className="text-nowrap">Date</th>
                <th className="text-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeposits.length > 0 ? (
                filteredDeposits.map((d) => (
                  <tr key={d._id}>
                    <td className="text-nowrap fw-semibold">{d.senderId?.fullName || "N/A"}</td>
                    <td className="font-monospace text-nowrap" style={{ fontVariantNumeric: "tabular-nums" }}>
                      ****{d.recipientAccount?.slice(-4)}
                    </td>
                    <td className="fw-semibold text-nowrap" style={{ fontVariantNumeric: "tabular-nums" }}>
                      ₹{Number(d.amount || 0).toLocaleString()}
                    </td>
                    <td className="text-nowrap" style={{ fontVariantNumeric: "tabular-nums" }}>
                      {new Date(d.createdAt).toLocaleDateString()}
                    </td>
                    <td className="text-success fw-semibold text-nowrap">{d.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
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

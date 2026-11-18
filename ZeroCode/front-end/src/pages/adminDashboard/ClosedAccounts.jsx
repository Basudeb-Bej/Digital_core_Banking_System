// front-end/src/pages/adminDashboard/ClosedAccounts.jsx
import React, { useEffect, useState } from "react";
import adminApi from "../../api/adminApi";
import { Table, Spinner, InputGroup, Form, Badge } from "react-bootstrap";
import { FaUserSlash, FaSearch } from "react-icons/fa";

export default function ClosedAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchClosedAccounts = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("/accounts");

      // Filter for rejected, closed, and frozen accounts
      const closedAndRejected = res.data.filter(
        (acc) =>
          acc.status === "rejected" ||
          acc.status === "closed" ||
          acc.status === "frozen" ||
          acc.status === "freeze"
      );

      setAccounts(closedAndRejected);
    } catch (err) {
      console.error("Error fetching closed/rejected accounts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClosedAccounts();
  }, []);

  const filteredAccounts = accounts.filter((acc) => {
    const term = searchTerm.toLowerCase();
    return (
      acc.fullName?.toLowerCase().includes(term) ||
      acc.email?.toLowerCase().includes(term) ||
      acc.mobile?.toString().includes(term) ||
      acc.status?.toLowerCase().includes(term) ||
      acc.rejectionReason?.toLowerCase().includes(term)
    );
  });

  const renderStatusBadge = (status) => {
    switch (status) {
      case "rejected":
        return <Badge bg="danger">Rejected</Badge>;
      case "closed":
        return <Badge bg="secondary">Closed</Badge>;
      case "frozen":
      case "freeze":
        return (
          <Badge bg="warning" text="dark">
            Frozen
          </Badge>
        );
      default:
        return <Badge bg="dark">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5 py-5">
        <Spinner animation="border" variant="danger" />
        <p className="mt-2 text-muted">Loading accounts...</p>
      </div>
    );
  }

  return (
    <div className="container py-3 py-md-4">
      <style>{`
        .zb-admin-table-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);
          overflow: hidden;
        }
        .zb-tabular { font-variant-numeric: tabular-nums; }
      `}</style>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <h3 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
          <FaUserSlash className="text-danger flex-shrink-0" /> Admin — Closed & Rejected Accounts
        </h3>

        <InputGroup style={{ maxWidth: "350px" }} className="w-100">
          <InputGroup.Text className="bg-white">
            <FaSearch className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search by name, email, status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      <div className="zb-admin-table-card">
        <Table striped hover responsive className="align-middle mb-0">
          <thead className="table-danger text-center">
            <tr>
              <th className="text-nowrap">#</th>
              <th className="text-nowrap">Full Name</th>
              <th className="text-nowrap">Email</th>
              <th className="text-nowrap">Mobile</th>
              <th className="text-nowrap">Account Type</th>
              <th className="text-nowrap">Status</th>
              <th className="text-nowrap">Reason / Remarks</th>
              <th className="text-nowrap">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((acc, i) => (
              <tr key={acc._id}>
                <td className="text-center zb-tabular">{i + 1}</td>
                <td className="text-center fw-semibold text-nowrap">{acc.fullName}</td>
                <td className="text-center text-nowrap">{acc.email}</td>
                <td className="text-center zb-tabular text-nowrap">{acc.mobile}</td>
                <td className="text-center text-nowrap">{acc.accountType || "Savings"}</td>
                <td className="text-center text-nowrap">{renderStatusBadge(acc.status)}</td>
                <td className="text-center small text-muted">{acc.rejectionReason || "—"}</td>
                <td className="text-center zb-tabular text-nowrap">
                  {new Date(acc.updatedAt || acc.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {filteredAccounts.length === 0 && (
        <p className="text-center text-muted mt-4">No closed or rejected accounts found.</p>
      )}
    </div>
  );
}

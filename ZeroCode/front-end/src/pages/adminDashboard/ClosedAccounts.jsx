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
        return <Badge bg="warning" text="dark">Frozen</Badge>;
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
    <div className="container mt-5">
      <h3 className="mb-4 text-center fw-bold">
        <FaUserSlash className="me-2 text-danger" /> Admin — Closed & Rejected Accounts
      </h3>

      <div className="d-flex justify-content-end mb-3">
        <InputGroup style={{ maxWidth: "350px" }}>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search by name, email, status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <Table striped bordered hover responsive className="align-middle mb-0">
          <thead className="table-danger text-center">
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Account Type</th>
              <th>Status</th>
              <th>Reason / Remarks</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((acc, i) => (
              <tr key={acc._id}>
                <td className="text-center">{i + 1}</td>
                <td className="text-center fw-semibold">{acc.fullName}</td>
                <td className="text-center">{acc.email}</td>
                <td className="text-center">{acc.mobile}</td>
                <td className="text-center">{acc.accountType || "Savings"}</td>
                <td className="text-center">{renderStatusBadge(acc.status)}</td>
                <td className="text-center small text-muted">
                  {acc.rejectionReason || "—"}
                </td>
                <td className="text-center">
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
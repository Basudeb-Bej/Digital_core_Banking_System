// front-end/src/pages/adminDashboard/ViewAccounts.jsx
import React, { useEffect, useState } from "react";
import adminApi from "../../api/adminApi";
import { Table, Spinner, Badge, InputGroup, Form } from "react-bootstrap";
import { FaUsers, FaSearch } from "react-icons/fa";

export default function AllAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllAccounts = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("/accounts");
      setAccounts(res.data);
    } catch (err) {
      console.error("Error fetching all accounts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAccounts();
  }, []);

  const validAccounts = accounts.filter((acc) =>
    ["active", "pending", "frozen"].includes(acc.status?.toLowerCase())
  );

  const filteredAccounts = validAccounts.filter((acc) => {
    const term = searchTerm.toLowerCase();
    return (
      acc.fullName?.toLowerCase().includes(term) ||
      acc.email?.toLowerCase().includes(term) ||
      acc.mobile?.includes(term) ||
      acc.status?.toLowerCase().includes(term)
    );
  });

  const statusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return <Badge bg="success">Active</Badge>;
      case "pending":
        return (
          <Badge bg="warning" text="dark">
            Pending
          </Badge>
        );
      case "frozen":
        return <Badge bg="danger">Frozen</Badge>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5 py-5">
        <Spinner animation="border" variant="primary" /> Loading...
      </div>
    );
  }

  return (
    <div className="container py-3 py-md-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <h3 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
          <FaUsers className="text-primary flex-shrink-0" /> Admin — All Accounts Overview
        </h3>

        <InputGroup style={{ maxWidth: "350px" }} className="w-100">
          <InputGroup.Text className="bg-white">
            <FaSearch className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search by name, status, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      <div className="card border shadow-sm rounded-4 overflow-hidden">
        <Table striped hover responsive className="align-middle mb-0">
          <thead className="table-dark text-center">
            <tr>
              <th className="text-nowrap">#</th>
              <th className="text-nowrap">Full Name</th>
              <th className="text-nowrap">Email</th>
              <th className="text-nowrap">Mobile</th>
              <th className="text-nowrap">Account Type</th>
              <th className="text-nowrap">Status</th>
              <th className="text-nowrap">Created On</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map((acc, i) => (
                <tr key={acc._id}>
                  <td className="text-center">{i + 1}</td>
                  <td className="text-center fw-semibold text-nowrap">{acc.fullName}</td>
                  <td className="text-center text-nowrap">{acc.email}</td>
                  <td className="text-center text-nowrap">{acc.mobile}</td>
                  <td className="text-center text-nowrap">{acc.accountType}</td>
                  <td className="text-center text-nowrap">{statusBadge(acc.status)}</td>
                  <td className="text-center text-nowrap">
                    {new Date(acc.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">
                  No accounts found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

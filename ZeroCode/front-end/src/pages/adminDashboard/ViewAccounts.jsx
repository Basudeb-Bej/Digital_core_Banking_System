//front-end/src/pages/adminDashboard/ViewAccounts.jsx
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

  const validAccounts = accounts.filter(
    (acc) =>
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

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> Loading...
      </div>
    );

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">
        <FaUsers className="me-2" /> Admin — All Accounts Overview
      </h3>

      <div className="d-flex justify-content-end mb-3">
        <InputGroup style={{ maxWidth: "350px" }}>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search by name, status, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      <Table striped bordered hover responsive className="align-middle">
        <thead className="table-dark text-center">
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Account Type</th>
            <th>Status</th>
            <th>Created On</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((acc, i) => (
              <tr key={acc._id}>
                <td className="text-center">{i + 1}</td>
                <td className="text-center">{acc.fullName}</td>
                <td className="text-center">{acc.email}</td>
                <td className="text-center">{acc.mobile}</td>
                <td className="text-center">{acc.accountType}</td>
                <td className="text-center">{statusBadge(acc.status)}</td>
                <td className="text-center">{new Date(acc.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                No accounts found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
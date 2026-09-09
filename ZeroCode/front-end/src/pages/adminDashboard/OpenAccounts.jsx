//front-end/src/pages/adminDashboard/OpenAccounts.jsx
import React, { useEffect, useState } from "react";
import adminApi from "../../api/adminApi";
import { Table, Spinner, InputGroup, Form } from "react-bootstrap";
import { FaUserCheck, FaSearch } from "react-icons/fa";

export default function OpenAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOpenAccounts = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("/accounts");
      const active = res.data.filter((acc) => acc.status === "active");
      setAccounts(active);
    } catch (err) {
      console.error("Error fetching open accounts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpenAccounts();
  }, []);

  const filteredAccounts = accounts.filter((acc) => {
    const term = searchTerm.toLowerCase();
    return (
      acc.fullName?.toLowerCase().includes(term) ||
      acc.email?.toLowerCase().includes(term) ||
      acc.mobile?.includes(term) ||
      acc.accountType?.toLowerCase().includes(term)
    );
  });

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /> Loading...</div>;

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">
        <FaUserCheck className="me-2" /> Admin — Active Accounts
      </h3>

      <div className="d-flex justify-content-end mb-3">
        <InputGroup style={{ maxWidth: "350px" }}>
          <InputGroup.Text><FaSearch /></InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      <Table striped bordered hover responsive className="align-middle">
        <thead className="table-success text-center">
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Account Type</th>
            <th>Approved On</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.map((acc, i) => (
            <tr key={acc._id}>
              <td className="text-center">{i + 1}</td>
              <td className="text-center">{acc.fullName}</td>
              <td className="text-center">{acc.email}</td>
              <td className="text-center">{acc.mobile}</td>
              <td className="text-center">{acc.accountType}</td>
              <td className="text-center">{new Date(acc.updatedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {filteredAccounts.length === 0 && (
        <p className="text-center text-muted mt-3">No open accounts found</p>
      )}
    </div>
  );
}
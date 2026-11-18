// front-end/src/pages/adminDashboard/OpenAccounts.jsx
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

  if (loading) {
    return (
      <div className="text-center mt-5 py-5">
        <Spinner animation="border" variant="success" /> Loading...
      </div>
    );
  }

  return (
    <div className="container py-3 py-md-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <h3 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
          <FaUserCheck className="text-success flex-shrink-0" /> Admin — Active Accounts
        </h3>

        <InputGroup style={{ maxWidth: "350px" }} className="w-100">
          <InputGroup.Text className="bg-white">
            <FaSearch className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      <div className="card border shadow-sm rounded-4 overflow-hidden">
        <Table striped hover responsive className="align-middle mb-0">
          <thead className="table-success text-center">
            <tr>
              <th className="text-nowrap">#</th>
              <th className="text-nowrap">Full Name</th>
              <th className="text-nowrap">Email</th>
              <th className="text-nowrap">Mobile</th>
              <th className="text-nowrap">Account Type</th>
              <th className="text-nowrap">Approved On</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((acc, i) => (
              <tr key={acc._id}>
                <td className="text-center">{i + 1}</td>
                <td className="text-center fw-semibold text-nowrap">{acc.fullName}</td>
                <td className="text-center text-nowrap">{acc.email}</td>
                <td className="text-center text-nowrap">{acc.mobile}</td>
                <td className="text-center text-nowrap">{acc.accountType}</td>
                <td className="text-center text-nowrap">
                  {new Date(acc.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {filteredAccounts.length === 0 && (
        <p className="text-center text-muted mt-3">No open accounts found</p>
      )}
    </div>
  );
}

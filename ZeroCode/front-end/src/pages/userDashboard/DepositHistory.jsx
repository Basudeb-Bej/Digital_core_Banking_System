// front-end/src/pages/userDashboard/DepositHistory.jsx
import React, { useEffect, useState } from "react";
import { Card, Table, Form, InputGroup, Badge } from "react-bootstrap";
import { FaSearch, FaUserCheck, FaCoins } from "react-icons/fa";
import axios from "axios";

export default function DepositHistory() {
  const [deposits, setDeposits] = useState([]);
  const [searchAcc, setSearchAcc] = useState("");
  const [searchedName, setSearchedName] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8000/api/transactions/deposits/${userId}`)
        .then((res) => setDeposits(res.data))
        .catch((err) => console.error(err));
    }
  }, [userId]);

  // Lookup account name if searching by account number
  const handleAccountSearch = async (accNo) => {
    setSearchAcc(accNo);
    const clean = accNo.trim();
    if (clean.length >= 10) {
      try {
        const res = await axios.get(`http://localhost:8000/api/accounts/${clean}`);
        const acc = res.data?.account || res.data;
        setSearchedName(acc?.fullName || "Account not found");
      } catch {
        setSearchedName("Account not found");
      }
    } else {
      setSearchedName("");
    }
  };

  const filtered = deposits.filter((item) => {
    if (!searchAcc) return true;
    return (
      item.recipientAccount?.includes(searchAcc) ||
      item.recipientName?.toLowerCase().includes(searchAcc.toLowerCase())
    );
  });

  return (
    <div className="container py-4">
      <Card className="shadow-sm border-0 rounded-4 p-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
          <h4 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
            <FaCoins className="text-success" /> Deposit History
          </h4>

          {/* Search Account Number & Display Holder Name */}
          <div style={{ minWidth: "280px" }}>
            <InputGroup size="sm">
              <InputGroup.Text className="bg-white"><FaSearch /></InputGroup.Text>
              <Form.Control
                placeholder="Search Account No."
                value={searchAcc}
                onChange={(e) => handleAccountSearch(e.target.value)}
              />
            </InputGroup>
            {searchedName && (
              <small className="text-success fw-semibold mt-1 d-block">
                <FaUserCheck className="me-1" /> {searchedName}
              </small>
            )}
          </div>
        </div>

        <div className="table-responsive">
          <Table hover className="align-middle">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Account Holder</th>
                <th>Account No.</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item._id}>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="fw-semibold text-dark">{item.recipientName || "Self / Deposit"}</td>
                    <td><span className="font-monospace text-muted">{item.recipientAccount || "-"}</span></td>
                    <td className="text-success fw-bold">+₹{Number(item.amount).toLocaleString("en-IN")}</td>
                    <td><Badge bg="success">Success</Badge></td>
                    <td>{item.description || "Cash Deposit"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No deposit records found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
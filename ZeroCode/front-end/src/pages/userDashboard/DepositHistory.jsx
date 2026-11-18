// front-end/src/pages/userDashboard/DepositHistory.jsx
import React, { useEffect, useState } from "react";
import { Card, Table, Form, InputGroup, Badge } from "react-bootstrap";
import { FaSearch, FaUserCheck, FaCoins } from "react-icons/fa";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function DepositHistory() {
  const [deposits, setDeposits] = useState([]);
  const [searchAcc, setSearchAcc] = useState("");
  const [searchedName, setSearchedName] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`${BASE_URL}/api/transactions/deposits/${userId}`)
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
        const res = await axios.get(`${BASE_URL}/api/accounts/${clean}`);
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
    <div className="container py-3 py-md-4">
      <style>{`
        @keyframes zb-coin-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .zb-history-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);
        }
        .zb-coin-icon {
          animation: zb-coin-bounce 3s ease-in-out infinite;
        }
        .zb-tabular {
          font-variant-numeric: tabular-nums;
        }
        .zb-search-wrap {
          width: 100%;
          max-width: 300px;
        }
        @media (max-width: 575.98px) {
          .zb-search-wrap {
            max-width: 100%;
          }
        }
      `}</style>

      <Card className="zb-history-card p-3 p-md-4">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-3 gap-3">
          <h4 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
            <FaCoins className="text-success zb-coin-icon" /> Deposit History
          </h4>

          {/* Search Account Number & Display Holder Name */}
          <div className="zb-search-wrap">
            <InputGroup size="sm">
              <InputGroup.Text className="bg-white">
                <FaSearch className="text-muted" />
              </InputGroup.Text>
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
          <Table hover className="align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="text-nowrap">Date</th>
                <th className="text-nowrap">Account Holder</th>
                <th className="text-nowrap">Account No.</th>
                <th className="text-nowrap">Amount</th>
                <th className="text-nowrap">Status</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item._id}>
                    <td className="text-nowrap zb-tabular text-muted small">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="fw-semibold text-dark text-nowrap">
                      {item.recipientName || "Self / Deposit"}
                    </td>
                    <td className="text-nowrap">
                      <span className="font-monospace text-muted zb-tabular">
                        {item.recipientAccount || "-"}
                      </span>
                    </td>
                    <td className="text-success fw-bold text-nowrap zb-tabular">
                      +₹{Number(item.amount).toLocaleString("en-IN")}
                    </td>
                    <td className="text-nowrap">
                      <Badge bg="success">Success</Badge>
                    </td>
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

// front-end/src/pages/userDashboard/Accounts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Badge, Spinner, Alert } from "react-bootstrap";
import {
  FaRegCreditCard,
  FaUniversity,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaDownload,
  FaCopy,
  FaPhoneAlt,
  FaEnvelope,
  FaUser,
  FaCity
} from "react-icons/fa";

export default function AccountDetails() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const email = localStorage.getItem("email") || localStorage.getItem("username");

  useEffect(() => {
    if (!email) {
      setError("No user credentials found. Please log in again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:8000/api/accounts/email/${email}`)
      .then((res) => {
        setAccount(res.data);
        setError("");
      })
      .catch(() => {
        // Fallback: try by account number if email lookup failed
        axios
          .get(`http://localhost:8000/api/accounts/${email}`)
          .then((res) => {
            setAccount(res.data.account || res.data);
            setError("");
          })
          .catch(() => setError("Account details not found for: " + email));
      })
      .finally(() => setLoading(false));
  }, [email]);

  const copyAccountNumber = () => {
    if (account?.accNo) {
      navigator.clipboard.writeText(account.accNo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadStatement = async () => {
    if (!account?.accNo) return;
    try {
      setDownloading(true);
      const res = await axios.get(
        `http://localhost:8000/api/accounts/${account.accNo}/statement`,
        { responseType: "blob" }
      );

      if (res.data.size === 0) {
        alert("No transactions found.");
        return;
      }

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `statement-${account.accNo}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to download account statement.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Loading account information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <Alert variant="danger" className="text-center">{error}</Alert>
      </div>
    );
  }

  const details = [
    { icon: <FaUser />, label: "Full Name", value: account.fullName || "N/A" },
    { icon: <FaEnvelope />, label: "Email Address", value: account.email || "N/A" },
    { icon: <FaPhoneAlt />, label: "Mobile Number", value: account.mobile || "N/A" },
    { icon: <FaUniversity />, label: "Account Type", value: account.accountType || "Savings" },
    { icon: <FaCity />, label: "City", value: account.city || "N/A" },
    { icon: <FaMapMarkerAlt />, label: "State", value: account.state || "N/A" },
    {
      icon: <FaCalendarAlt />,
      label: "Opening Date",
      value: account.createdAt ? new Date(account.createdAt).toLocaleDateString() : "N/A"
    },
    {
      icon: account.status === "active" ? <FaCheckCircle /> : <FaTimesCircle />,
      label: "Account Status",
      value: (
        <Badge bg={account.status === "active" ? "success" : "danger"} className="text-uppercase px-2 py-1">
          {account.status}
        </Badge>
      )
    }
  ];

  return (
    <div className="container py-4">
      {/* Visual Bank Card & Balance Header */}
      <div className="row g-4 mb-4">
        {/* Virtual Card Preview */}
        <div className="col-lg-6">
          <div
            className="p-4 rounded-4 shadow text-white d-flex flex-column justify-content-between position-relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0d6efd 0%, #002b66 100%)",
              minHeight: "210px"
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-bold fs-5 tracking-wide">ZeroBank</span>
              <Badge bg={account.status === "active" ? "success" : "warning"}>
                {account.accountType || "Debit"}
              </Badge>
            </div>

            <div className="my-3">
              <small className="text-white-50">Account Number</small>
              <div className="d-flex align-items-center gap-2">
                <h4 className="font-monospace mb-0 letter-spacing-1">
                  {account.accNo ? account.accNo.replace(/(\d{4})/g, "$1 ").trim() : "•••• •••• ••••"}
                </h4>
                <Button
                  variant="link"
                  className="text-white p-0"
                  onClick={copyAccountNumber}
                  title="Copy Account Number"
                >
                  <FaCopy size={16} />
                </Button>
                {copied && <span className="small text-warning">Copied!</span>}
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-end">
              <div>
                <small className="text-white-50">Account Holder</small>
                <div className="fw-semibold text-uppercase">{account.fullName}</div>
              </div>
              <div className="text-end">
                <small className="text-white-50">Status</small>
                <div className="fw-semibold text-capitalize">{account.status}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Balance Banner */}
        <div className="col-lg-6">
          <Card className="h-100 shadow-sm border-0 rounded-4 p-4 d-flex flex-column justify-content-between bg-light">
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted fw-semibold">Available Balance</span>
                <span className="p-2 rounded-circle bg-primary bg-opacity-10 text-primary">
                  <FaRupeeSign size={20} />
                </span>
              </div>
              <h1 className="display-6 fw-bold text-dark my-2">
                ₹{Number(account.balance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </h1>
              <p className="small text-muted mb-0">
                Primary Account • {account.accNo}
              </p>
            </div>

            <div className="pt-3">
              <Button
                variant="primary"
                className="w-100 d-flex align-items-center justify-content-center gap-2 py-2 rounded-3"
                onClick={downloadStatement}
                disabled={downloading}
              >
                {downloading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Generating...
                  </>
                ) : (
                  <>
                    <FaDownload /> Download Account Statement
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Account Profile Information Grid */}
      <Card className="shadow-sm border-0 rounded-4 p-4">
        <h5 className="fw-bold mb-3 text-dark">Detailed Information</h5>
        <div className="row g-3">
          {details.map((item, i) => (
            <div key={i} className="col-md-6">
              <div className="d-flex align-items-center p-3 rounded-3 border bg-white shadow-xs">
                <div
                  className="d-flex justify-content-center align-items-center rounded-circle me-3 text-primary"
                  style={{ width: "45px", height: "45px", backgroundColor: "#e7f1ff" }}
                >
                  <span className="fs-5">{item.icon}</span>
                </div>
                <div>
                  <small className="text-muted d-block">{item.label}</small>
                  <div className="fw-semibold text-dark">{item.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
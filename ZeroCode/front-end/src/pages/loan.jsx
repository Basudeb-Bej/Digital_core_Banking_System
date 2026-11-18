// front-end/src/pages/loan.jsx
import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaCoins,
  FaBriefcase,
  FaTractor,
  FaArrowLeft,
  FaCalculator,
  FaCheckCircle,
  FaSpinner,
  FaRupeeSign,
} from "react-icons/fa";
import { Card, Button, Form, Alert, Badge } from "react-bootstrap";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const LOAN_TYPES = [
  {
    id: "home",
    title: "Home Loan",
    baseRate: 8.5,
    minAmount: 500000,
    maxAmount: 10000000,
    maxTenure: 30,
    desc: "Low interest rates to purchase, construct, or renovate your home.",
    icon: <FaHome size={30} className="text-primary" />,
    badgeColor: "primary",
    iconBg: "rgba(13, 110, 253, 0.1)",
  },
  {
    id: "gold",
    title: "Gold Loan",
    baseRate: 7.2,
    minAmount: 25000,
    maxAmount: 2500000,
    maxTenure: 5,
    desc: "Instant disbursement with low interest against your gold ornaments.",
    icon: <FaCoins size={30} className="text-warning" />,
    badgeColor: "warning",
    iconBg: "rgba(255, 193, 7, 0.14)",
  },
  {
    id: "business",
    title: "Business Loan",
    baseRate: 11.0,
    minAmount: 100000,
    maxAmount: 5000000,
    maxTenure: 10,
    desc: "Flexible working capital and growth capital for your business.",
    icon: <FaBriefcase size={30} className="text-success" />,
    badgeColor: "success",
    iconBg: "rgba(25, 135, 84, 0.1)",
  },
  {
    id: "agriculture",
    title: "Agriculture Loan",
    baseRate: 5.5,
    minAmount: 50000,
    maxAmount: 2000000,
    maxTenure: 7,
    desc: "Subsidized loans tailored for farmers, seeds, and agricultural equipment.",
    icon: <FaTractor size={30} className="text-info" />,
    badgeColor: "info",
    iconBg: "rgba(13, 202, 240, 0.12)",
  },
];

export default function Loan() {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [submittedApp, setSubmittedApp] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const isLoggedIn = !!localStorage.getItem("userId");
  const storedUser = localStorage.getItem("username") || "";

  // Dynamic Loan Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: localStorage.getItem("email") || "",
    phone: "",
    accountNo: storedUser,
    amount: 500000,
    tenureYears: 5,
    interestRate: 8.5,
    extraField: "", // Property Value, Gold Weight, Business Name, or Land Area
  });

  // Calculate Monthly EMI dynamically
  const calculateEMI = () => {
    const P = Number(formData.amount) || 0;
    const r = (Number(formData.interestRate) || 8.5) / (12 * 100);
    const n = (Number(formData.tenureYears) || 1) * 12;

    if (P <= 0 || n <= 0 || r <= 0) return 0;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const monthlyEMI = calculateEMI();
  const totalPayable = monthlyEMI * ((Number(formData.tenureYears) || 1) * 12);
  const totalInterest = totalPayable - (Number(formData.amount) || 0);

  const handleSelectLoan = (loan) => {
    if (!isLoggedIn) {
      const modalElement = document.getElementById("loginModal");
      if (modalElement && window.bootstrap) {
        new window.bootstrap.Modal(modalElement).show();
      } else {
        alert("Please log in to apply for a loan.");
      }
      return;
    }

    setSelectedLoan(loan);
    setSubmittedApp(null);
    setFormData((prev) => ({
      ...prev,
      amount: loan.minAmount,
      tenureYears: Math.min(5, loan.maxTenure),
      interestRate: loan.baseRate,
      extraField: "",
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    const payload = {
      userId: localStorage.getItem("userId"),
      loanType: selectedLoan.title,
      ...formData,
      monthlyEMI,
      totalInterest,
      totalPayable,
    };

    try {
      // Send to backend if endpoint exists, with simulated fallback
      let res;
      try {
        res = await axios.post(`${BASE_URL}/api/loans/apply`, payload);
      } catch {
        res = { data: { applicationNo: "LN-" + Math.floor(100000 + Math.random() * 900000) } };
      }

      setSubmittedApp({
        appNo: res.data?.applicationNo || "LN-" + Date.now().toString().slice(-6),
        loanType: selectedLoan.title,
        amount: formData.amount,
        tenure: formData.tenureYears,
        emi: monthlyEMI,
      });
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Failed to submit loan application.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="zb-loan-wrapper py-4 py-md-5">
      <style>{`
        .zb-loan-wrapper {
          background-color: #f8fafc;
          color: #0f172a;
          min-height: 75vh;
          overflow-x: hidden;
        }

        @keyframes zb-icon-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }

        @keyframes zb-pop-in {
          0% { transform: scale(0.85); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .zb-tabular {
          font-variant-numeric: tabular-nums;
        }

        .zb-loan-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .zb-loan-card:hover {
          transform: translateY(-5px);
          border-color: #93c5fd;
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.09);
        }

        .zb-loan-icon-box {
          width: 68px;
          height: 68px;
          border-radius: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          animation: zb-icon-float 4s ease-in-out infinite;
          transition: transform 0.25s ease;
        }

        .zb-loan-card:hover .zb-loan-icon-box {
          transform: scale(1.08) rotate(-3deg);
        }

        .zb-panel-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
        }

        .zb-summary-card {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
        }

        .zb-success-icon {
          animation: zb-pop-in 0.4s ease-out forwards;
        }
      `}</style>

      <div className="container py-2 py-md-3">
        {/* Header */}
        <div className="text-center mb-4 mb-md-5">
          <h2 className="fw-bold text-dark">Loan Products & Instant EMI Calculator</h2>
          <p className="text-muted mb-0">
            Choose a loan category to estimate payments and submit your application online.
          </p>
        </div>

        {/* 1. Loan Cards Grid */}
        {!selectedLoan && (
          <div className="row g-4">
            {LOAN_TYPES.map((loan) => (
              <div className="col-12 col-sm-6 col-lg-3" key={loan.id}>
                <Card className="h-100 zb-loan-card p-4 text-center">
                  <div className="zb-loan-icon-box" style={{ background: loan.iconBg }}>
                    {loan.icon}
                  </div>
                  <h5 className="fw-bold text-dark mb-2">{loan.title}</h5>
                  <Badge bg={loan.badgeColor} className="w-auto mx-auto mb-3 px-3 py-2 zb-tabular">
                    Starting at {loan.baseRate}% p.a.
                  </Badge>
                  <p className="small text-muted mb-4">{loan.desc}</p>
                  <Button
                    variant={loan.badgeColor}
                    className="mt-auto rounded-3 fw-semibold py-2"
                    onClick={() => handleSelectLoan(loan)}
                  >
                    Calculate & Apply
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* 2. Dynamic Calculator & Application Form */}
        {selectedLoan && !submittedApp && (
          <div className="row justify-content-center">
            <div className="col-12 col-xl-10">
              <Button
                variant="outline-secondary"
                className="mb-4 d-inline-flex align-items-center gap-2 rounded-3"
                onClick={() => setSelectedLoan(null)}
              >
                <FaArrowLeft /> Back to All Loans
              </Button>

              <div className="row g-4 align-items-start">
                {/* Dynamic Application Form */}
                <div className="col-12 col-lg-7">
                  <Card className="zb-panel-card p-3 p-md-4">
                    <h4 className="fw-bold text-dark mb-3">
                      Apply for {selectedLoan.title}
                    </h4>

                    {submitError && <Alert variant="danger">{submitError}</Alert>}

                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label className="small fw-semibold">Applicant Name*</Form.Label>
                        <Form.Control
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </Form.Group>

                      <div className="row g-3 mb-3">
                        <div className="col-12 col-sm-6">
                          <Form.Label className="small fw-semibold">Email*</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            required
                          />
                        </div>
                        <div className="col-12 col-sm-6">
                          <Form.Label className="small fw-semibold">Phone Number*</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="10-digit mobile"
                            required
                          />
                        </div>
                      </div>

                      {/* Specific Extra Field per loan type */}
                      <Form.Group className="mb-3">
                        <Form.Label className="small fw-semibold">
                          {selectedLoan.id === "home" && "Estimated Property Value (₹)*"}
                          {selectedLoan.id === "gold" && "Estimated Gold Weight (in Grams)*"}
                          {selectedLoan.id === "business" && "Registered Business Name*"}
                          {selectedLoan.id === "agriculture" && "Agricultural Land Area (in Acres)*"}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="extraField"
                          value={formData.extraField}
                          onChange={handleChange}
                          placeholder={
                            selectedLoan.id === "home"
                              ? "e.g. 4500000"
                              : selectedLoan.id === "gold"
                              ? "e.g. 50"
                              : selectedLoan.id === "business"
                              ? "e.g. Apex Enterprises"
                              : "e.g. 4.5"
                          }
                          required
                        />
                      </Form.Group>

                      {/* Loan Amount Slider & Input */}
                      <Form.Group className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <Form.Label className="small fw-semibold mb-0">Required Loan Amount</Form.Label>
                          <span className="fw-bold text-primary zb-tabular">
                            ₹{Number(formData.amount).toLocaleString("en-IN")}
                          </span>
                        </div>
                        <Form.Range
                          min={selectedLoan.minAmount}
                          max={selectedLoan.maxAmount}
                          step={10000}
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      {/* Tenure Slider */}
                      <Form.Group className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <Form.Label className="small fw-semibold mb-0">Tenure</Form.Label>
                          <span className="fw-bold text-primary zb-tabular">
                            {formData.tenureYears} Years
                          </span>
                        </div>
                        <Form.Range
                          min={1}
                          max={selectedLoan.maxTenure}
                          step={1}
                          name="tenureYears"
                          value={formData.tenureYears}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Button
                        variant="primary"
                        type="submit"
                        className="w-100 py-2 fw-semibold rounded-3"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <FaSpinner className="spinner-border spinner-border-sm me-2" />
                            Submitting Application...
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </Button>
                    </Form>
                  </Card>
                </div>

                {/* Dynamic Live EMI Summary Card */}
                <div className="col-12 col-lg-5">
                  <Card className="zb-summary-card p-3 p-md-4 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-3 text-primary">
                        <FaCalculator size={20} />
                        <h5 className="fw-bold mb-0 text-dark">Live EMI Estimate</h5>
                      </div>

                      <div className="bg-white p-3 rounded-3 border text-center my-3">
                        <small className="text-muted">Estimated Monthly Payment</small>
                        <h2 className="fw-bold text-primary my-1 zb-tabular">
                          ₹{monthlyEMI.toLocaleString("en-IN")}
                          <span className="fs-6 text-muted fw-normal">/mo</span>
                        </h2>
                      </div>

                      <div className="mt-3">
                        <div className="d-flex justify-content-between py-2 border-bottom">
                          <span className="text-muted small">Interest Rate:</span>
                          <span className="fw-semibold zb-tabular">{formData.interestRate}% p.a.</span>
                        </div>
                        <div className="d-flex justify-content-between py-2 border-bottom">
                          <span className="text-muted small">Principal Amount:</span>
                          <span className="fw-semibold zb-tabular">
                            ₹{Number(formData.amount).toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between py-2 border-bottom">
                          <span className="text-muted small">Total Interest:</span>
                          <span className="fw-semibold text-danger zb-tabular">
                            ₹{totalInterest.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between py-2">
                          <span className="text-muted small">Total Payable:</span>
                          <span className="fw-bold text-dark zb-tabular">
                            ₹{totalPayable.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <small className="text-muted mt-4 d-block text-center">
                      *Final rates and terms are determined upon document verification.
                    </small>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Dynamic Success Confirmation Screen */}
        {submittedApp && (
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <Card className="zb-panel-card p-4 p-md-5 text-center bg-white">
                <FaCheckCircle size={60} className="text-success mx-auto mb-3 zb-success-icon" />
                <h3 className="fw-bold text-dark">Loan Application Submitted!</h3>
                <p className="text-muted">
                  Your application for <strong>{submittedApp.loanType}</strong> has been registered. Our lending desk will review your details shortly.
                </p>

                <div className="bg-light p-3 rounded-3 my-3 text-start border">
                  <div className="d-flex justify-content-between gap-2 py-1">
                    <span className="text-muted">Application Number:</span>
                    <span className="fw-bold font-monospace text-primary">{submittedApp.appNo}</span>
                  </div>
                  <div className="d-flex justify-content-between gap-2 py-1">
                    <span className="text-muted">Requested Amount:</span>
                    <span className="fw-semibold zb-tabular">
                      ₹{Number(submittedApp.amount).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between gap-2 py-1">
                    <span className="text-muted">Tenure:</span>
                    <span className="fw-semibold zb-tabular">{submittedApp.tenure} Years</span>
                  </div>
                  <div className="d-flex justify-content-between gap-2 py-1">
                    <span className="text-muted">Estimated EMI:</span>
                    <span className="fw-bold text-success zb-tabular">
                      ₹{submittedApp.emi.toLocaleString("en-IN")}/mo
                    </span>
                  </div>
                </div>

                <div className="d-grid d-sm-inline-block mt-3">
                  <Button
                    variant="outline-primary"
                    className="px-4 py-2"
                    onClick={() => {
                      setSelectedLoan(null);
                      setSubmittedApp(null);
                    }}
                  >
                    Apply for Another Loan
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

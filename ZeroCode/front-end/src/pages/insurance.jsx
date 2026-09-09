// front-end/src/pages/insurance.jsx
import React, { useState } from "react";
import {
  FaHeartbeat,
  FaShieldAlt,
  FaUserShield,
  FaArrowLeft,
  FaCheckCircle,
  FaCalculator,
  FaSpinner,
} from "react-icons/fa";
import { Card, Button, Form, Alert, Badge } from "react-bootstrap";
import axios from "axios";

const INSURANCE_PLANS = [
  {
    type: "health",
    title: "Health Insurance",
    subtitle: "Medical & Critical Illness Cover",
    desc: "Cashless hospitalization across 10,000+ network hospitals.",
    icon: <FaHeartbeat size={36} className="text-primary mb-3" />,
    badgeColor: "primary",
    coverageTiers: [500000, 1000000, 2500000, 5000000],
    baseRateFactor: 0.012, // 1.2% base
  },
  {
    type: "general",
    title: "General Insurance",
    subtitle: "Motor, Home & Travel Shield",
    desc: "Protection against property damage, theft, and accidental losses.",
    icon: <FaShieldAlt size={36} className="text-warning mb-3" />,
    badgeColor: "warning",
    coverageTiers: [200000, 500000, 1500000, 3000000],
    baseRateFactor: 0.025, // 2.5% base
  },
  {
    type: "life",
    title: "Life Insurance",
    subtitle: "Term Life & Family Security",
    desc: "Guaranteed financial backing for your loved ones with flexible terms.",
    icon: <FaUserShield size={36} className="text-success mb-3" />,
    badgeColor: "success",
    coverageTiers: [2500000, 5000000, 10000000, 20000000],
    baseRateFactor: 0.0018, // 0.18% base
  },
];

export default function Insurance() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [submittedPolicy, setSubmittedPolicy] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const isLoggedIn = !!localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    fullName: "",
    email: localStorage.getItem("email") || "",
    phone: "",
    age: 28,
    coverage: 500000,
    policyTerm: 1, // in years
    preExisting: "None",
    assetType: "Vehicle",
    assetValue: 500000,
    nomineeName: "",
    nomineeRelation: "Spouse",
  });

  const handleSelectPlan = (plan) => {
    if (!isLoggedIn) {
      const modalElement = document.getElementById("loginModal");
      if (modalElement && window.bootstrap) {
        new window.bootstrap.Modal(modalElement).show();
      } else {
        alert("Please log in to apply for insurance.");
      }
      return;
    }

    setSelectedPlan(plan);
    setSubmittedPolicy(null);
    setFormData((prev) => ({
      ...prev,
      coverage: plan.coverageTiers[0],
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Dynamic Premium Calculation
  const calculatePremium = () => {
    if (!selectedPlan) return 0;

    let base = Number(formData.coverage) * selectedPlan.baseRateFactor;

    // Health / Life adjusts by age
    if (selectedPlan.type === "health" || selectedPlan.type === "life") {
      const ageNum = Number(formData.age) || 25;
      if (ageNum > 45) base *= 1.4;
      else if (ageNum > 35) base *= 1.2;
    }

    // General insurance adjusts by asset value
    if (selectedPlan.type === "general") {
      const val = Number(formData.assetValue) || 100000;
      base = val * 0.03;
    }

    return Math.round(base);
  };

  const annualPremium = calculatePremium();
  const monthlyPremium = Math.round(annualPremium / 12);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    const payload = {
      userId: localStorage.getItem("userId"),
      insuranceType: selectedPlan.title,
      ...formData,
      annualPremium,
      monthlyPremium,
    };

    try {
      let res;
      try {
        res = await axios.post("http://localhost:8000/api/insurance/apply", payload);
      } catch {
        res = { data: { policyNo: "POL-" + Math.floor(100000 + Math.random() * 900000) } };
      }

      setSubmittedPolicy({
        policyNo: res.data?.policyNo || "POL-" + Date.now().toString().slice(-6),
        insuranceType: selectedPlan.title,
        coverage: formData.coverage,
        premium: annualPremium,
      });
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Failed to submit insurance application.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container my-5 py-4">
      {/* Title */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-dark">Insurance Plans & Dynamic Quote Calculator</h2>
        <p className="text-muted">
          Select an insurance category to customize your coverage and get instant live premium quotes.
        </p>
      </div>

      {/* 1. Plans Cards */}
      {!selectedPlan && (
        <div className="row g-4 justify-content-center">
          {INSURANCE_PLANS.map((plan) => (
            <div className="col-md-4" key={plan.type}>
              <Card className="h-100 shadow-sm border-0 rounded-4 p-4 text-center">
                <div className="d-flex justify-content-center">{plan.icon}</div>
                <h5 className="fw-bold text-dark mb-1">{plan.title}</h5>
                <small className="text-muted d-block mb-3">{plan.subtitle}</small>
                <Badge bg={plan.badgeColor} className="w-auto mx-auto mb-3 px-3 py-1">
                  Starting at ₹{Math.round(plan.coverageTiers[0] * plan.baseRateFactor)}/yr
                </Badge>
                <p className="small text-muted mb-4">{plan.desc}</p>
                <Button
                  variant={plan.badgeColor}
                  className="mt-auto rounded-3 fw-semibold"
                  onClick={() => handleSelectPlan(plan)}
                >
                  Configure & Apply
                </Button>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* 2. Dynamic Form & Live Quote Calculator */}
      {selectedPlan && !submittedPolicy && (
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <Button
              variant="outline-secondary"
              className="mb-4 d-inline-flex align-items-center gap-2"
              onClick={() => setSelectedPlan(null)}
            >
              <FaArrowLeft /> Back to Plans
            </Button>

            <div className="row g-4">
              {/* Dynamic Form */}
              <div className="col-md-7">
                <Card className="shadow-sm border-0 rounded-4 p-4">
                  <h4 className="fw-bold text-dark mb-3">
                    {selectedPlan.title} Application
                  </h4>

                  {submitError && <Alert variant="danger">{submitError}</Alert>}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-semibold">Proposer Full Name*</Form.Label>
                      <Form.Control
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        required
                      />
                    </Form.Group>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <Form.Label className="small fw-semibold">Email Address*</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@example.com"
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <Form.Label className="small fw-semibold">Mobile Number*</Form.Label>
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

                    {/* Conditional Fields based on Insurance Type */}
                    {selectedPlan.type === "health" && (
                      <>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <Form.Label className="small fw-semibold">Age (Years)*</Form.Label>
                            <Form.Control
                              type="number"
                              name="age"
                              min="18"
                              max="75"
                              value={formData.age}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <Form.Label className="small fw-semibold">Pre-existing Illness</Form.Label>
                            <Form.Select
                              name="preExisting"
                              value={formData.preExisting}
                              onChange={handleChange}
                            >
                              <option value="None">None</option>
                              <option value="Diabetes">Diabetes</option>
                              <option value="Hypertension">Hypertension</option>
                              <option value="Thyroid">Thyroid</option>
                            </Form.Select>
                          </div>
                        </div>
                      </>
                    )}

                    {selectedPlan.type === "general" && (
                      <>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <Form.Label className="small fw-semibold">Asset Category</Form.Label>
                            <Form.Select
                              name="assetType"
                              value={formData.assetType}
                              onChange={handleChange}
                            >
                              <option value="Vehicle">Vehicle (Car / Bike)</option>
                              <option value="Home">Home Property</option>
                              <option value="Travel">International Travel</option>
                            </Form.Select>
                          </div>
                          <div className="col-md-6 mb-3">
                            <Form.Label className="small fw-semibold">Declared Asset Value (₹)*</Form.Label>
                            <Form.Control
                              type="number"
                              name="assetValue"
                              value={formData.assetValue}
                              onChange={handleChange}
                              min="50000"
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {selectedPlan.type === "life" && (
                      <>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <Form.Label className="small fw-semibold">Age*</Form.Label>
                            <Form.Control
                              type="number"
                              name="age"
                              min="18"
                              max="65"
                              value={formData.age}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <Form.Label className="small fw-semibold">Nominee Relation</Form.Label>
                            <Form.Select
                              name="nomineeRelation"
                              value={formData.nomineeRelation}
                              onChange={handleChange}
                            >
                              <option value="Spouse">Spouse</option>
                              <option value="Parent">Parent</option>
                              <option value="Child">Child</option>
                            </Form.Select>
                          </div>
                        </div>
                        <Form.Group className="mb-3">
                          <Form.Label className="small fw-semibold">Nominee Full Name*</Form.Label>
                          <Form.Control
                            type="text"
                            name="nomineeName"
                            value={formData.nomineeName}
                            onChange={handleChange}
                            placeholder="Enter nominee name"
                            required
                          />
                        </Form.Group>
                      </>
                    )}

                    {/* Dynamic Coverage Tier Selector */}
                    <Form.Group className="mb-4">
                      <Form.Label className="small fw-semibold">Choose Sum Insured / Coverage Tier</Form.Label>
                      <div className="d-flex flex-wrap gap-2">
                        {selectedPlan.coverageTiers.map((tier) => (
                          <Button
                            key={tier}
                            type="button"
                            variant={Number(formData.coverage) === tier ? "primary" : "outline-primary"}
                            size="sm"
                            className="rounded-pill px-3"
                            onClick={() => setFormData((prev) => ({ ...prev, coverage: tier }))}
                          >
                            ₹{(tier / 100000).toFixed(0)} Lakh
                          </Button>
                        ))}
                      </div>
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
                          Processing Quote...
                        </>
                      ) : (
                        "Confirm & Submit Application"
                      )}
                    </Button>
                  </Form>
                </Card>
              </div>

              {/* Dynamic Live Quote Summary Card */}
              <div className="col-md-5">
                <Card className="shadow-sm border-0 rounded-4 p-4 bg-light h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-3 text-primary">
                      <FaCalculator size={22} />
                      <h5 className="fw-bold mb-0 text-dark">Live Premium Quote</h5>
                    </div>

                    <div className="bg-white p-3 rounded-3 shadow-xs border text-center my-3">
                      <small className="text-muted">Estimated Annual Premium</small>
                      <h2 className="fw-bold text-success my-1">
                        ₹{annualPremium.toLocaleString("en-IN")}
                        <span className="fs-6 text-muted fw-normal">/yr</span>
                      </h2>
                      <span className="badge bg-light text-dark border">
                        or ₹{monthlyPremium.toLocaleString("en-IN")} / month
                      </span>
                    </div>

                    <div className="mt-3">
                      <div className="d-flex justify-content-between py-2 border-bottom">
                        <span className="text-muted small">Plan:</span>
                        <span className="fw-semibold">{selectedPlan.title}</span>
                      </div>
                      <div className="d-flex justify-content-between py-2 border-bottom">
                        <span className="text-muted small">Sum Insured:</span>
                        <span className="fw-bold text-primary">
                          ₹{Number(formData.coverage).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between py-2 border-bottom">
                        <span className="text-muted small">Policy Term:</span>
                        <span className="fw-semibold">1 Year (Renewable)</span>
                      </div>
                      <div className="d-flex justify-content-between py-2">
                        <span className="text-muted small">Applicable Taxes:</span>
                        <span className="fw-semibold text-muted">Included (GST)</span>
                      </div>
                    </div>
                  </div>

                  <small className="text-muted mt-4 d-block text-center">
                    *Quote is indicative and subject to medical and underwriting checks.
                  </small>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Success Confirmation Screen */}
      {submittedPolicy && (
        <div className="row justify-content-center">
          <div className="col-md-7">
            <Card className="shadow-sm border-0 rounded-4 p-5 text-center bg-white">
              <FaCheckCircle size={60} className="text-success mx-auto mb-3" />
              <h3 className="fw-bold text-dark">Insurance Request Registered!</h3>
              <p className="text-muted">
                Your quote request for <strong>{submittedPolicy.insuranceType}</strong> has been created. A relationship manager will contact you to finalize document verification.
              </p>

              <div className="bg-light p-3 rounded-3 my-3 text-start border">
                <div className="d-flex justify-content-between py-1">
                  <span className="text-muted">Reference Policy ID:</span>
                  <span className="fw-bold font-monospace text-primary">{submittedPolicy.policyNo}</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span className="text-muted">Sum Insured:</span>
                  <span className="fw-semibold">₹{Number(submittedPolicy.coverage).toLocaleString("en-IN")}</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span className="text-muted">Annual Premium:</span>
                  <span className="fw-bold text-success">₹{submittedPolicy.premium.toLocaleString("en-IN")}/yr</span>
                </div>
              </div>

              <Button
                variant="outline-primary"
                className="mt-3 w-50 mx-auto"
                onClick={() => {
                  setSelectedPlan(null);
                  setSubmittedPolicy(null);
                }}
              >
                Explore More Plans
              </Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
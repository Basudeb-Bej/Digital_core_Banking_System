// front-end/src/pages/home.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import img1 from "../assets/img/image1.png";
import img2 from "../assets/img/image2.png";
import img3 from "../assets/img/image3.png";
import img4 from "../assets/img/image14.png";
import img8 from "../assets/img/image15.png";
import img5 from "../assets/img/image16.png";
import img6 from "../assets/img/image17.png";
import img7 from "../assets/img/image18.png";
import img9 from "../assets/img/image19.png";
import img10 from "../assets/img/image20.png";
import img11 from "../assets/img/image21.png";
import img12 from "../assets/img/image22.png";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaPlay,
  FaPause,
  FaUniversity,
  FaEnvelope,
  FaPaperPlane,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";

function HomeCarousel() {
  const [showKnowMore, setShowKnowMore] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [contactSending, setContactSending] = useState(false);
  const [contactFeedback, setContactFeedback] = useState({ type: "", text: "" });

  const scrollToOpenAccount = () => {
    const el = document.getElementById("open-account-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactSending(true);
    setContactFeedback({ type: "", text: "" });

    try {
      const res = await axios.post("http://localhost:8000/api/users/contact", contactData);
      setContactFeedback({
        type: "success",
        text: res.data.message || "Message sent successfully to ZeroBank Support!",
      });
      setContactData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
    } catch (err) {
      setContactFeedback({
        type: "danger",
        text: err.response?.data?.message || "Failed to send message. Please try again.",
      });
    } finally {
      setContactSending(false);
    }
  };

  return (
    <>
      <style>{`
        .carousel-control-prev,
        .carousel-control-next {
          width: 6% !important;
          pointer-events: none;
        }
        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          pointer-events: auto;
          cursor: pointer;
        }
        .carousel-item {
          pointer-events: auto;
        }
        .carousel-caption {
          z-index: 15 !important;
          pointer-events: auto;
        }

        /* Prevent any modal from overflowing screen vertically */
        .modal-dialog-scrollable .modal-content {
          max-height: 88vh !important;
        }
        .modal-dialog-scrollable .modal-body {
          overflow-y: auto !important;
        }
      `}</style>

      <Carousel fade interval={3500} controls={true} indicators={true} pause="hover">
        {/* Slide 0: Small Business Loan / Know More */}
        <Carousel.Item>
          <div className="row align-items-center" style={{ minHeight: "420px" }}>
            <div className="col-lg-6 p-5" style={{ position: "relative", zIndex: 25 }}>
              <h2 className="fw-bold">
                <span className="text-primary">ZeroBank</span> Digital Banking
              </h2>
              <p className="lead">Financing Businesses, Empowering Dreams with Modern Banking.</p>
              <Button
                variant="primary"
                type="button"
                className="px-4 py-2 shadow-sm"
                style={{ position: "relative", zIndex: 30, cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowKnowMore(true);
                }}
              >
                Know more
              </Button>
            </div>

            <div className="col-lg-6 text-center" style={{ position: "relative", zIndex: 10 }}>
              <img
                src="https://shivalikbank.com/assets/upload/bannerimage/20230207064521.png"
                alt="ZeroBank Overview"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </Carousel.Item>

        {/* Slide 1: Open an Account (Scroll) */}
        <Carousel.Item>
          <img className="d-block w-100" src={img1} alt="First slide" />
          <Carousel.Caption>
            <h2 className="fw-bold">Trusted Banking Since 1990</h2>
            <p>Your security and trust are our top priorities.</p>
            <Button
              variant="primary"
              className="px-4 py-2 shadow-sm"
              style={{ position: "relative", zIndex: 30, cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scrollToOpenAccount();
              }}
            >
              Open an Account
            </Button>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Slide 2: Explore Services */}
        <Carousel.Item>
          <img className="d-block w-100" src={img2} alt="Second slide" />
          <Carousel.Caption>
            <h2 className="fw-bold">Comprehensive Financial Services</h2>
            <p>Loans, savings, and investment options tailored for you.</p>
            <Button
              href="/services"
              variant="success"
              className="px-4 py-2 shadow-sm"
              style={{ position: "relative", zIndex: 30 }}
            >
              Explore Services
            </Button>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Slide 3: Contact Us (Modal) */}
        <Carousel.Item>
          <img className="d-block w-100" src={img3} alt="Third slide" />
          <Carousel.Caption>
            <h2 className="fw-bold">Bank Anytime, Anywhere</h2>
            <p>Enjoy 24/7 support and seamless online banking.</p>
            <Button
              variant="light"
              className="text-dark px-4 py-2 shadow-sm"
              style={{ position: "relative", zIndex: 30, cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setContactFeedback({ type: "", text: "" });
                setShowContact(true);
              }}
            >
              Contact Us
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <SlideWorks />

      <div className="container my-5">
        <div className="row g-4">
          <div className="col-lg-6">
            <NoticeBar inline />
          </div>
          <div className="col-lg-6" id="open-account-section">
            <BankForm inline />
          </div>
        </div>
      </div>

      <CardSlider />

      {/* ========================================================
          1. KNOW MORE MODAL (Scrollable & Responsive)
      ======================================================== */}
      <Modal
        show={showKnowMore}
        onHide={() => setShowKnowMore(false)}
        size="lg"
        centered
        scrollable
      >
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title className="fw-bold d-flex align-items-center gap-2">
            <FaUniversity /> About ZeroBank
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <h4 className="fw-bold text-dark mb-2">Welcome to ZeroBank</h4>
          <p className="text-muted">
            Founded in 1990, <strong>ZeroBank</strong> has been delivering cutting-edge financial solutions, secure deposit accounts, and personalized customer services to empower individuals and businesses.
          </p>

          <hr className="my-3" />

          <div className="row g-3">
            <div className="col-md-6">
              <div className="p-3 border rounded-3 bg-light h-100">
                <div className="d-flex align-items-center mb-2 text-primary">
                  <FaShieldAlt className="fs-4 me-2" />
                  <h6 className="fw-bold mb-0">Bank-Grade Security</h6>
                </div>
                <p className="small text-muted mb-0">
                  Every transaction is protected with 256-bit SSL protocols, multi-layer firewalls, and active fraud detection.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 border rounded-3 bg-light h-100">
                <div className="d-flex align-items-center mb-2 text-success">
                  <FaClock className="fs-4 me-2" />
                  <h6 className="fw-bold mb-0">24×7 Instant Banking</h6>
                </div>
                <p className="small text-muted mb-0">
                  Enjoy real-time fund transfers, seamless bill payments, and statements available round the clock.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h6 className="fw-bold text-dark mb-2">What We Offer:</h6>
            <ul className="text-muted small ps-3 mb-0">
              <li>High-interest Savings and zero-hassle Current Accounts.</li>
              <li>Competitive Small Business, Personal, and Gold Loans.</li>
              <li>Instant online approval workflows and verified digital records.</li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowKnowMore(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowKnowMore(false);
              scrollToOpenAccount();
            }}
          >
            Open an Account Now
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ========================================================
          2. CONTACT US MODAL (Scrollable & Responsive)
      ======================================================== */}
      <Modal
        show={showContact}
        onHide={() => setShowContact(false)}
        centered
        scrollable
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="fw-bold d-flex align-items-center gap-2 text-primary">
            <FaEnvelope /> Contact ZeroBank Support
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleContactSubmit}>
          <Modal.Body className="p-4">
            {contactFeedback.text && (
              <Alert
                variant={contactFeedback.type}
                dismissible
                onClose={() => setContactFeedback({ type: "", text: "" })}
              >
                {contactFeedback.text}
              </Alert>
            )}

            <p className="text-muted small mb-3">
              Fill out your details and query below. An email will be sent directly to ZeroBank's support desk.
            </p>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Your Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={contactData.name}
                onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Email Address *</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={contactData.email}
                onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Mobile Number *</Form.Label>
              <Form.Control
                type="tel"
                placeholder="e.g. 9876543210"
                value={contactData.phone}
                onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                required
              />
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Topic</Form.Label>
              <Form.Select
                value={contactData.subject}
                onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Account Opening / KYC Issue">Account Opening / KYC Issue</option>
                <option value="Fund Transfer / Transaction Issue">Fund Transfer / Transaction Issue</option>
                <option value="Technical / Login Problem">Technical / Login Problem</option>
              </Form.Select>
            </Form.Group> */}

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Details / Message *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Briefly describe your issue or query..."
                value={contactData.message}
                onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowContact(false)} disabled={contactSending}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={contactSending} className="d-flex align-items-center gap-2">
              {contactSending ? (
                <>
                  <Spinner animation="border" size="sm" /> Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane /> Send Message
                </>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

function SlideWorks() {
  return (
    <div className="slide-works">
      <marquee direction="left">
        <span style={{ padding: "0 24px" }}>
          Welcome to ZeroCode Bank!, your trusted partner in financial services created by Bikash Bhanja, Arup Mandal and Basudeb Bej
        </span>
      </marquee>
    </div>
  );
}

function NoticeBar({ inline = false }) {
  const notices = [
    {
      date: "27 August 2025",
      text: "Highlight new digital services like mobile apps or UPI integration.",
      pdf: "/pdfs/abc.pdf",
    },
    {
      date: "09 June 2025",
      text: "Display latest interest rates, loan offers, and deposit schemes.",
      pdf: "/pdfs/Interest-Rates-Notice.pdf",
    },
    {
      date: "12 June 2025",
      text: "Announce important regulatory updates and compliance guidelines.",
      pdf: "/pdfs/Regulatory-Updates.pdf",
    },
    {
      date: "03 June 2025",
      text: "Share holiday schedules and working hours of branches.",
      pdf: "/pdfs/Holiday-Schedule.pdf",
    },
    {
      date: "06 June 2025",
      text: "Provide customer awareness messages on fraud prevention and security.",
      pdf: "/pdfs/Fraud-Prevention.pdf",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notices.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying, notices.length]);

  const wrapperClass = inline ? "" : "container my-5";
  const cardWidth = inline ? "100%" : "50%";

  return (
    <div className={wrapperClass}>
      <div
        className="notice-card card shadow border-0 me-auto"
        style={{
          height: "728px",
          width: cardWidth,
          borderRadius: "15px",
          background: "#2d7e90ff",
          position: "relative",
        }}
      >
        <div className="card-body text-white">
          <h5 className="fw-bold mb-3 text-warning">What's New</h5>

          <div
            className="notice-container"
            style={{
              overflow: "hidden",
              height: "630px",
              position: "relative",
            }}
          >
            <div
              className="notice-list"
              style={{
                transform: `translateY(-${currentIndex * 100}px)`,
                transition: "transform 0.6s ease-in-out",
              }}
            >
              {notices.map((notice, index) => (
                <div
                  key={index}
                  className="notice-item d-flex flex-column justify-content-center"
                  style={{
                    height: "100px",
                    cursor: "pointer",
                  }}
                  onClick={() => window.open(notice.pdf, "_blank")}
                >
                  <div className="d-flex align-items-center">
                    <span className="fw-bold me-2">{notice.date}</span>
                    <span className="badge bg-warning text-dark">NEW</span>
                  </div>
                  <p className="mt-2 mb-0">{notice.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="position-absolute top-0 end-0 m-3" style={{ zIndex: 10 }}>
            {isPlaying ? (
              <button className="btn btn-light rounded-circle" onClick={() => setIsPlaying(false)}>
                <FaPause />
              </button>
            ) : (
              <button className="btn btn-light rounded-circle" onClick={() => setIsPlaying(true)}>
                <FaPlay />
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .notice-card { width: ${cardWidth}; }
        @media (max-width: 576px) { .notice-card { width: 100%; } }
      `}</style>
    </div>
  );
}

function BankForm({ inline = false }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    aadhaar: "",
    aadhaardoc: null,
    pan: "",
    pandoc: null,
    accountType: "",
    state: "",
    city: "",
    signature: "",
    photo: "",
    language: "",
    consent: false,
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files && files[0] ? files[0] : null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("fullName", formData.fullName);
      fd.append("email", formData.email);
      fd.append("mobile", formData.mobile);
      if (formData.aadhaar) fd.append("aadhaar", formData.aadhaar);
      if (formData.pan) fd.append("pan", formData.pan);
      fd.append("accountType", formData.accountType);
      fd.append("state", formData.state);
      fd.append("city", formData.city);
      if (formData.signature) fd.append("signature", formData.signature);
      if (formData.photo) fd.append("photo", formData.photo);
      fd.append("language", formData.language);
      fd.append("consent", formData.consent ? "true" : "false");
      if (formData.aadhaardoc) fd.append("aadhaardoc", formData.aadhaardoc);
      if (formData.pandoc) fd.append("pandoc", formData.pandoc);
      fd.append("password", formData.password);
      fd.append("confirmPassword", formData.confirmPassword);
      fd.append("gender", formData.gender);

      await axios.post("http://localhost:8000/api/accounts", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Success: Account application submitted successfully.");
      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        aadhaar: "",
        aadhaardoc: null,
        pan: "",
        pandoc: null,
        accountType: "",
        state: "",
        city: "",
        signature: "",
        photo: "",
        language: "",
        consent: false,
        password: "",
        confirmPassword: "",
        gender: "",
      });
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message || "Failed to submit.";
      setMessage(`Error: ${errMsg}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={inline ? "" : "container my-5"}>
      <form className="p-4 shadow-sm rounded bg-white rounded-4" onSubmit={handleSubmit}>
        <div className="row g-3">
          <h5 className="mb-4 text-center">Open Your Account</h5>
          {message && (
            <div className={`alert ${message.startsWith("Error") ? "alert-danger" : "alert-success"}`}>{message}</div>
          )}
          <div className="col-md-6">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              className="form-control"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email ID"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Mobile Number *</label>
            <input
              type="tel"
              className="form-control"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Aadhaar Number *</label>
            <input
              type="text"
              className="form-control"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              placeholder="Aadhaar Number"
              required
              pattern="^[0-9]{12}$"
              title="Enter valid Aadhaar number (e.g. 123456789012)"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Aadhaar Document *</label>
            <input
              type="file"
              className="form-control"
              name="aadhaardoc"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">PAN Number *</label>
            <input
              type="text"
              className="form-control"
              name="pan"
              value={formData.pan}
              onChange={(e) => {
                const value = e.target.value.toUpperCase();
                setFormData({ ...formData, pan: value });
              }}
              placeholder="ABCDE1234F"
              required
              pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
              title="Enter valid PAN number (e.g. ABCDE1234F)"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">PAN Document *</label>
            <input
              type="file"
              className="form-control"
              name="pandoc"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Account Type *</label>
            <select
              className="form-select"
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              required
            >
              <option value="">--Select--</option>
              <option>Savings</option>
              <option>Current</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">State *</label>
            <select
              className="form-select"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">--State--</option>
              <option>Andhra Pradesh</option>
              <option>Arunachal Pradesh</option>
              <option>Assam</option>
              <option>Bihar</option>
              <option>Chhattisgarh</option>
              <option>Goa</option>
              <option>Gujarat</option>
              <option>Haryana</option>
              <option>Himachal Pradesh</option>
              <option>Jharkhand</option>
              <option>Karnataka</option>
              <option>Kerala</option>
              <option>Madhya Pradesh</option>
              <option>Maharashtra</option>
              <option>Manipur</option>
              <option>Meghalaya</option>
              <option>Mizoram</option>
              <option>Nagaland</option>
              <option>Odisha</option>
              <option>Punjab</option>
              <option>Rajasthan</option>
              <option>Sikkim</option>
              <option>Tamil Nadu</option>
              <option>Telangana</option>
              <option>Tripura</option>
              <option>Uttar Pradesh</option>
              <option>Uttarakhand</option>
              <option>West Bengal</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">City *</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Signature *</label>
            <input
              type="file"
              className="form-control"
              name="signature"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Photo *</label>
            <input
              type="file"
              className="form-control"
              name="photo"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Preferred Language *</label>
            <select
              className="form-select"
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
            >
              <option value="">--Preferred Language--</option>
              <option>English</option>
              <option>Hindi</option>
              <option>Bengali</option>
              <option>Other</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Gender *</label>
            <select
              className="form-select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">--Gender--</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Password *</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Confirm Password *</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          <div className="col-12">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
              />
              <label className="form-check-label">
                I authorize ZeroBank to contact me. Please fill the form, and we’ll reach out shortly.
              </label>
            </div>
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary px-5" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function CardSlider() {
  const [selectedNotice, setSelectedNotice] = useState(null);

  const notices = [
    {
      title: "Saving Account",
      description: "Secure your money while earning attractive interest. Enjoy easy online access, digital banking features, and flexible options for deposits and withdrawals to manage your finances effortlessly.",
      image: img4,
    },
    {
      title: "Current Account",
      description: "Tailored for businesses, offering seamless transactions, real-time banking, and dedicated services. Manage payments, receivables, and cash flow efficiently.",
      image: img5,
    },
    {
      title: "Home Loan",
      description: "Achieve your dream home with low-interest loans and flexible repayment options. Quick approvals and personalized plans make homeownership simple and affordable.",
      image: img6,
    },
    {
      title: "Gold Loan",
      description: "Unlock instant funds using your gold as collateral. Minimal documentation, competitive interest rates, and quick disbursement.",
      image: img7,
    },
    {
      title: "Business Loan",
      description: "Scale and grow your business with customized loan solutions. Flexible repayment terms, fast approvals, and competitive interest rates.",
      image: img8,
    },
    {
      title: "Agriculture Loan",
      description: "Support your farming activities with loans for seeds, equipment, or irrigation. Easy access, timely disbursement, and affordable interest rates.",
      image: img9,
    },
    {
      title: "Health Insurance",
      description: "Protect yourself and your family with our comprehensive health insurance plans covering hospitalization and critical illnesses.",
      image: img10,
    },
    {
      title: "General Insurance",
      description: "Safeguard your assets with reliable insurance policies against unforeseen risks.",
      image: img11,
    },
    {
      title: "Life Insurance",
      description: "Secure your family’s future with comprehensive life insurance plans.",
      image: img12,
    },
  ];

  return (
    <div className="card-slider-wrapper bg-light p-4">
      <div className="card-slider">
        {[...notices, ...notices].map((notice, i) => (
          <div key={i} className="custom-card card shadow border-0">
            <div className="card-body">
              <div className="image-wrapper">
                <img src={notice.image} alt={notice.title} />
              </div>
              <h5 className="card-title">{notice.title}</h5>
              <p className="card-text">{notice.text}</p>
              <button className="btn btn-info" onClick={() => setSelectedNotice(notice)}>
                Know More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Unified Bootstrap Modal (replaces custom conflicting markup) */}
      <Modal
        show={Boolean(selectedNotice)}
        onHide={() => setSelectedNotice(null)}
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">{selectedNotice?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-0">{selectedNotice?.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedNotice(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <style>{`
        .card-slider-wrapper {
          overflow: hidden;
          position: relative;
          width: 100%;
          max-width: 1300px;
          margin: 0 auto;
          border-radius: 20px;
        }

        @media (max-width: 576px) {
          .card-slider-wrapper {
            width: 95%;
            max-width: 100%;
            padding: 1rem;   
            border-radius: 10px;
          }
        }

        .card-slider {
          display: flex;
          gap: 1rem;
          width: max-content;
          animation: slide-left 50s linear infinite;
        }

        .custom-card {
          width: 320px; 
          flex-shrink: 0; 
          border-radius: 12px;
          padding: 10px;
        }

        .custom-card .card-body {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          text-align: center;
        }

        .image-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;
          height: 60px;
        }

        .image-wrapper img {
          max-height: 60px;
          max-width: 60px;
          object-fit: contain;
        }

        @keyframes slide-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export { SlideWorks, NoticeBar, CardSlider, BankForm };
export default HomeCarousel;
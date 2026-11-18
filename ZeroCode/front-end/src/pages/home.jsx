// front-end/src/pages/home.jsx
import React, { useState, useEffect, useRef } from "react";
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
  FaArrowRight,
  FaCheckCircle,
  FaLock,
  FaFilePdf,
  FaExternalLinkAlt,
  FaEye,
  FaEyeSlash,
  FaBullhorn,
} from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactSending(true);
    setContactFeedback({ type: "", text: "" });

    try {
      const res = await axios.post(`${BASE_URL}/api/users/contact`, contactData);
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
    <div className="zb-home-wrapper">
      <style>{`
        .zb-home-wrapper {
          background-color: #f8fafc;
          color: #0f172a;
          overflow-x: hidden;
        }

        /* =========================================================
           HERO CAROUSEL
        ========================================================= */
        .zb-hero-carousel {
          background: #0b1f3a;
        }

        .zb-hero-carousel .carousel-control-prev,
        .zb-hero-carousel .carousel-control-next {
          width: 48px !important;
          z-index: 20;
          opacity: 0.85;
        }

        .zb-hero-carousel .carousel-indicators {
          z-index: 20;
          margin-bottom: 0.75rem;
        }

        .zb-hero-slide-split {
          background: linear-gradient(135deg, #f0f6ff 0%, #ffffff 55%, #e8f1ff 100%);
          min-height: 460px;
          display: flex;
          align-items: center;
        }

        .zb-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(13, 110, 253, 0.1);
          color: #0a58ca;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          margin-bottom: 1rem;
        }

        .zb-hero-title {
          font-size: clamp(1.65rem, 3.2vw, 2.75rem);
          font-weight: 800;
          line-height: 1.18;
          letter-spacing: -0.02em;
          color: #0f172a;
        }

        .zb-hero-subtitle {
          font-size: clamp(0.95rem, 1.4vw, 1.125rem);
          color: #475569;
          line-height: 1.6;
        }

        .zb-hero-img-slide {
          position: relative;
          height: 460px;
          width: 100%;
          overflow: hidden;
        }

        .zb-hero-img-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .zb-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(9, 21, 43, 0.82) 0%,
            rgba(9, 21, 43, 0.55) 55%,
            rgba(9, 21, 43, 0.3) 100%
          );
          z-index: 5;
        }

        .zb-hero-caption {
          position: absolute;
          inset: 0;
          z-index: 15;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          text-align: left;
          padding: 2rem 4.5rem;
          max-width: 720px;
        }

        .zb-hero-caption h2 {
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .zb-hero-caption p {
          font-size: clamp(0.92rem, 1.3vw, 1.1rem);
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1.5rem;
          max-width: 520px;
        }

        .zb-btn-primary {
          border-radius: 10px;
          font-weight: 600;
          padding: 0.65rem 1.4rem;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .zb-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(13, 110, 253, 0.25);
        }

        @media (max-width: 991.98px) {
          .zb-hero-slide-split {
            min-height: auto;
            padding: 2rem 0 2.5rem;
          }
          .zb-hero-img-slide {
            height: 360px;
          }
          .zb-hero-caption {
            padding: 1.5rem 3.25rem;
          }
        }

        @media (max-width: 575.98px) {
          .zb-hero-img-slide {
            height: 300px;
          }
          .zb-hero-caption {
            padding: 1.25rem 2.75rem 2.5rem;
          }
          .zb-hero-carousel .carousel-control-prev,
          .zb-hero-carousel .carousel-control-next {
            width: 34px !important;
          }
        }

        /* =========================================================
           ANNOUNCEMENT TICKER (SLIDEWORKS)
        ========================================================= */
        .zb-ticker-bar {
          background: #0f172a;
          color: #e2e8f0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          overflow: hidden;
          height: 44px;
          font-size: 0.875rem;
        }

        .zb-ticker-label {
          background: #1d4ed8;
          color: #ffffff;
          font-weight: 700;
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0 14px;
          height: 100%;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
          z-index: 2;
        }

        .zb-ticker-track-wrap {
          flex: 1;
          overflow: hidden;
          position: relative;
        }

        .zb-ticker-track {
          display: inline-flex;
          white-space: nowrap;
          animation: zb-ticker-scroll 28s linear infinite;
        }

        .zb-ticker-bar:hover .zb-ticker-track {
          animation-play-state: paused;
        }

        @keyframes zb-ticker-scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        /* =========================================================
           MAIN SECTION CARDS (NOTICE BAR & BANK FORM)
        ========================================================= */
        .zb-surface-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
        }

        .zb-notice-card {
          background: linear-gradient(160deg, #0f2942 0%, #164e63 100%);
          color: #ffffff;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 30px rgba(15, 41, 66, 0.14);
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .zb-notice-item {
          padding: 0.9rem 1rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .zb-notice-item:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-1px);
        }

        .zb-notice-item.is-active {
          background: rgba(255, 255, 255, 0.16);
          border-color: #fbbf24;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }

        .zb-form-section-title {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #0d6efd;
          margin-top: 0.5rem;
          margin-bottom: 0.25rem;
          padding-bottom: 0.35rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .zb-input-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: #334155;
          margin-bottom: 0.35rem;
        }

        .zb-form-control {
          border-radius: 9px;
          border: 1px solid #cbd5e1;
          padding: 0.55rem 0.8rem;
          font-size: 0.9rem;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .zb-form-control:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.14);
        }

        /* =========================================================
           CARD SLIDER
        ========================================================= */
        .zb-slider-section {
          background: #ffffff;
          border-top: 1px solid #e2e8f0;
          padding: 3.5rem 0;
        }

        .zb-slider-viewport {
          overflow: hidden;
          position: relative;
          width: 100%;
          padding: 0.5rem 0 1rem;
          mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
        }

        .zb-slider-track {
          display: flex;
          gap: 1.25rem;
          width: max-content;
          animation: zb-slide-left 48s linear infinite;
        }

        .zb-slider-viewport:hover .zb-slider-track {
          animation-play-state: paused;
        }

        .zb-product-card {
          width: 300px;
          flex-shrink: 0;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .zb-product-card:hover {
          transform: translateY(-4px);
          border-color: #93c5fd;
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
        }

        .zb-product-icon-box {
          width: 64px;
          height: 64px;
          border-radius: 14px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          padding: 10px;
        }

        .zb-product-icon-box img {
          max-height: 44px;
          max-width: 44px;
          object-fit: contain;
        }

        .zb-line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 575.98px) {
          .zb-product-card {
            width: 260px;
          }
          .zb-slider-viewport {
            mask-image: none;
            -webkit-mask-image: none;
          }
        }

        @keyframes zb-slide-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Modal vertical safety */
        .modal-dialog-scrollable .modal-content {
          max-height: 88vh !important;
          border-radius: 16px;
          overflow: hidden;
        }
        .modal-dialog-scrollable .modal-body {
          overflow-y: auto !important;
        }
      `}</style>

      {/* ========================================================
          HERO CAROUSEL
      ======================================================== */}
      <Carousel
        fade
        interval={4500}
        controls={true}
        indicators={true}
        pause="hover"
        className="zb-hero-carousel"
      >
        {/* Slide 0: Split Hero / Know More */}
        <Carousel.Item>
          <div className="zb-hero-slide-split">
            <div className="container">
              <div className="row align-items-center g-4 py-3">
                <div className="col-lg-6 px-4 px-md-5 text-center text-lg-start">
                  <div className="zb-hero-badge">
                    <FaShieldAlt /> Trusted Banking Since 1990
                  </div>
                  <h1 className="zb-hero-title mb-3">
                    <span className="text-primary">ZeroBank</span> Digital Banking
                  </h1>
                  <p className="zb-hero-subtitle mb-4">
                    Financing businesses and empowering dreams with secure, 24×7 modern banking.
                  </p>
                  <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start">
                    <Button
                      variant="primary"
                      type="button"
                      className="zb-btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowKnowMore(true);
                      }}
                    >
                      Know More <FaArrowRight size={13} />
                    </Button>
                    <Button
                      variant="outline-primary"
                      type="button"
                      className="zb-btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        scrollToOpenAccount();
                      }}
                    >
                      Open Account
                    </Button>
                  </div>
                </div>

                <div className="col-lg-6 text-center px-4">
                  <img
                    src="https://shivalikbank.com/assets/upload/bannerimage/20230207064521.png"
                    alt="ZeroBank Digital Banking Overview"
                    className="img-fluid rounded-4"
                    style={{ maxHeight: "340px", objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>

        {/* Slide 1: Open an Account */}
        <Carousel.Item>
          <div className="zb-hero-img-slide">
            <img src={img1} alt="Trusted Banking Since 1990" />
            <div className="zb-hero-overlay" />
            <div className="zb-hero-caption">
              <h2>Trusted Banking Since 1990</h2>
              <p>Your security, privacy, and financial growth are our top priorities.</p>
              <Button
                variant="primary"
                className="zb-btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  scrollToOpenAccount();
                }}
              >
                Open an Account <FaArrowRight size={13} />
              </Button>
            </div>
          </div>
        </Carousel.Item>

        {/* Slide 2: Explore Services */}
        <Carousel.Item>
          <div className="zb-hero-img-slide">
            <img src={img2} alt="Comprehensive Financial Services" />
            <div className="zb-hero-overlay" />
            <div className="zb-hero-caption">
              <h2>Comprehensive Financial Services</h2>
              <p>Loans, savings, and investment options tailored to your goals.</p>
              <Button href="/services" variant="success" className="zb-btn-primary">
                Explore Services <FaArrowRight size={13} />
              </Button>
            </div>
          </div>
        </Carousel.Item>

        {/* Slide 3: Contact Us */}
        <Carousel.Item>
          <div className="zb-hero-img-slide">
            <img src={img3} alt="Bank Anytime, Anywhere" />
            <div className="zb-hero-overlay" />
            <div className="zb-hero-caption">
              <h2>Bank Anytime, Anywhere</h2>
              <p>Enjoy 24/7 customer support and seamless online banking.</p>
              <Button
                variant="light"
                className="text-dark zb-btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setContactFeedback({ type: "", text: "" });
                  setShowContact(true);
                }}
              >
                <FaEnvelope size={14} /> Contact Us
              </Button>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>

      {/* Announcement Ticker */}
      <SlideWorks />

      {/* Main Content: Notices + Account Opening Form */}
      <section className="container py-4 py-lg-5">
        <div className="row g-4 align-items-stretch">
          <div className="col-12 col-lg-5">
            <NoticeBar inline />
          </div>
          <div className="col-12 col-lg-7" id="open-account-section">
            <BankForm inline />
          </div>
        </div>
      </section>

      {/* Product & Service Slider */}
      <CardSlider />

      {/* ========================================================
          1. KNOW MORE MODAL
      ======================================================== */}
      <Modal
        show={showKnowMore}
        onHide={() => setShowKnowMore(false)}
        size="lg"
        centered
        scrollable
      >
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title className="fw-bold d-flex align-items-center gap-2 fs-5">
            <FaUniversity /> About ZeroBank
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3 p-md-4">
          <h4 className="fw-bold text-dark mb-2">Welcome to ZeroBank</h4>
          <p className="text-muted">
            Founded in 1990, <strong>ZeroBank</strong> delivers secure deposit accounts,
            digital financial solutions, and personalized customer services for individuals
            and businesses.
          </p>

          <hr className="my-3" />

          <div className="row g-3">
            <div className="col-md-6">
              <div className="p-3 border rounded-3 bg-light h-100">
                <div className="d-flex align-items-center mb-2 text-primary">
                  <FaShieldAlt className="fs-5 me-2" />
                  <h6 className="fw-bold mb-0">Bank-Grade Security</h6>
                </div>
                <p className="small text-muted mb-0">
                  Protected with 256-bit SSL encryption, multi-layer firewalls, and active
                  fraud detection.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 border rounded-3 bg-light h-100">
                <div className="d-flex align-items-center mb-2 text-success">
                  <FaClock className="fs-5 me-2" />
                  <h6 className="fw-bold mb-0">24×7 Instant Banking</h6>
                </div>
                <p className="small text-muted mb-0">
                  Real-time fund transfers, bill payments, and digital statements available
                  round the clock.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h6 className="fw-bold text-dark mb-2">What We Offer</h6>
            <ul className="list-unstyled text-muted small mb-0 d-flex flex-column gap-2">
              <li className="d-flex align-items-center gap-2">
                <FaCheckCircle className="text-primary flex-shrink-0" />
                High-interest Savings and zero-hassle Current Accounts.
              </li>
              <li className="d-flex align-items-center gap-2">
                <FaCheckCircle className="text-primary flex-shrink-0" />
                Competitive Small Business, Personal, and Gold Loans.
              </li>
              <li className="d-flex align-items-center gap-2">
                <FaCheckCircle className="text-primary flex-shrink-0" />
                Fast online approval workflows and verified digital records.
              </li>
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
          2. CONTACT US MODAL
      ======================================================== */}
      <Modal
        show={showContact}
        onHide={() => setShowContact(false)}
        centered
        scrollable
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="fw-bold d-flex align-items-center gap-2 text-primary fs-5">
            <FaEnvelope /> Contact ZeroBank Support
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleContactSubmit}>
          <Modal.Body className="p-3 p-md-4">
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
              Fill out your details below to send a message directly to ZeroBank Support.
            </p>

            <Form.Group className="mb-3">
              <Form.Label className="zb-input-label">Your Name *</Form.Label>
              <Form.Control
                type="text"
                className="zb-form-control"
                placeholder="Enter full name"
                value={contactData.name}
                onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="zb-input-label">Email Address *</Form.Label>
              <Form.Control
                type="email"
                className="zb-form-control"
                placeholder="name@example.com"
                value={contactData.email}
                onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="zb-input-label">Mobile Number *</Form.Label>
              <Form.Control
                type="tel"
                className="zb-form-control"
                placeholder="e.g. 9876543210"
                value={contactData.phone}
                onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                required
              />
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label className="zb-input-label">Topic</Form.Label>
              <Form.Select
                className="zb-form-control"
                value={contactData.subject}
                onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Account Opening / KYC Issue">Account Opening / KYC Issue</option>
                <option value="Fund Transfer / Transaction Issue">Fund Transfer / Transaction Issue</option>
                <option value="Technical / Login Problem">Technical / Login Problem</option>
              </Form.Select>
            </Form.Group> */}

            <Form.Group className="mb-2">
              <Form.Label className="zb-input-label">Details / Message *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                className="zb-form-control"
                placeholder="Briefly describe your issue or query..."
                value={contactData.message}
                onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowContact(false)}
              disabled={contactSending}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={contactSending}
              className="d-flex align-items-center gap-2"
            >
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
    </div>
  );
}

function SlideWorks() {
  const tickerText =
    "Welcome to ZeroCode Bank!, your trusted partner in financial services created by Bikash Bhanja, Arup Mandal and Basudeb Bej";

  return (
    <div className="zb-ticker-bar" role="region" aria-label="Bank announcements">
      <div className="zb-ticker-label">
        <FaBullhorn size={12} />
        <span className="d-none d-sm-inline">Notice</span>
      </div>
      <div className="zb-ticker-track-wrap">
        <div className="zb-ticker-track">
          <span className="px-4">{tickerText}</span>
          <span className="px-4" aria-hidden="true">
            {tickerText}
          </span>
        </div>
      </div>
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

  const wrapperClass = inline ? "h-100" : "container my-5";

  return (
    <div className={wrapperClass}>
      <div className="zb-notice-card p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-white border-opacity-10">
          <div>
            <span className="text-uppercase small fw-bold text-warning d-block" style={{ letterSpacing: "0.06em" }}>
              Updates & Circulars
            </span>
            <h5 className="fw-bold mb-0 text-white">What's New</h5>
          </div>
          <button
            type="button"
            className="btn btn-light btn-sm rounded-circle d-inline-flex align-items-center justify-content-center"
            style={{ width: "36px", height: "36px" }}
            onClick={() => setIsPlaying((prev) => !prev)}
            aria-label={isPlaying ? "Pause notice rotation" : "Play notice rotation"}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
          </button>
        </div>

        <div className="d-flex flex-column gap-2 flex-grow-1 justify-content-between">
          {notices.map((notice, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={index}
                role="button"
                tabIndex={0}
                className={`zb-notice-item ${isActive ? "is-active" : ""}`}
                onClick={() => {
                  setCurrentIndex(index);
                  window.open(notice.pdf, "_blank", "noopener,noreferrer");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setCurrentIndex(index);
                    window.open(notice.pdf, "_blank", "noopener,noreferrer");
                  }
                }}
              >
                <div className="d-flex justify-content-between align-items-center gap-2 mb-1">
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <span className="fw-semibold small text-white">{notice.date}</span>
                    <span className="badge bg-warning text-dark" style={{ fontSize: "0.68rem" }}>
                      NEW
                    </span>
                  </div>
                  <FaFilePdf className="text-warning opacity-75 flex-shrink-0" size={14} />
                </div>
                <p className="mb-0 small text-white text-opacity-90 lh-sm">{notice.text}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-3 pt-2 border-top border-white border-opacity-10 d-flex align-items-center justify-content-between small text-white text-opacity-75">
          <span>Click any notice to view PDF</span>
          <span>
            {currentIndex + 1} / {notices.length}
          </span>
        </div>
      </div>
    </div>
  );
}

function BankForm({ inline = false }) {
  const formRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

      await axios.post(`${BASE_URL}/api/accounts`, fd, {
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
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message || "Failed to submit.";
      setMessage(`Error: ${errMsg}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={inline ? "h-100" : "container my-5"}>
      <form
        ref={formRef}
        className="zb-surface-card p-3 p-md-4 h-100"
        onSubmit={handleSubmit}
      >
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 pb-2 border-bottom">
          <div>
            <h5 className="fw-bold mb-0 text-dark">Open Your Account</h5>
            <span className="text-muted small">Quick digital onboarding with KYC</span>
          </div>
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1">
            <FaLock size={11} /> 256-Bit Encrypted
          </span>
        </div>

        {message && (
          <div
            className={`alert ${
              message.startsWith("Error") ? "alert-danger" : "alert-success"
            } py-2 small`}
            role="alert"
          >
            {message}
          </div>
        )}

        <div className="row g-3">
          {/* Section 1: Personal & Contact */}
          <div className="col-12">
            <div className="zb-form-section-title">1. Personal & Contact Details</div>
          </div>

          <div className="col-12 col-sm-6">
            <label className="zb-input-label">Full Name *</label>
            <input
              type="text"
              className="form-control zb-form-control"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>

          <div className="col-12 col-sm-6">
            <label className="zb-input-label">Email Address *</label>
            <input
              type="email"
              className="form-control zb-form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="col-12 col-sm-6">
            <label className="zb-input-label">Mobile Number *</label>
            <input
              type="tel"
              className="form-control zb-form-control"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
            />
          </div>

          <div className="col-12 col-sm-6">
            <label className="zb-input-label">Gender *</label>
            <select
              className="form-select zb-form-control"
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

          <div className="col-12 col-sm-6">
            <label className="zb-input-label">State *</label>
            <select
              className="form-select zb-form-control"
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

          <div className="col-12 col-sm-6">
            <label className="zb-input-label">City *</label>
            <input
              type="text"
              className="form-control zb-form-control"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
          </div>

          {/* Section 2: KYC Documents */}
          <div className="col-12">
            <div className="zb-form-section-title">2. KYC Verification</div>
          </div>

          <div className="col-12 col-sm-6">
            <label className="zb-input-label">Aadhaar Number *</label>
            <input
              type="text"
              className="form-control zb-form-control"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              placeholder="12-digit Aadhaar"
              required
              pattern="^[0-9]{12}$"
              title="Enter valid Aadhaar number (e.g. 123456789012)"
            />
          </div>

          <div className="col-12 col-sm-6">
            <label className="zb-input-label">Aadhaar Document *</label>
            <input
              type="file"
              className="form-control zb-form-control"
              name="aadhaardoc"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 col-sm-6">
            <label className="zb-input-label">PAN Number *</label>
            <input
              type="text"
              className="form-control zb-form-control"
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

          <div className="col-12 col-sm-6">
            <label className="zb-input-label">PAN Document *</label>
            <input
              type="file"
              className="form-control zb-form-control"
              name="pandoc"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 col-sm-6">
            <label className="zb-input-label">Signature *</label>
            <input
              type="file"
              className="form-control zb-form-control"
              name="signature"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 col-sm-6">
            <label className="zb-input-label">Photo *</label>
            <input
              type="file"
              className="form-control zb-form-control"
              name="photo"
              onChange={handleChange}
              required
            />
          </div>

          {/* Section 3: Account & Security */}
          <div className="col-12">
            <div className="zb-form-section-title">3. Account Preferences & Security</div>
          </div>

          <div className="col-12 col-sm-6">
            <label className="zb-input-label">Account Type *</label>
            <select
              className="form-select zb-form-control"
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

          <div className="col-12 col-sm-6">
            <label className="zb-input-label">Preferred Language *</label>
            <select
              className="form-select zb-form-control"
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

          <div className="col-12 col-sm-6">
            <label className="zb-input-label">Password *</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control zb-form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>
          </div>

          <div className="col-12 col-sm-6">
            <label className="zb-input-label">Confirm Password *</label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control zb-form-control"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>
          </div>

          <div className="col-12">
            <div className="form-check p-3 rounded-3 bg-light border">
              <input
                type="checkbox"
                className="form-check-input ms-0 me-2"
                id="zb-consent-check"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
              />
              <label className="form-check-label small text-muted" htmlFor="zb-consent-check">
                I authorize ZeroBank to contact me regarding my account application.
              </label>
            </div>
          </div>

          <div className="col-12 d-grid d-sm-flex justify-content-sm-end pt-1">
            <button
              type="submit"
              className="btn btn-primary px-4 py-2 fw-semibold d-inline-flex align-items-center justify-content-center gap-2"
              style={{ borderRadius: "10px" }}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Spinner animation="border" size="sm" /> Submitting...
                </>
              ) : (
                <>
                  Submit Application <FaArrowRight size={13} />
                </>
              )}
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
      description:
        "Secure your money while earning attractive interest. Enjoy easy online access, digital banking features, and flexible options for deposits and withdrawals to manage your finances effortlessly.",
      image: img4,
    },
    {
      title: "Current Account",
      description:
        "Tailored for businesses, offering seamless transactions, real-time banking, and dedicated services. Manage payments, receivables, and cash flow efficiently.",
      image: img5,
    },
    {
      title: "Home Loan",
      description:
        "Achieve your dream home with low-interest loans and flexible repayment options. Quick approvals and personalized plans make homeownership simple and affordable.",
      image: img6,
    },
    {
      title: "Gold Loan",
      description:
        "Unlock instant funds using your gold as collateral. Minimal documentation, competitive interest rates, and quick disbursement.",
      image: img7,
    },
    {
      title: "Business Loan",
      description:
        "Scale and grow your business with customized loan solutions. Flexible repayment terms, fast approvals, and competitive interest rates.",
      image: img8,
    },
    {
      title: "Agriculture Loan",
      description:
        "Support your farming activities with loans for seeds, equipment, or irrigation. Easy access, timely disbursement, and affordable interest rates.",
      image: img9,
    },
    {
      title: "Health Insurance",
      description:
        "Protect yourself and your family with our comprehensive health insurance plans covering hospitalization and critical illnesses.",
      image: img10,
    },
    {
      title: "General Insurance",
      description:
        "Safeguard your assets with reliable insurance policies against unforeseen risks.",
      image: img11,
    },
    {
      title: "Life Insurance",
      description:
        "Secure your family’s future with comprehensive life insurance plans.",
      image: img12,
    },
  ];

  return (
    <section className="zb-slider-section">
      <div className="container">
        <div className="text-center mb-4">
          <span className="text-uppercase small fw-bold text-primary" style={{ letterSpacing: "0.06em" }}>
            Products & Services
          </span>
          <h3 className="fw-bold text-dark mt-1 mb-1">Financial Solutions for Every Need</h3>
          <p className="text-muted small mb-0">
            Hover to pause and select any service to view full details.
          </p>
        </div>

        <div className="zb-slider-viewport">
          <div className="zb-slider-track">
            {[...notices, ...notices].map((notice, i) => (
              <div key={i} className="zb-product-card card shadow-sm">
                <div className="card-body p-4 d-flex flex-column justify-content-between text-center">
                  <div>
                    <div className="zb-product-icon-box">
                      <img src={notice.image} alt={notice.title} />
                    </div>
                    <h5 className="fw-bold text-dark mb-2 fs-6">{notice.title}</h5>
                    <p className="text-muted small zb-line-clamp-2 mb-3">
                      {notice.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm fw-semibold d-inline-flex align-items-center justify-content-center gap-1 mx-auto px-3"
                    style={{ borderRadius: "8px" }}
                    onClick={() => setSelectedNotice(notice)}
                  >
                    Know More <FaExternalLinkAlt size={11} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <Modal
        show={Boolean(selectedNotice)}
        onHide={() => setSelectedNotice(null)}
        centered
        scrollable
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="fw-bold fs-5 d-flex align-items-center gap-2">
            {selectedNotice?.image && (
              <img
                src={selectedNotice.image}
                alt={selectedNotice.title}
                style={{ width: "28px", height: "28px", objectFit: "contain" }}
              />
            )}
            {selectedNotice?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3 p-md-4">
          <p className="text-muted mb-0 lh-base">{selectedNotice?.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedNotice(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export { SlideWorks, NoticeBar, CardSlider, BankForm };
export default HomeCarousel;

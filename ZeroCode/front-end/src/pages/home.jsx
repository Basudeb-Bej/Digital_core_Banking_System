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
  FaFilePdf,
  FaEye,
  FaEyeSlash,
  FaBell,
  FaArrowRight,
} from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/* Subtle animated fintech network canvas for Slide 0 background */
function HeroParticlesCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = canvas.width = parent.clientWidth;
      height = canvas.height = parent.clientHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const nodeCount = 28;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * (width || 800),
      y: Math.random() * (height || 440),
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 2 + 1.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(37, 99, 235, 0.22)";
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}

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
           KEYFRAMES & MICRO-ANIMATIONS
        ========================================================= */
        @keyframes zb-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes zb-ken-burns {
          0% { transform: scale(1); }
          100% { transform: scale(1.06); }
        }

        @keyframes zb-pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.55); }
          70% { box-shadow: 0 0 0 8px rgba(251, 191, 36, 0); }
          100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0); }
        }

        @keyframes zb-icon-swing {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(12deg); }
          40% { transform: rotate(-10deg); }
          60% { transform: rotate(6deg); }
          80% { transform: rotate(-4deg); }
        }

        @keyframes zb-ticker-scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        @keyframes zb-slide-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
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
          pointer-events: none;
        }

        .zb-hero-carousel .carousel-control-prev-icon,
        .zb-hero-carousel .carousel-control-next-icon {
          pointer-events: auto;
          cursor: pointer;
        }

        .zb-hero-carousel .carousel-indicators {
          z-index: 20;
          margin-bottom: 0.75rem;
        }

        .zb-hero-slide-split {
          position: relative;
          background: linear-gradient(135deg, #f0f6ff 0%, #ffffff 55%, #e6f0ff 100%);
          min-height: 440px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .zb-hero-float-img {
          animation: zb-float 5s ease-in-out infinite;
          filter: drop-shadow(0 14px 28px rgba(15, 23, 42, 0.12));
        }

        .zb-hero-title {
          font-size: clamp(1.65rem, 3.2vw, 2.65rem);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: #0f172a;
        }

        .zb-hero-subtitle {
          font-size: clamp(0.95rem, 1.4vw, 1.15rem);
          color: #475569;
          line-height: 1.6;
        }

        .zb-hero-img-slide {
          position: relative;
          height: 440px;
          width: 100%;
          overflow: hidden;
        }

        .zb-hero-img-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          animation: zb-ken-burns 12s ease-in-out alternate infinite;
        }

        .zb-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(9, 21, 43, 0.82) 0%,
            rgba(9, 21, 43, 0.54) 55%,
            rgba(9, 21, 43, 0.25) 100%
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
          pointer-events: auto;
        }

        .zb-hero-caption h2 {
          font-size: clamp(1.45rem, 3vw, 2.4rem);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .zb-hero-caption p {
          font-size: clamp(0.92rem, 1.3vw, 1.1rem);
          color: rgba(255, 255, 255, 0.92);
          margin-bottom: 1.5rem;
          max-width: 520px;
        }

        .zb-cta-btn {
          border-radius: 10px;
          font-weight: 600;
          padding: 0.65rem 1.45rem;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .zb-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.2);
        }

        .zb-cta-btn .zb-btn-icon {
          transition: transform 0.2s ease;
        }

        .zb-cta-btn:hover .zb-btn-icon {
          transform: translateX(3px);
        }

        @media (max-width: 991.98px) {
          .zb-hero-slide-split {
            min-height: auto;
            padding: 2rem 0 2.5rem;
          }
          .zb-hero-img-slide {
            height: 340px;
          }
          .zb-hero-caption {
            padding: 1.5rem 3.25rem;
          }
        }

        @media (max-width: 575.98px) {
          .zb-hero-img-slide {
            height: 280px;
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
           TICKER BAR (SLIDEWORKS)
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

        .zb-ticker-icon-box {
          background: #1d4ed8;
          color: #ffffff;
          height: 100%;
          padding: 0 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          z-index: 2;
        }

        .zb-ticker-bell {
          animation: zb-icon-swing 2.8s ease-in-out infinite;
        }

        .zb-ticker-track-wrap {
          flex: 1;
          overflow: hidden;
        }

        .zb-ticker-track {
          display: inline-flex;
          white-space: nowrap;
          animation: zb-ticker-scroll 28s linear infinite;
        }

        .zb-ticker-bar:hover .zb-ticker-track {
          animation-play-state: paused;
        }

        /* =========================================================
           NOTICE BAR & BANK FORM CARDS
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
          box-shadow: 0 10px 28px rgba(15, 41, 66, 0.14);
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
          transition: all 0.25s ease;
        }

        .zb-notice-item:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
        }

        .zb-notice-item.is-active {
          background: rgba(255, 255, 255, 0.16);
          border-color: #fbbf24;
          animation: zb-pulse-ring 2.2s infinite;
        }

        .zb-notice-pdf-icon {
          transition: transform 0.2s ease;
        }

        .zb-notice-item:hover .zb-notice-pdf-icon {
          transform: scale(1.18);
        }

        .zb-input-label {
          font-size: 0.84rem;
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
          padding: 2.75rem 0;
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
          animation: zb-slide-left 50s linear infinite;
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
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .zb-product-card:hover {
          transform: translateY(-5px);
          border-color: #93c5fd;
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.09);
        }

        .zb-product-icon-box {
          width: 68px;
          height: 68px;
          border-radius: 16px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          padding: 10px;
          transition: transform 0.25s ease, background-color 0.25s ease;
        }

        .zb-product-card:hover .zb-product-icon-box {
          transform: scale(1.08) rotate(-3deg);
          background: #e0f2fe;
        }

        .zb-product-icon-box img {
          max-height: 46px;
          max-width: 46px;
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

        /* Prevent any modal from overflowing screen vertically */
        .modal-dialog-scrollable .modal-content {
          max-height: 88vh !important;
          border-radius: 16px;
          overflow: hidden;
        }
        .modal-dialog-scrollable .modal-body {
          overflow-y: auto !important;
        }
      `}</style>

      <Carousel
        fade
        interval={3500}
        controls={true}
        indicators={true}
        pause="hover"
        className="zb-hero-carousel"
      >
        {/* Slide 0: Small Business Loan / Know More */}
        <Carousel.Item>
          <div className="zb-hero-slide-split">
            <HeroParticlesCanvas />
            <div className="container" style={{ position: "relative", zIndex: 2 }}>
              <div className="row align-items-center g-4 py-3">
                <div
                  className="col-lg-6 px-4 px-md-5 text-center text-lg-start"
                  style={{ position: "relative", zIndex: 25 }}
                >
                  <h2 className="zb-hero-title mb-3">
                    <span className="text-primary">ZeroBank</span> Digital Banking
                  </h2>
                  <p className="zb-hero-subtitle mb-4">
                    Financing Businesses, Empowering Dreams with Modern Banking.
                  </p>
                  <Button
                    variant="primary"
                    type="button"
                    className="zb-cta-btn shadow-sm"
                    style={{ position: "relative", zIndex: 30, cursor: "pointer" }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowKnowMore(true);
                    }}
                  >
                    Know more <FaArrowRight size={13} className="zb-btn-icon" />
                  </Button>
                </div>

                <div
                  className="col-lg-6 text-center px-4"
                  style={{ position: "relative", zIndex: 10 }}
                >
                  <img
                    src="https://shivalikbank.com/assets/upload/bannerimage/20230207064521.png"
                    alt="ZeroBank Overview"
                    className="img-fluid rounded-4 zb-hero-float-img"
                    style={{ maxHeight: "330px", objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>

        {/* Slide 1: Open an Account (Scroll) */}
        <Carousel.Item>
          <div className="zb-hero-img-slide">
            <img className="d-block w-100" src={img1} alt="First slide" />
            <div className="zb-hero-overlay" />
            <div className="zb-hero-caption">
              <h2>Trusted Banking Since 1990</h2>
              <p>Your security and trust are our top priorities.</p>
              <Button
                variant="primary"
                className="zb-cta-btn shadow-sm"
                style={{ position: "relative", zIndex: 30, cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  scrollToOpenAccount();
                }}
              >
                Open an Account <FaArrowRight size={13} className="zb-btn-icon" />
              </Button>
            </div>
          </div>
        </Carousel.Item>

        {/* Slide 2: Explore Services */}
        <Carousel.Item>
          <div className="zb-hero-img-slide">
            <img className="d-block w-100" src={img2} alt="Second slide" />
            <div className="zb-hero-overlay" />
            <div className="zb-hero-caption">
              <h2>Comprehensive Financial Services</h2>
              <p>Loans, savings, and investment options tailored for you.</p>
              <Button
                href="/services"
                variant="success"
                className="zb-cta-btn shadow-sm"
                style={{ position: "relative", zIndex: 30 }}
              >
                Explore Services <FaArrowRight size={13} className="zb-btn-icon" />
              </Button>
            </div>
          </div>
        </Carousel.Item>

        {/* Slide 3: Contact Us (Modal) */}
        <Carousel.Item>
          <div className="zb-hero-img-slide">
            <img className="d-block w-100" src={img3} alt="Third slide" />
            <div className="zb-hero-overlay" />
            <div className="zb-hero-caption">
              <h2>Bank Anytime, Anywhere</h2>
              <p>Enjoy 24/7 support and seamless online banking.</p>
              <Button
                variant="light"
                className="text-dark zb-cta-btn shadow-sm"
                style={{ position: "relative", zIndex: 30, cursor: "pointer" }}
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

      <SlideWorks />

      <div className="container py-4 py-lg-5">
        <div className="row g-4 align-items-stretch">
          <div className="col-12 col-lg-5">
            <NoticeBar inline />
          </div>
          <div className="col-12 col-lg-7" id="open-account-section">
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
          <Modal.Title className="fw-bold d-flex align-items-center gap-2 fs-5">
            <FaUniversity /> About ZeroBank
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3 p-md-4">
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
              Fill out your details and query below. An email will be sent directly to ZeroBank's support desk.
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
            <Button variant="secondary" onClick={() => setShowContact(false)} disabled={contactSending}>
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
    <div className="slide-works zb-ticker-bar">
      <div className="zb-ticker-icon-box" aria-hidden="true">
        <FaBell size={14} className="zb-ticker-bell" />
      </div>
      <div className="zb-ticker-track-wrap">
        <div className="zb-ticker-track">
          <span style={{ padding: "0 24px" }}>{tickerText}</span>
          <span style={{ padding: "0 24px" }} aria-hidden="true">
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
      <div className="notice-card zb-notice-card p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-white border-opacity-10">
          <h5 className="fw-bold mb-0 text-warning d-flex align-items-center gap-2">
            <FaBell size={16} className={isPlaying ? "zb-ticker-bell" : ""} />
            What's New
          </h5>
          <button
            type="button"
            className="btn btn-light btn-sm rounded-circle d-inline-flex align-items-center justify-content-center"
            style={{ width: "36px", height: "36px" }}
            onClick={() => setIsPlaying((prev) => !prev)}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
          </button>
        </div>

        <div className="d-flex flex-column gap-2 flex-grow-1 justify-content-between">
          {notices.map((notice, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              className={`zb-notice-item ${index === currentIndex ? "is-active" : ""}`}
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
                  <span className="fw-bold small text-white">{notice.date}</span>
                  <span className="badge bg-warning text-dark">NEW</span>
                </div>
                <FaFilePdf
                  className="text-warning opacity-75 flex-shrink-0 zb-notice-pdf-icon"
                  size={15}
                />
              </div>
              <p className="mb-0 small text-white text-opacity-90 lh-sm">{notice.text}</p>
            </div>
          ))}
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
        <div className="row g-3">
          <div className="col-12">
            <h5 className="mb-1 text-center fw-bold pb-2 border-bottom">Open Your Account</h5>
          </div>

          {message && (
            <div className="col-12">
              <div
                className={`alert mb-0 py-2 small ${
                  message.startsWith("Error") ? "alert-danger" : "alert-success"
                }`}
              >
                {message}
              </div>
            </div>
          )}

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
              placeholder="Email ID"
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
            <label className="zb-input-label">Aadhaar Number *</label>
            <input
              type="text"
              className="form-control zb-form-control"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              placeholder="Aadhaar Number"
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
                placeholder="Password"
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
                I authorize ZeroBank to contact me. Please fill the form, and we’ll reach out shortly.
              </label>
            </div>
          </div>

          <div className="col-12 d-grid d-sm-flex justify-content-sm-center pt-1">
            <button
              type="submit"
              className="btn btn-primary px-5 py-2 fw-semibold"
              style={{ borderRadius: "10px" }}
              disabled={submitting}
            >
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
                    className="btn btn-outline-primary btn-sm fw-semibold mx-auto px-3"
                    style={{ borderRadius: "8px" }}
                    onClick={() => setSelectedNotice(notice)}
                  >
                    Know More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Unified Bootstrap Modal */}
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
                style={{ width: "26px", height: "26px", objectFit: "contain" }}
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

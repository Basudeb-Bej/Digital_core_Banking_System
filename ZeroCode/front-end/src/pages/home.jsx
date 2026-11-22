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
  FaCheckCircle,
  FaLock,
  FaUserCheck,
  FaHeadset,
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

    const nodeCount = 26;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * (width || 800),
      y: Math.random() * (height || 540),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1.4,
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
        ctx.fillStyle = "rgba(37, 99, 235, 0.2)";
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
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.1 * (1 - dist / 130)})`;
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
          background-color: #f4f7fb;
          color: #0f172a;
          overflow-x: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        #open-account-section {
          scroll-margin-top: 96px;
        }

        /* =========================================================
           KEYFRAMES & MICRO-ANIMATIONS
        ========================================================= */
        @keyframes zb-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }

        @keyframes zb-ken-burns {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
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
           HERO CAROUSEL (WITH FLOATING NAVBAR CLEARANCE)
        ========================================================= */
        .zb-hero-carousel {
          background: #09182d;
          border-bottom: 1px solid #e2e8f0;
        }

        .zb-hero-carousel .carousel-control-prev,
        .zb-hero-carousel .carousel-control-next {
          width: 48px !important;
          top: 84px;
          z-index: 20;
          pointer-events: none;
        }

        .zb-hero-carousel .carousel-control-prev-icon,
        .zb-hero-carousel .carousel-control-next-icon {
          pointer-events: auto;
          cursor: pointer;
          background-color: rgba(15, 23, 42, 0.45);
          border-radius: 50%;
          padding: 16px;
          background-size: 52% 52%;
        }

        .zb-hero-carousel .carousel-indicators {
          z-index: 20;
          margin-bottom: 0.85rem;
        }

        .zb-hero-slide-split {
          position: relative;
          background:
            radial-gradient(circle at 85% 20%, rgba(37, 99, 235, 0.08), transparent 45%),
            linear-gradient(135deg, #f8fbff 0%, #ffffff 55%, #edf4ff 100%);
          min-height: 540px;
          padding-top: 96px;
          padding-bottom: 2rem;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .zb-hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.38rem 0.85rem;
          border-radius: 999px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          color: #1d4ed8;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .zb-hero-pill-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #2563eb;
        }

        .zb-hero-float-img {
          animation: zb-float 5.5s ease-in-out infinite;
          filter: drop-shadow(0 18px 34px rgba(15, 23, 42, 0.14));
        }

        .zb-hero-title {
          font-size: clamp(1.75rem, 3.3vw, 2.8rem);
          font-weight: 800;
          line-height: 1.16;
          letter-spacing: -0.025em;
          color: #0f172a;
        }

        .zb-hero-subtitle {
          font-size: clamp(0.95rem, 1.35vw, 1.12rem);
          color: #475569;
          line-height: 1.65;
          max-width: 520px;
        }

        .zb-hero-trust-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem 1.5rem;
          margin-top: 1.5rem;
          padding-top: 1.15rem;
          border-top: 1px solid #e2e8f0;
          font-size: 0.82rem;
          font-weight: 600;
          color: #475569;
        }

        .zb-hero-trust-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .zb-hero-img-slide {
          position: relative;
          height: 540px;
          width: 100%;
          overflow: hidden;
        }

        .zb-hero-img-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          animation: zb-ken-burns 14s ease-in-out alternate infinite;
        }

        .zb-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            95deg,
            rgba(7, 19, 39, 0.88) 0%,
            rgba(9, 25, 52, 0.64) 52%,
            rgba(9, 25, 52, 0.22) 100%
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
          padding: 96px 4.75rem 2rem;
          max-width: 740px;
          pointer-events: auto;
        }

        .zb-hero-caption-tag {
          display: inline-block;
          padding: 0.3rem 0.75rem;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #e0f2fe;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 0.85rem;
        }

        .zb-hero-caption h2 {
          font-size: clamp(1.55rem, 3.1vw, 2.55rem);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
          line-height: 1.18;
        }

        .zb-hero-caption p {
          font-size: clamp(0.95rem, 1.3vw, 1.12rem);
          color: rgba(241, 245, 249, 0.92);
          margin-bottom: 1.5rem;
          max-width: 520px;
          line-height: 1.6;
        }

        .zb-cta-btn {
          border-radius: 10px;
          font-weight: 600;
          padding: 0.68rem 1.5rem;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
        }

        .zb-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.22);
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
            padding: 88px 0 2.75rem;
          }
          .zb-hero-img-slide {
            height: 430px;
          }
          .zb-hero-caption {
            padding: 88px 3.25rem 1.75rem;
          }
          .zb-hero-trust-row {
            justify-content: center;
          }
        }

        @media (max-width: 575.98px) {
          .zb-hero-img-slide {
            height: 370px;
          }
          .zb-hero-caption {
            padding: 82px 2.5rem 2.5rem;
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
          background: #0b192c;
          color: #e2e8f0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          overflow: hidden;
          height: 44px;
          font-size: 0.86rem;
        }

        .zb-ticker-icon-box {
          background: #1d4ed8;
          color: #ffffff;
          height: 100%;
          padding: 0 16px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 0.76rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
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
          animation: zb-ticker-scroll 30s linear infinite;
        }

        .zb-ticker-bar:hover .zb-ticker-track {
          animation-play-state: paused;
        }

        /* =========================================================
           INSTITUTIONAL TRUST STRIP
        ========================================================= */
        .zb-trust-strip {
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
        }

        .zb-trust-metric {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0.5rem 0;
        }

        .zb-trust-metric-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: #eff6ff;
          color: #1d4ed8;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* =========================================================
           NOTICE BAR & BANK FORM CARDS
        ========================================================= */
        .zb-surface-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          box-shadow: 0 8px 30px rgba(15, 23, 42, 0.05);
        }

        .zb-form-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .zb-form-section-title {
          font-size: 0.76rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #1d4ed8;
          background: #f1f5f9;
          padding: 0.42rem 0.75rem;
          border-radius: 8px;
          margin-top: 0.35rem;
        }

        .zb-notice-card {
          background: linear-gradient(165deg, #0b1f3a 0%, #102e52 60%, #133b66 100%);
          color: #ffffff;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 12px 32px rgba(11, 31, 58, 0.16);
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .zb-notice-item {
          padding: 0.95rem 1.05rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }

        .zb-notice-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .zb-notice-item.is-active {
          background: rgba(37, 99, 235, 0.22);
          border-color: rgba(147, 197, 253, 0.65);
        }

        .zb-notice-pdf-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.18rem 0.5rem;
          border-radius: 6px;
          background: rgba(251, 191, 36, 0.16);
          color: #fde68a;
          transition: background-color 0.2s ease;
        }

        .zb-notice-item:hover .zb-notice-pdf-pill {
          background: rgba(251, 191, 36, 0.28);
        }

        .zb-input-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: #334155;
          margin-bottom: 0.35rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .zb-input-hint {
          font-size: 0.72rem;
          font-weight: 500;
          color: #64748b;
        }

        .zb-form-control {
          border-radius: 9px;
          border: 1px solid #cbd5e1;
          padding: 0.56rem 0.82rem;
          font-size: 0.9rem;
          background-color: #ffffff;
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
          padding: 3.25rem 0;
        }

        .zb-section-kicker {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #1d4ed8;
          margin-bottom: 0.35rem;
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
          animation: zb-slide-left 52s linear infinite;
        }

        .zb-slider-viewport:hover .zb-slider-track {
          animation-play-state: paused;
        }

        .zb-product-card {
          width: 305px;
          flex-shrink: 0;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .zb-product-card:hover {
          transform: translateY(-5px);
          border-color: #93c5fd;
          box-shadow: 0 14px 32px rgba(15, 23, 42, 0.08);
        }

        .zb-product-category {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #475569;
          background: #f1f5f9;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          margin-bottom: 0.85rem;
        }

        .zb-product-icon-box {
          width: 66px;
          height: 66px;
          border-radius: 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.9rem;
          padding: 10px;
          transition: transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
        }

        .zb-product-card:hover .zb-product-icon-box {
          transform: scale(1.06);
          background: #eff6ff;
          border-color: #bfdbfe;
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
            width: 265px;
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

      {/* ========================================================
          HERO CAROUSEL
      ======================================================== */}
      <Carousel
        fade
        interval={4000}
        controls={true}
        indicators={true}
        pause="hover"
        className="zb-hero-carousel"
      >
        {/* Slide 0: Digital Banking Overview / Know More */}
        <Carousel.Item>
          <div className="zb-hero-slide-split">
            <HeroParticlesCanvas />
            <div className="container" style={{ position: "relative", zIndex: 2 }}>
              <div className="row align-items-center g-4 py-2">
                <div
                  className="col-lg-6 px-4 px-md-5 text-center text-lg-start"
                  style={{ position: "relative", zIndex: 25 }}
                >
                  <div className="zb-hero-pill mb-3">
                    <span className="zb-hero-pill-dot" />
                    Next-Gen Core Banking
                  </div>
                  <h1 className="zb-hero-title mb-3">
                    <span className="text-primary">ZeroBank</span> Digital Banking
                  </h1>
                  <p className="zb-hero-subtitle mb-4 mx-auto mx-lg-0">
                    Financing businesses and empowering personal wealth with instant digital onboarding, real-time transfers, and enterprise-grade security.
                  </p>
                  <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start">
                    <Button
                      variant="primary"
                      type="button"
                      className="zb-cta-btn shadow-sm"
                      style={{ position: "relative", zIndex: 30, cursor: "pointer" }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        scrollToOpenAccount();
                      }}
                    >
                      Open Account <FaArrowRight size={13} className="zb-btn-icon" />
                    </Button>
                    <Button
                      variant="outline-primary"
                      type="button"
                      className="zb-cta-btn bg-white"
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

                  <div className="zb-hero-trust-row">
                    <span className="zb-hero-trust-item">
                      <FaLock className="text-primary" /> 256-Bit SSL Security
                    </span>
                    <span className="zb-hero-trust-item">
                      <FaUserCheck className="text-success" /> Automated KYC
                    </span>
                    <span className="zb-hero-trust-item">
                      <FaClock className="text-primary" /> 24×7 Transfers
                    </span>
                  </div>
                </div>

                {/* Self-Contained Vector FinTech Dashboard & Platinum Card Illustration */}
                <div
                  className="col-lg-6 text-center px-4"
                  style={{ position: "relative", zIndex: 10 }}
                >
                  <div className="zb-hero-float-img mx-auto" style={{ maxWidth: "460px" }}>
                    <svg
                      viewBox="0 0 520 380"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-100 h-auto"
                      role="img"
                      aria-label="ZeroBank Digital Banking Dashboard Illustration"
                    >
                      <defs>
                        <linearGradient id="zbScreenGrad" x1="0" y1="0" x2="520" y2="380" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#0f294a" />
                          <stop offset="100%" stopColor="#1e3a8a" />
                        </linearGradient>
                        <linearGradient id="zbCardGrad" x1="250" y1="185" x2="495" y2="335" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#2563eb" />
                          <stop offset="55%" stopColor="#0284c7" />
                          <stop offset="100%" stopColor="#0f172a" />
                        </linearGradient>
                        <linearGradient id="zbChartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Soft Backdrop Glow */}
                      <circle cx="270" cy="190" r="165" fill="#dbeafe" opacity="0.65" />

                      {/* Main Banking Dashboard Window */}
                      <rect x="28" y="34" width="380" height="260" rx="20" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                      {/* Top Window Bar */}
                      <path d="M28 54C28 42.9543 36.9543 34 48 34H388C399.046 34 408 42.9543 408 54V72H28V54Z" fill="#f1f5f9" />
                      <circle cx="50" cy="53" r="4.5" fill="#94a3b8" />
                      <circle cx="65" cy="53" r="4.5" fill="#94a3b8" />
                      <circle cx="80" cy="53" r="4.5" fill="#94a3b8" />
                      <rect x="115" y="47" width="140" height="12" rx="6" fill="#e2e8f0" />

                      {/* Account Balance Summary Card inside Dashboard */}
                      <rect x="48" y="88" width="210" height="84" rx="14" fill="url(#zbScreenGrad)" />
                      <text x="64" y="112" fill="#93c5fd" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="0.06em">
                        TOTAL AVAILABLE BALANCE
                      </text>
                      <text x="64" y="140" fill="#ffffff" fontSize="22" fontWeight="800" fontFamily="Inter, sans-serif">
                        ₹ 4,82,950.00
                      </text>
                      <rect x="64" y="150" width="76" height="14" rx="7" fill="rgba(34, 197, 94, 0.22)" />
                      <text x="74" y="160" fill="#4ade80" fontSize="9" fontWeight="700" fontFamily="Inter, sans-serif">
                        +14.8% Growth
                      </text>

                      {/* Mini Analytics Sparkline Card */}
                      <rect x="270" y="88" width="118" height="84" rx="14" fill="#f8fafc" stroke="#e2e8f0" />
                      <text x="282" y="108" fill="#475569" fontSize="9.5" fontWeight="700" fontFamily="Inter, sans-serif">
                        MONTHLY FLOW
                      </text>
                      <path
                        d="M282 152 L302 140 L322 145 L344 124 L374 116 L374 160 L282 160 Z"
                        fill="url(#zbChartGrad)"
                      />
                      <path
                        d="M282 152 L302 140 L322 145 L344 124 L374 116"
                        stroke="#2563eb"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Recent Transactions Rows */}
                      <rect x="48" y="186" width="190" height="36" rx="10" fill="#f8fafc" stroke="#e2e8f0" />
                      <circle cx="68" cy="204" r="10" fill="#dbeafe" />
                      <path d="M64 204L67 207L73 201" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="86" y="197" width="84" height="7" rx="3.5" fill="#334155" />
                      <rect x="86" y="208" width="54" height="5" rx="2.5" fill="#94a3b8" />

                      <rect x="48" y="230" width="190" height="36" rx="10" fill="#f8fafc" stroke="#e2e8f0" />
                      <circle cx="68" cy="248" r="10" fill="#dcfce7" />
                      <path d="M64 248L67 251L73 245" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="86" y="241" width="96" height="7" rx="3.5" fill="#334155" />
                      <rect x="86" y="252" width="62" height="5" rx="2.5" fill="#94a3b8" />

                      {/* Floating ZeroBank Platinum Debit/Credit Card */}
                      <g>
                        <rect x="252" y="188" width="240" height="148" rx="18" fill="url(#zbCardGrad)" />
                        <rect x="252.75" y="188.75" width="238.5" height="146.5" rx="17.25" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
                        {/* EMV Chip */}
                        <rect x="274" y="228" width="32" height="24" rx="5" fill="#fbbf24" opacity="0.9" />
                        <line x1="274" y1="236" x2="306" y2="236" stroke="#92400e" strokeWidth="1" />
                        <line x1="274" y1="244" x2="306" y2="244" stroke="#92400e" strokeWidth="1" />
                        <line x1="290" y1="228" x2="290" y2="252" stroke="#92400e" strokeWidth="1" />

                        <text x="274" y="212" fill="#ffffff" fontSize="12" fontWeight="800" fontFamily="Inter, sans-serif" letterSpacing="0.04em">
                          ZEROBANK PLATINUM
                        </text>
                        <text x="274" y="280" fill="#e0f2fe" fontSize="13" fontWeight="600" fontFamily="monospace" letterSpacing="0.14em">
                          4532  ••••  ••••  8841
                        </text>
                        <text x="274" y="314" fill="#93c5fd" fontSize="9.5" fontWeight="700" fontFamily="Inter, sans-serif">
                          INSTANT UPI &amp; GLOBAL ACCESS
                        </text>
                        <circle cx="452" cy="309" r="11" fill="#38bdf8" opacity="0.85" />
                        <circle cx="465" cy="309" r="11" fill="#fbbf24" opacity="0.85" />
                      </g>

                      {/* Floating KYC Verified Badge */}
                      <g>
                        <rect x="52" y="308" width="176" height="42" rx="12" fill="#ffffff" stroke="#bfdbfe" strokeWidth="1.5" />
                        <circle cx="76" cy="329" r="11" fill="#dcfce7" />
                        <path d="M71.5 329L74.5 332L81 325.5" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        <text x="95" y="326" fill="#0f172a" fontSize="10.5" fontWeight="700" fontFamily="Inter, sans-serif">
                          Instant KYC Active
                        </text>
                        <text x="95" y="339" fill="#64748b" fontSize="9" fontWeight="500" fontFamily="Inter, sans-serif">
                          256-Bit SSL Protected
                        </text>
                      </g>
                    </svg>
                  </div>
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
              <span className="zb-hero-caption-tag">Est. 1990 • Trusted Institution</span>
              <h2>Trusted Banking Since 1990</h2>
              <p>Your security, transparency, and financial growth are our top priorities.</p>
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
              <span className="zb-hero-caption-tag">Accounts • Loans • Insurance</span>
              <h2>Comprehensive Financial Services</h2>
              <p>Loans, savings, and protection plans tailored to personal and business goals.</p>
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
              <span className="zb-hero-caption-tag">Dedicated Support Desk</span>
              <h2>Bank Anytime, Anywhere</h2>
              <p>Enjoy 24/7 customer assistance and seamless online account management.</p>
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

      {/* ========================================================
          TICKER BAR
      ======================================================== */}
      <SlideWorks />

      {/* ========================================================
          TRUST & SECURITY HIGHLIGHTS STRIP
      ======================================================== */}
      <div className="zb-trust-strip py-3">
        <div className="container">
          <div className="row g-3">
            <div className="col-6 col-lg-3">
              <div className="zb-trust-metric">
                <div className="zb-trust-metric-icon">
                  <FaShieldAlt size={18} />
                </div>
                <div>
                  <div className="fw-bold small text-dark">Bank-Grade Encryption</div>
                  <div className="text-muted" style={{ fontSize: "0.76rem" }}>
                    Protected KYC & transactions
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="zb-trust-metric">
                <div className="zb-trust-metric-icon">
                  <FaUserCheck size={18} />
                </div>
                <div>
                  <div className="fw-bold small text-dark">Digital Verification</div>
                  <div className="text-muted" style={{ fontSize: "0.76rem" }}>
                    Fast Aadhaar & PAN review
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="zb-trust-metric">
                <div className="zb-trust-metric-icon">
                  <FaClock size={18} />
                </div>
                <div>
                  <div className="fw-bold small text-dark">Real-Time Transfers</div>
                  <div className="text-muted" style={{ fontSize: "0.76rem" }}>
                    Instant ledger settlement
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="zb-trust-metric">
                <div className="zb-trust-metric-icon">
                  <FaHeadset size={18} />
                </div>
                <div>
                  <div className="fw-bold small text-dark">24×7 Customer Desk</div>
                  <div className="text-muted" style={{ fontSize: "0.76rem" }}>
                    Direct email & branch support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          NOTICE BOARD & ACCOUNT OPENING FORM
      ======================================================== */}
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

      {/* ========================================================
          PRODUCT & SERVICES SLIDER
      ======================================================== */}
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
            Founded in 1990, <strong>ZeroBank</strong> delivers modern core banking solutions, secure deposit accounts, and streamlined customer onboarding to empower individuals and growing businesses.
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
                  Every transaction is protected with 256-bit SSL protocols, multi-layer firewalls, and active fraud monitoring.
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
                  Enjoy real-time fund transfers, seamless digital account approvals, and instant statements round the clock.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h6 className="fw-bold text-dark mb-2">What We Offer:</h6>
            <ul className="text-muted small ps-3 mb-0">
              <li>High-interest Savings and zero-hassle Current Accounts.</li>
              <li>Competitive Small Business, Personal, Home, and Gold Loans.</li>
              <li>Instant online approval workflows and verified digital KYC records.</li>
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
        <FaBell size={13} className="zb-ticker-bell" />
        <span className="d-none d-sm-inline">Notice</span>
      </div>
      <div className="zb-ticker-track-wrap">
        <div className="zb-ticker-track">
          <span style={{ padding: "0 28px" }}>{tickerText}</span>
          <span style={{ padding: "0 28px" }} aria-hidden="true">
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
        <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom border-white border-opacity-10">
          <div>
            <span
              className="d-block text-uppercase fw-bold"
              style={{ fontSize: "0.68rem", letterSpacing: "0.08em", color: "#93c5fd" }}
            >
              Circulars & Updates
            </span>
            <h5 className="fw-bold mb-0 text-white d-flex align-items-center gap-2 mt-1">
              <FaBell size={15} className={`text-warning ${isPlaying ? "zb-ticker-bell" : ""}`} />
              What's New
            </h5>
          </div>
          <button
            type="button"
            className="btn btn-outline-light btn-sm rounded-circle d-inline-flex align-items-center justify-content-center"
            style={{ width: "36px", height: "36px" }}
            onClick={() => setIsPlaying((prev) => !prev)}
            aria-label={isPlaying ? "Pause" : "Play"}
            title={isPlaying ? "Pause auto-highlight" : "Resume auto-highlight"}
          >
            {isPlaying ? <FaPause size={11} /> : <FaPlay size={11} />}
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
                  <span className="fw-semibold small text-white">{notice.date}</span>
                  <span
                    className="badge bg-warning text-dark"
                    style={{ fontSize: "0.65rem", letterSpacing: "0.04em" }}
                  >
                    NEW
                  </span>
                </div>
                <span className="zb-notice-pdf-pill flex-shrink-0">
                  <FaFilePdf size={11} /> PDF
                </span>
              </div>
              <p className="mb-0 small text-white text-opacity-85 lh-sm">{notice.text}</p>
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
          {/* Form Header */}
          <div className="col-12">
            <div className="zb-form-header">
              <div>
                <h5 className="mb-1 fw-bold text-dark">Open Your Digital Account</h5>
                <p className="mb-0 text-muted small">
                  Complete your KYC details below for instant online verification.
                </p>
              </div>
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2.5 py-1.5 d-inline-flex align-items-center gap-1">
                <FaLock size={11} /> Encrypted KYC
              </span>
            </div>
          </div>

          {message && (
            <div className="col-12">
              <div
                className={`alert mb-0 py-2 small d-flex align-items-center gap-2 ${
                  message.startsWith("Error") ? "alert-danger" : "alert-success"
                }`}
              >
                <FaCheckCircle />
                <span>{message}</span>
              </div>
            </div>
          )}

          {/* Section 1: Personal & Contact Information */}
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
              placeholder="As per PAN / Aadhaar"
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
              placeholder="you@example.com"
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
              placeholder="10-digit mobile number"
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
              <option value="">-- Select Gender --</option>
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
              <option value="">-- Select State --</option>
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
              placeholder="Enter your city"
              required
            />
          </div>

          {/* Section 2: Identity & KYC Verification */}
          <div className="col-12">
            <div className="zb-form-section-title">2. KYC & Document Verification</div>
          </div>

          <div className="col-12 col-sm-6">
            <label className="zb-input-label">
              <span>Aadhaar Number *</span>
              <span className="zb-input-hint">12 digits</span>
            </label>
            <input
              type="text"
              className="form-control zb-form-control"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              placeholder="12-digit Aadhaar number"
              required
              pattern="^[0-9]{12}$"
              title="Enter valid 12-digit Aadhaar number"
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
            <label className="zb-input-label">
              <span>PAN Number *</span>
              <span className="zb-input-hint">Uppercase</span>
            </label>
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
            <label className="zb-input-label">Applicant Photo *</label>
            <input
              type="file"
              className="form-control zb-form-control"
              name="photo"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 col-sm-6">
            <label className="zb-input-label">Digital Signature *</label>
            <input
              type="file"
              className="form-control zb-form-control"
              name="signature"
              onChange={handleChange}
              required
            />
          </div>

          {/* Section 3: Account Preferences & Security */}
          <div className="col-12">
            <div className="zb-form-section-title">3. Account Preferences & Login Security</div>
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
              <option value="">-- Select Account Type --</option>
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
              <option value="">-- Select Language --</option>
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
                placeholder="Create strong password"
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
                placeholder="Re-enter password"
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
                I authorize ZeroBank to verify my submitted KYC documents and contact me regarding my account application.
              </label>
            </div>
          </div>

          <div className="col-12 d-grid d-sm-flex justify-content-sm-end pt-1">
            <button
              type="submit"
              className="btn btn-primary px-5 py-2.5 fw-semibold shadow-sm d-inline-flex align-items-center justify-content-center gap-2"
              style={{ borderRadius: "10px" }}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Spinner animation="border" size="sm" /> Submitting Application...
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
      category: "Deposit Account",
      title: "Saving Account",
      description:
        "Secure your money while earning attractive interest. Enjoy easy online access, digital banking features, and flexible options for deposits and withdrawals to manage your finances effortlessly.",
      image: img4,
    },
    {
      category: "Business Banking",
      title: "Current Account",
      description:
        "Tailored for businesses, offering seamless transactions, real-time banking, and dedicated services. Manage payments, receivables, and cash flow efficiently.",
      image: img5,
    },
    {
      category: "Lending",
      title: "Home Loan",
      description:
        "Achieve your dream home with low-interest loans and flexible repayment options. Quick approvals and personalized plans make homeownership simple and affordable.",
      image: img6,
    },
    {
      category: "Lending",
      title: "Gold Loan",
      description:
        "Unlock instant funds using your gold as collateral. Minimal documentation, competitive interest rates, and quick disbursement.",
      image: img7,
    },
    {
      category: "Commercial",
      title: "Business Loan",
      description:
        "Scale and grow your business with customized loan solutions. Flexible repayment terms, fast approvals, and competitive interest rates.",
      image: img8,
    },
    {
      category: "Rural Finance",
      title: "Agriculture Loan",
      description:
        "Support your farming activities with loans for seeds, equipment, or irrigation. Easy access, timely disbursement, and affordable interest rates.",
      image: img9,
    },
    {
      category: "Protection",
      title: "Health Insurance",
      description:
        "Protect yourself and your family with our comprehensive health insurance plans covering hospitalization and critical illnesses.",
      image: img10,
    },
    {
      category: "Protection",
      title: "General Insurance",
      description:
        "Safeguard your assets with reliable insurance policies against unforeseen risks.",
      image: img11,
    },
    {
      category: "Protection",
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
          <span className="zb-section-kicker">Products & Solutions</span>
          <h3 className="fw-bold text-dark mb-1">Banking Tailored to Every Milestone</h3>
          <p className="text-muted small mb-0">
            Explore deposit accounts, instant credit facilities, and comprehensive insurance coverage.
          </p>
        </div>

        <div className="zb-slider-viewport">
          <div className="zb-slider-track">
            {[...notices, ...notices].map((notice, i) => (
              <div key={i} className="zb-product-card card shadow-sm">
                <div className="card-body p-4 d-flex flex-column justify-content-between text-center">
                  <div>
                    <span className="zb-product-category">{notice.category}</span>
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
                    className="btn btn-outline-primary btn-sm fw-semibold mx-auto px-3 d-inline-flex align-items-center gap-1"
                    style={{ borderRadius: "8px" }}
                    onClick={() => setSelectedNotice(notice)}
                  >
                    Know More <FaArrowRight size={11} />
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
          {selectedNotice?.category && (
            <span className="badge bg-primary-subtle text-primary mb-2">
              {selectedNotice.category}
            </span>
          )}
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

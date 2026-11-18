import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";

import breadcrumbImage from "../assets/img/image8.png";
import breakcrumbImage1 from "../assets/img/image10.png";
import breadcrumbImage2 from "../assets/img/image9.png";
import breadcrumbImage3 from "../assets/img/image6.png";
import purposeImage from "../assets/img/image11.png";

/* Subtle animated particle network for hero banner */
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

    const nodes = Array.from({ length: 22 }, () => ({
      x: Math.random() * (width || 800),
      y: Math.random() * (height || 340),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 1.2,
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
        ctx.fillStyle = "rgba(147, 197, 253, 0.35)";
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(147, 197, 253, ${0.16 * (1 - dist / 120)})`;
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

function Services() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const points = [
    "Savings and Current Accounts to manage your money securely.",
    "Personal, Home, and Car Loans with flexible repayment options.",
    "Credit and Debit Card facilities for easy transactions worldwide.",
    "Internet and Mobile Banking for 24/7 account access.",
    "Insurance services to safeguard your health, life, and assets.",
    "Investment and Wealth Management solutions for financial growth.",
  ];

  const servicesData = [
    {
      title: "Accounts",
      descriptions:
        "Easily manage your savings and current accounts with secure banking solutions, convenient digital access, and reliable support designed to help you organize and grow your finances efficiently.",
      image: breakcrumbImage1,
      path: "/account",
    },
    {
      title: "Loans",
      descriptions:
        "Get flexible personal, home, or car loans with affordable interest rates, simple documentation, and quick approvals to meet your financial goals without unnecessary stress or delays.",
      image: breadcrumbImage2,
      path: "/loan",
    },
    {
      title: "Insurance",
      descriptions:
        "Protect your health, life, and valuable assets with comprehensive insurance plans that offer peace of mind, financial security, and long-term protection for you and your loved ones.",
      image: breadcrumbImage3,
      path: "/insurance",
    },
  ];

  const handleLearnMore = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  return (
    <div className="zb-services-wrapper">
      <style>{`
        .zb-services-wrapper {
          background-color: #f8fafc;
          color: #0f172a;
          overflow-x: hidden;
        }

        @keyframes zb-ken-burns {
          0% { transform: scale(1); }
          100% { transform: scale(1.06); }
        }

        @keyframes zb-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }

        /* Breadcrumb Hero */
        .zb-services-hero {
          position: relative;
          min-height: clamp(220px, 32vw, 380px);
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .zb-services-hero-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          animation: zb-ken-burns 12s ease-in-out alternate infinite;
          z-index: 0;
        }

        .zb-services-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(9, 21, 43, 0.84) 0%,
            rgba(9, 21, 43, 0.58) 60%,
            rgba(9, 21, 43, 0.35) 100%
          );
          z-index: 1;
        }

        .zb-services-hero-content {
          position: relative;
          z-index: 2;
        }

        .zb-services-hero-title {
          font-size: clamp(1.75rem, 3.5vw, 2.75rem);
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .zb-breadcrumb .breadcrumb-item + .breadcrumb-item::before {
          color: rgba(255, 255, 255, 0.65);
        }

        /* Overview Card */
        .zb-services-panel {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
        }

        .zb-services-img {
          width: 100%;
          max-height: 400px;
          object-fit: cover;
          border-radius: 14px;
          border-bottom-right-radius: 48px;
          animation: zb-float 5.5s ease-in-out infinite;
          box-shadow: 0 12px 26px rgba(15, 23, 42, 0.1);
        }

        .zb-service-point {
          transition: transform 0.2s ease;
        }

        .zb-service-point:hover {
          transform: translateX(4px);
        }

        .zb-service-point-icon {
          transition: transform 0.25s ease;
        }

        .zb-service-point:hover .zb-service-point-icon {
          transform: scale(1.2) rotate(8deg);
        }

        /* Service Cards */
        .zb-service-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .zb-service-card:hover {
          transform: translateY(-5px);
          border-color: #93c5fd;
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.09);
        }

        .zb-service-card-img-wrap {
          width: 100%;
          height: 210px;
          overflow: hidden;
          background: #e2e8f0;
        }

        .zb-service-card-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
        }

        .zb-service-card:hover .zb-service-card-img-wrap img {
          transform: scale(1.06);
        }

        .zb-arrow-btn {
          width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
        }

        .zb-arrow-btn svg {
          transition: transform 0.2s ease;
        }

        .zb-arrow-btn:hover svg {
          transform: translateX(2px);
        }

        .zb-learn-btn {
          border-radius: 10px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .zb-learn-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(13, 110, 253, 0.22);
        }

        .modal-dialog-scrollable .modal-content {
          max-height: 88vh !important;
          border-radius: 16px;
          overflow: hidden;
        }
      `}</style>

      {/* Breadcrumb */}
      <div className="w-100 text-white zb-services-hero">
        <img src={breadcrumbImage} alt="" className="zb-services-hero-bg" aria-hidden="true" />
        <div className="zb-services-hero-overlay" />
        <HeroParticlesCanvas />
        <div className="container py-4 zb-services-hero-content">
          <h1 className="zb-services-hero-title mb-2">Services</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb zb-breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="/" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item active text-white-50" aria-current="page">
                Services
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Services Section */}
      <div className="container py-4 py-lg-5">
        <div className="zb-services-panel p-4 p-md-5 mb-4 mb-lg-5">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-6">
              <img src={purposeImage} alt="Purpose" className="zb-services-img" />
            </div>
            <div className="col-12 col-lg-6">
              <h3 className="fw-bold mb-4 text-dark">Our Services</h3>
              <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
                {points.map((point, index) => (
                  <li key={index} className="d-flex align-items-start gap-2 zb-service-point">
                    <FaCheckCircle
                      className="text-warning flex-shrink-0 mt-1 zb-service-point-icon"
                      size={16}
                    />
                    <span className="text-secondary lh-base">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Service Cards */}
        <div className="row g-4 justify-content-center pb-2">
          {servicesData.map((service, index) => (
            <div className="col-12 col-sm-6 col-lg-4" key={index}>
              <div className="card h-100 zb-service-card">
                <div className="zb-service-card-img-wrap">
                  <img src={service.image} alt={service.title} />
                </div>
                <div className="card-body p-4 d-flex flex-column justify-content-between">
                  <h5 className="fw-bold text-dark mb-0">{service.title}</h5>
                  {/* <p className="text-muted">{service.descriptions}</p> */}

                  <div className="d-flex justify-content-between align-items-center gap-2 mt-4">
                    <button
                      type="button"
                      className="btn btn-primary px-4 fw-semibold zb-learn-btn"
                      onClick={() => handleLearnMore(service)}
                    >
                      Learn More
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary rounded-circle zb-arrow-btn"
                      onClick={() => navigate(service.path)}
                      aria-label={service.title}
                    >
                      <FaArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered scrollable>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="fw-bold fs-5">{selectedService?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3 p-md-4">
          <p className="text-muted mb-0 lh-base">{selectedService?.descriptions}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => navigate(selectedService?.path)}>
            Go to Page
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Services;

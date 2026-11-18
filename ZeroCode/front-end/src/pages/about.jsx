import React, { useEffect, useRef } from "react";
import backgroundImage from "../assets/img/image5.png";
import purposeImage from "../assets/img/image4.png";
import breadcrumbImage from "../assets/img/image7.png";
import { FaCheckCircle } from "react-icons/fa";
import director1 from "../assets/img/director1.jpg";
import director2 from "../assets/img/director2.jpg";
import director3 from "../assets/img/director3.jpg";

const points = [
  "Socially responsible impact lender",
  "Digital first approach across products and service offerings",
  "Financial inclusion and increasing financial literacy",
  "Innovator in financial products and processes",
  "Aim to become a complete solution provider to our customers",
  "Environment, social and governance (ESG) compliant",
  "Create value for all stakeholders - Society, Employees, Customer, Organisation and Shareholders",
];

const directors = [
  {
    name: "Mr. Bikash Bhanja",
    role: "Chairman",
    image: director1,
  },
  {
    name: "Mr. Arup Mandal",
    role: "Director",
    image: director2,
  },
  {
    name: "Mr. Basudeb Bej",
    role: "Chief Finance Officer",
    image: director3,
  },
];

/* Subtle animated network canvas for the Stats & Vision banner */
function StatsParticlesCanvas() {
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

    const nodes = Array.from({ length: 24 }, () => ({
      x: Math.random() * (width || 800),
      y: Math.random() * (height || 400),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1.2,
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
        ctx.fillStyle = "rgba(74, 222, 128, 0.32)";
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
            ctx.strokeStyle = `rgba(74, 222, 128, ${0.14 * (1 - dist / 130)})`;
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

function About() {
  return (
    <div className="zb-about-wrapper">
      <style>{`
        .zb-about-wrapper {
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
          50% { transform: translateY(-6px); }
        }

        @keyframes zb-quote-pulse {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        /* Breadcrumb Hero */
        .zb-about-hero {
          position: relative;
          min-height: clamp(220px, 32vw, 380px);
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .zb-about-hero-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          animation: zb-ken-burns 12s ease-in-out alternate infinite;
          z-index: 0;
        }

        .zb-about-hero-overlay {
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

        .zb-about-hero-content {
          position: relative;
          z-index: 2;
        }

        .zb-about-hero-title {
          font-size: clamp(1.75rem, 3.5vw, 2.75rem);
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .zb-breadcrumb .breadcrumb-item + .breadcrumb-item::before {
          color: rgba(255, 255, 255, 0.65);
        }

        /* Surface Cards */
        .zb-about-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
        }

        /* Stats & Vision Banner */
        .zb-stats-banner {
          position: relative;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
        }

        .zb-stats-overlay {
          position: relative;
          z-index: 2;
          background: linear-gradient(
            135deg,
            rgba(9, 21, 43, 0.86) 0%,
            rgba(15, 35, 66, 0.78) 100%
          );
        }

        .zb-stat-box {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 14px;
          padding: 1.25rem 0.75rem;
          height: 100%;
          backdrop-filter: blur(6px);
          transition: transform 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
        }

        .zb-stat-box:hover {
          transform: translateY(-4px);
          border-color: rgba(74, 222, 128, 0.55);
          background: rgba(255, 255, 255, 0.12);
        }

        .zb-stat-value {
          font-size: clamp(1.75rem, 3vw, 2.35rem);
          font-weight: 800;
          font-variant-numeric: tabular-nums;
          color: #4ade80;
          line-height: 1.1;
          margin-bottom: 0.4rem;
        }

        .zb-vision-box {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 14px;
          padding: 2rem 1.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .zb-vision-quote {
          animation: zb-quote-pulse 3s ease-in-out infinite;
        }

        /* Purpose Image & Animated Icons */
        .zb-purpose-img {
          width: 100%;
          max-height: 400px;
          object-fit: cover;
          border-radius: 14px;
          border-bottom-right-radius: 48px;
          animation: zb-float 5.5s ease-in-out infinite;
          box-shadow: 0 12px 26px rgba(15, 23, 42, 0.1);
        }

        .zb-purpose-item {
          transition: transform 0.2s ease;
        }

        .zb-purpose-item:hover {
          transform: translateX(4px);
        }

        .zb-purpose-icon {
          transition: transform 0.25s ease;
        }

        .zb-purpose-item:hover .zb-purpose-icon {
          transform: scale(1.2) rotate(8deg);
        }

        /* Director Cards */
        .zb-director-card {
          background: #f0f7ff;
          border: 1px solid #dbeafe;
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          height: 100%;
        }

        .zb-director-card:hover {
          transform: translateY(-5px);
          border-color: #93c5fd;
          box-shadow: 0 14px 28px rgba(15, 23, 42, 0.09);
        }

        .zb-director-img-wrap {
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #e2e8f0;
          border-radius: 12px;
        }

        .zb-director-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.35s ease;
        }

        .zb-director-card:hover .zb-director-img-wrap img {
          transform: scale(1.06);
        }
      `}</style>

      {/* Full-Width Breadcrumb Section */}
      <div className="w-100 text-white zb-about-hero">
        <img src={breadcrumbImage} alt="" className="zb-about-hero-bg" aria-hidden="true" />
        <div className="zb-about-hero-overlay" />
        <div className="container py-4 zb-about-hero-content">
          <h1 className="zb-about-hero-title mb-2">About Us</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb zb-breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="/" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item active text-white-50" aria-current="page">
                About
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container py-4 py-lg-5">
        {/* About Intro Card */}
        <div className="zb-about-card p-4 p-md-5 mb-4 mb-lg-5">
          <h2 className="text-primary fw-bold mb-3">About ZeroBank</h2>
          <p className="text-secondary lh-lg mb-3">
            Welcome to <strong>ZeroBank</strong> — your trusted partner in modern banking.
            At ZeroBank, we aim to deliver a seamless, secure, and customer-centric banking experience.
            Our mission is to empower individuals and businesses through innovative financial solutions,
            transparency, and cutting-edge technology.
          </p>
          <p className="text-secondary lh-lg mb-0">
            Whether you're managing personal savings or leading a business, ZeroBank is here to support you
            with personalized services, 24/7 support, and a commitment to excellence.
          </p>
        </div>

        {/* Stats & Vision Section */}
        <div
          className="zb-stats-banner text-white mb-4 mb-lg-5"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="zb-stats-overlay p-4 p-md-5">
            <StatsParticlesCanvas />
            <div className="row g-4 align-items-stretch" style={{ position: "relative", zIndex: 2 }}>
              {/* Stats */}
              <div className="col-12 col-lg-6 d-flex flex-column justify-content-center text-center">
                <h2 className="fw-bold mb-4">
                  We are Proud to
                  <br />
                  Serve Our
                </h2>
                <div className="row g-3">
                  <div className="col-12 col-sm-4">
                    <div className="zb-stat-box">
                      <div className="zb-stat-value">9.8</div>
                      <p className="small mb-0 text-white text-opacity-90">
                        Lakh Unique
                        <br />
                        Customers
                      </p>
                    </div>
                  </div>
                  <div className="col-6 col-sm-4">
                    <div className="zb-stat-box">
                      <div className="zb-stat-value">79</div>
                      <p className="small mb-0 text-white text-opacity-90">Branches</p>
                    </div>
                  </div>
                  <div className="col-6 col-sm-4">
                    <div className="zb-stat-box">
                      <div className="zb-stat-value">114</div>
                      <p className="small mb-0 text-white text-opacity-90">
                        Exclusive BC
                        <br />
                        Branch
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vision */}
              <div className="col-12 col-lg-6">
                <div className="zb-vision-box">
                  <h4 className="fw-bold mb-3">Our Vision</h4>
                  <p className="mb-3 text-white text-opacity-90 lh-lg px-md-2">
                    To be a trusted financial services provider and model employer focusing on small and underserved
                    segments through the delivery of digitally focused, affordable products and differentiated customer experience.
                  </p>
                  <div
                    className="text-success fw-bold zb-vision-quote"
                    style={{ fontSize: "2.75rem", lineHeight: 1 }}
                  >
                    “
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Purpose Section */}
        <div className="zb-about-card p-4 p-md-5 mb-4 mb-lg-5">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-6">
              <img src={purposeImage} alt="Purpose" className="zb-purpose-img" />
            </div>
            <div className="col-12 col-lg-6">
              <h3 className="fw-bold mb-4 text-dark">Purpose</h3>
              <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
                {points.map((point, index) => (
                  <li key={index} className="d-flex align-items-start gap-2 zb-purpose-item">
                    <FaCheckCircle
                      className="text-warning flex-shrink-0 mt-1 zb-purpose-icon"
                      size={16}
                    />
                    <span className="text-secondary lh-base">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Board of Directors Section */}
        <div className="zb-about-card p-4 p-md-5">
          <div className="row g-4 justify-content-center">
            {directors.map((director, index) => (
              <div key={index} className="col-12 col-sm-6 col-lg-4 text-center">
                <div className="zb-director-card p-3">
                  <div className="zb-director-img-wrap mb-3">
                    <img src={director.image} alt={director.name} />
                  </div>
                  <h6 className="fw-bold text-dark mb-1">{director.name}</h6>
                  <p className="text-success small fw-semibold mb-0">{director.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

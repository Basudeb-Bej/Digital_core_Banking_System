import React from "react";
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

function About() {
  return (
    <div className="zb-about-wrapper">
      <style>{`
        .zb-about-wrapper {
          background-color: #f8fafc;
          color: #0f172a;
          overflow-x: hidden;
        }

        /* Breadcrumb Hero */
        .zb-about-hero {
          position: relative;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          min-height: clamp(220px, 32vw, 380px);
          display: flex;
          align-items: center;
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

        /* Purpose Image */
        .zb-purpose-img {
          width: 100%;
          max-height: 400px;
          object-fit: cover;
          border-radius: 14px;
          border-bottom-right-radius: 48px;
        }

        /* Director Cards */
        .zb-director-card {
          background: #f0f7ff;
          border: 1px solid #dbeafe;
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          height: 100%;
        }

        .zb-director-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 26px rgba(15, 23, 42, 0.08);
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
        }
      `}</style>

      {/* Full-Width Breadcrumb Section */}
      <div
        className="w-100 text-white zb-about-hero"
        style={{ backgroundImage: `url(${breadcrumbImage})` }}
      >
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
            <div className="row g-4 align-items-stretch">
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
                  <div className="text-success fw-bold" style={{ fontSize: "2.75rem", lineHeight: 1 }}>
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
                  <li key={index} className="d-flex align-items-start gap-2">
                    <FaCheckCircle className="text-warning flex-shrink-0 mt-1" size={16} />
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

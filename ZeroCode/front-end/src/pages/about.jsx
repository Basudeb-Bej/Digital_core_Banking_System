import React from "react";
import backgroundImage from '../assets/img/image5.png';
import purposeImage from '../assets/img/image4.png';
import breadcrumbImage from '../assets/img/image7.png';
import { FaCheckCircle } from "react-icons/fa";
import director1 from '../assets/img/director1.jpg';
import director2 from '../assets/img/director2.jpg';
import director3 from '../assets/img/director3.jpg';

const points = [
  "Socially responsible impact lender",
  "Digital first approach across products and service offerings",
  "Financial inclusion and increasing financial literacy",
  "Innovator in financial products and processes",
  "Aim to become a complete solution provider to our customers",
  "Environment, social and governance (ESG) compliant",
  "Create value for all stakeholders - Society, Employees, Customer, Organisation and Shareholders"
];

const directors = [
  {
    name: "Mr. Bikash Bhanja",
    role: "Chairman",
    image: director1
  },
  {
    name: "Mr. Arup Mandal",
    role: "Director",
    image: director2
  },
  {
    name: "Mr. Basudeb Bej",
    role: "Chief Finance Officer",
    image: director3
  }
];

function About() {
  return (
    <>
      {/* Full-Width Breadcrumb Section */}
      <div
        className="w-100 text-white d-flex align-items-center mb-5"
        style={{
          backgroundImage: `url(${breadcrumbImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '421px'
        }}
      >
        <div className="container py-4">
          <h1 className="fw-bold">About Us</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/" className="text-white text-decoration-none">Home</a>
              </li>
              <li className="breadcrumb-item active text-white" aria-current="page">
                About
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container my-5">
        {/* About Intro Card */}
        <div className="card shadow-sm border-0 mb-5">
          <div className="card-body">
            <h2 className="card-title text-primary fw-bold">About ZeroBank</h2>
            <p className="card-text mt-3">
              Welcome to <strong>ZeroBank</strong> — your trusted partner in modern banking.
              At ZeroBank, we aim to deliver a seamless, secure, and customer-centric banking experience.
              Our mission is to empower individuals and businesses through innovative financial solutions,
              transparency, and cutting-edge technology.
            </p>
            <p className="card-text">
              Whether you're managing personal savings or leading a business, ZeroBank is here to support you
              with personalized services, 24/7 support, and a commitment to excellence.
            </p>
          </div>
        </div>

        {/* Stats, Vision Section */}
        <div
          className="card text-white border-0 shadow"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            borderRadius: '1rem',
            minHeight: '400px'
          }}
        >
          <div className="card-body" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '1rem' }}>
            <div className="row">
              {/* Stats */}
              <div className="col-md-6 text-center d-flex flex-column justify-content-center">
                <h2 className="fw-bold">We are Proud to<br />Serve Our</h2>
                <div className="mt-4">
                  <h1 className="text-success fw-bold">9.8</h1>
                  <p className="mb-4">Lakh Unique<br />Customers</p>
                  <h1 className="text-success fw-bold">79</h1>
                  <p className="mb-4">Branches</p>
                  <h1 className="text-success fw-bold">114</h1>
                  <p className="mb-0">Exclusive BC<br />Branch</p>
                </div>
              </div>

              {/* Vision */}
              <div className="col-md-6 d-flex flex-column justify-content-center text-center">
                <h4 className="fw-bold">Our Vision</h4>
                <p className="mt-3 px-3">
                  To be a trusted financial services provider and model employer focusing on small and underserved
                  segments through the delivery of digitally focused, affordable products and differentiated customer experience.
                </p>
                <div style={{ fontSize: "3rem", marginTop: "1rem" }}>“</div>
              </div>
            </div>
          </div>
        </div>

        {/* Purpose Section */}
        <div className="card-body mt-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '1rem' }}>
          <div className="row align-items-center bg-white text-dark rounded p-4">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src={purposeImage}
                alt="Purpose"
                className="img-fluid rounded"
                style={{ borderBottomRightRadius: '60px' }}
              />
            </div>
            <div className="col-md-6">
              <h3 className="fw-bold mb-4">Purpose</h3>
              <ul className="list-unstyled">
                {points.map((point, index) => (
                  <li key={index} className="d-flex align-items-start mb-3">
                    <FaCheckCircle className="text-warning me-2 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Board of Directors Section */}
        <div className="card-body mt-5" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '1rem' }}>
          <div className="row align-items-center bg-white text-dark rounded p-4">
            {directors.map((director, index) => (
              <div key={index} className="col-md-4 col-sm-6 mb-4 text-center">
                <div
                  className="p-3 h-100"
                  style={{
                    backgroundColor: '#e9f4fc',
                    borderRadius: '20px',
                    minHeight: '100%',
                  }}
                >
                  <img
                    src={director.image}
                    alt={director.name}
                    className="img-fluid rounded mb-3"
                  />
                  <h6 className="fw-bold mb-1">{director.name}</h6>
                  <p className="text-success small mb-0">{director.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

export default About;
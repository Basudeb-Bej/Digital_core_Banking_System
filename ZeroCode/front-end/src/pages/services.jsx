import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";

import breadcrumbImage from "../assets/img/image8.png";
import breakcrumbImage1 from "../assets/img/image10.png";
import breadcrumbImage2 from "../assets/img/image9.png";
import breadcrumbImage3 from "../assets/img/image6.png";
import purposeImage from "../assets/img/image11.png";

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
      descriptions: "Easily manage your savings and current accounts with secure banking solutions, convenient digital access, and reliable support designed to help you organize and grow your finances efficiently.",
      image: breakcrumbImage1,
      path: "/account",
    },
    {
      title: "Loans",
      descriptions: "Get flexible personal, home, or car loans with affordable interest rates, simple documentation, and quick approvals to meet your financial goals without unnecessary stress or delays.",
      image: breadcrumbImage2,
      path: "/loan",
    },
    {
      title: "Insurance",
      descriptions: "Protect your health, life, and valuable assets with comprehensive insurance plans that offer peace of mind, financial security, and long-term protection for you and your loved ones.",
      image: breadcrumbImage3,
      path: "/insurance",
    },
  ];

  const handleLearnMore = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div
        className="w-100 text-white d-flex align-items-center mb-5"
        style={{
          backgroundImage: `url(${breadcrumbImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "421px",
        }}
      >
        <div className="container py-4">
          <h1 className="fw-bold">Services</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li
                className="breadcrumb-item active text-white"
                aria-current="page"
              >
                Services
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mb-5">
        <div className="row align-items-center bg-white text-dark rounded shadow p-4">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={purposeImage}
              alt="Purpose"
              className="img-fluid rounded"
              style={{ borderBottomRightRadius: "60px" }}
            />
          </div>
          <div className="col-md-6">
            <h3 className="fw-bold mb-4">Our Services</h3>
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

      {/* Service Cards */}
      <div className="container">
        <div className="row g-4">
          {servicesData.map((service, index) => (
            <div className="col-md-4" key={index}>
              <div className="card h-100 shadow border-0">
                <img
                  src={service.image}
                  className="card-img-top"
                  alt={service.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5>{service.title}</h5>
                  {/* <p className="text-muted">{service.descriptions}</p> */}

                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleLearnMore(service)}
                    >
                      Learn More
                    </button>
                    <button
                      className="btn btn-outline-primary rounded-circle"
                      style={{ width: "40px", height: "40px" }}
                      onClick={() => navigate(service.path)}
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedService?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedService?.descriptions}</p>
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
    </>
  );
}

export default Services;

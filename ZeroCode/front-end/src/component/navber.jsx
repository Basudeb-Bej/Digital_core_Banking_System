import { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/img/image12.png";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const closeNavbar = () => {
    setIsExpanded(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm fixed-top w-100 py-2" 
         style={{ borderRadius: "50px", margin: "15px auto", left: "0", right: "0", maxWidth: "95%", zIndex: 1030 }}>
      <div className="container">
        {/* Brand */}
        <Link
          className="navbar-brand text-dark fw-bold d-flex align-items-center"
          to="/"
          onClick={closeNavbar}
          style={{ letterSpacing: "1px", textDecoration: "none" }}
        >
          <img 
            src={logoImage} 
            alt="ZeroBank" 
            style={{ height: "40px", marginRight: "10px" }} 
          /> 
          ZeroBank
        </Link>

        {/* Toggler (for mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarNav"
          aria-expanded={isExpanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div 
          className={`collapse navbar-collapse justify-content-end ${isExpanded ? 'show' : ''}`} 
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center">
            <li className="nav-item ms-3 ms-lg-4">
              <Link 
                className="nav-link text-dark fw-medium fw-bold" 
                to="/"
                onClick={closeNavbar}
              >
                Home
              </Link>
            </li>
            <li className="nav-item ms-3 ms-lg-4">
              <Link 
                className="nav-link text-dark fw-medium fw-bold" 
                to="/about"
                onClick={closeNavbar}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item ms-3 ms-lg-4">
              <Link 
                className="nav-link text-dark fw-medium fw-bold" 
                to="/services"
                onClick={closeNavbar}
              >
                Services
              </Link>
            </li>
            <li className="nav-item ms-3 ms-lg-4">
              <button
                className="btn btn-primary text-white fw-medium fw-bold px-4 py-2" style={{ borderRadius: "50px" }}
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
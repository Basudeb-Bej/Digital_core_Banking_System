//front-end/src/pages/adminDashboard/Footer.jsx
import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-3 w-100">
      <Container className="text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} Secure Bank. All rights reserved.</p>
        <small className="d-block">Safe • Secure • Trusted Banking</small>
      </Container>
    </footer>
  );
}

export default Footer;

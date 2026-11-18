import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-auto border-top border-secondary border-opacity-25">
      <Container className="text-center">
        <p className="mb-1 small">
          &copy; {new Date().getFullYear()} Secure Bank. All rights reserved.
        </p>
        <small className="text-white-50">Safe • Secure • Trusted Banking</small>
      </Container>
    </footer>
  );
}

export default Footer;

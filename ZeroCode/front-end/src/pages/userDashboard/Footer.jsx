import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <Container className="text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} Secure Bank. All rights reserved.</p>
        <small>Safe • Secure • Trusted Banking</small>
      </Container>
    </footer>
  );
}

export default Footer;

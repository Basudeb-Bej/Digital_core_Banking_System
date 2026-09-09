import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

function LoginPage() {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <Row className="w-100">
        <Col md={{ span: 4, offset: 4 }}>
          <Card className="shadow-lg border-0 rounded-3">
            <Card.Body className="p-4">
              {/* Bank Logo / Name */}
              <h3 className="text-center mb-4 fw-bold text-primary">Secure Bank</h3>
              <h5 className="text-center mb-4">Customer Login</h5>

              {/* Login Form */}
              <Form>
                <Form.Group className="mb-3" controlId="formCustomerID">
                  <Form.Label>Customer ID / Email</Form.Label>
                  <Form.Control type="text" placeholder="Enter your Customer ID or Email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" />
                </Form.Group>

                <div className="d-grid mb-3">
                  <Button variant="primary" type="submit" className="fw-semibold">
                    Login
                  </Button>
                </div>
              </Form>

              {/* Links */}
              <div className="d-flex justify-content-between">
                <a href="#forgot" className="text-decoration-none">
                  Forgot Password?
                </a>
                <a href="#register" className="text-decoration-none">
                  New User? Register
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;

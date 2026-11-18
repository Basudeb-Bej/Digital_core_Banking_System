// front-end/src/pages/adminDashboard/PendingAccounts.jsx
import React, { useEffect, useState } from "react";
import adminApi from "../../api/adminApi";
import { FaCheckCircle, FaBan, FaUser, FaSearch } from "react-icons/fa";
import { Spinner, Table, Button, Form, InputGroup, Alert, Modal } from "react-bootstrap";

export default function AdminAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [processingId, setProcessingId] = useState(null);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const fetchPendingAccounts = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("/accounts/pending");
      setAccounts(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching pending accounts:", err);
      setError("Failed to fetch pending accounts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingAccounts();
  }, []);

  const handleApprove = async (id, name) => {
    if (
      !window.confirm(
        `Are you sure you want to approve ${name}'s account?\nAn approval email with account and login credentials will be sent.`
      )
    ) {
      return;
    }

    try {
      setProcessingId(id);
      setError("");
      setSuccessMsg("");

      const res = await adminApi.post(`/accounts/${id}/approve`);
      setSuccessMsg(
        res.data.message || `Account for ${name} approved and login details sent via email.`
      );
      await fetchPendingAccounts();
    } catch (err) {
      console.error("Error approving account:", err);
      setError(err.response?.data?.message || "Failed to approve account.");
    } finally {
      setProcessingId(null);
    }
  };

  const openRejectModal = (account) => {
    setSelectedAccount(account);
    setRejectReason("Submitted KYC documents or information could not be verified.");
    setShowRejectModal(true);
  };

  const confirmReject = async (e) => {
    e.preventDefault();
    if (!selectedAccount) return;

    try {
      setProcessingId(selectedAccount._id);
      setError("");
      setSuccessMsg("");

      const res = await adminApi.post(`/accounts/${selectedAccount._id}/reject`, {
        reason: rejectReason.trim(),
      });

      setSuccessMsg(
        res.data.message ||
          `Account application for ${selectedAccount.fullName} rejected and email notification sent.`
      );
      setShowRejectModal(false);
      setSelectedAccount(null);
      await fetchPendingAccounts();
    } catch (err) {
      console.error("Error rejecting account:", err);
      setError(err.response?.data?.message || "Failed to reject account.");
    } finally {
      setProcessingId(null);
    }
  };

  const filteredAccounts = accounts.filter((acc) => {
    const term = searchTerm.toLowerCase();
    return (
      acc.fullName?.toLowerCase().includes(term) ||
      acc.email?.toLowerCase().includes(term) ||
      acc.mobile?.toString().includes(term) ||
      acc.accountType?.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="text-center mt-5 py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Loading pending accounts...</p>
      </div>
    );
  }

  return (
    <div className="container py-3 py-md-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <h3 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
          <FaUser className="text-primary flex-shrink-0" /> Admin — Pending Account Requests
        </h3>

        <InputGroup style={{ maxWidth: "350px" }} className="w-100">
          <InputGroup.Text className="bg-white">
            <FaSearch className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search by name, email, type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      {successMsg && (
        <Alert variant="success" dismissible onClose={() => setSuccessMsg("")}>
          {successMsg}
        </Alert>
      )}
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <div className="card border shadow-sm rounded-4 overflow-hidden">
        <Table striped hover responsive className="align-middle mb-0">
          <thead className="table-dark text-center">
            <tr>
              <th className="text-nowrap">#</th>
              <th className="text-nowrap">Full Name</th>
              <th className="text-nowrap">Email</th>
              <th className="text-nowrap">Mobile</th>
              <th className="text-nowrap">Account Type</th>
              <th className="text-nowrap">Date</th>
              <th className="text-nowrap">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map((acc, index) => {
                const isProcessing = processingId === acc._id;

                return (
                  <tr key={acc._id}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center fw-semibold text-nowrap">{acc.fullName}</td>
                    <td className="text-center text-nowrap">{acc.email}</td>
                    <td className="text-center text-nowrap">{acc.mobile}</td>
                    <td className="text-center text-nowrap">
                      <span className="badge bg-info text-dark">
                        {acc.accountType || "Savings"}
                      </span>
                    </td>
                    <td className="text-center text-nowrap">
                      {new Date(acc.createdAt).toLocaleDateString()}
                    </td>
                    <td className="text-center text-nowrap">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleApprove(acc._id, acc.fullName)}
                        className="me-2"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-1" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <FaCheckCircle className="me-1" /> Approve
                          </>
                        )}
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => openRejectModal(acc)}
                        disabled={isProcessing}
                      >
                        <FaBan className="me-1" /> Reject
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">
                  No pending requests found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Reject Reason Modal */}
      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger fw-bold fs-5">
            <FaBan className="me-2" /> Reject Account Application
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={confirmReject}>
          <Modal.Body>
            <p>
              Reject application for <strong>{selectedAccount?.fullName}</strong> (
              {selectedAccount?.email}).
            </p>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Reason for Rejection{" "}
                <span className="text-muted small">(sent to applicant via email)</span>:
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g. Uploaded documents are not clear or could not be verified."
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowRejectModal(false)}
              disabled={Boolean(processingId)}
            >
              Cancel
            </Button>
            <Button variant="danger" type="submit" disabled={Boolean(processingId)}>
              {processingId ? (
                <>
                  <Spinner animation="border" size="sm" className="me-1" />
                  Rejecting & Sending Email...
                </>
              ) : (
                "Confirm & Send Rejection Email"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

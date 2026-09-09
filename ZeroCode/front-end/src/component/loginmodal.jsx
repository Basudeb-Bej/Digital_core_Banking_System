// front-end/src/component/loginmodal.jsx
import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaArrowLeft,
  FaPaperPlane,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const LoginModal = () => {
  const [activeTab, setActiveTab] = useState("user");
  // Toggle between "login" view and "forgot" contact view
  const [view, setView] = useState("login");

  const [formData, setFormData] = useState({
    user: { userId: "", password: "" },
    admin: { username: "", password: "" },
  });

  // Contact / Forgot Password form state
  const [contactData, setContactData] = useState({
    name: "",
    userId: "",
    email: "",
    phone: "",
    issue: "I forgot my password and cannot access my account. Please help me reset it.",
  });

  const [loading, setLoading] = useState(false);
  const [sendingContact, setSendingContact] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const closeLoginModal = () => {
    const modalElement = document.getElementById("loginModal");

    if (modalElement && window.bootstrap?.Modal) {
      const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }

    document.body.classList.remove("modal-open");
    document.body.style.removeProperty("padding-right");
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => backdrop.remove());

    // Reset view back to login for the next time it opens
    setView("login");
    setError("");
    setSuccessMsg("");
  };

  const handleChange = (role, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [role]: { ...prev[role], [field]: value },
    }));
  };

  /* =====================================
     HANDLE LOGIN
  ===================================== */
  const handleSubmit = async (role) => {
    setLoading(true);
    setError("");

    try {
      let payload = {};

      if (role === "admin") {
        payload = {
          username: formData.admin.username,
          password: formData.admin.password,
          role: "admin",
        };
      } else {
        payload = {
          username: formData.user.userId,
          password: formData.user.password,
          role: "user",
        };
      }

      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        payload
      );

      if (response.data && response.data.user) {
        const { _id, id, username, role: userRole } = response.data.user;
        const userId = _id || id;

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", userId);
        if (userRole === "admin") {
          localStorage.setItem("adminId", userId);
        }
        localStorage.setItem("username", username);
        localStorage.setItem("fullName", response.data.user.fullName || "");
        localStorage.setItem("role", userRole);
        localStorage.setItem("email", response.data.user.email || "");
        localStorage.setItem("accNo", response.data.user.accNo || "");

        closeLoginModal();

        if (userRole === "admin") navigate("/adminDashboard", { replace: true });
        else if (userRole === "user") navigate("/userDashboard", { replace: true });
        else navigate("/");
      } else {
        setError("Invalid response format from server.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================
     HANDLE CONTACT / FORGOT PASSWORD
  ===================================== */
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSendingContact(true);
    setError("");
    setSuccessMsg("");

    try {
      const payload = {
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        subject: `Password Recovery Assistance.\n\n\n User ID/Account Number: ${contactData.userId || "Not Provided"}`,
        //message: `Customer User ID / Account Number: ${contactData.userId || "Not Specified"}\n\nIssue Description:\n${contactData.issue}`,
        message: `${contactData.issue}`,
      };

      const res = await axios.post(`${BASE_URL}/api/users/contact`, payload);

      setSuccessMsg(
        res.data.message ||
          "Your request has been submitted. The ZeroBank support team will contact you directly."
      );
      setContactData({
        name: "",
        userId: "",
        email: "",
        phone: "",
        issue: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit request. Please try again.");
    } finally {
      setSendingContact(false);
    }
  };

  const tabConfig = {
    user: {
      bg: "#f5f9ff",
      fields: [
        { id: "userId", label: "Customer user ID", type: "text", icon: <FaUser /> },
        { id: "password", label: "Password", type: "password", icon: <FaLock /> },
      ],
    },
    admin: {
      bg: "#fef4f8",
      fields: [
        { id: "username", label: "Username", type: "text", icon: <FaUser /> },
        { id: "password", label: "Password", type: "password", icon: <FaLock /> },
      ],
    },
  };

  const currentTab = tabConfig[activeTab];

  return (
    <div className="modal fade" id="loginModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0 rounded-4 overflow-hidden">
          {/* Modal Header */}
          <div className="modal-header border-0 bg-light d-flex justify-content-between align-items-center">
            <h5 className="modal-title fw-bold text-primary mb-0">
              {view === "login" ? "ZeroBank Login" : "Password Recovery Support"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={closeLoginModal}
            ></button>
          </div>

          {/* Modal Body with internal scrolling */}
          <div
            className="modal-body p-4"
            style={{
              backgroundColor: view === "login" ? currentTab.bg : "#f8f9fa",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            {/* Feedback Alerts */}
            {error && <div className="alert alert-danger py-2 text-center small">{error}</div>}
            {successMsg && <div className="alert alert-success py-2 text-center small">{successMsg}</div>}

            {/* ====================================================
                VIEW 1: STANDARD LOGIN
            ==================================================== */}
            {view === "login" ? (
              <>
                {/* Role Tabs */}
                <ul className="nav nav-pills mb-4 justify-content-center">
                  {Object.keys(tabConfig).map((role) => (
                    <li className="nav-item" key={role}>
                      <button
                        className={`nav-link px-4 ${activeTab === role ? "active fw-semibold" : ""}`}
                        onClick={() => setActiveTab(role)}
                        disabled={loading}
                      >
                        {role === "user" ? "User" : "Admin"}
                      </button>
                    </li>
                  ))}
                </ul>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(activeTab);
                  }}
                >
                  {currentTab.fields.map((field) => (
                    <div className="mb-3" key={field.id}>
                      <label htmlFor={`${activeTab}-${field.id}`} className="form-label small fw-semibold">
                        {field.label}
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">{field.icon}</span>
                        <input
                          type={field.type}
                          className="form-control"
                          id={`${activeTab}-${field.id}`}
                          placeholder={`Enter ${field.label}`}
                          value={formData[activeTab][field.id]}
                          onChange={(e) => handleChange(activeTab, field.id, e.target.value)}
                          disabled={loading}
                          required
                        />
                      </div>
                    </div>
                  ))}

                  <div className="d-flex justify-content-between align-items-center mt-4">
                    {/* Trigger Contact / Forgot Password View */}
                    <button
                      type="button"
                      className="btn btn-link p-0 small text-primary text-decoration-none"
                      onClick={() => {
                        setError("");
                        setSuccessMsg("");
                        // Auto-fill User ID if already typed
                        setContactData((prev) => ({
                          ...prev,
                          userId: formData[activeTab]?.userId || formData[activeTab]?.username || "",
                        }));
                        setView("forgot");
                      }}
                    >
                      Forgot Password?
                    </button>

                    <div>
                      <button
                        type="button"
                        className="btn btn-light me-2"
                        data-bs-dismiss="modal"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                      </button>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              /* ====================================================
                 VIEW 2: FORGOT PASSWORD / CONTACT SUPPORT FORM
              ==================================================== */
              <form onSubmit={handleContactSubmit}>
                <p className="text-muted small mb-3">
                  Please provide your registered account details below. A representative from the <strong>ZeroBank</strong> support team will contact you directly to assist with password recovery.
                </p>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Full Name *</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaUser />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your full name"
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Customer User ID / Account Number *</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaUser />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 2012345678"
                      value={contactData.userId}
                      onChange={(e) => setContactData({ ...contactData, userId: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Registered Email Address *</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="name@example.com"
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Registered Mobile Number *</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaPhone />
                    </span>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="e.g. 9876543210"
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Describe Your Issue *</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Describe your issue..."
                    value={contactData.issue}
                    onChange={(e) => setContactData({ ...contactData, issue: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-4 pt-2 border-top">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
                    onClick={() => {
                      setError("");
                      setSuccessMsg("");
                      setView("login");
                    }}
                    disabled={sendingContact}
                  >
                    <FaArrowLeft /> Back to Login
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary d-flex align-items-center gap-2"
                    disabled={sendingContact}
                  >
                    {sendingContact ? (
                      "Submitting..."
                    ) : (
                      <>
                        <FaPaperPlane /> Send to ZeroBank
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
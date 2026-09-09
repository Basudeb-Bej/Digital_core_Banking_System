// src/pages/userDashboard/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaAddressCard,
  FaUniversity,
  FaLanguage,
  FaCamera,
  FaLock
} from "react-icons/fa";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import defaultProfile from "../../assets/img/profile.png";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Profile() {
  const userId = localStorage.getItem("userId");

  const [profile, setProfile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  /* ===============================
     FETCH PROFILE
  =============================== */
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`${BASE_URL}/api/users/${userId}`)
      .then((res) => {
        setProfile(res.data);
        setImageError(false);
      })
      .catch((err) => {
        console.error(err);
        setStatusMessage({ type: "danger", text: "Failed to load profile." });
      });
  }, [userId]);

  /* ===============================
     IMAGE UPLOAD ONLY
  =============================== */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatusMessage({ type: "danger", text: "Please upload a valid image file." });
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      setStatusMessage({ type: "", text: "" });

      const res = await axios.put(
        `${BASE_URL}/api/users/profile-image/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setProfile((prev) => ({
        ...prev,
        photo: res.data.photo,
      }));
      setImageError(false);

      setStatusMessage({ type: "success", text: "Profile image updated successfully!" });
    } catch (err) {
      console.error(err);
      setStatusMessage({
        type: "danger",
        text: err.response?.data?.message || "Failed to update profile photo.",
      });
    } finally {
      setUploading(false);
    }
  };

  if (!profile) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading profile...</p>
      </div>
    );
  }

  const profileDetails = [
    { icon: <FaUser className="text-primary" />, label: "Full Name", value: profile.fullName || "—" },
    { icon: <FaEnvelope className="text-info" />, label: "Email Address", value: profile.email || "—" },
    { icon: <FaPhone className="text-success" />, label: "Mobile Number", value: profile.mobile || "—" },
    {
      icon: <FaIdCard className="text-warning" />,
      label: "Aadhaar Number",
      value: profile.aadhaar ? `•••• •••• ${profile.aadhaar.slice(-4)}` : "—"
    },
    { icon: <FaIdCard className="text-secondary" />, label: "PAN Number", value: profile.pan || "—" },
    {
      icon: <FaUniversity className="text-purple" />,
      label: "Account Type",
      value: profile.accountType || "Savings Account",
    },
    {
      icon: <FaAddressCard className="text-danger" />,
      label: "Address",
      value: [profile.city, profile.state].filter(Boolean).join(", ") || "—",
    },
    {
      icon: <FaLanguage className="text-dark" />,
      label: "Preferred Language",
      value: profile.language || "English",
    },
  ];

  const hasCustomPhoto = Boolean(profile?.photo && profile.photo.trim() !== "");

  return (
    <div className="container py-5" style={{ maxWidth: "880px" }}>
      {statusMessage.text && (
        <Alert
          variant={statusMessage.type}
          dismissible
          onClose={() => setStatusMessage({ type: "", text: "" })}
          className="mb-4"
        >
          {statusMessage.text}
        </Alert>
      )}

      <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
        {/* Profile Header Banner */}
        <div
          className="bg-primary bg-gradient p-4 text-white position-relative"
          style={{ height: "130px" }}
        />

        <Card.Body className="p-4 pt-0 position-relative">
          {/* Avatar with Camera Icon Overlay */}
          <div className="d-flex flex-column flex-sm-row align-items-sm-end justify-content-between mb-4">
            <div className="position-relative" style={{ marginTop: "-65px" }}>
              <div
                className="position-relative rounded-circle border border-4 border-white shadow overflow-hidden d-flex align-items-center justify-content-center bg-light"
                style={{ width: "120px", height: "120px" }}
              >
                {hasCustomPhoto && !imageError ? (
                  <img
                    src={`${BASE_URL}${profile.photo}`}
                    alt="Profile"
                    onError={() => setImageError(true)}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : defaultProfile ? (
                  <img
                    src={defaultProfile}
                    alt="Default Profile"
                    onError={() => setImageError(true)}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  /* Fallback icon if no default image asset is available */
                  <FaUser size={52} className="text-secondary opacity-75" />
                )}

                {uploading && (
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
                  >
                    <Spinner animation="border" size="sm" variant="light" />
                  </div>
                )}
              </div>

              {/* Upload Action Button Overlay */}
              <label
                className="btn btn-sm btn-primary rounded-circle position-absolute d-flex align-items-center justify-content-center shadow-sm"
                style={{
                  bottom: "4px",
                  right: "4px",
                  width: "36px",
                  height: "36px",
                  cursor: uploading ? "not-allowed" : "pointer",
                }}
                title="Change profile picture"
              >
                <FaCamera size={14} />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  disabled={uploading}
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            <div className="mt-3 mt-sm-0 text-sm-end">
              <span className="badge bg-light text-secondary border px-3 py-2 rounded-pill">
                <FaLock className="me-1" size={11} /> Verified Account Details (Read-only)
              </span>
            </div>
          </div>

          <div>
            <h4 className="fw-bold mb-1">{profile.fullName || "User Profile"}</h4>
            <p className="text-muted small mb-4">{profile.email}</p>
          </div>

          {/* User Details Grid */}
          <div className="row g-3">
            {profileDetails.map((item, idx) => (
              <div key={idx} className="col-md-6">
                <div className="d-flex align-items-center p-3 rounded-3 bg-light border h-100">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3 bg-white shadow-sm me-3"
                    style={{ width: "44px", height: "44px", flexShrink: 0 }}
                  >
                    {item.icon}
                  </div>
                  <div className="text-truncate">
                    <div className="text-muted" style={{ fontSize: "0.75rem", textTransform: "uppercase" }}>
                      {item.label}
                    </div>
                    <div className="fw-semibold text-dark text-truncate">{item.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="d-flex justify-content-end mt-4 pt-3 border-top">
            <Button variant="outline-primary" href="/userDashboard/settings">
              Change Password & Security
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
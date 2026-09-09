// front-end/src/pages/adminDashboard/Profile.jsx
import { useEffect, useState, useRef } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaVenusMars,
  FaIdCard,
  FaAddressCard,
  FaEdit,
  FaCamera,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Spinner, Alert, Button, Form, Modal } from "react-bootstrap";
import adminApi from "../../api/adminApi";
import defaultAvatar from "../../assets/img/director1.jpg";

export default function Profile() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");

  // Error fallback states for images
  const [imageError, setImageError] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const fileInputRef = useRef(null);

  const initialFormState = {
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    aadhaar: "",
    pan: "",
    address: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("/profile");
      setAdmin(res.data);
      setImageError(false);
      setFormData({
        fullName: res.data.fullName || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        dob: res.data.dob || "",
        gender: res.data.gender || "",
        aadhaar: res.data.aadhaar || "",
        pan: res.data.pan || "",
        address: res.data.address || "",
        image: res.data.image || "",
      });
      setError("");
    } catch (err) {
      console.error("Error fetching admin profile:", err);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Convert image to Base64
  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setSaveError("Please select a valid image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setSaveError("Image file size should be less than 2MB.");
      return;
    }

    setSaveError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
      setPreviewError(false);
    };
    reader.readAsDataURL(file);
  };

  // Direct image change from avatar click
  const handleDirectAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image file size should be less than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;
      try {
        setSaving(true);
        const res = await adminApi.put("/profile", { image: base64String });
        setAdmin(res.data.admin);
        setFormData((prev) => ({ ...prev, image: base64String }));
        setImageError(false);
        setSaveSuccess("Profile picture updated!");
        setTimeout(() => setSaveSuccess(""), 3000);
      } catch (err) {
        console.error("Error updating image:", err);
        alert(err.response?.data?.message || "Failed to update profile picture.");
      } finally {
        setSaving(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSaveError("");
      const res = await adminApi.put("/profile", formData);
      setAdmin(res.data.admin);
      setImageError(false);
      setSaveSuccess("Profile updated successfully!");
      setShowEdit(false);
      setTimeout(() => setSaveSuccess(""), 3000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setSaveError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5 py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <Alert variant="danger" className="text-center">{error}</Alert>
      </div>
    );
  }

  const profileDetails = [
    { icon: <FaUser />, label: "Name", value: admin?.fullName || "Not set" },
    { icon: <FaEnvelope />, label: "Email", value: admin?.email || "Not set" },
    { icon: <FaPhone />, label: "Phone", value: admin?.phone || "Not set" },
    { icon: <FaBirthdayCake />, label: "DOB", value: admin?.dob || "Not set" },
    { icon: <FaVenusMars />, label: "Gender", value: admin?.gender || "Not set" },
    { icon: <FaIdCard />, label: "Aadhaar", value: admin?.aadhaar || "Not set" },
    { icon: <FaIdCard />, label: "PAN", value: admin?.pan || "Not set" },
    { icon: <FaAddressCard />, label: "Address", value: admin?.address || "Not set" },
  ];

  const mainAvatarSrc = admin?.image || defaultAvatar;
  const previewAvatarSrc = formData.image || admin?.image || defaultAvatar;

  return (
    <div className="container py-4" style={{ minHeight: "100vh" }}>
      {saveSuccess && (
        <Alert variant="success" onClose={() => setSaveSuccess("")} dismissible>
          {saveSuccess}
        </Alert>
      )}

      <div className="card shadow-sm border-0 p-4 rounded-4" style={{ backgroundColor: "#f8f9fa" }}>
        {/* Header with Avatar and Actions */}
        <div className="d-flex flex-wrap justify-content-between align-items-center pb-3 mb-4 border-bottom gap-3">
          <div className="d-flex align-items-center gap-3">
            {/* Clickable Avatar Container */}
            <div className="position-relative" style={{ width: "85px", height: "85px" }}>
              <div
                className="rounded-circle border border-2 border-white shadow-sm overflow-hidden d-flex align-items-center justify-content-center bg-white"
                style={{ width: "85px", height: "85px" }}
              >
                {mainAvatarSrc && !imageError ? (
                  <img
                    src={mainAvatarSrc}
                    alt="Profile"
                    onError={() => setImageError(true)}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <FaUser size={38} className="text-secondary opacity-75" />
                )}
              </div>

              <button
                type="button"
                className="btn btn-sm btn-primary rounded-circle position-absolute bottom-0 end-0 p-1 shadow"
                title="Change Photo"
                onClick={() => fileInputRef.current?.click()}
                style={{ width: "28px", height: "28px", lineHeight: "1" }}
              >
                <FaCamera size={13} />
              </button>

              {/* Hidden file input for quick avatar update */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleDirectAvatarChange}
                style={{ display: "none" }}
              />
            </div>

            <div>
              <h3 className="fw-bold mb-0 text-dark">
                {admin?.fullName || admin?.username || "Admin Profile"}
              </h3>
              <span className="badge bg-primary text-capitalize">
                {admin?.role || "Admin"}
              </span>
            </div>
          </div>

          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              className="d-flex align-items-center gap-2"
              onClick={() => {
                setPreviewError(false);
                setShowEdit(true);
              }}
            >
              <FaEdit /> Edit Profile
            </Button>
            <Link to="/adminDashboard/settings" className="btn btn-primary">
              Change Password
            </Link>
          </div>
        </div>

        {/* Profile Info Cards */}
        <div className="row g-3">
          {profileDetails.map((item, idx) => (
            <div key={idx} className="col-md-6">
              <div className="d-flex align-items-center p-3 rounded-3 shadow-sm bg-white border">
                <div
                  className="d-flex justify-content-center align-items-center rounded-circle me-3 text-primary"
                  style={{ width: "48px", height: "48px", backgroundColor: "#e7f1ff" }}
                >
                  <span className="fs-5">{item.icon}</span>
                </div>
                <div>
                  <div className="small text-muted">{item.label}</div>
                  <div className="fw-semibold text-dark">{item.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {saveError && <Alert variant="danger">{saveError}</Alert>}
          <Form onSubmit={handleSave}>
            {/* Modal Image Upload & Preview */}
            <div className="text-center mb-4">
              <div
                className="rounded-circle border border-2 shadow-sm mx-auto mb-2 overflow-hidden d-flex align-items-center justify-content-center bg-white"
                style={{ width: "95px", height: "95px" }}
              >
                {previewAvatarSrc && !previewError ? (
                  <img
                    src={previewAvatarSrc}
                    alt="Preview"
                    onError={() => setPreviewError(true)}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <FaUser size={44} className="text-secondary opacity-75" />
                )}
              </div>

              <div>
                <Form.Label className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-2 cursor-pointer">
                  <FaCamera /> Choose New Photo
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageFile}
                    style={{ display: "none" }}
                  />
                </Form.Label>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="text"
                name="dob"
                placeholder="e.g. 17 June 2003"
                value={formData.dob}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Aadhaar</Form.Label>
              <Form.Control
                type="text"
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleChange}
                placeholder="Enter Aadhaar number"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>PAN</Form.Label>
              <Form.Control
                type="text"
                name="pan"
                value={formData.pan}
                onChange={handleChange}
                placeholder="Enter PAN number"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 pt-2 border-top">
              <Button
                variant="secondary"
                onClick={() => setShowEdit(false)}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
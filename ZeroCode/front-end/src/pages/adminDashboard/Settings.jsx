//front-end/src/pages/adminDashboard/Settings.jsx
import { useState } from "react";
import adminApi from "../../api/adminApi";
import { Alert, Spinner } from "react-bootstrap";

export default function AdminChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = formData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return setAlert({
        type: "danger",
        message: "Please fill in all fields.",
      });
    }

    if (newPassword !== confirmPassword) {
      return setAlert({
        type: "danger",
        message: "Passwords do not match.",
      });
    }

    try {
      setLoading(true);
      setAlert({ type: "", message: "" });

      const res = await adminApi.put("/change-password", {
        oldPassword,
        newPassword,
      });

      setAlert({ type: "success", message: res.data.message });
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Error changing password.";
      setAlert({ type: "danger", message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-4">
          <h4 className="fw-bold mb-4 text-center">Change Admin Password</h4>

          {alert.message && (
            <Alert
              variant={alert.type}
              onClose={() => setAlert({ type: "", message: "" })}
              dismissible
            >
              {alert.message}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Old Password</label>
              <input
                type="password"
                className="form-control"
                name="oldPassword"
                placeholder="Enter old password"
                value={formData.oldPassword}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" /> Updating...
                </>
              ) : (
                "Change Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
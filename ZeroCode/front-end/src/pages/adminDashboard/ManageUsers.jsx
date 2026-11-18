// front-end/src/pages/adminDashboard/ManageUsers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserEdit, FaTrashAlt, FaPlus, FaUsers } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function ManageUsers() {
  const [records, setRecords] = useState([]);
  const [entityType, setEntityType] = useState("users");
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const getAuthConfig = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/${entityType}`, getAuthConfig());

      const filtered = Array.isArray(res.data)
        ? res.data.filter((item) => item.role === "user")
        : [];

      setRecords(filtered);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [entityType]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingItem
        ? `${BASE_URL}/api/admin/${entityType}/${editingItem._id}`
        : `${BASE_URL}/api/admin/${entityType}`;
      const method = editingItem ? "put" : "post";

      await axios[method](url, formData, getAuthConfig());

      setFormData({ username: "", email: "", password: "", role: "user" });
      setEditingItem(null);
      fetchData();
    } catch (err) {
      console.error("Error saving record:", err);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      username: item.username,
      email: item.email,
      password: "",
      role: item.role,
    });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setFormData({
      username: "",
      email: "",
      password: "",
      role: "user",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/admin/${entityType}/${id}`, getAuthConfig());
      fetchData();
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  };

  return (
    <div className="container py-3 py-md-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold mb-0 d-flex align-items-center gap-2">
          <FaUsers className="text-primary" />
          Manage Users
        </h3>
      </div>

      {/* Add / Edit Form */}
      <div className="card p-3 p-md-4 mb-4 shadow-sm border rounded-4">
        <h5 className="fw-semibold mb-3">{editingItem ? "Edit User" : "Add New User"}</h5>
        <form onSubmit={handleSubmit} className="row g-2">
          <div className="col-12 col-sm-6 col-lg-3">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder={editingItem ? "New Password (optional)" : "Password"}
              value={formData.password}
              onChange={handleChange}
              required={!editingItem}
            />
          </div>

          <div className="col-12 col-sm-6 col-lg-2 d-flex gap-2">
            <button type="submit" className="btn btn-primary w-100">
              {editingItem ? (
                <>
                  <FaUserEdit className="me-1" /> Update
                </>
              ) : (
                <>
                  <FaPlus className="me-1" /> Add
                </>
              )}
            </button>

            {editingItem && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancelEdit}
              >
                X
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Data Table */}
      <div className="card p-3 p-md-4 shadow-sm border rounded-4">
        <h5 className="mb-3 fw-semibold">All Users</h5>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="text-nowrap">#</th>
                <th className="text-nowrap">Username</th>
                <th className="text-nowrap">Email</th>
                <th className="text-nowrap">Role</th>
                <th className="text-nowrap">Created</th>
                <th className="text-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 ? (
                records.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td className="text-nowrap fw-semibold">{item.username}</td>
                    <td className="text-nowrap">{item.email}</td>
                    <td className="text-nowrap">{item.role}</td>
                    <td className="text-nowrap">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="text-nowrap">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-warning me-2"
                        onClick={() => handleEdit(item)}
                        aria-label="Edit user"
                      >
                        <FaUserEdit />
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(item._id)}
                        aria-label="Delete user"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

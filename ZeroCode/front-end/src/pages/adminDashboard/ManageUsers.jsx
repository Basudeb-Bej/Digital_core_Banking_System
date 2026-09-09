// front-end/src/pages/adminDashboard/ManageUsers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserEdit, FaTrashAlt, FaPlus, FaUsers } from "react-icons/fa";

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

  // Helper to get auth headers (adjust "token" or "adminToken" to your storage key)
  const getAuthConfig = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  };

  // Fetch Data
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/admin/${entityType}`,
        getAuthConfig()
      );

      // Filter only users (exclude employee and admin)
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

  // Handle input
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Create / Update record
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingItem
        ? `http://localhost:8000/api/admin/${entityType}/${editingItem._id}`
        : `http://localhost:8000/api/admin/${entityType}`;
      const method = editingItem ? "put" : "post";

      await axios[method](url, formData, getAuthConfig());

      // Reset form
      setFormData({ username: "", email: "", password: "", role: "user" });
      setEditingItem(null);
      fetchData();
    } catch (err) {
      console.error("Error saving record:", err);
    }
  };

  // Edit record
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      username: item.username,
      email: item.email,
      password: "",
      role: item.role,
    });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingItem(null);
    setFormData({
      username: "",
      email: "",
      password: "",
      role: "user",
    });
  };

  // Delete record
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(
        `http://localhost:8000/api/admin/${entityType}/${id}`,
        getAuthConfig()
      );
      fetchData();
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold mb-0">
          <FaUsers className="me-2 text-primary" />
          Manage Users
        </h2>
      </div>

      {/* Add / Edit Form */}
      <div className="card p-3 mb-4 shadow-sm rounded-4">
        <h5 className="fw-semibold">
          {editingItem ? "Edit User" : "Add New User"}
        </h5>
        <form onSubmit={handleSubmit} className="row g-2 mt-2">
          <div className="col-md-3">
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

          <div className="col-md-3">
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

          <div className="col-md-3">
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

          <div className="col-md-2 d-flex gap-1">
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
      <div className="card p-3 shadow-sm rounded-4">
        <h5 className="mb-2">All Users</h5>
        <table className="table table-striped mt-2">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-warning me-2"
                      onClick={() => handleEdit(item)}
                    >
                      <FaUserEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
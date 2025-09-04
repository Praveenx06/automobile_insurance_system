import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    userId: "",
    name: "",
    address: "",
    email: "",
    password: "",
    dateOfBirth: "",
    age: "",
    aadhaarNumber: "",
    panNumber: "",
    roles: "USER"
  });
  const [searchId, setSearchId] = useState("");
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);

  // Load all users
  const loadUsers = () => {
    UserService.getAll()
      .then(res => setUsers(res.data || []))
      .catch(() => setMessage("Failed to load users"));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save (Add / Update)
  const handleSave = (e) => {
    e.preventDefault();
    const action = editing ? UserService.update : UserService.add;
    action(form)
      .then(() => {
        setMessage(editing ? "User updated successfully" : "User added successfully");
        resetForm();
        loadUsers();
      })
      .catch(() => setMessage("Operation failed"));
  };

  // Reset form
  const resetForm = () => {
    setForm({
      userId: "",
      name: "",
      address: "",
      email: "",
      password: "",
      dateOfBirth: "",
      age: "",
      aadhaarNumber: "",
      panNumber: "",
      roles: "USER"
    });
    setEditing(false);
  };

  // Edit user
  const onEdit = (u) => {
    setForm(u);
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete user
  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      UserService.delete(id)
        .then(() => {
          setMessage("User deleted successfully");
          loadUsers();
        })
        .catch(() => setMessage("Delete failed"));
    }
  };

  // Search user by ID
  const handleSearch = () => {
    if (!searchId) return;
    UserService.getById(searchId)
      .then(res => setUsers([res.data]))
      .catch(() => setMessage("User not found"));
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">User Management</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}

      {/* Add / Update Form */}
      <div className="card shadow mb-4">
        <div className="card-body">
          <h5>{editing ? "Edit User" : "Add New User"}</h5>
          <form onSubmit={handleSave} className="row g-3">
            <div className="col-md-3">
              <input type="number" name="userId" placeholder="User ID" value={form.userId} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-3">
              <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-3">
              <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-3">
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-3">
              <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-3">
              <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-2">
              <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-3">
              <input type="text" name="aadhaarNumber" placeholder="Aadhaar (16 digits)" value={form.aadhaarNumber} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-3">
              <input type="text" name="panNumber" placeholder="PAN" value={form.panNumber} onChange={handleChange} className="form-control" required />
            </div>

            {/* Role Dropdown */}
            <div className="col-md-2">
              <select name="roles" value={form.roles} onChange={handleChange} className="form-control">
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            <div className="col-12 d-flex gap-2">
              <button className="btn btn-success">{editing ? "Update" : "Add"} User</button>
              {editing && <button type="button" onClick={resetForm} className="btn btn-secondary">Cancel</button>}
            </div>
          </form>
        </div>
      </div>

      {/* Search by ID */}
      <div className="mb-3 d-flex">
        <input type="number" placeholder="Enter User ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} className="form-control me-2" />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        <button className="btn btn-warning ms-2" onClick={loadUsers}>Reset</button>
      </div>

      {/* User List */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Aadhaar</th>
              <th>PAN</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.userId}>
                <td>{u.userId}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.aadhaarNumber}</td>
                <td>{u.panNumber}</td>
                <td>{u.roles}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit(u)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => onDelete(u.userId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <p className="text-center">No users found.</p>}
      </div>
    </div>
  );
}

export default UserPage;

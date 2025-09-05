import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import bg from "../../assets/adminuser.jpg";

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

  const loadUsers = () => {
    UserService.getAll()
      .then((res) => setUsers(res.data || []))
      .catch(() => setMessage("Failed to load users"));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const action = editing ? UserService.update : UserService.add;
    action(form)
      .then(() => {
        setMessage(editing ? " User updated successfully" : " User added successfully");
        resetForm();
        loadUsers();
      })
      .catch(() => setMessage(" Operation failed"));
  };

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

  const onEdit = (u) => {
    setForm(u);
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = (id) => {
    if (window.confirm("Delete this user?")) {
      UserService.delete(id)
        .then(() => {
          setMessage(" User deleted successfully");
          loadUsers();
        })
        .catch(() => setMessage(" Delete failed"));
    }
  };

  const handleSearch = () => {
    if (!searchId) return;
    UserService.getById(searchId)
      .then((res) => setUsers([res.data]))
      .catch(() => setMessage(" User not found"));
  };

  return (
    <div
         className="d-flex flex-column align-items-center"
         style={{
           backgroundImage: `url(${bg})`,
           backgroundSize: "cover",
           backgroundPosition: "center",
           backgroundRepeat: "no-repeat",
           minHeight: "100vh",
           width: "100vw",
           overflow: "auto",
           padding: "24px"
         }}
       >
      <div style={{ width: "100%", maxWidth: "1100px" }}>
        {/* Heading */}
        <h1
          className="fw-bold text-center mb-4"
          style={{ color: "black", fontSize: "2.5rem", letterSpacing: "2px"  }}
        >
          USER MANAGEMENT
        </h1>

        {/* Message */}
        {message && (
          <div
            className="alert text-center mx-auto"
            style={{
              maxWidth: "600px",
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
            }}
          >
            {message}
          </div>
        )}

        {/* Add / Update Form */}
        <form
          onSubmit={handleSave}
          className="mb-4 p-4 mx-auto"
          style={{
            maxWidth: "1000px",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
          }}
        >
          <div className="row g-3">
            <div className="col-md-3">
              <input
                type="number"
                name="userId"
                placeholder="User ID"
                value={form.userId}
                onChange={handleChange}
                className="form-control rounded-pill"
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="form-control rounded-pill"
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="form-control rounded-pill"
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="form-control rounded-pill"
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="form-control rounded-pill"
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                className="form-control rounded-pill"
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
                className="form-control rounded-pill"
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="aadhaarNumber"
                placeholder="Aadhaar (16 digits)"
                value={form.aadhaarNumber}
                onChange={handleChange}
                className="form-control rounded-pill"
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="panNumber"
                placeholder="PAN"
                value={form.panNumber}
                onChange={handleChange}
                className="form-control rounded-pill"
                required
              />
            </div>

            {/* Role Dropdown */}
            <div className="col-md-2">
              <select
                name="roles"
                value={form.roles}
                onChange={handleChange}
                className="form-control rounded-pill"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            <div className="col-12 d-flex gap-2 mt-2">
              <button className="btn btn-success rounded-pill px-4">
                {editing ? "Update" : "Add"} User
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-secondary rounded-pill px-4"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Search by ID */}
        <div
          className="row g-2 mb-4 mx-auto"
          style={{
            maxWidth: "900px",
            background: "rgba(255,255,255,0.1)",
            padding: "15px",
            borderRadius: "16px",
            backdropFilter: "blur(8px)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.2)"
          }}
        >
          <div className="col-md-6">
            <input
              type="number"
              placeholder="Enter User ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="form-control rounded-pill"
            />
          </div>
          <div className="col-md-3 d-grid">
            <button className="btn btn-primary rounded-pill" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="col-md-3 d-grid">
            <button className="btn btn-warning rounded-pill" onClick={loadUsers}>
              Reset
            </button>
          </div>
        </div>

        {/* User List */}
        {users.length === 0 ? (
          <p className="text-center text-light fw-bold">No users found.</p>
        ) : (
          <div
            className="table-responsive mx-auto"
            style={{
              maxWidth: "1000px",
              background: "rgba(255,255,255,0.12)",
              borderRadius: "16px",
              overflow: "hidden",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
            }}
          >
            <table className="table table-bordered opacity-75 table-blur-transparent table-striped align-middle mb-0">
              <thead className="table-dark text-center">
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
                {users.map((u) => (
                  <tr key={u.userId}>
                    <td className="text-center">{u.userId}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.aadhaarNumber}</td>
                    <td>{u.panNumber}</td>
                    <td className="text-center">{u.roles}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-sm btn-secondary rounded-pill px-3"
                          onClick={() => onEdit(u)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger rounded-pill px-3"
                          onClick={() => onDelete(u.userId)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPage;

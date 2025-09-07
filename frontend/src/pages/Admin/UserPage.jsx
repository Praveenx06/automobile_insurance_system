import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import bg from "../../assets/admincommon.jpg";

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
    roles: "USER",
  });
  const [searchId, setSearchId] = useState("");
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);

  const loadUsers = () => {
    UserService.getAll()
      .then((res) => setUsers(res.data || []))
      .catch(() => setMessage("Failed to load users"));
  };

  useEffect(() => { loadUsers(); }, []);

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
      roles: "USER",
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
    <div className="d-flex flex-column align-items-center" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", minHeight: "100vh", width: "100vw", overflow: "auto", padding: "24px" }}>
      <div className="container" style={{ maxWidth: "1100px" }}>
        {/* Heading */}
        <h1 className="fw-bold text-center mb-4 text-light" style={{ fontSize: "2.5rem" }}>
          --USER MANAGEMENT--
        </h1>

        {/* Message */}
        {message && (
          <div className="alert text-center" style={{ maxWidth: "600px", margin: "0 auto 20px auto", background: "rgba(0,0,0,0.6)", color: "#fff", fontWeight: "bold", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
            {message}
          </div>
        )}

        {/* Add / Update Form */}
        <form onSubmit={handleSave} className="mb-4 p-4" style={{ maxWidth: "900px", margin: "0 auto", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", borderRadius: "16px", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
          <h1 className="text-warning fw-bold" >Add a user or click on edit and update </h1>
          <div className="row g-3">
            <div className="col-md-3">
              <input type="number" name="userId" placeholder="User ID" value={form.userId} onChange={handleChange} className="form-control rounded-pill" required />
            </div>
            <div className="col-md-3">
              <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="form-control rounded-pill" required />
            </div>
            <div className="col-md-3">
              <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} className="form-control rounded-pill" required />
            </div>
            <div className="col-md-3">
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="form-control rounded-pill" required />
            </div>
            <div className="col-md-3">
              <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="form-control rounded-pill" required />
            </div>
            <div className="col-md-3">
              <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} className="form-control rounded-pill" required />
            </div>
            <div className="col-md-2">
              <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} className="form-control rounded-pill" required />
            </div>
            <div className="col-md-3">
              <input type="text" name="aadhaarNumber" placeholder="Aadhaar (16 digits)" value={form.aadhaarNumber} onChange={handleChange} className="form-control rounded-pill" required />
            </div>
            <div className="col-md-3">
              <input type="text" name="panNumber" placeholder="PAN" value={form.panNumber} onChange={handleChange} className="form-control rounded-pill" required />
            </div>
            <div className="col-md-2">
              <select name="roles" value={form.roles} onChange={handleChange} className="form-control rounded-pill">
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-12 d-flex gap-2 mt-2">
              <button className="btn btn-success rounded-pill px-4">{editing ? "Update" : "Add"} User</button>
              {editing && (
                <button type="button" onClick={resetForm} className="btn btn-secondary rounded-pill px-4">
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Search by ID */}
        <div className="row g-3 mb-4" style={{ maxWidth: "900px", margin: "0 auto", background: "rgba(255,255,255,0.1)", padding: "15px", borderRadius: "16px", backdropFilter: "blur(8px)", boxShadow: "0 6px 18px rgba(0,0,0,0.2)" }}>
          <div className="col-md-6">
            <input type="number" placeholder="Enter User ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} className="form-control rounded-pill" />
          </div>
          <div className="col-md-3 d-grid">
            <button className="btn btn-primary rounded-pill" onClick={handleSearch}>Search</button>
          </div>
          <div className="col-md-3 d-grid">
            <button className="btn btn-warning rounded-pill" onClick={loadUsers}>Reset</button>
          </div>
        </div>

        {/* User Cards */}
        {users.length === 0 ? (
          <p className="text-center text-light fw-bold">No users found.</p>
        ) : (
          <div className="row g-4" style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h1 className="text-center text-dark fw-bold">List of all users</h1>
            {users.map((u) => (
              <div key={u.userId} className="col-md-4">
                <div className="card h-100 shadow-lg border-0" style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: "16px" }}>
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold text-dark">User #{u.userId}</h5>
                    <p className="fw-bold text-dark">Name: {u.name}</p>
                    <p className="fw-bold text-dark">Email: {u.email}</p>
                    <p className="fw-bold text-dark">Aadhaar: {u.aadhaarNumber}</p>
                    <p className="fw-bold text-dark">Address: {u.address}</p>
                    <p className="fw-bold text-dark">PAN: {u.panNumber}</p>
                    <p className="fw-bold text-dark">Role: {u.roles}</p>
                    <div className="d-flex justify-content-center gap-2 mt-3">
                      <button className="btn btn-warning rounded-pill px-3" onClick={() => onEdit(u)}>Edit</button>
                      <button className="btn btn-danger rounded-pill px-3" onClick={() => onDelete(u.userId)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPage;

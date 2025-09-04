import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/loginlogo.jpg"; 

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: "",       // Added userId since you said you'll enter manually
    name: "",
    address: "",
    email: "",
    password: "",
    dateOfBirth: "",
    age: "",
    aadhaarNumber: "",
    panNumber: "",
    roles: "USER",    // Always USER
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users/add", form);
      setMessage("Registration successful!");
      console.log(response.data);

      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,   
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div className="card shadow-lg p-4 bg-dark bg-opacity-75 text-white" style={{ width: "28rem" }}>
        <h2 className="text-center mb-4">Register New User</h2>

        {message && <p className="text-warning text-center">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="number"
              name="userId"
              placeholder="User ID (keep it in 500 series)"
              value={form.userId}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <input type="text" name="aadhaarNumber" placeholder="Aadhaar (16 digits)" value={form.aadhaarNumber} onChange={handleChange} className="form-control" required />
          </div>

          <div className="mb-3">
            <input type="text" name="panNumber" placeholder="PAN (e.g. ABCDE1234F)" value={form.panNumber} onChange={handleChange} className="form-control" required />
          </div>

          {/* Role always USER and readonly */}
          <div className="mb-3">
            <input
              type="text"
              name="roles"
              value={form.roles}
              className="form-control"
              readOnly
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-info" style={{ cursor: "pointer" }}>Login</span>
        </p>
      </div>
    </div>
  );
}



import React, { useEffect, useState } from "react";
import PolicyService from "../../services/PolicyService";
import bg from "../../assets/adminpolicy1.jpg";

function PoliciesPage() {
  const [policies, setPolicies] = useState([]);
  const [form, setForm] = useState({
    policyId: "",
    proposalId: "",
    startDate: "",
    endDate: "",
    status: "",
    description: "",
    price: 0
  });
  const [searchId, setSearchId] = useState("");
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ description → price mapping
  const coveragePrices = {
    "Full body coverage": 10000,
    "Side body coverage": 6000,
    "Front and Rear body coverage": 4000
  };

  const load = () => {
    PolicyService.getAll()
      .then(res => setPolicies(res.data || []))
      .catch(() => setMessage(" Failed to load policies"));
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description") {
      setForm(prev => ({
        ...prev,
        description: value,
        price: coveragePrices[value] || 0
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setMessage("");
    const payload = { ...form };

    const action = editing ? PolicyService.update : PolicyService.add;
    action(payload)
      .then(() => {
        setMessage(editing ? " Policy updated successfully" : " Policy added successfully");
        resetForm();
        load();
      })
      .catch(() =>
        setMessage(editing ? " Update failed" : " Add failed (check proposalId exists)")
      );
  };

  const resetForm = () => {
    setForm({
      policyId: "",
      proposalId: "",
      startDate: "",
      endDate: "",
      status: "",
      description: "",
      price: 0
    });
    setEditing(false);
  };

  const onEdit = (p) => {
    setForm(p);
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = (id) => {
    if (!window.confirm("🗑️ Delete this policy?")) return;
    PolicyService.delete(id)
      .then(() => {
        setMessage("🗑️ Policy deleted");
        load();
      })
      .catch(() => setMessage(" Delete failed"));
  };

  const onSearch = () => {
    if (!searchId) return;
    PolicyService.getById(searchId)
      .then(res => setPolicies([res.data]))
      .catch(() => setMessage(" Policy not found"));
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
      <h1
        className="fw-bold text-center mb-3"
        style={{
          color: "#fff",
          fontSize: "2.5rem",
          lineHeight: 1.05,
          textShadow: "0 4px 8px rgba(0,0,0,0.6)", letterSpacing: "2px" 
        }}
      >
        MANAGE POLICIES
      </h1>

      <div
        className="p-4 rounded w-100 shadow-lg"
        style={{
          maxWidth: "1200px",
          backgroundColor: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)"
        }}
      >
        {/* Add / Update Form */}
        <form onSubmit={handleSave} className="mb-4">
          <div className="row g-3">
            {/* Text Inputs */}
            {[
              { name: "policyId", label: "Policy ID", type: "text" },
              { name: "proposalId", label: "Proposal ID", type: "text" },
              { name: "startDate", label: "Start Date", type: "date" },
              { name: "endDate", label: "End Date", type: "date" }
            ].map(({ name, label, type }) => (
              <div className="col-md-3" key={name}>
                <label className="form-label text-white">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className="form-control rounded"
                  required={name !== "policyId"}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.25)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.3)"
                  }}
                />
              </div>
            ))}

            {/* Status Dropdown */}
            <div className="col-md-3">
              <label className="form-label text-white">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="form-select rounded"
                required
                style={{ backgroundColor: "rgba(255, 255, 255, 0.59)" }}
              >
                <option value="">Select Status</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="EXPIRED">EXPIRED</option>
                <option value="UNDER REVIEW">UNDER REVIEW</option>
              </select>
            </div>

            {/* Description Dropdown */}
            <div className="col-md-3">
              <label className="form-label text-white">Description</label>
              <select
                name="description"
                value={form.description}
                onChange={handleChange}
                className="form-select rounded"
                required
                style={{ backgroundColor: "rgba(255, 255, 255, 0.59)" }}
              >
                <option value="">Select Coverage</option>
                <option value="Full body coverage">Full body coverage</option>
                <option value="Side body coverage">Side body coverage</option>
                <option value="Front and Rear body coverage">Front and Rear body coverage</option>
              </select>
            </div>

            {/* Price */}
            <div className="col-md-2">
              <label className="form-label text-white">Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                readOnly
                className="form-control rounded"
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.3)"
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-3">
            <button type="submit" className="btn btn-success rounded-pill px-4">
              {editing ? "Update Policy" : "Add Policy"}
            </button>
            {editing && (
              <button
                type="button"
                className="btn btn-secondary rounded-pill ms-2 px-4"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Search Section */}
        <div className="mb-4 row g-3">
          <div className="col-md-3">
            <input
              placeholder="Search by Policy ID"
              className="form-control rounded"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.63)",
                color: "#000",
                border: "1px solid rgba(255,255,255,0.3)"
              }}
            />
          </div>
          <div className="col-md-2">
            <button type="button" className="btn btn-info w-100 rounded-pill" onClick={onSearch}>
              Search
            </button>
          </div>
          <div className="col-md-2">
            <button type="button" className="btn btn-primary w-100 rounded-pill" onClick={load}>
              Show All
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className="alert fw-bold"
            style={{
              color: message.includes("updated")
                ? "yellow"
                : message.includes("deleted")
                ? "red"
                : "#0f0",
              backgroundColor: "transparent",
              border: "none",
              fontSize: "1.1rem",
              textShadow: "0 0 4px rgba(50, 49, 49, 0.6)",
              marginBottom: "16px"
            }}
          >
            {message}
          </div>
        )}

        {/* Table */}
        {policies.length === 0 ? (
          <p className="text-light mb-0">No policies found.</p>
        ) : (
          <table
            className="table table-hover  opacity-75 transparent-table shadow-sm"
            style={{
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(6px)",
              color: "#fff",
              borderCollapse: "collapse",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 0 8px rgba(0,0,0,0.3)"
            }}
          >
            <thead
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "#fff",
                fontWeight: "bold",
                textShadow: "0 1px 2px rgba(0,0,0,0.6)"
              }}
            >
              <tr>
                <th style={{ padding: "12px" }}>ID</th>
                <th style={{ padding: "12px" }}>Proposal ID</th>
                <th style={{ padding: "12px" }}>Start Date</th>
                <th style={{ padding: "12px" }}>End Date</th>
                <th style={{ padding: "12px" }}>Status</th>
                <th style={{ padding: "12px" }}>Description</th>
                <th style={{ padding: "12px" }}>Price</th>
                <th style={{ padding: "12px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((p) => (
                <tr
                  key={p.policyId}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    color: "#fff",
                    textShadow: "0 1px 2px rgba(0,0,0,0.6)"
                  }}
                >
                  <td style={{ padding: "10px" }}>{p.policyId}</td>
                  <td style={{ padding: "10px" }}>{p.proposalId}</td>
                  <td style={{ padding: "10px" }}>{p.startDate}</td>
                  <td style={{ padding: "10px" }}>{p.endDate}</td>

                  {/* ✅ Status with color */}
                  <td style={{ padding: "10px" }}>
                    <span
                      className={`fw-bold ${
                        p.status === "ACTIVE"
                          ? "text-success"
                          : p.status === "UNDER REVIEW"
                          ? "text-warning"
                          : p.status === "EXPIRED"
                          ? "text-danger"
                          : "text-light"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td style={{ padding: "10px" }}>{p.description}</td>
                  <td style={{ padding: "10px" }}>
                    <span className="text-success fw-bold">₹ {p.price}</span>
                  </td>
                  <td style={{ padding: "10px" }}>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-warning rounded-pill"
                        onClick={() => onEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger rounded-pill"
                        onClick={() => onDelete(p.policyId)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PoliciesPage;

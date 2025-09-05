
import React, { useEffect, useState } from "react";
import ClaimService from "../../services/ClaimService";
import bg from "../../assets/adminclaim.jpg"; 

function ClaimPage() {
  const [claims, setClaims] = useState([]);
  const [form, setForm] = useState({
    claimId: "",
    claimReason: "",
    claimDate: "",
    status: "",
    policyId: ""
  });
  const [editing, setEditing] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [message, setMessage] = useState("");

  const loadClaims = () => {
    ClaimService.getAll()
      .then((res) => setClaims(res.data || []))
      .catch(() => setMessage(" Failed to load claims"));
  };

  useEffect(() => {
    loadClaims();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const action = editing ? ClaimService.update : ClaimService.add;
    action(form)
      .then(() => {
        setMessage(editing ? " Claim updated successfully" : " Claim added successfully");
        resetForm();
        loadClaims();
      })
      .catch(() => setMessage(" Operation failed"));
  };

  const resetForm = () => {
    setForm({ claimId: "", claimReason: "", claimDate: "", status: "", policyId: "" });
    setEditing(false);
  };

  const onEdit = (c) => {
    setForm(c);
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this claim?")) {
      ClaimService.delete(id)
        .then(() => {
          setMessage("🗑️ Claim deleted successfully");
          loadClaims();
        })
        .catch(() => setMessage(" Delete failed"));
    }
  };

  const handleSearch = () => {
    if (!searchId) return;
    ClaimService.getById(searchId)
      .then((res) => setClaims([res.data]))
      .catch(() => setMessage(" Claim not found"));
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
          style={{ color: "#000", fontSize: "2.5rem", letterSpacing: "2px" }}
        >
          CLAIM MANAGEMENT
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

        {/* Add/Edit Form */}
        <form
          onSubmit={handleSave}
          className="mb-4 p-4 mx-auto"
          style={{
            maxWidth: "950px",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
          }}
        >
          <div className="row g-3">
            <div className="col-md-2">
              <input
                type="number"
                name="claimId"
                placeholder="Claim ID"
                value={form.claimId}
                onChange={handleChange}
                className="form-control rounded-pill"
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="claimReason"
                placeholder="Claim Reason"
                value={form.claimReason}
                onChange={handleChange}
                className="form-control rounded-pill"
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="date"
                name="claimDate"
                value={form.claimDate}
                onChange={handleChange}
                className="form-control rounded-pill"
                required
              />
            </div>
            <div className="col-md-2">
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="form-control rounded-pill"
                required
              >
                <option value="">Select Status</option>
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
                <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                <option value="CLOSED">CLOSED</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </div>
            <div className="col-md-2">
              <input
                type="number"
                name="policyId"
                placeholder="Policy ID"
                value={form.policyId}
                onChange={handleChange}
                className="form-control rounded-pill"
                required
              />
            </div>
            <div className="col-md-12 d-flex gap-2">
              <button className="btn btn-success rounded-pill px-4">
                {editing ? "Update" : "Add"} Claim
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

        {/* Search */}
        <div className="mb-3 d-flex justify-content-center gap-2">
          <input
            type="number"
            placeholder="Enter Claim ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="form-control rounded-pill"
            style={{ maxWidth: "250px" }}
          />
          <button
            className="btn btn-primary rounded-pill px-4"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="btn btn-warning rounded-pill px-4"
            onClick={loadClaims}
          >
            Reset
          </button>
        </div>

        {/* Table */}
        {claims.length === 0 ? (
          <p className="text-center text-light fw-bold">No claims found.</p>
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
            <table className="table table-bordered table-hover opacity-75 transparent-table table-striped align-middle mb-0">
              <thead className="table-dark text-center">
                <tr>
                  <th>ID</th>
                  <th>Claim Reason</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Policy ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
             <tbody>
  {claims.map((c) => (
    <tr key={c.claimId}>
      <td className="text-center">{c.claimId}</td>
      <td>{c.claimReason}</td>
      <td>{c.claimDate}</td>
      <td className="text-center">
        <span
          className={`fw-bold ${
            c.status === "APPROVED"
              ? "text-success"
              : c.status === "CLOSED"
              ? "text-primary"
              : c.status === "REJECTED"
              ? "text-danger"
              : "text-warning"
          }`}
        >
          {c.status}
        </span>
      </td>
      <td className="text-center">{c.policyId}</td>
      <td className="text-center">
        <div className="d-flex justify-content-center gap-2">
          <button
            className="btn btn-sm btn-secondary rounded-pill px-3"
            onClick={() => onEdit(c)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger rounded-pill px-3"
            onClick={() => onDelete(c.claimId)}
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

export default ClaimPage;

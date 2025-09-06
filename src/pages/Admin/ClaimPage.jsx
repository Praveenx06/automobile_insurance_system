``
import React, { useEffect, useState } from "react";
import ClaimService from "../../services/ClaimService";
import bg from "../../assets/admincommon.jpg";

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
      .catch(() => setMessage("Failed to load claims"));
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
        setMessage(editing ? "Claim updated successfully" : "Claim added successfully");
        resetForm();
        loadClaims();
      })
      .catch(() => setMessage("Operation failed"));
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
        .catch(() => setMessage("Delete failed"));
    }
  };

  const handleSearch = () => {
    if (!searchId) return;
    ClaimService.getById(searchId)
      .then((res) => setClaims([res.data]))
      .catch(() => setMessage("Claim not found"));
  };

  return (
    <div
      className="d-flex flex-column align-items-center" style={{  backgroundImage: `url(${bg})`,backgroundSize: "cover",backgroundPosition: "center",backgroundRepeat: "no-repeat",minHeight: "100vh",width: "100vw",overflow: "auto",padding: "24px"}}>
      <div className="container" style={{ maxWidth: "1100px" }}>
        <h1 className="fw-bold text-center mb-4 text-light text-shadow" style={{ color: "black", fontSize: "2.5rem", letterSpacing: "2px" }}>
          --CLAIM MANAGEMENT--
        </h1>

        {/* Message */}
        {message && (
          <div className="alert text-center" style={{   maxWidth: "600px", margin: "0 auto 20px auto", background: "rgba(0,0,0,0.6)", color: "#fff", fontWeight: "bold",  borderRadius: "12px",  boxShadow: "0 4px 12px rgba(0,0,0,0.3)"  }} >
            {message}
          </div>
        )}

        {/* Add / Update Form */}
        <form onSubmit={handleSave} className="mb-4 p-4"
          style={{  maxWidth: "900px",  margin: "0 auto",  background: "rgba(255,255,255,0.15)",   backdropFilter: "blur(10px)",  borderRadius: "16px",  boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}  >
          <h2 className="text-warning fw-bold">Add a claim or click edit to update</h2>
          <br />
          <div className="row g-3">
            <div className="col-md-2">
              <label className="text-light fw-bold">Claim ID</label>
              <input
                type="number" name="claimId" value={form.claimId} onChange={handleChange} className="form-control rounded-pill"  required/>
            </div>
            <div className="col-md-3">
              <label className="text-light fw-bold">Reason</label>
              <input type="text" name="claimReason" value={form.claimReason} onChange={handleChange} className="form-control rounded-pill" required/>
            </div>
            <div className="col-md-3">
              <label className="text-light fw-bold">Date</label>
              <input type="date" name="claimDate" value={form.claimDate} onChange={handleChange} className="form-control rounded-pill" required/>
            </div>
            <div className="col-md-2">
              <label className="text-light fw-bold">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="form-control rounded-pill"required >
                <option value="">Select</option>
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
                <option value="UNDER_REVIEW">UNDER REVIEW</option>
                <option value="CLOSED">CLOSED</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="text-light fw-bold">Policy ID</label>
              <input
                type="number" name="policyId" value={form.policyId} onChange={handleChange} className="form-control rounded-pill" required />
            </div>
          </div>

          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-success rounded-pill px-4">
              {editing ? "Update Claim" : "Add Claim"}
            </button>
            {editing && (
              <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={resetForm}>  Cancel </button>
            )}
          </div>
        </form>

        {/* Search Section */}
        <div
          className="row g-3 mb-4"
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "rgba(255,255,255,0.1)",
            padding: "15px",
            borderRadius: "16px",
            backdropFilter: "blur(8px)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.2)"
          }}
        >
          <div className="col-md-4">
            <input
              type="number"
              placeholder="Search by Claim ID"
              className="form-control rounded-pill"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>
          <div className="col-md-3 d-grid">
            <button className="btn btn-info rounded-pill" onClick={handleSearch}>  Search </button>
          </div>
          <div className="col-md-3 d-grid">
            <button className="btn btn-primary rounded-pill" onClick={loadClaims}>   Show All   </button>
          </div>
        </div>

        {/* Claims List */}
        {claims.length === 0 ? (
          <p className="text-center text-light fw-bold">No claims found.</p>
        ) : (
          <div className="row g-4" style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h1 className="text-center text-dark fw-bold">List of all claims</h1>
            {claims.map((c) => (
              <div key={c.claimId} className="col-md-4">
                <div
                  className="card h-100 shadow-lg border-0"
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "16px"
                  }}
                >
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold text-shadow mb-3">
                      Claim #{c.claimId}
                    </h5>
                    <p className="fw-bold text-dark">Reason: {c.claimReason}</p>
                    <p className="fw-bold text-dark">Date: {c.claimDate}</p>
                    <p
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
                      Status: {c.status}
                    </p>
                    <p className="fw-bold text-dark">Policy ID: {c.policyId}</p>

                    <div className="d-flex justify-content-center gap-2 mt-3">
                      <button
                        className="btn btn-warning rounded-pill px-3"
                        onClick={() => onEdit(c)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger rounded-pill px-3"
                        onClick={() => onDelete(c.claimId)}
                      >
                        Delete
                      </button>
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

export default ClaimPage;

import React, { useEffect, useState } from "react";
import ClaimService from "../../services/ClaimService";
import { useNavigate } from "react-router-dom";  // ✅ import navigate
import bg from "../../assets/userclaim.webp";

function UserClaimPage() {
  const [claims, setClaims] = useState([]);
  const [form, setForm] = useState({
    claimId: "",
    claimReason: "",
    claimDate: "",
    status: "UNDER_REVIEW",
    policyId: ""
  });
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);
  const [userClaimId, setUserClaimId] = useState(null);
  const [lastClaimId, setLastClaimId] = useState(null);
  const [newClaim, setNewClaim] = useState(null);
  const navigate = useNavigate(); // ✅ hook for navigation

  const load = () => {
    ClaimService.getAll()
      .then((res) => {
        const data = res.data || [];
        setClaims(data);

        if (data.length > 0) {
          const maxId = Math.max(...data.map(c => c.claimId));
          setLastClaimId(maxId);
        } else {
          setLastClaimId(null);
        }
      })
      .catch(() => setMessage("Failed to load claims"));
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "status") return; // read-only

    if (name === "claimDate") {
      const today = new Date();
      const selected = new Date(value);
      today.setHours(0,0,0,0);
      selected.setHours(0,0,0,0);
      if (selected < today) {
        setMessage(" Claim date cannot be in the past. Please enter today's date or later.");
        return;
      } else {
        setMessage("");
      }
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setMessage("");

    const payload = {
      claimId: parseInt(form.claimId),
      claimReason: form.claimReason,
      claimDate: form.claimDate,
      status: "UNDER_REVIEW",
      policyId: parseInt(form.policyId)
    };

    const action = editing ? ClaimService.update : ClaimService.add;

    action(payload)
      .then(() => {
        setMessage(editing ? "Claim updated successfully " : "Claim added successfully ");
        setUserClaimId(payload.claimId);
        if (!editing) setNewClaim(payload);
        resetForm();
        load();
      })
      .catch(() => setMessage(editing ? "Update failed " : "Add failed "));
  };

  const resetForm = () => {
    setForm({ claimId: "", claimReason: "", claimDate: "", status: "UNDER_REVIEW", policyId: "" });
    setEditing(false);
  };

  const onEdit = (c) => {
    if (c.claimId !== userClaimId) {
      setMessage(" You can only edit your own claim.");
      return;
    }
    setForm({ claimId: c.claimId, claimReason: c.claimReason, claimDate: c.claimDate, status: "UNDER_REVIEW", policyId: c.policyId });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "APPROVED": return "green";
      case "REJECTED": return "red";
      case "UNDER_REVIEW": return "orange";
      case "CLOSED" : return "blue";
      default: return "black";
    }
  };

  return (
    <div className="d-flex flex-column align-items-center" style={{ minHeight: "100vh", width: "100vw", backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", padding: "24px", overflow: "auto" }}>
      <div className="container" style={{ maxWidth: "1100px" }}>
        <h1 className="fw-bold text-dark text-center mb-4" style={{ color: "#fff" }}>USER CLAIM MANAGEMENT</h1>
        <h3 className="fw-bold text-center mb-4"> " USER NOTE : Below you can see previously added CLAIM ID , Please we request you to continue the sequence accordingly !!! "</h3>
        
        {lastClaimId && (
          <div className="text-center mb-3">
            <h4 className="text-warning fw-bold">Previously Added Claim ID: {lastClaimId}</h4>
          </div>
        )}

        {message && (
          <div className="alert text-center" style={{ maxWidth: "600px", margin: "0 auto 20px", background: "rgba(0,0,0,0.6)", color: "#fff", fontWeight: "bold", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
            {message}
          </div>
        )}

        {/* Claim Form */}
        <form onSubmit={handleSave} className="mb-4 p-4" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", borderRadius: "16px", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
          <div className="row g-3">
            <div className="col-md-2">
              <label className="text-dark fw-bold">Claim ID</label>
              <input type="number" name="claimId" value={form.claimId} onChange={handleChange} className="form-control rounded-pill" required />
            </div>
            <div className="col-md-4">
              <label className="text-dark fw-bold">Reason</label>
              <input type="text" name="claimReason" value={form.claimReason} onChange={handleChange} className="form-control rounded-pill" required />
            </div>
            <div className="col-md-3">
              <label className="text-dark fw-bold">Date</label>
              <input type="date" name="claimDate" value={form.claimDate} onChange={handleChange} className="form-control rounded-pill" required />
            </div>
            <div className="col-md-3">
              <label className="text-dark fw-bold">Policy ID</label>
              <input type="number" name="policyId" value={form.policyId} onChange={handleChange} className="form-control rounded-pill" required />
            </div>
          </div>
          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-success rounded-pill px-4">{editing ? "Update Claim" : "Add Claim"}</button>
            {editing && <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={resetForm}>Cancel</button>}
          </div>
        </form>

        {/* Recently Added Claim Card */}
        {newClaim && (
          <div className="card mb-4 text-dark" style={{ maxWidth: "600px", margin: "0 auto", background: "rgba(255, 255, 255, 0.3)", borderRadius: "16px", backdropFilter: "blur(10px)", boxShadow: "0 6px 18px rgba(0,0,0,0.25)" }}>
            <div className="card-body text-center">
              <h5 className="fw-bold mb-3">Your Recently Added Claim</h5>
              <p className="text-primary fw-bold"><strong>ID:</strong> {newClaim.claimId}</p>
              <p className="fw-bold mb-1"><strong>Reason:</strong> {newClaim.claimReason}</p>
              <p className="fw-bold mb-1"><strong>Date:</strong> {newClaim.claimDate}</p>
              <p className="fw-bold mb-1"><strong>Policy ID:</strong> {newClaim.policyId}</p>
              <p className="fw-bold mb-1"><strong>Status:</strong> <span style={{ color: getStatusColor(newClaim.status) }}>{newClaim.status}</span></p>
              
              <div className="mt-3 d-flex justify-content-center gap-3">
                <button className="btn btn-sm btn-primary rounded-pill px-3" onClick={() => onEdit(newClaim)}>Edit</button>
                {/* ✅ New Back to Dashboard button */}
                <button className="btn btn-sm btn-success rounded-pill px-3" onClick={() => navigate("/user/dashboard")}>Back to Dashboard</button>
              </div>
            </div>
          </div>
        )}

        {/* All Claims as Cards */}
        {claims.length === 0 ? (
          <p className="text-center text-light fw-bold">No claims found.</p>
        ) : (
          <div className="row g-4 justify-content-center">
            {claims.map((c) => (
              <div key={c.claimId} className="col-md-4 col-sm-6">
                <div className={`card text-center h-100 ${c.claimId === userClaimId ? "border-success" : ""}`} style={{ background: "rgba(255, 255, 255, 0.36)", borderRadius: "16px", backdropFilter: "blur(10px)", boxShadow: "0 6px 16px rgba(0,0,0,0.43)" }}>
                  <div className="card-body">
                    <h5 className="fw-bold text-primary mb-2">Claim ID: {c.claimId}</h5>
                    <p className="fw-bold mb-1"><strong>Reason:</strong> {c.claimReason}</p>
                    <p className="fw-bold mb-1"><strong>Date:</strong> {c.claimDate}</p>
                    <p className="fw-bold mb-1"><strong>Status:</strong> <span style={{ color: getStatusColor(c.status) }}>{c.status}</span></p>
                    <p className="fw-bold mb-1"><strong>Policy ID:</strong> {c.policyId}</p>
                    {c.claimId === userClaimId && (
                      <div className="mt-2">
                        <button className="btn btn-sm btn-primary rounded-pill px-3" onClick={() => onEdit(c)}>Edit</button>
                      </div>
                    )}
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

export default UserClaimPage;

import React, { useEffect, useState } from "react";
import ClaimService from "../../services/ClaimService";

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
          setMessage("Claim deleted successfully");
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
    <div className="container py-4">
      <h2 className="text-center mb-4">Admin - Claim Management</h2>
      {message && <div className="alert alert-info">{message}</div>}

      {/* Add/Edit Form */}
      <div className="card shadow mb-4">
        <div className="card-body">
          <h5>{editing ? "Edit Claim" : "Add Claim"}</h5>
          <form onSubmit={handleSave} className="row g-3">
            <div className="col-md-2">
              <input type="number" name="claimId" placeholder="Claim ID" value={form.claimId} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-3">
              <input type="text" name="claimReason" placeholder="Claim Reason" value={form.claimReason} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-2">
              <input type="date" name="claimDate" value={form.claimDate} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-md-2">
              <input type="text" name="status" placeholder="Status" value={form.status} onChange={handleChange} className="form-control" required />
            </div>
            {/* ✅ New Policy ID field */}
            <div className="col-md-2">
              <input type="number" name="policyId" placeholder="Policy ID" value={form.policyId} onChange={handleChange} className="form-control" required />
            </div>
            <div className="col-12 d-flex gap-2">
              <button className="btn btn-success">{editing ? "Update" : "Add"} Claim</button>
              {editing && <button type="button" onClick={resetForm} className="btn btn-secondary">Cancel</button>}
            </div>
          </form>
        </div>
      </div>

      {/* Search */}
      <div className="mb-3 d-flex">
        <input type="number" placeholder="Enter Claim ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} className="form-control me-2" />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        <button className="btn btn-warning ms-2" onClick={loadClaims}>Reset</button>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Claim Reason</th>
              <th>Date</th>
              <th>Status</th>
              <th>Policy ID</th> {/* ✅ show Policy ID */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((c) => (
              <tr key={c.claimId}>
                <td>{c.claimId}</td>
                <td>{c.claimReason}</td>
                <td>{c.claimDate}</td>
                <td>{c.status}</td>
                <td>{c.policyId}</td> {/* ✅ show Policy ID */}
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit(c)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => onDelete(c.claimId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {claims.length === 0 && <p className="text-center">No claims found.</p>}
      </div>
    </div>
  );
}

export default ClaimPage;

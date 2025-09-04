
import React, { useEffect, useState } from "react";
import PolicyService from "../../services/PolicyService";

function PoliciesPage() {
  const [policies, setPolicies] = useState([]);
  const [form, setForm] = useState({
    policyId: "",
    proposalId: "",
    startDate: "",
    endDate: "",
    status: ""
  });
  const [searchId, setSearchId] = useState("");
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const load = () => {
    PolicyService.getAll()
      .then(res => setPolicies(res.data || []))
      .catch(() => setMessage(" Failed to load policies"));
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    setMessage("");
    if (editing) {
      PolicyService.update(form)
        .then(() => { setMessage(" Policy updated"); resetForm(); load(); })
        .catch(() => setMessage(" Update failed"));
    } else {
      PolicyService.add(form)
        .then(() => { setMessage(" Policy added"); resetForm(); load(); })
        .catch(() => setMessage(" Add failed (check proposalId exists)"));
    }
  };

  const resetForm = () => {
    setForm({ policyId: "", proposalId: "", startDate: "", endDate: "", status: "" });
    setEditing(false);
  };

  const onEdit = (p) => {
    setForm({
      policyId: p.policyId,
      proposalId: p.proposalId,
      startDate: p.startDate,
      endDate: p.endDate,
      status: p.status
    });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = (id) => {
    if (!window.confirm("Delete this policy?")) return;
    PolicyService.delete(id)
      .then(() => { setMessage(" Policy deleted"); load(); })
      .catch(() => setMessage(" Delete failed"));
  };

  const onSearch = () => {
    if (!searchId) return;
    PolicyService.getById(searchId)
      .then(res => setPolicies([res.data]))
      .catch(() => setMessage(" Policy not found"));
  };

  return (
    <div className="container-fluid mt-4">
      <h3 className="fw-bold">Policies</h3>

      {/* Add / Update Form */}
      <form onSubmit={handleSave} className="mb-3 p-3 border rounded bg-light">
        <div className="row g-3">
          <div className="col-md-2">
            <label>Policy ID</label>
            <input name="policyId" value={form.policyId} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-2">
            <label>Proposal ID</label>
            <input name="proposalId" value={form.proposalId} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-3">
            <label>Start Date</label>
            <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-3">
            <label>End Date</label>
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-2">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="form-control" required>
              <option value="">Select</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="EXPIRED">EXPIRED</option>
            </select>
          </div>
        </div>
        <div className="mt-3">
          <button className="btn btn-success">{editing ? "Update Policy" : "Add Policy"}</button>
          {editing && <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>Cancel</button>}
        </div>
      </form>

      {/* Search */}
      <div className="mb-3 row g-2">
        <div className="col-md-3">
          <input placeholder="Search by Policy ID" className="form-control" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
        </div>
        <div className="col-md-2">
          <button className="btn btn-info w-100" onClick={onSearch}>Search</button>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={load}>Show All</button>
        </div>
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      {/* Policy List */}
      {policies.length === 0 ? <p>No policies found.</p> : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Proposal ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {policies.map(p => (
              <tr key={p.policyId}>
                <td>{p.policyId}</td>
                <td>{p.proposalId}</td>
                <td>{p.startDate}</td>
                <td>{p.endDate}</td>
                <td>{p.status}</td>
                <td className="d-flex gap-2">
                  <button className="btn btn-sm btn-secondary" onClick={() => onEdit(p)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => onDelete(p.policyId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PoliciesPage;

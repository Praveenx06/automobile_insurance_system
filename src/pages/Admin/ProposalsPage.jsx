import React, { useEffect, useState } from "react";
import ProposalService from "../../services/ProposalService";

function ProposalsPage() {
  const [proposals, setProposals] = useState([]);
  const [form, setForm] = useState({
    proposalId: "",
    userId: "",
    vehicleId: "",
    status: ""
  });
  const [searchId, setSearchId] = useState("");
  const [deleteId, setDeleteId] = useState("");   
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const load = () => {
    ProposalService.getAll()
      .then(res => setProposals(res.data || []))
      .catch(() => setMessage("❌ Failed to load proposals (admin only)"));
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");

    const parsedVehicleId = parseInt(form.vehicleId);
    const parsedProposalId = parseInt(form.proposalId);

    if (editing) {
      // 🚫 Prevent vehicle reuse
      const conflict = proposals.find(p =>
        parseInt(p.vehicleId) === parsedVehicleId &&
        parseInt(p.proposalId) !== parsedProposalId
      );

      if (conflict) {
        setMessage(`❌ Vehicle ID ${form.vehicleId} is already assigned to Proposal ID ${conflict.proposalId}`);
        return;
      }

      // ✅ Proceed with update
      ProposalService.update(form)
        .then(() => {
          setMessage("✅ Proposal updated successfully");
          resetForm();
          load();
        })
        .catch(() => setMessage("❌ Update failed"));
    } else {
      // ✅ Proceed with add
      ProposalService.add(form)
        .then(() => {
          setMessage("✅ Proposal added successfully");
          resetForm();
          load();
        })
        .catch(() => setMessage("❌ Add failed (check userId and vehicleId exist)"));
    }
  };

  const resetForm = () => {
    setForm({ proposalId: "", userId: "", vehicleId: "", status: "" });
    setEditing(false);
  };

  const onEdit = (p) => {
    setForm(p);
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDeleteById = () => {
    if (!deleteId) {
      setMessage("⚠️ Please enter an ID to delete");
      return;
    }
    if (!window.confirm(`Delete proposal with ID ${deleteId}?`)) return;

    ProposalService.delete(deleteId)
      .then(() => {
        setMessage(`✅ Proposal ${deleteId} deleted`);
        setDeleteId("");
        load();
      })
      .catch(() => setMessage("❌ Delete failed"));
  };

  const onSearch = () => {
    if (!searchId) return;
    ProposalService.getById(searchId)
      .then(res => setProposals([res.data]))
      .catch(() => setMessage("❌ Proposal not found"));
  };

  return (
    <div className="container-fluid mt-4">
      <h3 className="fw-bold">Proposals</h3>

      {/* Add / Update Form */}
      <form onSubmit={handleSave} className="mb-3 p-3 border rounded bg-light">
        <div className="row g-3">
          <div className="col-md-3">
            <label>Proposal ID</label>
            <input name="proposalId" value={form.proposalId} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-3">
            <label>User ID</label>
            <input name="userId" value={form.userId} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-3">
            <label>Vehicle ID</label>
            <input name="vehicleId" value={form.vehicleId} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-3">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="form-control" placeholder="e.g. PENDING" required >
               <option value="">-- Select Status --</option>
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
            </select>
          </div>
        </div>
        <div className="mt-3">
          <button className="btn btn-success">{editing ? "Update Proposal" : "Add Proposal"}</button>
          {editing && <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>Cancel</button>}
        </div>
      </form>

      {/* Search & Delete By ID */}
      <div className="mb-3 row g-2">
        <div className="col-md-3">
          <input placeholder="Search by Proposal ID" className="form-control" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
        </div>
        <div className="col-md-2">
          <button className="btn btn-info w-100" onClick={onSearch}>Search</button>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={load}>Show All</button>
        </div>

        <div className="col-md-3">
          <input placeholder="Delete by Proposal ID" className="form-control" value={deleteId} onChange={(e) => setDeleteId(e.target.value)} />
        </div>
        <div className="col-md-2">
          <button className="btn btn-danger w-100" onClick={onDeleteById}>Delete</button>
        </div>
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      {/* Proposal List */}
      {proposals.length === 0 ? <p>No proposals found.</p> : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Vehicle ID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map(p => (
              <tr key={p.proposalId}>
                <td>{p.proposalId}</td>
                <td>{p.userId}</td>
                <td>{p.vehicleId}</td>
                <td>{p.status}</td>
                <td>
                  <button className="btn btn-sm btn-secondary" onClick={() => onEdit(p)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProposalsPage;

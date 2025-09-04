
import React, { useEffect, useState } from "react";
import ProposalService from "../../services/ProposalService";

function UserProposalsPage() {
  const [proposals, setProposals] = useState([]);
  const [allProposals, setAllProposals] = useState(null);
  const [form, setForm] = useState({
    proposalId: "",
    userId: "",
    vehicleId: "",
    status: "PENDING"
  });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [lastProposalId, setLastProposalId] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [newProposal, setNewProposal] = useState(null);

  useEffect(() => {
    const storedUserId = parseInt(localStorage.getItem("userId"));
    if (!storedUserId || isNaN(storedUserId)) {
      setMessage("User ID not found or invalid.");
      return;
    }

    setCurrentUserId(storedUserId);

    ProposalService.getAll()
      .then(res => {
        const all = res.data || [];
        setProposals(all.filter(p => p.userId === storedUserId));
      })
      .catch(() => setMessage("Failed to load proposals"));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setMessage("");

    const action = editing ? ProposalService.update : ProposalService.add;
    action(form)
      .then(res => {
        setMessage(editing ? "Proposal updated" : "Proposal added");

        if (!editing) {
          const added = res.data;
          setLastProposalId(added?.proposalId || form.proposalId);
          setNewProposal(added);
        }

        resetForm();
        ProposalService.getAll().then(res => {
          const all = res.data || [];
          setProposals(all.filter(p => p.userId === currentUserId));
        });
      })
      .catch(() => setMessage("Operation failed"));
  };

  const resetForm = () => {
    setForm({ proposalId: "", userId: currentUserId, vehicleId: "", status: "PENDING" });
    setEditing(false);
  };

  const onEdit = (p) => {
    if (newProposal && p.proposalId === newProposal.proposalId) {
      setForm(p);
      setEditing(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setMessage("⚠️ Only the newly added proposal can be edited");
    }
  };

  const onDelete = (id) => {
    if (newProposal && id === newProposal.proposalId) {
      if (!window.confirm(`Delete your newly added proposal with ID ${id}?`)) return;

      ProposalService.delete(id)
        .then(() => {
          setMessage(`✅ Proposal ${id} deleted`);
          setNewProposal(null);
          ProposalService.getAll().then(res => {
            const all = res.data || [];
            setProposals(all.filter(p => p.userId === currentUserId));
          });
        })
        .catch(() => setMessage("❌ Delete failed"));
    } else {
      setMessage("⚠️ Only the newly added proposal can be deleted");
    }
  };

  const handleShowAll = () => {
    ProposalService.getAll()
      .then(res => {
        setAllProposals(res.data || []);
        setMessage("✅ Showing all proposals");
      })
      .catch(() => setMessage("❌ Failed to load all proposals"));
  };

  return (
    <div className="container mt-4">
      <h3 className="fw-bold text-primary">Proposals</h3>

      {lastProposalId && (
        <div className="alert alert-secondary">
          Last added proposal ID: <strong>{lastProposalId}</strong>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSave} className="mb-4 p-4 border rounded bg-light shadow-sm">
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Proposal ID</label>
            <input
              name="proposalId"
              value={form.proposalId}
              onChange={handleChange}
              className="form-control"
              disabled={editing}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">User ID</label>
            <input
              name="userId"
              value={form.userId}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Vehicle ID</label>
            <input
              name="vehicleId"
              value={form.vehicleId}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Status</label>
            <input
              name="status"
              value={form.status}
              className="form-control text-muted"
              readOnly
            />
          </div>
        </div>
        <div className="mt-3">
          <button className="btn btn-success">
            {editing ? "Update Proposal" : "Add Proposal"}
          </button>
          {editing && (
            <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {message && <div className="alert alert-info">{message}</div>}

      {/* Recently Added Proposal */}
      {newProposal && (
        <>
          <h5 className="mt-4 text-warning">Recently Added Proposal</h5>
          <table className="table table-bordered table-hover">
            <thead className="table-warning">
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Vehicle ID</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{newProposal.proposalId}</td>
                <td>{newProposal.userId}</td>
                <td>{newProposal.vehicleId}</td>
                <td>{newProposal.status}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => onEdit(newProposal)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(newProposal.proposalId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}

      {/* User's Proposals */}
      <h5 className="mt-4 text-success">Your Proposals</h5>
      {proposals.length === 0 ? (
        <p className="text-muted">No proposals found.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Vehicle ID</th>
              <th>Status</th>
              <th>Actions</th>
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
                  <span className="text-muted">View only</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Show All Proposals Button */}
      <div className="mt-4 mb-3">
        <button className="btn btn-outline-primary" onClick={handleShowAll}>
          Show All Proposals
        </button>
      </div>

      {/* All Proposals (Read-Only) */}
      <h5 className="mt-3 text-secondary">📋 All Proposals </h5>
      {allProposals === null ? (
        <p className="text-muted">Click "Show All Proposals" to view all entries.</p>
      ) : allProposals.length === 0 ? (
        <p className="text-muted">No proposals available in the database.</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Vehicle ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allProposals.map(p => (
              <tr key={p.proposalId}>
                <td>{p.proposalId}</td>
                <td>{p.userId}</td>
                <td>{p.vehicleId}</td>
                <td>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserProposalsPage;

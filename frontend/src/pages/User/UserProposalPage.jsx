

import React, { useEffect, useState } from "react";
import ProposalService from "../../services/ProposalService";
import bg from "../../assets/1userproposal.webp";
import { useNavigate } from "react-router-dom";

function UserProposalsPage() {
  const [proposals, setProposals] = useState([]);
  const [allProposals, setAllProposals] = useState(null);
  const [form, setForm] = useState({ proposalId: "", userId: "", vehicleId: "", status: "PENDING" });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [lastProposalId, setLastProposalId] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [newProposal, setNewProposal] = useState(null);
  const navigate = useNavigate(); // navigation hook

  useEffect(() => {
    const storedUserId = parseInt(localStorage.getItem("userId"));
    if (!storedUserId || isNaN(storedUserId)) {
      setMessage("");
      return;
    }
    setCurrentUserId(storedUserId);

    ProposalService.getAll()
      .then((res) => {
        const all = res.data || [];
        const userProposals = all.filter((p) => p.userId === storedUserId);
        setProposals(userProposals);

        if (userProposals.length > 0) {
          const maxId = Math.max(...userProposals.map((p) => p.proposalId));
          setLastProposalId(maxId); // set on page load
        } else {
          setLastProposalId(null);
        }
      })
      .catch(() => setMessage("Failed to load proposals"));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    setMessage("");
    const action = editing ? ProposalService.update : ProposalService.add;

    action(form)
      .then((res) => {
        const added = res.data;
        setMessage(editing ? "Proposal updated" : "Proposal added");
        if (!editing) {
          setLastProposalId(form.proposalId); // update last ID immediately
          setNewProposal(added); // show the recently added proposal
        }
        resetForm();
        ProposalService.getAll().then((res) => {
          const all = res.data || [];
          setProposals(all.filter((p) => p.userId === currentUserId));
        });
      })
      .catch(() => setMessage("Operation failed"));
  };

  const resetForm = () => {
    setForm({ proposalId: lastProposalId + 1, userId: currentUserId, vehicleId: "", status: "PENDING" });
    setEditing(false);
  };

  const onEdit = (p) => {
    if (newProposal && p.proposalId === newProposal.proposalId) {
      setForm(p);
      setEditing(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else setMessage(" Only the newly added proposal can be edited");
  };

  const onDelete = (id) => {
    if (newProposal && id === newProposal.proposalId) {
      if (!window.confirm(`Delete your newly added proposal with ID ${id}?`)) return;
      ProposalService.delete(id)
        .then(() => {
          setMessage(`✅ Proposal ${id} deleted`);
          setNewProposal(null);
          ProposalService.getAll().then((res) => {
            const all = res.data || [];
            setProposals(all.filter((p) => p.userId === currentUserId));
          });
        })
        .catch(() => setMessage(" Delete failed"));
    } else setMessage(" Only the newly added proposal can be deleted");
  };

  const handleShowAll = () => {
    ProposalService.getAll()
      .then((res) => setAllProposals(res.data || []))
      .catch(() => setMessage(" Failed to load all proposals"));
  };

  return (
    <div className="d-flex flex-column align-items-center" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", minHeight: "100vh", width: "100vw", overflow: "auto", padding: "24px" }}>
      <div className="container" style={{ maxWidth: "1100px" }}>
        <h1 className="fw-bold text-center mb-4 text-dark text-shadow" style={{ fontSize: "2.5rem" }}>WELCOME TO USER PROPOSAL MANAGEMENT PAGE</h1>
        <p>
          <h4 className="fw-bold text-center mb-4 text-success text-shadow">HERE YOU CAN REGISTER YOUR PROPOSAL</h4>
        </p>

        {message && (
          <div className="alert text-center" style={{ maxWidth: "600px", margin: "0 auto 20px auto", background: "rgba(0,0,0,0.6)", color: "#fff", fontWeight: "bold", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSave} className="mb-4 p-4" style={{ maxWidth: "900px", margin: "0 auto", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", borderRadius: "16px", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
          <div className="row g-3">
            <div className="col-md-3"><label className="text-dark fw-bold">Proposal ID</label>
            <input name="proposalId" value={form.proposalId} onChange={handleChange} className="form-control rounded-pill" disabled={editing} />
            </div>
            <div className="col-md-3">
              <label className="text-dark fw-bold">User ID</label>
              <input name="userId" value={form.userId} onChange={handleChange} className="form-control rounded-pill" />
              </div>
            <div className="col-md-3"><label className="text-dark fw-bold">Vehicle ID</label>
            <input name="vehicleId" value={form.vehicleId} onChange={handleChange} className="form-control rounded-pill" required />
            </div>
            <div className="col-md-3"><label className="text-dark fw-bold">Status</label>
            <input name="status" value={form.status} className="form-control rounded-pill text-muted" readOnly />
            </div>
          </div>
          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-success rounded-pill px-4">{editing ? "Update Proposal" : "Add Proposal"}</button>
            {editing && <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={resetForm}>Cancel</button>}
          </div>
        </form>

        {/* Recently Added Proposal (Card) */}
        {newProposal && (
          <div className="card mb-4 shadow" style={{ background: "rgba(255, 255, 255, 0.6)", borderRadius: "16px" }}>
            <div className="card-body text-center fw-bold text-dark">
              <h3 className="text-primary ">Recently Added Proposal</h3>
              <p><strong>ID:</strong> {newProposal.proposalId}</p>
              <p><strong>User ID:</strong> {newProposal.userId}</p>
              <p><strong>Vehicle ID:</strong> {newProposal.vehicleId}</p>
              <p><strong>Status:</strong> 
              <span className={newProposal.status === "APPROVED" ? "text-success fw-bold" :
                 newProposal.status === "REJECTED" ? "text-danger fw-bold" : "text-warning fw-bold"}>{newProposal.status}</span>
              </p>
              <button className="btn btn-sm btn-warning rounded-pill px-3 me-2" onClick={() => onEdit(newProposal)}>Edit</button>
              <button className="btn btn-sm btn-danger rounded-pill px-3 me-2" onClick={() => onDelete(newProposal.proposalId)}>Delete</button>
              <button className="btn btn-sm btn-primary rounded-pill px-3" onClick={() => navigate("/user/policies")}>Go to Policies</button>
            </div>
          </div>
        )}

        {/* User Proposals (Cards) */}
        {proposals.length > 0 && (
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {proposals.map((p) => (
              <div key={p.proposalId} className="card shadow text-center" style={{ width: "18rem", background: "rgba(255, 255, 255, 0.4)", borderRadius: "16px" }}>
                <div className="card-body fw-bold text-dark">
                  <h6>ID: {p.proposalId}</h6>
                  <p>User ID: {p.userId}</p>
                  <p>Vehicle ID: {p.vehicleId}</p>
                  <p>Status: <span className={p.status === "APPROVED" ? "text-success fw-bold" : p.status === "REJECTED" ? "text-danger fw-bold" : "text-warning fw-bold"}>{p.status}</span></p>
                  <p className="text-muted fw-bold">View only</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show All */}
        <div className="mt-4 mb-3 text-center"><button className="btn btn-outline-dark rounded-pill px-4" onClick={handleShowAll}>Show All Proposals</button></div>

        {/* All Proposals (Cards) */}
        {allProposals && allProposals.length > 0 && (
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {allProposals.map((p) => (
              <div key={p.proposalId} className="card shadow text-center" style={{ width: "18rem", background: "rgba(255, 255, 255, 0.66)", borderRadius: "16px" }}>
                <div className="card-body fw-bold text-dark">
                  <h6 className="text-primary">PROPOSAL ID: {p.proposalId}</h6>
                  <p>User ID: {p.userId}</p>
                  <p>Vehicle ID: {p.vehicleId}</p>
                  <p>Status: <span className={p.status === "APPROVED" ? "text-success fw-bold" : p.status === "REJECTED" ? "text-danger fw-bold" : "text-warning fw-bold"}>{p.status}</span></p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProposalsPage;

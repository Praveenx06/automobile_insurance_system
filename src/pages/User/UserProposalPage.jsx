
import React, { useEffect, useState } from "react";
import ProposalService from "../../services/ProposalService";
import bg from "../../assets/adminproposal2.jpg";

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
      .then((res) => {
        const all = res.data || [];
        setProposals(all.filter((p) => p.userId === storedUserId));
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
      .then((res) => {
        setMessage(editing ? "Proposal updated" : "Proposal added");

        if (!editing) {
          const added = res.data;
          setLastProposalId(added?.proposalId || form.proposalId);
          setNewProposal(added);
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
    setForm({
      proposalId: "",
      userId: currentUserId,
      vehicleId: "",
      status: "PENDING"
    });
    setEditing(false);
  };

  const onEdit = (p) => {
    if (newProposal && p.proposalId === newProposal.proposalId) {
      setForm(p);
      setEditing(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setMessage(" Only the newly added proposal can be edited");
    }
  };

  const onDelete = (id) => {
    if (newProposal && id === newProposal.proposalId) {
      if (!window.confirm(`Delete your newly added proposal with ID ${id}?`))
        return;

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
    } else {
      setMessage(" Only the newly added proposal can be deleted");
    }
  };

  const handleShowAll = () => {
    ProposalService.getAll()
      .then((res) => {
        setAllProposals(res.data || []);
        setMessage(" Showing all proposals");
      })
      .catch(() => setMessage(" Failed to load all proposals"));
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
      <div className="container" style={{ maxWidth: "1100px" }}>
        <h1
          className="fw-bold text-center mb-4 text-dark text-shadow"
          style={{ color: "black", fontSize: "2.5rem", letterSpacing: "2px" }}
        >
          USER PROPOSAL MANAGEMENT
        </h1>

        {/* ✅ Message */}
        {message && (
          <div
            className="alert text-center"
            style={{
              maxWidth: "600px",
              margin: "0 auto 20px auto",
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

        {/* ✅ Add / Update Form */}
        <form
          onSubmit={handleSave}
          className="mb-4 p-4"
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
          }}
        >
          <div className="row g-3">
            <div className="col-md-3">
              <label className="text-light fw-bold">Proposal ID</label>
              <input
                name="proposalId"
                value={form.proposalId}
                onChange={handleChange}
                className="form-control rounded-pill"
                disabled={editing}
              />
            </div>
            <div className="col-md-3">
              <label className="text-light fw-bold">User ID</label>
              <input
                name="userId"
                value={form.userId}
                onChange={handleChange}
                className="form-control rounded-pill"
              />
            </div>
            <div className="col-md-3">
              <label className="text-light fw-bold">Vehicle ID</label>
              <input
                name="vehicleId"
                value={form.vehicleId}
                onChange={handleChange}
                className="form-control rounded-pill"
                required
              />
            </div>
            <div className="col-md-3">
              <label className="text-light fw-bold">Status</label>
              <input
                name="status"
                value={form.status}
                className="form-control rounded-pill text-muted"
                readOnly
              />
            </div>
          </div>

          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-success rounded-pill px-4">
              {editing ? "Update Proposal" : "Add Proposal"}
            </button>
            {editing && (
              <button
                type="button"
                className="btn btn-secondary rounded-pill px-4"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {lastProposalId && (
          <div
            className="alert alert-secondary text-center"
            style={{
              maxWidth: "600px",
              margin: "0 auto 20px auto",
              borderRadius: "12px",
              fontWeight: "bold"
            }}
          >
            Last added proposal ID: <strong>{lastProposalId}</strong>
          </div>
        )}

        {/* ✅ Recently Added Proposal */}
        {newProposal && (
          <div
            className="table-responsive mb-4"
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
              background: "rgba(255,255,255,0.12)",
              borderRadius: "16px",
              overflow: "hidden",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
            }}
          >
            <h5 className="text-warning text-center p-3">
              Recently Added Proposal
            </h5>
            <table className="table table-hover text-white align-middle mb-0">
              <thead
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  fontWeight: "bold"
                }}
              >
                <tr>
                  <th className="text-center p-3">ID</th>
                  <th className="text-center p-3">User ID</th>
                  <th className="text-center p-3">Vehicle ID</th>
                  <th className="text-center p-3">Status</th>
                  <th className="text-center p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                  <td className="text-center p-2">{newProposal.proposalId}</td>
                  <td className="text-center p-2">{newProposal.userId}</td>
                  <td className="text-center p-2">{newProposal.vehicleId}</td>
                  <td className="text-center p-2">
                    <span
                      className={`fw-bold ${
                        newProposal.status === "APPROVED"
                          ? "text-success"
                          : newProposal.status === "REJECTED"
                          ? "text-danger"
                          : newProposal.status === "PENDING"
                          ? "text-warning"
                          : "text-light"
                      }`}
                    >
                      {newProposal.status}
                    </span>
                  </td>
                  <td className="text-center p-2">
                    <button
                      className="btn btn-sm btn-warning rounded-pill px-3 me-2"
                      onClick={() => onEdit(newProposal)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger rounded-pill px-3"
                      onClick={() => onDelete(newProposal.proposalId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* ✅ User's Proposals */}
        <h5 className="mt-4 text-success text-center">Your Proposals</h5>
        {proposals.length === 0 ? (
          <p className="text-center text-light fw-bold">
            
          </p>
        ) : (
          <div
            className="table-responsive mb-4"
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
              background: "rgba(255,255,255,0.12)",
              borderRadius: "16px",
              overflow: "hidden",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
            }}
          >
            <table className="table table-hover text-white align-middle mb-0">
              <thead
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  fontWeight: "bold"
                }}
              >
                <tr>
                  <th className="text-center p-3">ID</th>
                  <th className="text-center p-3">User ID</th>
                  <th className="text-center p-3">Vehicle ID</th>
                  <th className="text-center p-3">Status</th>
                  <th className="text-center p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {proposals.map((p) => (
                  <tr
                    key={p.proposalId}
                    style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    <td className="text-center p-2">{p.proposalId}</td>
                    <td className="text-center p-2">{p.userId}</td>
                    <td className="text-center p-2">{p.vehicleId}</td>
                    <td className="text-center p-2">
                      <span
                        className={`fw-bold ${
                          p.status === "APPROVED"
                            ? "text-success"
                            : p.status === "REJECTED"
                            ? "text-danger"
                            : p.status === "PENDING"
                            ? "text-warning"
                            : "text-light"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="text-center p-2">
                      <span className="text-muted">View only</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ✅ Show All Proposals Button */}
        <div className="mt-4 mb-3 text-center">
          <button
            className="btn btn-outline-light rounded-pill px-4"
            onClick={handleShowAll}
          >
            Show All Proposals
          </button>
        </div>

        {/* ✅ All Proposals */}
        <h2 className="mt-3 text-bold text-light text-center"> All Proposals</h2>
        {allProposals === null ? (
          <p className="text-center text-light">
            Click "Show All Proposals" to view all entries.
          </p>
        ) : allProposals.length === 0 ? (
          <p className="text-center text-light">
            No proposals available in the database.
          </p>
        ) : (
          <div
            className="table-responsive"
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
              background: "rgba(255,255,255,0.12)",
              borderRadius: "16px",
              overflow: "hidden",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
            }}
          >
            <table className="table table-striped text-white align-middle mb-0">
              <thead
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  fontWeight: "bold"
                }}
              >
                <tr>
                  <th className="text-center p-3">ID</th>
                  <th className="text-center p-3">User ID</th>
                  <th className="text-center p-3">Vehicle ID</th>
                  <th className="text-center p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {allProposals.map((p) => (
                  <tr
                    key={p.proposalId}
                    style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    <td className="text-center p-2">{p.proposalId}</td>
                    <td className="text-center p-2">{p.userId}</td>
                    <td className="text-center p-2">{p.vehicleId}</td>
                    <td className="text-center p-2">
                      <span
                        className={`fw-bold ${
                          p.status === "APPROVED"
                            ? "text-success"
                            : p.status === "REJECTED"
                            ? "text-danger"
                            : p.status === "PENDING"
                            ? "text-warning"
                            : "text-light"
                        }`}
                      >
                        {p.status}
                      </span>
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

export default UserProposalsPage;

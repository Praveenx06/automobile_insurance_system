import React, { useEffect, useState } from "react";
import ProposalService from "../../services/ProposalService";
import bg from "../../assets/adminproposal2.jpg";

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
      .then((res) => setProposals(res.data || []))
      .catch(() => setMessage("Failed to load proposals"));
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setMessage("");

    if (editing) {
      ProposalService.update(form)
        .then(() => {
          setMessage("Proposal updated successfully");
          resetForm();
          load();
        })
        .catch(() => setMessage("Update failed"));
    } else {
      ProposalService.add(form)
        .then(() => {
          setMessage("Proposal added successfully");
          resetForm();
          load();
        })
        .catch(() =>
          setMessage("Add failed (check User ID and Vehicle ID exist)")
        );
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
      setMessage("Please enter an ID to delete");
      return;
    }
    if (!window.confirm(`Delete proposal with ID ${deleteId}?`)) return;

    ProposalService.delete(deleteId)
      .then(() => {
        setMessage(`Proposal ${deleteId} deleted successfully`);
        setDeleteId("");
        load();
      })
      .catch(() => setMessage("Delete failed"));
  };

  const onSearch = () => {
    if (!searchId) return;
    ProposalService.getById(searchId)
      .then((res) => {
        if (res && res.data) setProposals([res.data]);
        else setProposals(res || []);
      })
      .catch(() => setMessage("Proposal not found"));
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
          style={{ color: "black", fontSize: "2.5rem" , letterSpacing: "2px" }}
        >
          PROPOSAL MANAGEMENT
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
                required
                type="number"
              />
            </div>
            <div className="col-md-3">
              <label className="text-light fw-bold">User ID</label>
              <input
                name="userId"
                value={form.userId}
                onChange={handleChange}
                className="form-control rounded-pill"
                required
                type="number"
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
                type="number"
              />
            </div>
            <div className="col-md-3">
              <label className="text-light fw-bold">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="form-control rounded-pill"
                required
              >
                <option value="">Select</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
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

        {/* ✅ Search + Delete Section */}
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
          <div className="col-md-3">
            <input
              placeholder="Search by Proposal ID"
              className="form-control rounded-pill"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              type="number"
            />
          </div>
          <div className="col-md-2 d-grid">
            <button
              type="button"
              className="btn btn-info rounded-pill"
              onClick={onSearch}
            >
              Search
            </button>
          </div>
          <div className="col-md-2 d-grid">
            <button
              type="button"
              className="btn btn-primary rounded-pill"
              onClick={load}
            >
              Show All
            </button>
          </div>
          <div className="col-md-3">
            <input
              placeholder="Delete by Proposal ID"
              className="form-control rounded-pill"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
              type="number"
            />
          </div>
          <div className="col-md-2 d-grid">
            <button
              type="button"
              className="btn btn-danger rounded-pill"
              onClick={onDeleteById}
            >
              Delete
            </button>
          </div>
        </div>

        {/* ✅ Proposals Table */}
{proposals.length === 0 ? (
  <p className="text-center text-light fw-bold">No proposals found.</p>
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
    <table
      className="table table-hover  opacity-75 transparent-table shadow-sm align-middle mb-0"
      style={{
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.12)",
        color: "#fff",
        borderCollapse: "collapse",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 0 8px rgba(0,0,0,0.3)",
        textShadow: "0 1px 2px rgba(0,0,0,0.6)"
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
          <th className="text-center p-3">Proposal ID</th>
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
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              color: "#fff",
              textShadow: "0 1px 2px rgba(0,0,0,0.6)"
            }}
          >
            <td className="text-center p-2">{p.proposalId}</td>
            <td className="text-center p-2">{p.userId}</td>
            <td className="text-center p-2">{p.vehicleId}</td>

            {/* ✅ Status with color */}
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
              <div className="d-flex justify-content-center gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-warning rounded-pill px-3"
                  onClick={() => onEdit(p)}
                >
                  Edit
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

export default ProposalsPage;

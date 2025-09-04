import React, { useEffect, useState } from "react";
import ClaimService from "../../services/ClaimService";

function UserClaimPage() {
  const [claims, setClaims] = useState([]);
  const [form, setForm] = useState({
    claimId: "",
    claimReason: "",
    claimDate: "",
    status: "UNDER_REVIEW", // default status
    policyId: ""
  });
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);
  const [userClaimId, setUserClaimId] = useState(null); // only track user’s own claimId

  const load = () => {
    ClaimService.getAll()
      .then((res) => setClaims(res.data || []))
      .catch(() => setMessage("Failed to load claims"));
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // prevent user from changing status manually
    if (name === "status") return;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setMessage("");

    const payload = {
      claimId: parseInt(form.claimId),
      claimReason: form.claimReason,
      claimDate: form.claimDate,
      status: "UNDER_REVIEW", // always enforce default
      policyId: parseInt(form.policyId)
    };

    const action = editing ? ClaimService.update : ClaimService.add;

    action(payload)
      .then(() => {
        setMessage(editing ? "Claim updated successfully ✅" : "Claim added successfully ✅");

        // Remember this user’s claim
        if (!editing) {
          setUserClaimId(payload.claimId);
        }

        resetForm();
        load();
      })
      .catch(() => setMessage(editing ? "Update failed ❌" : "Add failed ❌"));
  };

  const resetForm = () => {
    setForm({
      claimId: "",
      claimReason: "",
      claimDate: "",
      status: "UNDER_REVIEW", // reset to default
      policyId: ""
    });
    setEditing(false);
  };

  const onEdit = (c) => {
    if (c.claimId !== userClaimId) {
      setMessage("❌ You can only edit your own claim.");
      return;
    }

    setForm({
      claimId: c.claimId,
      claimReason: c.claimReason,
      claimDate: c.claimDate,
      status: "UNDER_REVIEW", // keep status fixed
      policyId: c.policyId
    });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = (c) => {
    if (c.claimId !== userClaimId) {
      setMessage("❌ You can only delete your own claim.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this claim?")) {
      ClaimService.remove(c.claimId)
        .then(() => {
          setMessage("Claim deleted successfully ✅");
          load();
        })
        .catch(() => setMessage("Delete failed ❌"));
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-primary text-center mb-4">User Claims</h2>

      {message && <div className="alert alert-info text-center">{message}</div>}

      {/* Add / Update Form */}
      <form onSubmit={handleSave} className="mb-4">
        <h5>{editing ? "Update Claim" : "Add Claim"}</h5>
        <div className="row g-3">
          <div className="col-md-2">
            <label className="form-label">Claim ID</label>
            <input
              name="claimId"
              value={form.claimId}
              onChange={handleChange}
              className="form-control"
              type="number"
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Reason</label>
            <input
              name="claimReason"
              value={form.claimReason}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Date</label>
            <input
              name="claimDate"
              value={form.claimDate}
              onChange={handleChange}
              type="date"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Status</label>
            <input
              name="status"
              value={form.status}
              className="form-control"
              readOnly // readonly so user cannot edit
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Policy ID</label>
            <input
              name="policyId"
              value={form.policyId}
              onChange={handleChange}
              type="number"
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="mt-3 d-flex gap-2">
          <button className="btn btn-success">
            {editing ? "Update Claim" : "Add Claim"}
          </button>
          {editing && (
            <button type="button" className="btn btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Claims List */}
      {claims.length === 0 ? (
        <p className="text-center">No claims found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-dark text-center">
              <tr>
                <th>ID</th>
                <th>Reason</th>
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
                  <td>{c.status}</td>
                  <td>{c.policyId}</td>
                  <td className="text-center">
                    {c.claimId === userClaimId && (
                      <>
                        <button
                          className="btn btn-sm btn-secondary me-2"
                          onClick={() => onEdit(c)}
                        >
                          Edit
                        </button>
                        {/* <button
                          className="btn btn-sm btn-danger"
                          onClick={() => onDelete(c)}
                        >
                          Delete
                        </button> */}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserClaimPage;

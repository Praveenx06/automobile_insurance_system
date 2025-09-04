

import React, { useEffect, useState } from "react";
import PolicyService from "../../services/PolicyService";

function UserPoliciesPage() {
  const [policies, setPolicies] = useState([]);
  const [form, setForm] = useState({
    policyId: "",
    proposalId: "",
    startDate: "",
    endDate: "",
    status: "UNDER REVIEW",
    description: "",
    price: 0
  });
  const [message, setMessage] = useState("");
  const [searchId, setSearchId] = useState("");
  const [editing, setEditing] = useState(false);
  const [userPolicyId, setUserPolicyId] = useState(null);

  // mapping description to price
  const coveragePrices = {
    "Full body coverage": 10000,
    "Side body coverage": 6000,
    "Front and Rear body coverage": 4000
  };

  // Load all policies
  const load = () => {
    PolicyService.getAll()
      .then(res => setPolicies(res.data || []))
      .catch(() => setMessage("Failed to load policies"));
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      // update description and auto-set price
      setForm(prev => ({
        ...prev,
        description: value,
        price: coveragePrices[value] || 0
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleStartDate = (e) => {
    const startDate = e.target.value;
    setForm(prev => ({ ...prev, startDate, endDate: "" }));
  };

  const handleDuration = (duration) => {
    if (!form.startDate) {
      alert("Please select start date first");
      return;
    }
    const start = new Date(form.startDate);
    if (duration === "6m") start.setMonth(start.getMonth() + 6);
    if (duration === "1y") start.setFullYear(start.getFullYear() + 1);
    if (duration === "2y") start.setFullYear(start.getFullYear() + 2);
    const endDate = start.toISOString().split("T")[0];
    setForm(prev => ({ ...prev, endDate }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setMessage("");

    const payload = {
      policyId: parseInt(form.policyId),
      proposalId: parseInt(form.proposalId),
      startDate: form.startDate,
      endDate: form.endDate,
      status: form.status,
      description: form.description,
      price: form.price
    };

    const action = editing ? PolicyService.update : PolicyService.add;

    action(payload)
      .then(() => {
        setMessage(editing ? "Policy updated successfully" : "Policy added successfully");
        if (!editing) {
          setUserPolicyId(payload.policyId);
        }
        resetForm();
        load();
      })
      .catch(() => setMessage(editing ? "Update failed" : "Add failed"));
  };

  const resetForm = () => {
    setForm({
      policyId: "",
      proposalId: "",
      startDate: "",
      endDate: "",
      status: "UNDER REVIEW",
      description: "",
      price: 0
    });
    setEditing(false);
  };

  const onEdit = (p) => {
    if (p.policyId !== userPolicyId) {
      setMessage("You can only edit your own policy.");
      return;
    }
    setForm({
      policyId: p.policyId,
      proposalId: p.proposalId,
      startDate: p.startDate,
      endDate: p.endDate,
      status: p.status,
      description: p.description,
      price: p.price
    });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = (p) => {
    if (p.policyId !== userPolicyId) {
      setMessage("You can only delete your own policy.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this policy?")) {
      PolicyService.delete(p.policyId)
        .then(() => {
          setMessage("Policy deleted successfully");
          load();
          resetForm();
          setUserPolicyId(null);
        })
        .catch(() => setMessage("Failed to delete policy"));
    }
  };

  const handleSearch = () => {
    if (!searchId) {
      load();
      return;
    }
    PolicyService.getById(searchId)
      .then(res => setPolicies([res.data]))
      .catch(() => setMessage("Policy not found"));
  };

  return (
    <div className="container-fluid mt-4">
      <h3 className="fw-bold text-primary">Policy Management</h3>

      {message && <div className="alert alert-info">{message}</div>}

      {/* Add/Update Policy Form */}
      <form onSubmit={handleSave} className="mb-3 p-3 border rounded bg-light">
        <div className="row g-3">
          <div className="col-md-2">
            <label>Policy ID</label>
            <input
              name="policyId"
              value={form.policyId}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Policy ID"
              required
              type="number"
            />
          </div>
          <div className="col-md-2">
            <label>Proposal ID</label>
            <input
              name="proposalId"
              value={form.proposalId}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Proposal ID"
              required
              type="number"
            />
          </div>
          <div className="col-md-3">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleStartDate}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <label>Select Duration</label>
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => handleDuration("6m")}>6 Months</button>
              <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => handleDuration("1y")}>1 Year</button>
              <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => handleDuration("2y")}>2 Years</button>
            </div>
          </div>
          <div className="col-md-2">
            <label>Status</label>
            <input
              type="text"
              name="status"
              value={form.status}
              readOnly
              className="form-control"
            />
          </div>

          {/* New Description Dropdown */}
          <div className="col-md-3">
            <label>Description</label>
            <select
              name="description"
              value={form.description}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">-- Select Coverage --</option>
              <option value="Full body coverage">Full body coverage</option>
              <option value="Side body coverage">Side body coverage</option>
              <option value="Front and Rear body coverage">Front and Rear body coverage</option>
            </select>
          </div>

          {/* Price auto-filled */}
          <div className="col-md-2">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              readOnly
              className="form-control"
            />
          </div>
        </div>

        <div className="mt-3 d-flex gap-2">
          <button className="btn btn-success">
            {editing ? "Update Policy" : "Add Policy"}
          </button>
          {editing && (
            <button type="button" className="btn btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Search by Policy ID */}
      <div className="mb-3">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Search by Policy ID"
          className="form-control w-25 d-inline"
        />
        <button className="btn btn-primary ms-2" onClick={handleSearch}>Search</button>
        <button className="btn btn-secondary ms-2" onClick={load}>Reset</button>
      </div>

      {/* Policy List */}
      {policies.length === 0 ? <p>No policies found.</p> : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark text-center">
            <tr>
              <th>ID</th>
              <th>Proposal ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
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
                <td>{p.description}</td>
                <td> <span className="text-success fw-bold">₹ {p.price}</span></td>
                <td className="text-center">
                  {p.policyId === userPolicyId && (
                    <>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => onEdit(p)}
                      >
                        Edit
                      </button>
                      {/* <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onDelete(p)}
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
      )}
    </div>
  );
}

export default UserPoliciesPage;

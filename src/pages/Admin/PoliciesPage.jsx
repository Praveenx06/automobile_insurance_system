import React, { useEffect, useState } from "react";
import PolicyService from "../../services/PolicyService";
import bg from "../../assets/admincommon.jpg";

function PoliciesPage() {
  const [policies, setPolicies] = useState([]);
  const [form, setForm] = useState({
    policyId: "",
    proposalId: "",
    startDate: "",
    endDate: "",
    status: "UNDER REVIEW",
    description: "",
    price: ""
  });
  const [searchId, setSearchId] = useState("");
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);

  const load = () => {
    PolicyService.getAll()
      .then(res => setPolicies(res.data || []))
      .catch(() => setMessage("Failed to load policies"));
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setMessage("");
    const payload = { ...form, policyId: parseInt(form.policyId), price: parseFloat(form.price) };
    const action = editing ? PolicyService.update : PolicyService.add;
    action(payload)
      .then(() => {
        setMessage(editing ? " Policy updated successfully" : " Policy added successfully");
        resetForm();
        load();
      })
      .catch(() => setMessage(editing ? " Update failed" : " Add failed"));
  };

  const resetForm = () => {
    setForm({ policyId: "", proposalId: "", startDate: "", endDate: "", status: "UNDER REVIEW", description: "", price: "" });
    setEditing(false);
  };

  const onEdit = (p) => {
    setForm({ policyId: p.policyId, proposalId: p.proposalId, startDate: p.startDate, endDate: p.endDate, status: p.status, description: p.description, price: p.price });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = (id) => {
    if (!window.confirm("Delete this policy?")) return;
    PolicyService.delete(id)
      .then(() => {
        setMessage(" Policy deleted successfully");
        load();
      })
      .catch(() => setMessage(" Delete failed"));
  };

  const onSearchById = () => {
    if (!searchId) return;
    PolicyService.getById(searchId)
      .then(res => setPolicies([res.data]))
      .catch(() => setMessage(" Policy not found"));
  };

  return (
    <div className="d-flex flex-column align-items-center" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", minHeight: "100vh", width: "100vw", overflow: "auto", padding: "24px" }}>
      <div className="container" style={{ maxWidth: "1100px" }}>
        <h1 className="fw-bold text-center mb-4 text-light text-shadow" style={{ color: "black", fontSize: "2.5rem", letterSpacing: "2px" }}>--POLICY MANAGEMENT--</h1>

        {/* Message */}
        {message && (
          <div className="alert text-center" style={{ maxWidth: "600px", margin: "0 auto 20px auto", background: "rgba(0,0,0,0.6)", color: "#fff", fontWeight: "bold", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
            {message}
          </div>
        )}

        {/* Add / Update Form */}
        <form onSubmit={handleSave} className="mb-4 p-4" style={{ maxWidth: "900px", margin: "0 auto", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", borderRadius: "16px", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
          <h1 className="text-warning fw-bold">Add a policy or click edit and update</h1> <br />
          <div className="row g-3">
            <div className="col-md-4">
              <label className="text-light fw-bold">ID</label>
              <input name="policyId" value={form.policyId} onChange={handleChange} className="form-control rounded-pill" required type="number" />
            </div>
            <div className="col-md-4">
              <label className="text-light fw-bold">Proposal ID</label>
              <input name="proposalId" value={form.proposalId} onChange={handleChange} className="form-control rounded-pill" required type="number" />
            </div>
            <div className="col-md-4">
              <label className="text-light fw-bold">Price</label>
              <input name="price" value={form.price} onChange={handleChange} className="form-control rounded-pill" required type="number" />
            </div>
            <div className="col-md-6">
              <label className="text-light fw-bold">Start Date</label>
              <input name="startDate" value={form.startDate} onChange={handleChange} type="date" className="form-control rounded-pill" required />
            </div>
            <div className="col-md-6">
              <label className="text-light fw-bold">End Date</label>
              <input name="endDate" value={form.endDate} onChange={handleChange} type="date" className="form-control rounded-pill" required />
            </div>
            <div className="col-md-6">
              <label className="text-light fw-bold">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="form-control rounded-pill">
                <option value="UNDER REVIEW">Under Review</option>
                <option value="ACTIVE">Active</option>
                <option value="EXPIRED">Expired</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="text-light fw-bold">Description</label>
              <input name="description" value={form.description} onChange={handleChange} className="form-control rounded-pill" />
            </div>
          </div>

          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-success rounded-pill px-4">{editing ? "Update Policy" : "Add Policy"}</button>
            {editing && (
              <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={resetForm}>Cancel</button>
            )}
          </div>
        </form>

        {/* Search Section */}
        <div className="row g-3 mb-4" style={{ maxWidth: "900px", margin: "0 auto", background: "rgba(255,255,255,0.1)", padding: "15px", borderRadius: "16px", backdropFilter: "blur(8px)", boxShadow: "0 6px 18px rgba(0,0,0,0.2)" }}>
          <div className="col-md-6">
            <input placeholder="Search by ID" className="form-control rounded-pill" value={searchId} onChange={(e) => setSearchId(e.target.value)} type="number" />
          </div>
          <div className="col-md-3 d-grid">
            <button className="btn btn-info rounded-pill" onClick={onSearchById}>Search</button>
          </div>
          <div className="col-md-3 d-grid">
            <button className="btn btn-primary rounded-pill" onClick={load}>Show All</button>
          </div>
        </div>

        {/* Policies List */}
        {policies.length === 0 ? (
          <p className="text-center text-light fw-bold">No policies found.</p>
        ) : (
          <div className="row g-4" style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h1 className="text-center text-dark fw-bold">List of all policies</h1>
            {policies.map((p) => (
              <div key={p.policyId} className="col-md-4">
                <div className="card h-100 shadow-lg border-0" style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: "16px" }}>
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold text-primary text-shadow mb-3">Policy #{p.policyId}</h5>
                    <p className="fw-bold text-dark text-shadow">Proposal ID: {p.proposalId}</p>
                    <p className="fw-bold text-dark text-shadow">Start date: {p.startDate}</p>
                    <p className="fw-bold text-dark text-shadow">End date: {p.endDate}</p>
                    <p className={`fw-bold text-shadow ${p.status === "ACTIVE" ? "text-success" : p.status === "UNDER REVIEW" ? "text-warning" : "text-danger"}`}>{p.status}</p>
                    <p className="fw-bold text-dark text-shadow">Policy type: {p.description}</p>
                    <p className="fw-bold text-success text-shadow">Price: ₹ {p.price}</p>
                    <div className="d-flex justify-content-center gap-2 mt-3">
                      <button className="btn btn-warning rounded-pill px-3" onClick={() => onEdit(p)}>Edit</button>
                      <button className="btn btn-danger rounded-pill px-3" onClick={() => onDelete(p.policyId)}>Delete</button>
                    </div>
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

export default PoliciesPage;

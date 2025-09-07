
import React, { useEffect, useState } from "react";
import PolicyService from "../../services/PolicyService";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/userpolicy22.jpg";

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
  const [newPolicy, setNewPolicy] = useState(null);
  const navigate = useNavigate();

  const coveragePrices = {
    "Full body coverage": 10000,
    "Side body coverage": 6000,
    "Front and Rear body coverage": 4000
  };

  const load = () => {
    PolicyService.getAll()
      .then(res => {
        const data = res.data || [];
        setPolicies(data);
        if (data.length > 0) {
          const maxId = Math.max(...data.map(p => p.policyId));
          setUserPolicyId(maxId); // last entered policy ID
        } else {
          setUserPolicyId(null);
        }
      })
      .catch(() => setMessage("Failed to load policies"));
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description") {
      setForm(prev => ({ ...prev, description: value, price: coveragePrices[value] || 0 }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleStartDate = (e) => {
    const startDate = e.target.value;
    const today = new Date();
    today.setHours(0,0,0,0); // ignore time

    const selected = new Date(startDate);
    if (selected < today) {
      alert("Please enter a valid date (today or future).");
      setForm(prev => ({ ...prev, startDate: "", endDate: "" }));
      return;
    }
    setForm(prev => ({ ...prev, startDate, endDate: "" }));
  };

  const handleDuration = (duration) => {
    if (!form.startDate) { alert("Please select start date first"); return; }
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
    const payload = { policyId: parseInt(form.policyId), proposalId: parseInt(form.proposalId), startDate: form.startDate, endDate: form.endDate, status: form.status, description: form.description, price: form.price };
    const action = editing ? PolicyService.update : PolicyService.add;
    action(payload)
      .then(() => {
        setMessage(editing ? "Policy updated successfully" : "Policy added successfully");
        setNewPolicy(payload);
        setUserPolicyId(payload.policyId);
        resetForm();
        load();
      })
      .catch(() => setMessage(editing ? "Update failed" : "Add failed"));
  };

  const resetForm = () => { setForm({ policyId: "", proposalId: "", startDate: "", endDate: "", status: "UNDER REVIEW", description: "", price: 0 });
   setEditing(false); };

  const onEdit = (p) => {
    if (p.policyId !== userPolicyId) { setMessage("You can only edit your own policy."); 
      return; }
    setForm({ policyId: p.policyId, proposalId: p.proposalId, startDate: p.startDate, endDate: p.endDate, status: p.status, description: p.description, price: p.price });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = () => {
    if (!searchId) { load(); return; }
    PolicyService.getById(searchId)
      .then(res => setPolicies([res.data]))
      .catch(() => setMessage("Policy not found"));
  };

  return (
    <div className="d-flex flex-column align-items-center" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh", width: "100vw", overflow: "auto", padding: "24px" }}>
      <div className="container " style={{ maxWidth: "1100px" }}>
        <h1 className="fw-bold text-center mb-4" style={{ fontSize: "2.5rem", color: "black" }}>WELCOME TO USER POLICY MANAGEMENT PAGE</h1>

        {userPolicyId && <div className="text-center mb-3">
            <h3 className="fw-bold text-warning text-center mb-4"> " USER NOTE : Below you can see previously added POLICY ID , Please we request you to continue the sequence accordingly !!! "</h3>
          <h2 className="text-primary fw-bold">Previously entered Policy ID: {userPolicyId}</h2>
          </div>}

        {message &&
        <div className="alert text-center" style={{ maxWidth: "600px", margin: "0 auto 20px auto", background: "rgba(0,0,0,0.6)", color: "#fff", fontWeight: "bold", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
          {message}
          </div>}

        <form onSubmit={handleSave} className="mb-4 p-4" style={{ maxWidth: "900px", margin: "0 auto", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", borderRadius: "16px", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
          <div className="row g-3" >
            <div className="col-md-2 fw-bold"><label>Policy ID</label><input name="policyId" value={form.policyId} onChange={handleChange} className="form-control  rounded-pill" required type="number" /></div>
            <div className="col-md-2 fw-bold"><label>Proposal ID</label><input name="proposalId" value={form.proposalId} onChange={handleChange} className="form-control  rounded-pill" required type="number" /></div>
            <div className="col-md-3 fw-bold"><label>Start Date</label><input type="date" name="startDate" value={form.startDate} onChange={handleStartDate} className="form-control  rounded-pill" required /></div>
            <div className="col-md-3 fw-bold"><label>Select Duration</label>
              <div className="d-flex gap-2">
                <button type="button" className="btn btn-primary btn-sm  rounded-pill" style={{ opacity: 0.7 }} onClick={() => handleDuration("6m")}>6 Months</button>
                <button type="button" className="btn btn-primary btn-sm  rounded-pill" style={{ opacity: 0.7 }} onClick={() => handleDuration("1y")}>1 Year</button>
                <button type="button" className="btn btn-primary btn-sm  rounded-pill" style={{ opacity: 0.7 }} onClick={() => handleDuration("2y")}>2 Years</button>
              </div>
            </div>
            <div className="col-md-2 fw-bold"><label>Status</label><input type="text" name="status" value={form.status} readOnly className="form-control  rounded-pill" /></div>
            <div className="col-md-3 fw-bold"><label>Description</label>
            <select name="description" value={form.description} onChange={handleChange} className="form-select  rounded-pill" required>
              <option value="">Select Coverage</option>
              <option value="Full body coverage">Full body coverage</option>
              <option value="Side body coverage">Side body coverage</option>
              <option value="Front and Rear body coverage">Front and Rear body coverage</option>
              </select>
              </div>
            <div className="col-md-2 fw-bold"><label>Price</label><input type="number" name="price" value={form.price} readOnly className="form-control  rounded-pill" /></div>
          </div>

          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-success">{editing ? "Update Policy" : "Add Policy"}</button>
            {editing && <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>}
          </div>
        </form>

        <div className="mb-3 d-flex justify-content-center gap-2">
          <input type="text" value={searchId} onChange={e => setSearchId(e.target.value)} placeholder="Search by Policy ID" className="form-control w-25" />
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
          <button className="btn btn-secondary" onClick={load}>Reset</button>
        </div>

       {/* Recently Added Policy */}
{newPolicy && <div className="card mb-4 text-center" style={{ maxWidth: "600px", margin: "0 auto", background: "rgba(255, 255, 255, 0.64)", borderRadius: "16px", backdropFilter: "blur(10px)", boxShadow: "0 8px 20px rgba(0,0,0,0.5)", fontWeight: "bold" }}>
  <div className="card-body text-center">
    <h5 className="fw-bold mb-3">Your Recently Added Policy</h5>
    <p><strong>ID:</strong> {newPolicy.policyId}</p>
    <p><strong>Proposal ID:</strong> {newPolicy.proposalId}</p>
    <p><strong>Start Date:</strong> {newPolicy.startDate}</p>
    <p><strong>End Date:</strong> {newPolicy.endDate}</p>
    <p><strong>Status:</strong> {newPolicy.status}</p>
    <p><strong>Description:</strong> {newPolicy.description}</p>
    <p className="text-success fw-bold">₹ {newPolicy.price}</p>
    <div className="d-flex justify-content-center gap-3 mt-3">
      <button className="btn btn-sm btn-primary" onClick={() => onEdit(newPolicy)}>Edit</button>
      <button className="btn btn-sm btn-success" onClick={() => navigate("/user/addons", { state: { policy: newPolicy } })}>Proceed with Addons</button>
      <button className="btn btn-sm btn-warning" onClick={() => navigate("/payment", { state: { policy: newPolicy } })}>Skip Addons & Pay</button>
    </div>
  </div>
</div>}


      {/* All Policies List */}
{policies.length === 0 ? <p className="text-center fw-bold">No policies found.</p> : <div className="row g-4 justify-content-center">
  {/* <h2 className="text-center text-dark fw-bold">LIST OF ALL POLICIES</h2> */}
  {policies.map(p => (
    <div key={p.policyId} className="col-md-4 col-sm-6">
      <div className={`card text-center h-100 ${p.policyId === userPolicyId ? "border-success" : ""}`} style={{ background: "rgba(255, 255, 255, 0.53)", borderRadius: "16px", backdropFilter: "blur(10px)", boxShadow: "0 8px 20px rgba(0,0,0,0.5)", fontWeight: "bold" }}>
        <div className="card-body text-center">
          <h5 className="fw-bold text-primary mb-2">Policy ID: {p.policyId}</h5>
          <p><strong>Proposal ID:</strong> {p.proposalId}</p>
          <p><strong>Start Date:</strong> {p.startDate}</p>
          <p><strong>End Date:</strong> {p.endDate}</p>
          <p><strong>Status:</strong> {p.status}</p>
          <p><strong>Description:</strong> {p.description}</p>
          <p className="text-success fw-bold">₹ {p.price}</p>
        </div>
      </div>
    </div>
  ))}
</div>}

      </div>
    </div>
  );
}

export default UserPoliciesPage;

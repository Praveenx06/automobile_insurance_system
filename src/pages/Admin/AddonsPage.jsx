import React, { useEffect, useState } from "react";
import AddonService from "../../services/AddonService";
import bg from "../../assets/admincommon.jpg"; // 🔹 Background image

function AddonsPage() {
  const [addons, setAddons] = useState([]);
  const [addon, setAddon] = useState({
    addOnId: "",
    name: "",
    additionalCost: ""
  });
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);

  const loadAddons = () => {
    AddonService.getAll()
      .then((res) => setAddons(res.data || []))
      .catch(() => setMessage("❌ Failed to load addons"));
  };

  useEffect(() => {
    loadAddons();
  }, []);

  const handleChange = (e) => {
    setAddon({ ...addon, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = editing ? AddonService.update : AddonService.add;
    action(addon)
      .then(() => {
        setMessage(editing ? "✅ Addon updated successfully" : "✅ Addon added successfully");
        setAddon({ addOnId: "", name: "", additionalCost: "" });
        setEditing(false);
        loadAddons();
      })
      .catch(() =>
        setMessage(editing ? "❌ Failed to update addon" : "❌ Failed to add addon")
      );
  };

  const handleEdit = (a) => {
    setAddon({
      addOnId: a.addOnId,
      name: a.name,
      additionalCost: a.additionalCost
    });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this addon?")) return;
    AddonService.deleteById(id)
      .then(() => {
        setMessage("🗑️ Addon deleted successfully");
        loadAddons();
      })
      .catch(() => setMessage("❌ Failed to delete addon"));
  };

  const resetForm = () => {
    setAddon({ addOnId: "", name: "", additionalCost: "" });
    setEditing(false);
  };

  return (
    <div className="d-flex flex-column align-items-center"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", minHeight: "100vh", width: "100vw", overflow: "auto", padding: "24px" }}>

      <div className="container" style={{ maxWidth: "1100px" }}>
        <h1 className="fw-bold text-center mb-4 text-light text-shadow" style={{ color: "black", fontSize: "2.5rem", letterSpacing: "2px" }}>
          --ADDON MANAGEMENT--
        </h1>

        {/* Message */}
        {message && (
          <div className="alert text-center" style={{ maxWidth: "600px", margin: "0 auto 20px auto", background: "rgba(0,0,0,0.6)", color: "#fff", fontWeight: "bold", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
            {message}
          </div>
        )}

        {/* Add / Update Form */}
        <form onSubmit={handleSubmit} className="mb-4 p-4"
          style={{ maxWidth: "900px", margin: "0 auto", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", borderRadius: "16px", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
          <h3 className="text-warning fw-bold">Add an addon or click edit to update</h3> <br />
          <div className="row g-3">
            <div className="col-md-5">
              <label className="text-light fw-bold">Name</label>
              <input type="text" name="name" value={addon.name} onChange={handleChange} placeholder="Name" className="form-control rounded-pill" required />
            </div>
            <div className="col-md-5">
              <label className="text-light fw-bold">Additional Cost</label>
              <input type="number" name="additionalCost" value={addon.additionalCost} onChange={handleChange} placeholder="Additional Cost" className="form-control rounded-pill" required />
            </div>
            <div className="col-md-2 d-grid">
              <button type="submit" className="btn btn-success rounded-pill">
                {editing ? "Update" : "Add"}
              </button>
            </div>
          </div>
          {editing && (
            <div className="mt-3 text-center">
              <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={resetForm}>
                Cancel
              </button>
            </div>
          )}
        </form>

        {/* Addons List */}
        {addons.length === 0 ? (
          <p className="text-center text-light fw-bold">No addons found.</p>
        ) : (
          <div className="row g-4" style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h1 className="text-center text-dark fw-bold">List of all addons</h1>
            {addons.map((a) => (
              <div key={a.addOnId} className="col-md-4">
                <div className="card h-100 shadow-lg border-0"
                  style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: "16px" }}>
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold text-shadow mb-3">{a.name}</h5>
                    <p className="fw-bold text-success text-shadow">₹{a.additionalCost}</p>
                    <p className="text-muted">ID: {a.addOnId}</p>

                    <div className="d-flex justify-content-center gap-2 mt-3">
                      <button className="btn btn-warning rounded-pill px-3" onClick={() => handleEdit(a)}>Edit</button>
                      <button className="btn btn-danger rounded-pill px-3" onClick={() => handleDelete(a.addOnId)}>Delete</button>
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

export default AddonsPage;

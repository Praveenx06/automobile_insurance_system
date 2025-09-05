import React, { useEffect, useState } from "react";
import AddonService from "../../services/AddonService";
import bg from "../../assets/adminaddon.jpg"; // 🔹 Background image

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
      .catch(() => setMessage(" Failed to load addons"));
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
        setMessage(
          editing ? " Addon updated successfully" : " Addon added successfully"
        );
        setAddon({ addOnId: "", name: "", additionalCost: "" });
        setEditing(false);
        loadAddons();
      })
      .catch(() =>
        setMessage(editing ? " Failed to update addon" : " Failed to add addon")
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
      .catch(() => setMessage(" Failed to delete addon"));
  };

  const resetForm = () => {
    setAddon({ addOnId: "", name: "", additionalCost: "" });
    setEditing(false);
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
      <div style={{ width: "100%", maxWidth: "1100px" }}>
        {/* Heading */}
        <h1
          className="fw-bold text-center mb-4"
          style={{ color: "#070606ff", fontSize: "2.5rem" }}
        >
          ADDON MANAGEMENT
        </h1>

        {/* Message */}
        {message && (
          <div
            className="alert text-center mx-auto"
            style={{
              maxWidth: "600px",
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

        {/* Add / Update Form */}
        <form
          onSubmit={handleSubmit}
          className="mb-4 p-4 mx-auto"
          style={{
            maxWidth: "900px",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
          }}
        >
          <div className="row g-3">
            <div className="col-md-5">
              <input
                type="text"
                name="name"
                value={addon.name}
                onChange={handleChange}
                placeholder="Name"
                className="form-control rounded-pill"
                required
              />
            </div>
            <div className="col-md-5">
              <input
                type="number"
                name="additionalCost"
                value={addon.additionalCost}
                onChange={handleChange}
                placeholder="Additional Cost"
                className="form-control rounded-pill"
                required
              />
            </div>
            <div className="col-md-2 d-grid">
              <button type="submit" className="btn btn-success rounded-pill">
                {editing ? "Update" : "Add"}
              </button>
            </div>
          </div>
          {editing && (
            <div className="mt-3 text-center">
              <button
                type="button"
                className="btn btn-secondary rounded-pill px-4"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          )}
        </form>

        {/* Table */}
        {addons.length === 0 ? (
          <p className="text-center text-light fw-bold">No addons found.</p>
        ) : (
          <div
            className="table-responsive mx-auto"
            style={{
              maxWidth: "1000px",
              background: "rgba(255,255,255,0.12)",
              borderRadius: "16px",
              overflow: "hidden",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
            }}
          >
            <table className="table table-bordered table-hover opacity-75 transparent-table table-striped align-middle mb-0">
              <thead className="table-dark text-center">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Additional Cost</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {addons.map((a) => (
                  <tr key={a.addOnId}>
                    <td className="text-center">{a.addOnId}</td>
                    <td>{a.name}</td>
                    <td className="text-success fw-bold text-center">
                      ₹{a.additionalCost}
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-sm btn-secondary rounded-pill px-3"
                          onClick={() => handleEdit(a)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger rounded-pill px-3"
                          onClick={() => handleDelete(a.addOnId)}
                        >
                          Delete
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

export default AddonsPage;

import React, { useEffect, useState } from "react";
import AddonService from "../../services/AddonService";

function AddonsPage() {
  const [addons, setAddons] = useState([]);
  const [addon, setAddon] = useState({
    addOnId: "",
    name: "",
    additionalCost: ""
  });
  const [message, setMessage] = useState("");

  const loadAddons = () => {
    AddonService.getAll()
      .then(res => setAddons(res.data || []))
      .catch(() => setMessage("Failed to load addons"));
  };

  useEffect(() => {
    loadAddons();
  }, []);

  const handleChange = (e) => {
    setAddon({ ...addon, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = addon.addOnId ? AddonService.update : AddonService.add;
    action(addon)
      .then(() => {
        setMessage(`Addon ${addon.addOnId ? "updated" : "added"} successfully`);
        setAddon({ addOnId: "", name: "", additionalCost: "" });
        loadAddons();
      })
      .catch(() => setMessage(`Failed to ${addon.addOnId ? "update" : "add"} addon`));
  };

  const handleEdit = (a) => {
    setAddon({
      addOnId: a.addOnId,
      name: a.name,
      additionalCost: a.additionalCost
    });
  };

  const handleDelete = (id) => {
    AddonService.deleteById(id)
      .then(() => {
        setMessage("Addon deleted successfully");
        loadAddons();
      })
      .catch(() => setMessage("Failed to delete addon"));
  };

  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-3">Manage Add-ons</h3>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              name="name"
              value={addon.name}
              onChange={handleChange}
              placeholder="Name"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              name="additionalCost"
              value={addon.additionalCost}
              onChange={handleChange}
              placeholder="Additional Cost"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4 d-grid">
            <button type="submit" className="btn btn-success">
              {addon.addOnId ? "Update" : "Add"} Addon
            </button>
          </div>
        </div>
      </form>

      {addons.length === 0 ? (
        <p>No addons found.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
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
                <td>{a.addOnId}</td>
                <td>{a.name}</td>
                <td><span className="text-success fw-bold">₹{a.additionalCost}</span></td>
                <td className="d-flex gap-2">
                  <button className="btn btn-sm btn-primary" onClick={() => handleEdit(a)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(a.addOnId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AddonsPage;

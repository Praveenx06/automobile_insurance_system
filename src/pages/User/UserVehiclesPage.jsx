
import React, { useEffect, useState } from "react";
import VehicleService from "../../services/VehicleService";

function UserVehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    vehicleId: "",
    type: "",
    model: "",
    year: ""
  });
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);
  const [userVehicleId, setUserVehicleId] = useState(null);

  const load = () => {
    VehicleService.getAll()
      .then(res => setVehicles(res.data || []))
      .catch(() => setMessage("Failed to load vehicles"));
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setMessage("");
    const payload = {
      vehicleId: parseInt(form.vehicleId),
      type: form.type.toUpperCase(),
      model: form.model,
      year: parseInt(form.year)
    };

    const action = editing ? VehicleService.update : VehicleService.add;
    action(payload)
      .then(() => {
        setMessage(editing ? "Vehicle updated successfully" : "Vehicle added successfully");

        if (!editing) {
          setUserVehicleId(payload.vehicleId);
        }

        resetForm();
        load();
      })
      .catch(() => setMessage(editing ? "Update failed" : "Add failed"));
  };

  const resetForm = () => {
    setForm({ vehicleId: "", type: "", model: "", year: "" });
    setEditing(false);
  };

  const onEdit = (v) => {
    if (v.vehicleId !== userVehicleId) {
      setMessage("You can only edit your own vehicle.");
      return;
    }

    setForm({
      vehicleId: v.vehicleId,
      type: v.type,
      model: v.model,
      year: v.year
    });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      {/* Welcome Section */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">Welcome User</h2>
        <p className="text-muted">Here you can add and manage your vehicle</p>
      </div>

      {/* Card wrapper for content */}
      <div className="card shadow-lg w-100" style={{ maxWidth: "900px" }}>
        <div className="card-body">
          {/* Message */}
          {message && <div className="alert alert-info text-center">{message}</div>}

          {/* Add / Update Form */}
          <form onSubmit={handleSave} className="mb-4">
            <h5 className="mb-3">{editing ? "Update Vehicle" : "Add Vehicle"}</h5>
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">ID</label>
                <input
                  name="vehicleId"
                  value={form.vehicleId}
                  onChange={handleChange}
                  className="form-control"
                  required
                  type="number"
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select</option>
                  <option value="CAR">Car</option>
                  <option value="BIKE">Bike</option>
                  <option value="VAN">Van</option>
                  <option value="TRUCK">Truck</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Model</label>
                <input
                  name="model"
                  value={form.model}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Year</label>
                <input
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  type="number"
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="mt-3 d-flex gap-2">
              <button className="btn btn-success">
                {editing ? "Update Vehicle" : "Add Vehicle"}
              </button>
              {editing && (
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Vehicle List */}
          {vehicles.length === 0 ? (
            <p className="text-center">No vehicles found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped align-middle">
                <thead className="table-dark text-center">
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map(v => (
                    <tr key={v.vehicleId}>
                      <td className="text-center">{v.vehicleId}</td>
                      <td>{v.type}</td>
                      <td>{v.model}</td>
                      <td className="text-center">{v.year}</td>
                      <td className="text-center">
                        {v.vehicleId === userVehicleId && (
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => onEdit(v)}
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserVehiclesPage;

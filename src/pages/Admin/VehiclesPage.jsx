import React, { useEffect, useState } from "react";
import VehicleService from "../../services/VehicleService";

function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    vehicleId: "",
    type: "",
    model: "",
    year: ""
  });
  const [searchId, setSearchId] = useState("");
  const [searchType, setSearchType] = useState("");
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);

  const load = () => {
    VehicleService.getAll()
      .then(res => setVehicles(res.data || []))
      .catch(() => setMessage("Failed to load vehicles"));
  };

  useEffect(() => { load(); }, []);

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
    setForm({
      vehicleId: v.vehicleId,
      type: v.type,
      model: v.model,
      year: v.year
    });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = (id) => {
    if (!window.confirm("Delete this vehicle?")) return;
    VehicleService.delete(id)
      .then(() => {
        setMessage("Vehicle deleted successfully");
        load();
      })
      .catch(() => setMessage("Delete failed"));
  };

  const onSearchById = () => {
    if (!searchId) return;
    VehicleService.getById(searchId)
      .then(res => setVehicles([res.data]))
      .catch(() => setMessage("Vehicle not found"));
  };

  const onSearchByType = () => {
    if (!searchType) return;
    VehicleService.getByType(searchType.toUpperCase())
      .then(res => setVehicles(res.data || []))
      .catch(() => setMessage("Vehicles not found"));
  };

  return (
    <div className="container-fluid px-4 py-4 bg-white min-vh-100">
      <h3 className="fw-bold text-center mb-4">Vehicle Management</h3>

      {/* Message */}
      {message && <div className="alert alert-info text-center">{message}</div>}

      {/* Add / Update Form */}
      <form onSubmit={handleSave} className="mb-4 p-4 border rounded bg-light">
        <div className="row g-3">
          <div className="col-md-3">
            <label>ID</label>
            <input name="vehicleId" value={form.vehicleId} onChange={handleChange} className="form-control" required type="number" />
          </div>
          <div className="col-md-3">
            <label>Type</label>
            <select name="type" value={form.type} onChange={handleChange} className="form-control" required>
              <option value="">Select</option>
              <option value="CAR">Car</option>
              <option value="BIKE">Bike</option>
              <option value="VAN">Van</option>
              <option value="TRUCK">Truck</option>
            </select>
          </div>
          <div className="col-md-3">
            <label>Model</label>
            <input name="model" value={form.model} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-3">
            <label>Year</label>
            <input name="year" value={form.year} onChange={handleChange} type="number" className="form-control" required />
          </div>
        </div>

        <div className="mt-3 d-flex gap-2">
          <button className="btn btn-success">{editing ? "Update Vehicle" : "Add Vehicle"}</button>
          {editing && <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>}
        </div>
      </form>

      {/* Search Section */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <input placeholder="Search by ID" className="form-control" value={searchId} onChange={(e) => setSearchId(e.target.value)} type="number" />
        </div>
        <div className="col-md-2 d-grid">
          <button className="btn btn-info" onClick={onSearchById}>Search</button>
        </div>
        <div className="col-md-3">
          <select className="form-control" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="">Search by Type</option>
            <option value="CAR">Car</option>
            <option value="BIKE">Bike</option>
            <option value="VAN">Van</option>
            <option value="TRUCK">Truck</option>
          </select>
        </div>
        <div className="col-md-2 d-grid">
          <button className="btn btn-info" onClick={onSearchByType}>Search</button>
        </div>
        <div className="col-md-2 d-grid">
          <button className="btn btn-primary" onClick={load}>Show All</button>
        </div>
      </div>

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
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-sm btn-secondary" onClick={() => onEdit(v)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => onDelete(v.vehicleId)}>Delete</button>
                    </div>
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

export default VehiclesPage;

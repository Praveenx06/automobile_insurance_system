
import React, { useEffect, useState } from "react";
import VehicleService from "../../services/VehicleService";
import bg from "../../assets/adminvehicle.jpg";

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
        setMessage(editing ? " Vehicle updated successfully" : " Vehicle added successfully");
        resetForm();
        load();
      })
      .catch(() => setMessage(editing ? " Update failed" : " Add failed"));
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
        setMessage(" Vehicle deleted successfully");
        load();
      })
      .catch(() => setMessage(" Delete failed"));
  };

  const onSearchById = () => {
    if (!searchId) return;
    VehicleService.getById(searchId)
      .then(res => setVehicles([res.data]))
      .catch(() => setMessage(" Vehicle not found"));
  };

  const onSearchByType = () => {
    if (!searchType) return;
    VehicleService.getByType(searchType.toUpperCase())
      .then(res => setVehicles(res.data || []))
      .catch(() => setMessage(" Vehicles not found"));
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
      {/* ✅ Container to keep everything centered */}
      <div className="container" style={{ maxWidth: "1100px" }}>
        <h1 className="fw-bold text-center mb-4 text-light text-shadow" style={{ color: "black", fontSize: "2.5rem",letterSpacing: "2px"  }}>
          VEHICLE MANAGEMENT 
        </h1>

        {/* Message */}
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

        {/* Add / Update Form */}
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
              <label className="text-light fw-bold">ID</label>
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
              <label className="text-light fw-bold">Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="form-control rounded-pill"
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
              <label className="text-light fw-bold">Model</label>
              <input
                name="model"
                value={form.model}
                onChange={handleChange}
                className="form-control rounded-pill"
                required
              />
            </div>
            <div className="col-md-3">
              <label className="text-light fw-bold">Year</label>
              <input
                name="year"
                value={form.year}
                onChange={handleChange}
                type="number"
                className="form-control rounded-pill"
                required
              />
            </div>
          </div>

          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-success rounded-pill px-4">
              {editing ? "Update Vehicle" : "Add Vehicle"}
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

        {/* Search Section */}
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
              placeholder="Search by ID"
              className="form-control rounded-pill"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              type="number"
            />
          </div>
          <div className="col-md-2 d-grid">
            <button className="btn btn-info rounded-pill" onClick={onSearchById}>
              Search
            </button>
          </div>
          <div className="col-md-3">
            <select
              className="form-control rounded-pill"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="">Search by Type</option>
              <option value="CAR">Car</option>
              <option value="BIKE">Bike</option>
              <option value="VAN">Van</option>
              <option value="TRUCK">Truck</option>
            </select>
          </div>
          <div className="col-md-2 d-grid">
            <button className="btn btn-info rounded-pill" onClick={onSearchByType}>
              Search
            </button>
          </div>
          <div className="col-md-2 d-grid">
            <button className="btn btn-primary rounded-pill" onClick={load}>
              Show All
            </button>
          </div>
        </div>

        {/* Vehicle List */}
        {vehicles.length === 0 ? (
          <p className="text-center text-light fw-bold">No vehicles found.</p>
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
            <table className="table table-bordered table-hover opacity-75 transparent-table table-striped align-middle mb-0"
             style={{
        backgroundColor: "rgba(255, 255, 255, 0.28)", // transparent look
         margin: "0 auto",
         maxWidth: "1000px",
        backdropFilter: "blur(50px)", // ✅ blur applied directly on table
        WebkitBackdropFilter: "blur(50px)", // Safari support
        borderRadius: "16px",
        overflow: "hidden"
      }}>
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
                        <button
                          className="btn btn-warning btn-secondary rounded-pill px-3"
                          onClick={() => onEdit(v)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger rounded-pill px-3"
                          onClick={() => onDelete(v.vehicleId)}
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

export default VehiclesPage;

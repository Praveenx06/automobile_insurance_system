import React, { useEffect, useState } from "react";
import VehicleService from "../../services/VehicleService";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/1uservehicle.jpeg";

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
  const [newVehicle, setNewVehicle] = useState(null);
  const [lastVehicleId, setLastVehicleId] = useState(null); // <-- Track last vehicle ID
  const navigate = useNavigate();

  // Load all vehicles and set lastVehicleId
  const load = () => {
    VehicleService.getAll()
      .then((res) => {
        const data = res.data || [];
        setVehicles(data);

        if (data.length > 0) {
          const maxId = Math.max(...data.map((v) => v.vehicleId));
          setLastVehicleId(maxId);
        } else {
          setLastVehicleId(null);
        }
      })
      .catch(() => setMessage("Failed to load vehicles"));
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "vehicleId" && value) {
      setUserVehicleId(parseInt(value));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setMessage("");
    const payload = {
      vehicleId: parseInt(form.vehicleId),
      type: form.type.toUpperCase(),
      model: form.model,
      year: parseInt(form.year),
    };

    const action = editing ? VehicleService.update : VehicleService.add;
    action(payload)
      .then(() => {
        setMessage(editing ? "Vehicle updated successfully" : "Vehicle added successfully");
        setUserVehicleId(payload.vehicleId);
        setNewVehicle(payload);
        setLastVehicleId(payload.vehicleId); // <-- Update last vehicle ID
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
    setForm({ vehicleId: v.vehicleId, type: v.type, model: v.model, year: v.year });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

    return (
    <div className="d-flex flex-column align-items-center" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh", width: "100vw", overflow: "auto", padding: "24px" }}>
     
      <div className="container" style={{ maxWidth: "900px" }}>
        <h1 className="fw-bold text-center mb-4" style={{ fontSize: "2.5rem", color: "RED" }}>WELCOME!! TO  THE VEHICLE MANAGEMENT PAGE</h1>
         <h3 className="fw-bold text-center mb-4"> " USER NOTE : Below you can see previously added VEHICLE ID , Please we request you to continue the sequence accordingly !!! "</h3>
        {lastVehicleId !== null && 
        <div className="text-center mb-3">
          <h2 className="text-warning fw-bold">PREVIOUSLY ENTERED VEHICLE ID: {lastVehicleId}</h2>
          <br></br>
          <br></br>
          
          <h3 className="text-dark fw-bold">HERE YOU CAN REGISTER YOUR VEHICLE BELOW </h3>
          </div>}
        {userVehicleId && <div className="text-center mb-3">
          <h4 className="fw-bold text-success">your registered vehicle Id is : {userVehicleId}</h4>
          </div>}
        {message && <div className="alert text-center" style={{ maxWidth: "600px", margin: "0 auto 20px auto", background: "rgba(0,0,0,0.6)", color: "#fff", fontWeight: "bold", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
          {message}
          </div>}

        <form onSubmit={handleSave} className="mb-4 p-4" style={{ maxWidth: "1100px", margin: "0 auto", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", borderRadius: "16px", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
          <div className="row g-3">
            <div className="col-md-3"><label className="text-dark fw-bold">ID</label><input name="vehicleId" value={form.vehicleId} onChange={handleChange} className="form-control rounded-pill" required type="number" /></div>
            <div className="col-md-3">
              <label className="text-dark fw-bold">Type</label>
              <select name="type" value={form.type} onChange={handleChange} className="form-control rounded-pill" required>
                <option value="">Select</option>
                <option value="CAR">Car</option>
                <option value="BIKE">Bike</option>
                <option value="VAN">Van</option>
                <option value="TRUCK">Truck</option>
                </select>
                </div>
            <div className="col-md-3"><label className="text-dark fw-bold">Model</label><input name="model" value={form.model} onChange={handleChange} className="form-control rounded-pill" required /></div>
            <div className="col-md-3"><label className="text-dark fw-bold">Year</label><input name="year" value={form.year} onChange={handleChange} type="number" className="form-control rounded-pill" required /></div>
          </div>
          <div className="mt-3 d-flex gap-2"><button className="btn btn-success rounded-pill px-4">{editing ? "Update Vehicle" : "Add Vehicle"}</button>{editing && <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={resetForm}>Cancel</button>}</div>
        </form>

        {newVehicle && <div className="card mb-4 text-center text-dark" style={{ maxWidth: "600px", margin: "0 auto", background: "rgba(255, 255, 255, 0.3)", borderRadius: "16px", backdropFilter: "blur(10px)", boxShadow: "0 8px 20px rgba(0,0,0,0.5)", fontWeight: "bold", textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}>
          <div className="card-body">
            <h5 className="fw-bold text-primary mb-3">Your Recently Added Vehicle</h5>
            <p className="text-dark"><strong>ID:</strong> {newVehicle.vehicleId}</p>
            <p><strong>Type:</strong> {newVehicle.type}</p>
            <p><strong>Model:</strong> {newVehicle.model}</p>
            <p><strong>Year:</strong> {newVehicle.year}</p>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <button className="btn btn-sm btn-warning rounded-pill px-3" onClick={() => onEdit(newVehicle)}>Edit</button>
            <button className="btn btn-sm btn-primary rounded-pill px-3" onClick={() => navigate("/user/proposals")}>Go to Proposals</button>
            </div>
            </div>

            
        </div>}

        {/* {vehicles.length === 0 ? <p className="text-center text-dark fw-bold">No vehicles found.</p> : 
        <div className="row g-4 justify-content-center">
          <h2 className="text-center fw-bold">LIST OF VEHICLES AVAILABLE</h2>
          {vehicles.map(v =>
             <div key={v.vehicleId} className="col-md-4 col-sm-6">
            <div className="card text-center text-dark h-100" style={{ background: "rgba(255, 255, 255, 0.36)", borderRadius: "16px", backdropFilter: "blur(10px)", boxShadow: "0 8px 20px rgba(0,0,0,0.5)", fontWeight: "bold", textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}>
              <div className="card-body">
                <h5 className="fw-bold text-primary mb-2">{v.model}</h5>
                <p><strong>ID:</strong> {v.vehicleId}</p>
                <p><strong>Type:</strong> {v.type}</p>
                <p className="text-warning"><strong>Year:</strong> {v.year}</p>
                </div>
                </div>
                </div>
              )}
              </div>
              } */}
      </div>
    </div>
  );
}

export default UserVehiclesPage;


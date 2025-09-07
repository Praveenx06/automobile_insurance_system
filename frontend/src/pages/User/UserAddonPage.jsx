
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import AddonService from "../../services/AddonService";
import bg from "../../assets/1useraddon.jpeg";

function UserAddonPage() {
  const [addons, setAddons] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadAddons();
  }, []);

  const loadAddons = () => {
    AddonService.getAll()
      .then((res) => setAddons(res.data || []))
      .catch(() => setMessage("Failed to load addons"));
  };

  const handleSelect = (addon) => {
    if (selectedAddons.some((a) => a.addOnId === addon.addOnId)) {
      setSelectedAddons(selectedAddons.filter((a) => a.addOnId !== addon.addOnId));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const totalCost = selectedAddons.reduce(
    (sum, a) => sum + Number(a.additionalCost),
    0
  );

  const proceedToPayment = () => {
    navigate("/payment", { state: { selectedAddons, totalCost } });
  };

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "24px",
        overflow: "auto",
      }}
    >
      <div className="container">
        <h1 className="fw-bold mb-4 text-center text-dark">AVAILABLE ADD-ON'S</h1>
        <br></br>
        <br></br>
        <h2 className="fw-bold mb-4 text-center text-dark">Please select the suitable addon according to your requirement</h2>

        {message && <div className="alert alert-info">{message}</div>}

        {addons.length === 0 ? (
          <p className="text-light">No addons available.</p>
        ) : (
          <div className="row g-4">
            {addons.map((a) => (
              <div
  key={a.addOnId}
  className="col-md-4 col-sm-6"
>
  <div
    className={`card h-100 ${
      selectedAddons.some((sa) => sa.addOnId === a.addOnId)
        ? "border-success"
        : ""
    }`}
    style={{
      background: "rgba(255, 255, 255, 0.9)",
      borderRadius: "18px", // 🔹 rounded corners
      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.25)", // 🔹 stronger shadow
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      cursor: "pointer",
    }}
    onMouseEnter={(e) =>
      (e.currentTarget.style.boxShadow = "0 8px 22px rgba(0,0,0,0.35)")
    }
    onMouseLeave={(e) =>
      (e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.25)")
    }
  >
    <div className="card-body d-flex flex-column justify-content-between">
      <div className="text-dark fw-bold">
        <h5 className="card-title text-danger fw-bold">{a.name}</h5>
        <p className="mb-2 text-primary">
          <strong>ID:</strong> {a.addOnId}
        </p>
        <p className="text-success fw-bold">₹{a.additionalCost}</p>
      </div>
      <div className="form-check mt-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={selectedAddons.some((sa) => sa.addOnId === a.addOnId)}
          onChange={() => handleSelect(a)}
          id={`addon-${a.addOnId}`}
          style={{ accentColor: "black" }} // ✅ black checkbox
        />
        <label
          className="form-check-label text-dark fw-bold"
          htmlFor={`addon-${a.addOnId}`}
        >
          Select Add-on
        </label>
      </div>
    </div>
  </div>
</div>
            ))}
          </div>
        )}

        {selectedAddons.length > 0 && (
          <div className="mt-4 text-end">
            <h5 className="text-dark">
              Total: <span className="text-success fw-bold">₹{totalCost}</span>
            </h5>
            <button className="btn btn-primary mt-2" onClick={proceedToPayment}>
              Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserAddonPage;

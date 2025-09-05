
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ navigation
import AddonService from "../../services/AddonService";

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

  // ✅ Navigate to payment page with selected addons
  const proceedToPayment = () => {
    navigate("/payment", { state: { selectedAddons, totalCost } });
  };

  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-3">Available Add-ons</h3>

      {message && <div className="alert alert-info">{message}</div>}

      {addons.length === 0 ? (
        <p>No addons available.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>Name</th>
              <th>Additional Cost</th>
            </tr>
          </thead>
          <tbody>
            {addons.map((a) => (
              <tr key={a.addOnId}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedAddons.some((sa) => sa.addOnId === a.addOnId)}
                    onChange={() => handleSelect(a)}
                  />
                </td>
                <td>{a.addOnId}</td>
                <td>{a.name}</td>
                <td>
                  <span className="text-success fw-bold">₹{a.additionalCost}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedAddons.length > 0 && (
        <div className="mt-4 text-end">
          <h5>Total: <span className="text-success fw-bold">₹{totalCost}</span></h5>
          <button className="btn btn-primary mt-2" onClick={proceedToPayment}>
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
}

export default UserAddonPage;

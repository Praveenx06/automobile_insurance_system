// import React, { useEffect, useState } from "react";
// import AddonService from "../../services/AddonService";

// function UserAddonPage() {
//   const [addons, setAddons] = useState([]);
//   const [selectedAddons, setSelectedAddons] = useState([]); // ✅ multiple selection
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     loadAddons();
//   }, []);

//   const loadAddons = () => {
//     AddonService.getAll()
//       .then((res) => setAddons(res.data || []))
//       .catch(() => setMessage("Failed to load addons"));
//   };

//   // ✅ Add or Remove selection
//   const handleSelect = (addon) => {
//     if (selectedAddons.some((a) => a.addOnId === addon.addOnId)) {
//       // If already selected, remove it
//       setSelectedAddons(selectedAddons.filter((a) => a.addOnId !== addon.addOnId));
//     } else {
//       // Otherwise add to selection
//       setSelectedAddons([...selectedAddons, addon]);
//     }
//   };

//   // ✅ Calculate total cost of selected add-ons
//   const totalCost = selectedAddons.reduce(
//     (sum, a) => sum + Number(a.additionalCost),
//     0
//   );

//   return (
//     <div className="container mt-4">
//       <h3 className="fw-bold mb-3">Available Add-ons</h3>

//       {message && <div className="alert alert-info">{message}</div>}

//       {/* ✅ Table for all Add-ons */}
//       {addons.length === 0 ? (
//         <p>No addons available.</p>
//       ) : (
//         <table className="table table-bordered table-striped">
//           <thead className="table-dark">
//             <tr>
//               <th>Select</th>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Additional Cost</th>
//             </tr>
//           </thead>
//           <tbody>
//             {addons.map((a) => (
//               <tr key={a.addOnId}>
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={selectedAddons.some((sa) => sa.addOnId === a.addOnId)}
//                     onChange={() => handleSelect(a)}
//                   />
//                 </td>
//                 <td>{a.addOnId}</td>
//                 <td>{a.name}</td>
//                 <td>
//                   <span className="text-success fw-bold">₹{a.additionalCost}</span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* ✅ Table for Selected Add-ons */}
//       {selectedAddons.length > 0 && (
//         <div className="mt-5">
//           <h4 className="fw-bold text-primary">The add-ons you selected are:</h4>
//           <table className="table table-bordered">
//             <thead className="table-secondary">
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Additional Cost</th>
//               </tr>
//             </thead>
//             <tbody>
//               {selectedAddons.map((a) => (
//                 <tr key={a.addOnId}>
//                   <td>{a.addOnId}</td>
//                   <td>{a.name}</td>
//                   <td>
//                     <span className="text-success fw-bold">
//                       ₹{a.additionalCost}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//               {/* ✅ Total Row */}
//               <tr className="table-dark">
//                 <td colSpan="2" className="text-end fw-bold">
//                   Total
//                 </td>
//                 <td className="fw-bold text-success">₹{totalCost}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserAddonPage;
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

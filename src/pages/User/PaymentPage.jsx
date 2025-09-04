// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function PaymentPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { selectedAddons = [], totalCost = 0 } = location.state || {};
//   const [paymentDone, setPaymentDone] = useState(false);
//   const [methodUsed, setMethodUsed] = useState("");

//   const handlePayment = (method) => {
//     setMethodUsed(method);
//     setPaymentDone(true);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // ✅ clear session
//     navigate("/login"); // redirect to login
//   };

//   const handleStay = () => {
//     navigate("/"); // go back to home/dashboard
//   };

//   return (
//     <div className="container mt-5 text-center">
//       <h2 className="fw-bold text-primary">Payment Page</h2>
//       <p className="mt-3">
//         Total Amount:{" "}
//         <span className="fw-bold text-success">₹{totalCost}</span>
//       </p>

//       {!paymentDone ? (
//         <>
//           <h4 className="mt-4">Choose Payment Method</h4>
//           <div className="d-flex justify-content-center gap-3 mt-3">
//             <button
//               className="btn btn-outline-primary"
//               onClick={() => handlePayment("Credit/Debit Card")}
//             >
//               Pay with Card
//             </button>
//             <button
//               className="btn btn-outline-success"
//               onClick={() => handlePayment("UPI")}
//             >
//               Pay with UPI
//             </button>
//           </div>

//           {/* Show selected addons before payment */}
//           {selectedAddons.length > 0 && (
//             <div className="mt-5">
//               <h5>Your Selected Add-ons:</h5>
//               <ul className="list-group">
//                 {selectedAddons.map((a) => (
//                   <li
//                     key={a.addOnId}
//                     className="list-group-item d-flex justify-content-between"
//                   >
//                     <span>{a.name}</span>
//                     <span className="text-success">₹{a.additionalCost}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </>
//       ) : (
//         // ✅ Success message after payment
//         <div className="mt-5">
//           <div className="alert alert-success fw-bold">
//             ✅ Payment successful with {methodUsed}!
//           </div>
//           <div className="d-flex justify-content-center gap-3 mt-3">
//             <button className="btn btn-danger" onClick={handleLogout}>
//               Logout
//             </button>
//             <button className="btn btn-primary" onClick={handleStay}>
//               Stay Logged In
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PaymentPage;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedAddons = [], totalCost = 0 } = location.state || {};
  const [paymentDone, setPaymentDone] = useState(false);
  const [methodUsed, setMethodUsed] = useState("");

  const handlePayment = (method) => {
    setMethodUsed(method);
    setPaymentDone(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ clear session
    navigate("/login"); // redirect to login
  };

  const handleStay = () => {
    navigate("/user/dashboard"); // ✅ redirect to UserDashboard
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className="fw-bold text-primary">Payment Page</h2>
      <p className="mt-3">
        Total Amount:{" "}
        <span className="fw-bold text-success">₹{totalCost}</span>
      </p>

      {!paymentDone ? (
        <>
          <h4 className="mt-4">Choose Payment Method</h4>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <button
              className="btn btn-outline-primary"
              onClick={() => handlePayment("Credit/Debit Card")}
            >
              Pay with Card
            </button>
            <button
              className="btn btn-outline-success"
              onClick={() => handlePayment("UPI")}
            >
              Pay with UPI
            </button>
          </div>

          {/* Show selected addons before payment */}
          {selectedAddons.length > 0 && (
            <div className="mt-5">
              <h5>Your Selected Add-ons:</h5>
              <ul className="list-group">
                {selectedAddons.map((a) => (
                  <li
                    key={a.addOnId}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <span>{a.name}</span>
                    <span className="text-success">₹{a.additionalCost}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        // ✅ Success message after payment
        <div className="mt-5">
          <div className="alert alert-success fw-bold">
            ✅ Payment successful with {methodUsed}!
          </div>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
            <button className="btn btn-primary" onClick={handleStay}>
              Stay Logged In
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentPage;


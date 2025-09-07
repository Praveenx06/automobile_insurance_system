


import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bg from "../../assets/payment.jpg";

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
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  const handleStay = () => {
    navigate("/user/dashboard"); 
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
      <div
        className="p-5 rounded shadow-lg text-center"
        style={{
          maxWidth: "700px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.9)", // ✅ glass card
          backdropFilter: "blur(8px)", 
        }}
      >
        <h2 className="fw-bold mb-4 text-dark">💳 Payment Page</h2>
        <p className="fs-5">
          Total Amount:{" "}
          <span className="fw-bold text-success">₹{totalCost}</span>
        </p>

        {!paymentDone ? (
          <>
            <h4 className="mt-4 text-dark">Choose Payment Method</h4>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <button
                className="btn btn-outline-primary px-4"
                onClick={() => handlePayment("Credit/Debit Card")}
              >
                Pay with Card
              </button>
              <button
                className="btn btn-outline-success px-4"
                onClick={() => handlePayment("UPI")}
              >
                Pay with UPI
              </button>
            </div>

            {/* Show selected addons before payment */}
            {selectedAddons.length > 0 && (
              <div className="mt-5 text-start">
                <h5 className="fw-bold text-dark">Your Selected Add-ons:</h5>
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
              <button className="btn btn-danger px-4" onClick={handleLogout}>
                Logout
              </button>
              <button className="btn btn-primary px-4" onClick={handleStay}>
                Stay Logged In
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentPage;

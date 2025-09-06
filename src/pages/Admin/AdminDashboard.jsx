

import { Link } from "react-router-dom";
import bg from "../../assets/admincommon.jpg";

function AdminDashboard() {
  // Shared button style for transparency and readability
  const buttonStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    color: "#e5e4e4ff",
    border: "none",
    transition: "all 0.3s ease",
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        className="shadow-lg"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: "20px",
          padding: "2.5rem",
          width: "100%",
          maxWidth: "700px",
        }}
      >
        <h1
          className="text-center mb-4"
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            color: "white",
            textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
          }}
        >
         WELCOME ADMIN !!
        </h1>

        <div className="row g-3">
          {[
            { to: "/admin/proposals", label: "Proposals" },
            { to: "/admin/policies", label: "Policies" },
            { to: "/admin/addons", label: "Add-ons" },
            { to: "/admin/vehicles", label: "Vehicles" },
            { to: "/admin/users", label: "Users" },
            { to: "/admin/claims", label: "Claims" },
          ].map((item, index) => (
            <div className="col-md-4" key={index}>
              <Link
                to={item.to}
                className="btn w-100 rounded-pill py-3 fs-5 fw-semibold shadow-sm"
                style={buttonStyle}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "rgba(0,0,0,0.75)")
                }
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

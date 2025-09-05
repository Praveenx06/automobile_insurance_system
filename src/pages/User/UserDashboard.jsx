

import { Link } from "react-router-dom";
import bg from "../../assets/admindash.jpg";

// Import card images
import vehicleImg from "../../assets/cardvehicle1.jpg";
import proposalImg from "../../assets/cardproposal1.jpg";
import policyImg from "../../assets/cardpolicy.jpg";
import addonImg from "../../assets/cardaddon.jpg";
import claimImg from "../../assets/cardclaim.jpg";

function UserDashboard() {
  const cardItems = [
    { to: "/user/vehicles", label: "Add Vehicles", img: vehicleImg },
    { to: "/user/proposals", label: "Proposals", img: proposalImg },
    { to: "/user/policies", label: "Policies", img: policyImg },
    { to: "/user/addons", label: "Add-ons", img: addonImg },
    { to: "/user/claims", label: "Claims", img: claimImg },
  ];

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
          maxWidth: "900px",
        }}
      >
        <h1
          className="text-center mb-5"
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "white",
            textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
          }}
        >
          WELCOME USER! Choose your service by starting with your vehicle
        </h1>

        <div className="row g-4">
          {cardItems.map((item, index) => (
            <div className="col-md-4" key={index}>
              <Link to={item.to} className="text-decoration-none">
                <div
                  className="card h-100 shadow-sm"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "15px",
                    overflow: "hidden",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    className="card-img-top"
                    style={{
                      height: "150px",
                      objectFit: "cover",
                      borderBottom: "1px solid rgba(255,255,255,0.2)",
                    }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title text-white fw-bold">
                      {item.label}
                    </h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;

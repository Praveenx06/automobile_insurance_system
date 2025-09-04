import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token
    localStorage.removeItem("token");

    // Redirect to login page
    navigate("/login");
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <h3>Logging out...</h3>
    </div>
  );
}

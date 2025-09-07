


import { Link } from "react-router-dom";
import { getRoleFromToken } from "./utils/getRoleFromToken";

function Navbar() {
  const role = getRoleFromToken();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/login">InsuranceApp</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navCollapse">
          <div className="d-flex ms-auto align-items-center gap-3">

            {/* Show Login if not logged in */}
            {!role && (
              <Link className="nav-link text-white" to="/login">Login</Link>
            )}

            {/* Show Logout if logged in */}
            {role && (
              <Link className="nav-link text-white" to="/logout">Logout</Link>
            )}

            {/* Admin menu */}
            {role === "ADMIN" && (
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle text-white"
                  data-bs-toggle="dropdown"
                >
                  Admin
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><Link className="dropdown-item" to="/admin/vehicles">Vehicles</Link></li>
                  <li><Link className="dropdown-item" to="/admin/proposals">Proposals</Link></li>
                  <li><Link className="dropdown-item" to="/admin/policies">Policies</Link></li>
                  <li><Link className="dropdown-item" to="/admin/addons">Add-ons</Link></li>
                  <li><Link className="dropdown-item" to="/admin/users">Users</Link></li>
                  <li><Link className="dropdown-item" to="/admin/claims">Claims</Link></li>
                </ul>
              </div>
            )}

            {/* User menu */}
            {role === "USER" && (
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle text-white"
                  data-bs-toggle="dropdown"
                >
                  User
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><Link className="dropdown-item" to="/user/vehicles">Vehicles</Link></li>
                  <li><Link className="dropdown-item" to="/user/proposals">Proposals</Link></li>
                  <li><Link className="dropdown-item" to="/user/policies">Policies</Link></li>
                  <li><Link className="dropdown-item" to="/user/addons">Add-ons</Link></li>
                  <li><Link className="dropdown-item" to="/user/claims">Claims</Link></li>
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

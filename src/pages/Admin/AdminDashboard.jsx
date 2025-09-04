

import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="d-flex flex-wrap gap-3">
      
        <Link to="/admin/proposals" className="btn btn-success">
          Manage Proposals
        </Link>

        
        <Link to="/admin/policies" className="btn btn-primary">
          Manage Policies
        </Link>

        
        <Link to="/admin/addons" className="btn btn-warning">
          Manage Add-ons
        </Link>

       
        <Link to="/admin/vehicles" className="btn btn-info">
          Manage Vehicles
        </Link>

        <Link to="/admin/users" className="btn btn-info">
          Manage Users
        </Link>

        <Link to="/admin/claims" className="btn btn-info">
          Manage Claims
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;

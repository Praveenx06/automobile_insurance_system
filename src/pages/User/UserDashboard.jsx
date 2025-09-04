

import { Link } from "react-router-dom";

export default function UserDashboard() {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">User Dashboard</h1>
      <nav>
        <Link to="/user/vehicles" className="btn btn-primary">
          Go to Vehicles
        </Link>
         <Link to="/user/proposals" className="btn btn-primary">
          Go to Proposals
        </Link>
        <Link to="/user/policies" className="btn btn-primary">
          Go to Policies
        </Link>
        <Link to="/user/addons" className="btn btn-primary">
          Go to Addons
        </Link>
         <Link to="/user/claims" className="btn btn-primary">
          Go to Claims
        </Link>
      </nav>
    </div>
  );
}

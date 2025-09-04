import { Link } from "react-router-dom";

function UnderReview() {
  return (
    <div className="container mt-5 text-center">
      <h3 className="text-warning">Your insurance is under review</h3>
      <p>Thanks — an officer will review your proposal. You can check status on the Policies page later.</p>
      <Link to="/policies" className="btn btn-primary">Go to Policies</Link>
    </div>
  );
}

export default UnderReview;

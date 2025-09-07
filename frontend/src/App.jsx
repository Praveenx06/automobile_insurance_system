import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Register from "./pages/User/Register.jsx";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import AddonsPage from "./pages/Admin/AddonsPage.jsx";
import PoliciesPage from "./pages/Admin/PoliciesPage.jsx";
import ProposalsPage from "./pages/Admin/ProposalsPage.jsx";
import VehiclesPage from "./pages/Admin/VehiclesPage.jsx";
import UserPage from "./pages/Admin/UserPage.jsx";
import ClaimPage from "./pages/Admin/ClaimPage.jsx";

// User Pages
import UserDashboard from "./pages/User/UserDashboard.jsx";
import UserVehiclesPage from "./pages/User/UserVehiclesPage.jsx";
import UserProposalsPage from "./pages/User/UserProposalPage.jsx";
import UserPoliciesPage from "./pages/User/UserPoliciesPage.jsx";
import UserAddonPage from "./pages/User/UserAddonPage.jsx";
import UserClaimPage from "./pages/User/UserClaimPage.jsx";
import PaymentPage from "./pages/User/PaymentPage.jsx";

import UnderReview from "./UnderReview.jsx";

function AppLayout() {
  const location = useLocation();

  // Hide Navbar on login & register pages
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen flex flex-col w-full">
      {/* Conditionally render Navbar */}
      {!hideNavbar && <Navbar />}

      {/* Main content */}
      <main className="flex-1 w-full">
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/addons" element={<AddonsPage />} />
          <Route path="/admin/policies" element={<PoliciesPage />} />
          <Route path="/admin/proposals" element={<ProposalsPage />} />
          <Route path="/admin/vehicles" element={<VehiclesPage />} />
          <Route path="/admin/users" element={<UserPage />} />
          <Route path="/admin/claims" element={<ClaimPage />} />

          {/* User */}
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/vehicles" element={<UserVehiclesPage />} />
          <Route path="/user/proposals" element={<UserProposalsPage />} />
          <Route path="/user/policies" element={<UserPoliciesPage />} />
          <Route path="/user/addons" element={<UserAddonPage />} />
          <Route path="/user/claims" element={<UserClaimPage />} />
          <Route path="/under-review" element={<UnderReview />} />
          <Route path="/payment" element={<PaymentPage />} />

          {/* Catch-all */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-screen">
                <h3 className="text-xl font-bold">Page not found</h3>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;

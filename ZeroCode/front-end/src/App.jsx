import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Public pages
import Navbar from "./component/navber";
import Home from "./pages/home";
import About from "./pages/about";
import Services from "./pages/services";
import OpenAccount from "./pages/account";
import OpenLoan from "./pages/loan";
import OpenInsurance from "./pages/insurance";
import LoginModal from "./component/loginmodal";
import Footer from "./component/footer";

// Protected Route Component (Combined)
import ProtectedRoute from "./component/ProtectedRoute";

// Admin Dashboard
import DashFooterA from "./pages/adminDashboard/Footer";
import AdminDashboard from "./pages/adminDashboard/Dashboard";
import AdminSidebar from "./pages/adminDashboard/Sidebar";
import PendingAccounts from "./pages/adminDashboard/PendingAccounts";
import OpenAccounts from "./pages/adminDashboard/OpenAccounts";
import ClosedAccounts from "./pages/adminDashboard/ClosedAccounts";
import ViewAccounts from "./pages/adminDashboard/ViewAccounts";
import AdminFundTransfer from "./pages/adminDashboard/FundTransfer";
import AdminDepositHistory from "./pages/adminDashboard/DepositHistory";
import AdminWithdrawalHistory from "./pages/adminDashboard/WithdrawalHistory";
import AdminSettings from "./pages/adminDashboard/Settings";
import AdminProfile from "./pages/adminDashboard/Profile";
import ManageUsers from "./pages/adminDashboard/ManageUsers";
//import EmployeeManagement from "./pages/adminDashboard/EmployeeManagement";

// Employee Dashboard
// import DashFooterE from "./pages/employeeDashboard/Footer";
// import EmployeeDashboard from "./pages/employeeDashboard/Dashboard";
// import EmployeeSidebar from "./pages/employeeDashboard/Sidebar";
// import EmployeeAccounts from "./pages/employeeDashboard/Accounts";
// import EmployeeFundTransfer from "./pages/employeeDashboard/FundTransfer";
// import EmployeeDepositHistory from "./pages/employeeDashboard/DepositHistory";
// import EmployeeWithdrawalHistory from "./pages/employeeDashboard/WithdrawalHistory";
// import EmployeeSettings from "./pages/employeeDashboard/Settings";
// import EmployeeProfile from "./pages/employeeDashboard/Profile";

// User Dashboard
import DashFooterU from "./pages/userDashboard/Footer";
import UserDashboard from "./pages/userDashboard/Dashboard";
import UserSidebar from "./pages/userDashboard/Sidebar";
import UserAccounts from "./pages/userDashboard/Accounts";
import UserFundTransfer from "./pages/userDashboard/FundTransfer";
import UserDepositHistory from "./pages/userDashboard/DepositHistory";
import UserWithdrawalHistory from "./pages/userDashboard/WithdrawalHistory";
import UserSettings from "./pages/userDashboard/Settings";
import UserProfile from "./pages/userDashboard/Profile";


function App() {
  const isLoggedIn = true; 
  const location = useLocation();

  const isDashboardRoute =
    location.pathname.startsWith("/adminDashboard") ||
    // location.pathname.startsWith("/employeeDashboard") ||
    location.pathname.startsWith("/userDashboard");

  const hideNavbarOn = ["/loan", "/account", "/insurance"];
  const hideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <div className="d-flex flex-column min-vh-100">
      {!isDashboardRoute && !hideNavbar && <Navbar />}

      <div className="flex-grow-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<OpenAccount />} />
          <Route path="/loan" element={<OpenLoan />} />
          <Route path="/insurance" element={<OpenInsurance />} />

          {/* Admin Dashboard Protected */}
          <Route
            path="/adminDashboard/*"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AdminDashboardWrapper />
              </ProtectedRoute>
            }
          />

          {/* Employee Dashboard Protected */}
          {/* <Route
            path="/employeeDashboard/*"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <EmployeeDashboardWrapper />
              </ProtectedRoute>
            }
          /> */}

          {/* User Dashboard Protected */}
          <Route
            path="/userDashboard/*"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <UserDashboardWrapper />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {!isDashboardRoute && <LoginModal />}
      {!isDashboardRoute && <Footer />}
    </div>
  );
}

/* ------------------- DASHBOARD WRAPPERS ------------------- */

function AdminDashboardWrapper() {
  return (
    <div className="d-flex" style={{ width: "100%", bottom: 0 }}>
      <AdminSidebar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="" element={<AdminDashboard />} />
          <Route path="accounts/pendingAccounts" element={<PendingAccounts />} />
          <Route path="accounts/openAccounts" element={<OpenAccounts />} />
          <Route path="accounts/closedAccounts" element={<ClosedAccounts />} />
          <Route path="accounts/viewAccounts" element={<ViewAccounts />} />
          <Route path="fund-transfer" element={<AdminFundTransfer />} />
          <Route path="deposit-history" element={<AdminDepositHistory />} />
          <Route path="withdrawal-history" element={<AdminWithdrawalHistory />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="ManageUsers" element={<ManageUsers />} />
          {/* <Route path="EmployeeManagement" element={<EmployeeManagement />} /> */}
        </Routes>
        <DashFooterA />
      </div>
    </div>
  );
}

// function EmployeeDashboardWrapper() {
//   return (
//     <div className="d-flex" style={{ width: "100%", bottom: 0 }}>
//       <EmployeeSidebar />
//       <div className="flex-grow-1">
//         <Routes>
//           <Route path="" element={<EmployeeDashboard />} />
//           <Route path="accounts" element={<EmployeeAccounts />} />
//           <Route path="fund-transfer" element={<EmployeeFundTransfer />} />
//           <Route path="deposit-history" element={<EmployeeDepositHistory />} />
//           <Route path="withdrawal-history" element={<EmployeeWithdrawalHistory />} />
//           <Route path="settings" element={<EmployeeSettings />} />
//           <Route path="profile" element={<EmployeeProfile />} />
//         </Routes>
//         <DashFooterE />
//       </div>
//     </div>
//   );
// }

function UserDashboardWrapper() {
  return (
    <div className="d-flex" style={{ width: "100%", bottom: 0 }}>
      <UserSidebar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="" element={<UserDashboard />} />
          <Route path="accounts" element={<UserAccounts />} />
          <Route path="fund-transfer" element={<UserFundTransfer />} />
          <Route path="deposit-history" element={<UserDepositHistory />} />
          <Route path="withdrawal-history" element={<UserWithdrawalHistory />} />
          <Route path="settings" element={<UserSettings />} />
          <Route path="profile" element={<UserProfile />} />
        </Routes>
        <DashFooterU />
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

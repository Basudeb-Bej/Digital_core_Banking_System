//front-end/src/pages/adminDashboard/Sidebar.jsx
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../assets/img/image12.png";
import {
  FaTachometerAlt,
  FaWallet,
  FaExchangeAlt,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("adminId");
    localStorage.removeItem("username");
    localStorage.removeItem("fullName");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("accNo");
    localStorage.removeItem("token");

    navigate("/");

    alert("You have been logged out successfully.");
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 bg-light border-end"
      style={{ width: "220px", minHeight: "100vh" }}
    >
      {/* --- Header (Logo + Brand) --- */}
      <div className="d-flex align-items-center px-3 py-4">
        <img
          src={logoImage}
          alt="ZeroBank"
          className="me-2"
          style={{ height: "35px" }}
        />
        <span className="text-dark fs-5 fw-bold">ZeroBank</span>
      </div>

      {/* --- Menu --- */}
      <div className="p-3 flex-grow-1">
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link to="/adminDashboard" className="nav-link d-flex align-items-center gap-2">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>

          <li>
            <a
              className="nav-link dropdown-toggle d-flex align-items-center gap-2"
              data-bs-toggle="collapse"
              href="#accountsSubMenu"
              role="button"
              aria-expanded="false"
              aria-controls="accountsSubMenu"
            >
              <FaUser /> Accounts
            </a>

            <div className="collapse" id="accountsSubMenu">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ms-4">
                <li>
                  <Link to="/adminDashboard/accounts/PendingAccounts" className="nav-link">
                    Pending Accounts
                  </Link>
                </li>
                <li>
                  <Link to="/adminDashboard/accounts/OpenAccounts" className="nav-link">
                    Open Accounts
                  </Link>
                </li>
                <li>
                  <Link to="/adminDashboard/accounts/ClosedAccounts" className="nav-link">
                    Closed Accounts
                  </Link>
                </li>
                <li>
                  <Link to="/adminDashboard/accounts/ViewAccounts" className="nav-link">
                    View Accounts
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          {/* Transactions with sub-menu */}
          <li>
            <a
              className="nav-link dropdown-toggle d-flex align-items-center gap-2"
              data-bs-toggle="collapse"
              href="#transactionsSubMenu"
              role="button"
              aria-expanded="false"
              aria-controls="transactionsSubMenu"
            >
              <FaExchangeAlt /> Transactions
            </a>
            <div className="collapse" id="transactionsSubMenu">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ms-4">
                <li>
                  <Link to="/adminDashboard/deposit-history" className="nav-link">
                    Deposit History
                  </Link>
                </li>
                <li>
                  <Link to="/adminDashboard/withdrawal-history" className="nav-link">
                    Withdrawal History
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          {/* <li>
            <Link to="/adminDashboard/employeeManagement" className="nav-link d-flex align-items-center gap-2">
              <FaUser /> Employees
            </Link>
          </li> */}

          <li>
            <Link to="/adminDashboard/profile" className="nav-link d-flex align-items-center gap-2">
              <FaUser /> Profile
            </Link>
          </li>

          {/* ✅ Logout Button */}
          <li className="mt-3">
            <button
              onClick={handleLogout}
              className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2"
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

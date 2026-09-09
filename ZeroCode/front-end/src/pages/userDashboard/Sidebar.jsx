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

  // ✅ Improved logout (like adminDashboard)
  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    // Redirect safely without full reload
    navigate("/");

    // Optional UX feedback
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
            <Link to="/userDashboard" className="nav-link d-flex align-items-center gap-2">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>

          <li>
            <Link to="/userDashboard/accounts" className="nav-link d-flex align-items-center gap-2">
              <FaWallet /> Accounts
            </Link>
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
                  <Link to="/userDashboard/fund-transfer" className="nav-link">
                    Fund Transfer
                  </Link>
                </li>
                <li>
                  <Link to="/userDashboard/deposit-history" className="nav-link">
                    Deposit History
                  </Link>
                </li>
                <li>
                  <Link to="/userDashboard/withdrawal-history" className="nav-link">
                    Withdrawal History
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <Link to="/userDashboard/profile" className="nav-link d-flex align-items-center gap-2">
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

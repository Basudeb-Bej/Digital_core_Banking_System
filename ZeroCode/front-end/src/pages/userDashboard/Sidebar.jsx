import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImage from "../../assets/img/image12.png";
import {
  FaTachometerAlt,
  FaWallet,
  FaExchangeAlt,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const closeMobile = () => setMobileOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        .zb-sidebar {
          width: 240px;
          min-height: 100vh;
          background: #ffffff;
          border-right: 1px solid #e2e8f0;
          flex-shrink: 0;
        }
        .zb-sidebar-link {
          border-radius: 10px;
          color: #334155;
          font-weight: 500;
          padding: 0.6rem 0.85rem;
          transition: background-color 0.18s ease, color 0.18s ease, transform 0.18s ease;
        }
        .zb-sidebar-link:hover {
          background: #f1f5f9;
          color: #0d6efd;
          transform: translateX(2px);
        }
        .zb-sidebar-link.active {
          background: #0d6efd;
          color: #ffffff !important;
        }
        @media (max-width: 991.98px) {
          .zb-sidebar {
            width: 100%;
            min-height: auto;
            border-right: none;
            border-bottom: 1px solid #e2e8f0;
          }
        }
      `}</style>

      <div className="d-flex flex-column zb-sidebar">
        {/* --- Header (Logo + Brand + Mobile Toggle) --- */}
        <div className="d-flex align-items-center justify-content-between px-3 py-3 py-lg-4">
          <div className="d-flex align-items-center">
            <img
              src={logoImage}
              alt="ZeroBank"
              className="me-2"
              style={{ height: "35px" }}
            />
            <span className="text-dark fs-5 fw-bold">ZeroBank</span>
          </div>

          <button
            type="button"
            className="btn btn-outline-secondary btn-sm d-lg-none"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* --- Menu --- */}
        <div className={`p-3 pt-0 pt-lg-2 flex-grow-1 ${mobileOpen ? "d-block" : "d-none d-lg-block"}`}>
          <ul className="nav nav-pills flex-column gap-1 mb-auto">
            <li className="nav-item">
              <Link
                to="/userDashboard"
                onClick={closeMobile}
                className={`nav-link zb-sidebar-link d-flex align-items-center gap-2 ${
                  isActive("/userDashboard") ? "active" : ""
                }`}
              >
                <FaTachometerAlt /> Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/userDashboard/accounts"
                onClick={closeMobile}
                className={`nav-link zb-sidebar-link d-flex align-items-center gap-2 ${
                  isActive("/userDashboard/accounts") ? "active" : ""
                }`}
              >
                <FaWallet /> Accounts
              </Link>
            </li>

            {/* Transactions with sub-menu */}
            <li>
              <a
                className="nav-link zb-sidebar-link dropdown-toggle d-flex align-items-center gap-2"
                data-bs-toggle="collapse"
                href="#transactionsSubMenu"
                role="button"
                aria-expanded="false"
                aria-controls="transactionsSubMenu"
              >
                <FaExchangeAlt /> Transactions
              </a>
              <div className="collapse" id="transactionsSubMenu">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ms-3 mt-1 d-flex flex-column gap-1">
                  <li>
                    <Link
                      to="/userDashboard/fund-transfer"
                      onClick={closeMobile}
                      className={`nav-link zb-sidebar-link ${
                        isActive("/userDashboard/fund-transfer") ? "active" : ""
                      }`}
                    >
                      Fund Transfer
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/userDashboard/deposit-history"
                      onClick={closeMobile}
                      className={`nav-link zb-sidebar-link ${
                        isActive("/userDashboard/deposit-history") ? "active" : ""
                      }`}
                    >
                      Deposit History
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/userDashboard/withdrawal-history"
                      onClick={closeMobile}
                      className={`nav-link zb-sidebar-link ${
                        isActive("/userDashboard/withdrawal-history") ? "active" : ""
                      }`}
                    >
                      Withdrawal History
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <Link
                to="/userDashboard/profile"
                onClick={closeMobile}
                className={`nav-link zb-sidebar-link d-flex align-items-center gap-2 ${
                  isActive("/userDashboard/profile") ? "active" : ""
                }`}
              >
                <FaUser /> Profile
              </Link>
            </li>

            {/* ✅ Logout Button */}
            <li className="mt-3">
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2 rounded-3"
              >
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

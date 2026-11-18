// front-end/src/pages/adminDashboard/Sidebar.jsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImage from "../../assets/img/image12.png";
import {
  FaTachometerAlt,
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

  const closeMobile = () => setMobileOpen(false);
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        .zb-admin-sidebar {
          width: 240px;
          min-height: 100vh;
          background: #ffffff;
          border-right: 1px solid #e2e8f0;
          flex-shrink: 0;
        }
        .zb-admin-sidebar-link {
          border-radius: 10px;
          color: #334155;
          font-weight: 500;
          padding: 0.6rem 0.85rem;
          transition: background-color 0.18s ease, color 0.18s ease, transform 0.18s ease;
        }
        .zb-admin-sidebar-link:hover {
          background: #f1f5f9;
          color: #0d6efd;
          transform: translateX(2px);
        }
        .zb-admin-sidebar-link.active {
          background: #0d6efd;
          color: #ffffff !important;
        }
        @media (max-width: 991.98px) {
          body {
            padding-top: 64px;
          }
          .zb-admin-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            min-height: auto;
            max-height: 100vh;
            overflow-y: auto;
            z-index: 1040;
            border-right: none;
            border-bottom: 1px solid #e2e8f0;
            box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
          }
        }
      `}</style>

      <div className="d-flex flex-column zb-admin-sidebar">
        {/* --- Header (Logo + Brand + Mobile Toggle) --- */}
        <div className="d-flex align-items-center justify-content-between px-3 py-3 py-lg-4">
          <div className="d-flex align-items-center">
            <img src={logoImage} alt="ZeroBank" className="me-2" style={{ height: "35px" }} />
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
        <div
          className={`p-3 pt-0 pt-lg-2 flex-grow-1 ${
            mobileOpen ? "d-block" : "d-none d-lg-block"
          }`}
        >
          <ul className="nav nav-pills flex-column gap-1 mb-auto">
            <li className="nav-item">
              <Link
                to="/adminDashboard"
                onClick={closeMobile}
                className={`nav-link zb-admin-sidebar-link d-flex align-items-center gap-2 ${
                  isActive("/adminDashboard") ? "active" : ""
                }`}
              >
                <FaTachometerAlt /> Dashboard
              </Link>
            </li>

            <li>
              <a
                className="nav-link zb-admin-sidebar-link dropdown-toggle d-flex align-items-center gap-2"
                data-bs-toggle="collapse"
                href="#accountsSubMenu"
                role="button"
                aria-expanded="false"
                aria-controls="accountsSubMenu"
              >
                <FaUser /> Accounts
              </a>

              <div className="collapse" id="accountsSubMenu">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ms-3 mt-1 d-flex flex-column gap-1">
                  <li>
                    <Link
                      to="/adminDashboard/accounts/PendingAccounts"
                      onClick={closeMobile}
                      className={`nav-link zb-admin-sidebar-link ${
                        isActive("/adminDashboard/accounts/PendingAccounts") ? "active" : ""
                      }`}
                    >
                      Pending Accounts
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/adminDashboard/accounts/OpenAccounts"
                      onClick={closeMobile}
                      className={`nav-link zb-admin-sidebar-link ${
                        isActive("/adminDashboard/accounts/OpenAccounts") ? "active" : ""
                      }`}
                    >
                      Open Accounts
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/adminDashboard/accounts/ClosedAccounts"
                      onClick={closeMobile}
                      className={`nav-link zb-admin-sidebar-link ${
                        isActive("/adminDashboard/accounts/ClosedAccounts") ? "active" : ""
                      }`}
                    >
                      Closed Accounts
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/adminDashboard/accounts/ViewAccounts"
                      onClick={closeMobile}
                      className={`nav-link zb-admin-sidebar-link ${
                        isActive("/adminDashboard/accounts/ViewAccounts") ? "active" : ""
                      }`}
                    >
                      View Accounts
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            {/* Transactions with sub-menu */}
            <li>
              <a
                className="nav-link zb-admin-sidebar-link dropdown-toggle d-flex align-items-center gap-2"
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
                      to="/adminDashboard/deposit-history"
                      onClick={closeMobile}
                      className={`nav-link zb-admin-sidebar-link ${
                        isActive("/adminDashboard/deposit-history") ? "active" : ""
                      }`}
                    >
                      Deposit History
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/adminDashboard/withdrawal-history"
                      onClick={closeMobile}
                      className={`nav-link zb-admin-sidebar-link ${
                        isActive("/adminDashboard/withdrawal-history") ? "active" : ""
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
                to="/adminDashboard/profile"
                onClick={closeMobile}
                className={`nav-link zb-admin-sidebar-link d-flex align-items-center gap-2 ${
                  isActive("/adminDashboard/profile") ? "active" : ""
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

// Front-end/src/pages/account.jsx
import React, { useState } from "react";
import { FaPiggyBank, FaBuilding, FaArrowLeft } from "react-icons/fa";

function OpenAccount() {
  const [activeForm, setActiveForm] = useState(null);

  return (
    <div className="zb-account-wrapper py-5">
      <style>{`
        .zb-account-wrapper {
          background-color: #f8fafc;
          color: #0f172a;
          min-height: 70vh;
          display: flex;
          align-items: center;
          overflow-x: hidden;
        }

        @keyframes zb-icon-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        .zb-account-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          box-shadow: 0 6px 24px rgba(15, 23, 42, 0.05);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .zb-account-card:hover {
          transform: translateY(-6px);
          border-color: #93c5fd;
          box-shadow: 0 16px 34px rgba(15, 23, 42, 0.1);
        }

        .zb-account-icon-box {
          width: 84px;
          height: 84px;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
          animation: zb-icon-float 4s ease-in-out infinite;
          transition: transform 0.25s ease;
        }

        .zb-account-card:hover .zb-account-icon-box {
          transform: scale(1.08) rotate(-3deg);
        }

        .zb-account-icon-primary {
          background: rgba(13, 110, 253, 0.1);
        }

        .zb-account-icon-success {
          background: rgba(25, 135, 84, 0.1);
        }

        .zb-apply-btn {
          border-radius: 10px;
          font-weight: 600;
          padding: 0.65rem 1.75rem;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .zb-apply-btn:hover {
          transform: translateY(-1px);
        }
      `}</style>

      <div className="container py-2 py-md-4">
        <h2 className="text-center fw-bold mb-4 mb-md-5 text-dark">Open Your Account</h2>

        {/* --- Account Options --- */}
        {!activeForm && (
          <div className="row g-4 justify-content-center">
            {/* Savings Account */}
            <div className="col-12 col-sm-6 col-lg-5">
              <div className="card zb-account-card h-100">
                <div className="card-body text-center p-4 p-md-5 d-flex flex-column justify-content-between">
                  <div>
                    <div className="zb-account-icon-box zb-account-icon-primary">
                      <FaPiggyBank size={42} className="text-primary" />
                    </div>
                    <h4 className="card-title fw-bold text-dark mb-2">Savings Account</h4>
                    <p className="card-text text-muted lh-base mb-4">
                      Enjoy attractive interest rates, flexible deposits, and full
                      digital banking features with our savings account.
                    </p>
                  </div>
                  <div className="d-grid d-sm-inline-block">
                    <button
                      type="button"
                      className="btn btn-primary zb-apply-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Account */}
            <div className="col-12 col-sm-6 col-lg-5">
              <div className="card zb-account-card h-100">
                <div className="card-body text-center p-4 p-md-5 d-flex flex-column justify-content-between">
                  <div>
                    <div className="zb-account-icon-box zb-account-icon-success">
                      <FaBuilding size={40} className="text-success" />
                    </div>
                    <h4 className="card-title fw-bold text-dark mb-2">Current Account</h4>
                    <p className="card-text text-muted lh-base mb-4">
                      Manage your business transactions seamlessly with unlimited
                      withdrawals and exclusive corporate features.
                    </p>
                  </div>
                  <div className="d-grid d-sm-inline-block">
                    <button
                      type="button"
                      className="btn btn-success zb-apply-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- Conditional Forms --- */}
        {/* {activeForm && (
          <div className="row justify-content-center mt-5">
            <div className="col-md-8 col-lg-6">
              {activeForm === "savings" && (
                <div className="card p-4 shadow border-0">
                  <h3 className="fw-bold mb-4 text-primary">Savings Account Application</h3>
                  <form>
                    <div className="mb-3">
                      <label className="form-label fw-medium">Full Name</label>
                      <input type="text" className="form-control" placeholder="Enter your full name" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-medium">Email</label>
                      <input type="email" className="form-control" placeholder="Enter your email address" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-medium">Mobile Number</label>
                      <input type="text" className="form-control" placeholder="Enter your mobile number" />
                    </div>
                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setActiveForm(null)}
                      >
                        <FaArrowLeft className="me-2" /> Back
                      </button>
                      <button type="submit" className="btn btn-primary px-4">
                        Submit Application
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeForm === "current" && (
                <div className="card p-4 shadow border-0">
                  <h3 className="fw-bold mb-4 text-success">Current Account Application</h3>
                  <form>
                    <div className="mb-3">
                      <label className="form-label fw-medium">Business Name</label>
                      <input type="text" className="form-control" placeholder="Enter your business name" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-medium">Contact Person</label>
                      <input type="text" className="form-control" placeholder="Enter contact person's name" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-medium">Business Email</label>
                      <input type="email" className="form-control" placeholder="Enter your business email" />
                    </div>
                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setActiveForm(null)}
                      >
                        <FaArrowLeft className="me-2" /> Back
                      </button>
                      <button type="submit" className="btn btn-success px-4">
                        Submit Application
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default OpenAccount;

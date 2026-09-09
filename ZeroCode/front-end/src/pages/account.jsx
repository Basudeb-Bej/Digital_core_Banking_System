// Front-end/src/pages/account.jsx
import React, { useState } from "react";
import { FaPiggyBank, FaBuilding, FaArrowLeft } from "react-icons/fa";

function OpenAccount() {
  const [activeForm, setActiveForm] = useState(null);

  return (
    <div className="container my-5 py-5">
      <h2 className="text-center fw-bold mb-5">Open Your Account</h2>

      {/* --- Account Options --- */}
      {!activeForm && (
        <div className="row g-4 justify-content-center">
          {/* Savings Account */}
          <div className="col-md-6 col-lg-5">
            <div className="card shadow border-0 h-100">
              <div className="card-body text-center p-4">
                <FaPiggyBank size={50} className="text-primary mb-3" />
                <h4 className="card-title fw-bold">Savings Account</h4>
                <p className="card-text text-muted">
                  Enjoy attractive interest rates, flexible deposits, and full
                  digital banking features with our savings account.
                </p>
                <button
                  className="btn btn-primary px-4 mt-3"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  Apply Now
                </button>

              </div>
            </div>
          </div>

          {/* Current Account */}
          <div className="col-md-6 col-lg-5">
            <div className="card shadow border-0 h-100">
              <div className="card-body text-center p-4">
                <FaBuilding size={50} className="text-success mb-3" />
                <h4 className="card-title fw-bold">Current Account</h4>
                <p className="card-text text-muted">
                  Manage your business transactions seamlessly with unlimited
                  withdrawals and exclusive corporate features.
                </p>
                <button
                  className="btn btn-success px-4 mt-3"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  Apply Now
                </button>
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
  );
}

export default OpenAccount;

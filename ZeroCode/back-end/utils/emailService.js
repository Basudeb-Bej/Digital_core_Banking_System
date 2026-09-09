// back-end/utils/emailService.js
require("dotenv").config();
const nodemailer = require("nodemailer");
const CLIENT_URL = process.env.CLIENT_URL || "https://zero-bank-ebon-zeta.vercel.app";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  family: 4,
});

// Generic email sender
exports.sendEmail = async ({ to, subject, html }) => {
  return await transporter.sendMail({
    from: `"ZeroBank" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

// 1. Account Approval Email Template
exports.sendApprovalEmail = async (account, rawPassword = null) => {
  const loginPassword = rawPassword || account.password || "The password set during registration";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #0d6efd; color: #ffffff; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Welcome to ZeroBank</h1>
        <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">Your account has been approved and activated</p>
      </div>

      <div style="padding: 24px; color: #334155;">
        <p style="font-size: 16px;">Dear <strong>${account.fullName}</strong>,</p>
        <p>Congratulations! Your bank account application has been reviewed and successfully approved by our administrator.</p>
        
        <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 18px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Account Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Account Holder:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${account.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Account Number (Login ID):</td>
              <td style="padding: 6px 0; font-weight: bold; color: #0d6efd;">${account.accNo || "Generated"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Account Type:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${account.accountType || "Savings Account"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Registered Email:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${account.email}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Registered Mobile:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${account.mobile || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Password:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${loginPassword}</td>
            </tr>
          </table>
        </div>

        <p style="font-size: 14px; line-height: 1.5;">
          You can now log in to the <strong>ZeroBank Customer Portal</strong> using your Account Number as your Customer ID and your registered password.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${CLIENT_URL}" style="background-color: #0d6efd; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Log In to Your Account
          </a>
        </div>

        <p style="font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 16px;">
          For security reasons, never share your password or banking credentials with anyone.
        </p>
      </div>
    </div>
  `;

  return await exports.sendEmail({
    to: account.email,
    subject: "ZeroBank - Account Approved & Login Details",
    html,
  });
};

// 2. Account Rejection Email Template
exports.sendRejectionEmail = async (account, reason = "Information or documentation provided did not meet bank verification criteria.") => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #dc3545; color: #ffffff; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 22px;">ZeroBank Application Status</h1>
        <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">Application Update Notice</p>
      </div>

      <div style="padding: 24px; color: #334155;">
        <p style="font-size: 16px;">Dear <strong>${account.fullName}</strong>,</p>
        <p>Thank you for your interest in opening an account with ZeroBank.</p>
        <p>
          After reviewing your submitted application, our verification team was unable to approve your account at this time.
        </p>

        <div style="background-color: #fff5f5; border: 1px solid #fed7d7; border-radius: 6px; padding: 16px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #c53030;">Reason for Rejection:</h4>
          <p style="margin-bottom: 0; color: #742a2a; font-size: 14px;">${reason}</p>
        </div>

        <div style="font-size: 14px; color: #475569;">
          <p><strong>Application Details:</strong></p>
          <ul style="padding-left: 20px; line-height: 1.6;">
            <li><strong>Applicant Name:</strong> ${account.fullName}</li>
            <li><strong>Submitted Email:</strong> ${account.email}</li>
            <li><strong>Account Type Requested:</strong> ${account.accountType || "Savings"}</li>
            <li><strong>Date of Application:</strong> ${new Date(account.createdAt || Date.now()).toLocaleDateString()}</li>
          </ul>
        </div>

        <p style="font-size: 14px; line-height: 1.5; margin-top: 20px;">
          If you believe this is an error or wish to provide updated documents, you may submit a fresh application on our website or contact support.
        </p>

        <p style="font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 16px;">
          ZeroBank Compliance & Customer Operations
        </p>
      </div>
    </div>
  `;

  return await exports.sendEmail({
    to: account.email,
    subject: "ZeroBank - Account Application Update",
    html,
  });
};

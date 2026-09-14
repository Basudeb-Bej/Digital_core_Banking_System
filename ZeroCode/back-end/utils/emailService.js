// back-end/utils/emailService.js
require("dotenv").config();
const emailjs = require("@emailjs/nodejs");

const CLIENT_URL = process.env.CLIENT_URL || "https://zero-bank-five.vercel.app";

emailjs.init({
  publicKey: process.env.EMAILJS_PUBLIC_KEY,
  privateKey: process.env.EMAILJS_PRIVATE_KEY,
});

async function send(templateId, params) {
  const result = await emailjs.send(process.env.EMAILJS_SERVICE_ID, templateId, params);
  console.log(`[ZeroBank] Email successfully sent to: ${params.to_email} (status: ${result.status})`);
  return true;
}

/* ============================================================
   TEMPLATE A — Approval only
============================================================ */
exports.sendApprovalEmail = async (account) => {
  try {
    return await send(process.env.EMAILJS_TEMPLATE_ID_APPROVAL, {
      to_email: account.email,
      to_name: account.fullName,
      account_number: account.accNo || "Generated",
      account_type: account.accountType || "Savings Account",
      login_url: CLIENT_URL,
    });
  } catch (error) {
    console.error("[ZeroBank] EmailJS approval error:", error);
    throw new Error(error.text || error.message || "Failed to send approval email via EmailJS");
  }
};

/* ============================================================
   TEMPLATE B — Rejection, support, forgot-password (shared)
============================================================ */
exports.sendRejectionEmail = async (
  account,
  reason = "Information or documentation provided did not meet verification criteria."
) => {
  try {
    return await send(process.env.EMAILJS_TEMPLATE_ID_SHARED, {
      to_email: account.email,
      to_name: account.fullName,
      subject: "ZeroBank - Application Update",
      message: `After reviewing your submitted application, our verification team was unable to approve your account at this time.\n\nReason: ${reason}\n\nIf you believe this is an error or wish to provide updated documents, you may submit a fresh application on our website.`,
    });
  } catch (error) {
    console.error("[ZeroBank] EmailJS rejection error:", error);
    throw new Error(error.text || error.message || "Failed to send rejection email via EmailJS");
  }
};

// Used by contactSupport and both forgot-password flows (user + admin).
// Callers build the plain-text `message` body themselves — this function
// just forwards it, with zero HTML or styling involved.
exports.sendEmail = async ({ to, to_name, subject, message }) => {
  try {
    return await send(process.env.EMAILJS_TEMPLATE_ID_SHARED, {
      to_email: to,
      to_name: to_name || "ZeroBank Admin",
      subject,
      message,
    });
  } catch (error) {
    console.error("[ZeroBank] EmailJS shared-template send error:", error);
    throw new Error(error.text || error.message || "Failed to send email via EmailJS");
  }
};

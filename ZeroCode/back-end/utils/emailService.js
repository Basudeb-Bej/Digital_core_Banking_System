// back-end/utils/emailService.js
require("dotenv").config();
const emailjs = require("@emailjs/nodejs");

const CLIENT_URL = process.env.CLIENT_URL || "https://zero-bank-five.vercel.app";

emailjs.init({
  publicKey: process.env.EMAILJS_PUBLIC_KEY,
  privateKey: process.env.EMAILJS_PRIVATE_KEY,
});

exports.sendApprovalEmail = async (account) => {
  try {
    const result = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID_APPROVAL,
      {
        to_email: account.email,
        to_name: account.fullName,
        masked_acc_no: account.accNo || "Generated",
        account_type: account.accountType || "Savings Account",
        login_url: CLIENT_URL,
      }
    );

    console.log(`[ZeroBank] Approval email successfully sent to: ${account.email} (status: ${result.status})`);
    return true;
  } catch (error) {
    console.error("[ZeroBank] EmailJS approval error:", error);
    throw new Error(error.text || error.message || "Failed to send approval email via EmailJS");
  }
};

// 4. Account Rejection Email (Sent when Admin rejects applicant)
exports.sendRejectionEmail = async (account, reason = "Information or documentation provided did not meet verification criteria.") => {
  try {
    const result = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID_REJECTION,
      {
        to_email: account.email,
        to_name: account.fullName,
        reason,
      }
    );

    console.log(`[ZeroBank] Rejection email successfully sent to: ${account.email} (status: ${result.status})`);
    return true;
  } catch (error) {
    console.error("[ZeroBank] EmailJS rejection error:", error);
    throw new Error(error.text || error.message || "Failed to send rejection email via EmailJS");
  }
};

exports.sendEmail = async ({ to, subject, html, text }) => {
  try {
    const result = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID_GENERIC,
      {
        to_email: to,
        subject,
        message: text || html.replace(/<[^>]+>/g, " "), // strip tags as a fallback
      }
    );

    console.log(`[ZeroBank] Email successfully sent to: ${to} (status: ${result.status})`);
    return true;
  } catch (error) {
    console.error("[ZeroBank] EmailJS generic send error:", error);
    throw new Error(error.text || error.message || "Failed to send email via EmailJS");
  }
};

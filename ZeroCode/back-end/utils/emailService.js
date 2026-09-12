// back-end/utils/emailService.js
require("dotenv").config();
const emailjs = require("@emailjs/nodejs");

const CLIENT_URL = process.env.CLIENT_URL || "https://zero-bank-five.vercel.app";

emailjs.init({
  publicKey: process.env.EMAILJS_PUBLIC_KEY,
  privateKey: process.env.EMAILJS_PRIVATE_KEY, // required for server-side calls
});

function maskAccountNumber(accNo) {
  if (!accNo) return "Generated";
  const str = String(accNo);
  if (str.length <= 4) return str;
  return "•".repeat(str.length - 4) + str.slice(-4);
}

// 3. Account Approval Email (Sent when Admin approves applicant)
exports.sendApprovalEmail = async (account) => {
  try {
    const result = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID_APPROVAL,
      {
        to_email: account.email,
        to_name: account.fullName,
        masked_acc_no: maskAccountNumber(account.accNo),
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

// Generic sender — used by contactSupport / forgot-password flows.
// These need their own EmailJS template (e.g. "template_generic") with
// {{to_email}}, {{subject}}, {{message}} variables, since EmailJS is
// template-based rather than raw-HTML based.
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











// // back-end/utils/emailService.js
// require("dotenv").config();
// const { google } = require("googleapis");

// const CLIENT_URL = process.env.CLIENT_URL || "https://zero-bank-five.vercel.app";

// const oAuth2Client = new google.auth.OAuth2(
//   process.env.GMAIL_CLIENT_ID,
//   process.env.GMAIL_CLIENT_SECRET,
//   "https://developers.google.com/oauthplayground"
// );
// oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

// function buildRawMessage({ to, from, subject, html }) {
//   const messageParts = [
//     `From: "ZeroBank" <${from}>`,
//     `To: ${to}`,
//     "Content-Type: text/html; charset=utf-8",
//     "MIME-Version: 1.0",
//     `Subject: ${subject}`,
//     "",
//     html,
//   ];
//   const message = messageParts.join("\n");

//   return Buffer.from(message)
//     .toString("base64")
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_")
//     .replace(/=+$/, "");
// }

// exports.sendEmail = async ({ to, subject, html }) => {
//   try {
//     const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

//     const raw = buildRawMessage({
//       to,
//       from: process.env.EMAIL_USER,
//       subject,
//       html,
//     });

//     const result = await gmail.users.messages.send({
//       userId: "me",
//       requestBody: { raw },
//     });

//     console.log(`[ZeroBank] Email successfully delivered to: ${to} (Message ID: ${result.data.id})`);
//     return true;
//   } catch (error) {
//     console.error("[ZeroBank] Gmail API sending error:", error.message);
//     throw new Error(error.message || "Failed to send email via Gmail API");
//   }
// };

// // 3. Account Approval Email (Sent when Admin approves applicant)
// exports.sendApprovalEmail = async (account, rawPassword = null) => {
//   const loginPassword = rawPassword || account.password || "The password set during registration";

//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
//       <div style="background-color: #0d6efd; color: #ffffff; padding: 24px; text-align: center;">
//         <h1 style="margin: 0; font-size: 24px;">Welcome to ZeroBank</h1>
//         <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">Your account has been approved and activated</p>
//       </div>

//       <div style="padding: 24px; color: #334155;">
//         <p style="font-size: 16px;">Dear <strong>${account.fullName}</strong>,</p>
//         <p>Congratulations! Your bank account application has been reviewed and successfully approved by our administrator.</p>
        
//         <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 18px; margin: 20px 0;">
//           <h3 style="margin-top: 0; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Account Details</h3>
//           <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
//             <tr>
//               <td style="padding: 6px 0; color: #64748b;">Account Holder:</td>
//               <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${account.fullName}</td>
//             </tr>
//             <tr>
//               <td style="padding: 6px 0; color: #64748b;">Account Number (Login ID):</td>
//               <td style="padding: 6px 0; font-weight: bold; color: #0d6efd;">${account.accNo || "Generated"}</td>
//             </tr>
//             <tr>
//               <td style="padding: 6px 0; color: #64748b;">Account Type:</td>
//               <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${account.accountType || "Savings Account"}</td>
//             </tr>
//             <tr>
//               <td style="padding: 6px 0; color: #64748b;">Registered Email:</td>
//               <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${account.email}</td>
//             </tr>
//             <tr>
//               <td style="padding: 6px 0; color: #64748b;">Registered Mobile:</td>
//               <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${account.mobile || "—"}</td>
//             </tr>
//             <tr>
//               <td style="padding: 6px 0; color: #64748b;">Password:</td>
//               <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${loginPassword}</td>
//             </tr>
//           </table>
//         </div>

//         <p style="font-size: 14px; line-height: 1.5;">
//           You can now log in to the <strong>ZeroBank Customer Portal</strong> using your Account Number as your Customer ID and your registered password.
//         </p>

//         <div style="text-align: center; margin: 30px 0;">
//           <a href="${CLIENT_URL}" style="background-color: #0d6efd; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
//             Log In to Your Account
//           </a>
//         </div>
//       </div>
//     </div>
//   `;

//   return await exports.sendEmail({
//     to: account.email,
//     subject: "ZeroBank - Account Approved",
//     html,
//   });
// };

// // 4. Account Rejection Email (Sent when Admin rejects applicant)
// exports.sendRejectionEmail = async (account, reason = "Information or documentation provided did not meet verification criteria.") => {
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
//       <div style="background-color: #dc3545; color: #ffffff; padding: 24px; text-align: center;">
//         <h1 style="margin: 0; font-size: 22px;">ZeroBank Application Status</h1>
//         <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">Application Update Notice</p>
//       </div>

//       <div style="padding: 24px; color: #334155;">
//         <p style="font-size: 16px;">Dear <strong>${account.fullName}</strong>,</p>
//         <p>After reviewing your submitted application, our verification team was unable to approve your account at this time.</p>

//         <div style="background-color: #fff5f5; border: 1px solid #fed7d7; border-radius: 6px; padding: 16px; margin: 20px 0;">
//           <h4 style="margin-top: 0; color: #c53030;">Reason:</h4>
//           <p style="margin-bottom: 0; color: #742a2a; font-size: 14px;">${reason}</p>
//         </div>

//         <p style="font-size: 14px; line-height: 1.5; margin-top: 20px;">
//           If you believe this is an error or wish to provide updated documents, you may submit a fresh application on our website.
//         </p>
//       </div>
//     </div>
//   `;

//   return await exports.sendEmail({
//     to: account.email,
//     subject: "ZeroBank - Application Update",
//     html,
//   });
// };

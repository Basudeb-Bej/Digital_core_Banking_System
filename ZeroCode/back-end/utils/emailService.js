// back-end/utils/emailService.js
require("dotenv").config();
const { google } = require("googleapis");

const CLIENT_URL = process.env.CLIENT_URL || "https://zero-bank-five.vercel.app";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

// Build a multipart/alternative message (plain text + HTML).
// Emails with only an HTML part score worse on spam filters.
function buildRawMessage({ to, from, subject, html, text }) {
  const boundary = "zerobank_" + Date.now();
  const messageParts = [
    `From: "ZeroBank" <${from}>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=utf-8",
    "",
    text,
    "",
    `--${boundary}`,
    "Content-Type: text/html; charset=utf-8",
    "",
    html,
    "",
    `--${boundary}--`,
  ];
  const message = messageParts.join("\r\n");

  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Masks all but the last 4 digits: "298967254936" -> "••••••••4936"
function maskAccountNumber(accNo) {
  if (!accNo) return "Generated";
  const str = String(accNo);
  if (str.length <= 4) return str;
  return "•".repeat(str.length - 4) + str.slice(-4);
}

exports.sendEmail = async ({ to, subject, html, text }) => {
  try {
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    const raw = buildRawMessage({
      to,
      from: process.env.EMAIL_USER,
      subject,
      html,
      text: text || "Please view this email in an HTML-capable client.",
    });

    const result = await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });

    console.log(`[ZeroBank] Email successfully delivered to: ${to} (Message ID: ${result.data.id})`);
    return true;
  } catch (error) {
    console.error("[ZeroBank] Gmail API sending error:", error.message);
    throw new Error(error.message || "Failed to send email via Gmail API");
  }
};

// 3. Account Approval Email (Sent when Admin approves applicant)
// No plaintext password is included — the user logs in with their
// account number and the password they set during registration.
exports.sendApprovalEmail = async (account) => {
  const maskedAccNo = maskAccountNumber(account.accNo);

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #0d6efd; color: #ffffff; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Welcome to ZeroBank</h1>
        <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">Your account has been approved and activated</p>
      </div>

      <div style="padding: 24px; color: #334155;">
        <p style="font-size: 16px;">Dear ${account.fullName},</p>
        <p>Your bank account application has been reviewed and approved by our administrator.</p>

        <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 18px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Account Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Account Holder:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${account.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Account Number (Login ID):</td>
              <td style="padding: 6px 0; font-weight: bold; color: #0d6efd;">${maskedAccNo}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Account Type:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${account.accountType || "Savings Account"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;">Registered Email:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${account.email}</td>
            </tr>
          </table>
        </div>

        <p style="font-size: 14px; line-height: 1.5;">
          Log in with the Account Number shown above and the password you set when you applied.
          If you don't remember it, use "Forgot Password" on the login page.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${CLIENT_URL}" style="background-color: #0d6efd; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Log In to Your Account
          </a>
        </div>
      </div>
    </div>
  `;

  const text = `Dear ${account.fullName},

Your ZeroBank account application has been approved.

Account Holder: ${account.fullName}
Account Number (Login ID): ${maskedAccNo}
Account Type: ${account.accountType || "Savings Account"}
Registered Email: ${account.email}

Log in at ${CLIENT_URL} using your Account Number and the password you set during registration.

- ZeroBank`;

  return await exports.sendEmail({
    to: account.email,
    subject: "ZeroBank - Account Approved",
    html,
    text,
  });
};

// 4. Account Rejection Email (Sent when Admin rejects applicant)
exports.sendRejectionEmail = async (account, reason = "Information or documentation provided did not meet verification criteria.") => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #dc3545; color: #ffffff; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 22px;">ZeroBank Application Status</h1>
        <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">Application Update Notice</p>
      </div>

      <div style="padding: 24px; color: #334155;">
        <p style="font-size: 16px;">Dear ${account.fullName},</p>
        <p>After reviewing your submitted application, our verification team was unable to approve your account at this time.</p>

        <div style="background-color: #fff5f5; border: 1px solid #fed7d7; border-radius: 6px; padding: 16px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #c53030;">Reason:</h4>
          <p style="margin-bottom: 0; color: #742a2a; font-size: 14px;">${reason}</p>
        </div>

        <p style="font-size: 14px; line-height: 1.5; margin-top: 20px;">
          If you believe this is an error or wish to provide updated documents, you may submit a fresh application on our website.
        </p>
      </div>
    </div>
  `;

  const text = `Dear ${account.fullName},

After reviewing your submitted application, our verification team was unable to approve your account at this time.

Reason: ${reason}

If you believe this is an error, you may submit a fresh application on our website.

- ZeroBank`;

  return await exports.sendEmail({
    to: account.email,
    subject: "ZeroBank - Application Update",
    html,
    text,
  });
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

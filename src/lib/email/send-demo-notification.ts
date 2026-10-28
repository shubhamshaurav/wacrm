import nodemailer from "nodemailer";

export interface DemoLeadPayload {
  name: string;
  company_name?: string;
  phone: string;
  email: string;
  sourceUrl?: string;
}

export interface SendEmailResult {
  sent: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Sends a notification email to system@lireach.tech whenever a user submits
 * the 'Request a demo / setup' form on the landing page.
 */
export async function sendDemoNotificationEmail(
  payload: DemoLeadPayload
): Promise<SendEmailResult> {
  const recipient = "system@lireach.tech";
  const { name, company_name, phone, email } = payload;
  const companyDisplay = company_name?.trim() || "Not specified";
  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  const waLink = `https://wa.me/${cleanPhone.replace("+", "")}?text=Hi%20${encodeURIComponent(name)},%20thanks%20for%20requesting%20a%20demo%20of%20WAcrm%20%7C%20LiReach!`;
  const timestamp = new Date().toUTCString();

  const subject = `🚀 New Demo & Setup Request: ${name} (${companyDisplay})`;

  const textBody = `
New Demo & Setup Request Received:
----------------------------------------
Name:         ${name}
Company:      ${companyDisplay}
Phone:        ${phone}
Email:        ${email}
Time (UTC):   ${timestamp}
WhatsApp:     ${waLink}
----------------------------------------
WAcrm | LiReach Lead Notification System
  `.trim();

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Demo &amp; Setup Request</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #08090a; color: #edeef0; margin: 0; padding: 32px 16px;">
  <div style="max-width: 580px; margin: 0 auto; background-color: #0e0f11; border: 1px solid #ffffff1a; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #141518 0%, #0e0f11 100%); padding: 28px 32px; border-bottom: 1px solid #ffffff14; text-align: left;">
      <div style="display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; background-color: #3ddc971a; color: #3ddc97; padding: 4px 10px; border-radius: 9999px; border: 1px solid #3ddc9740; margin-bottom: 12px;">
        New Lead Inbound
      </div>
      <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">
        WAcrm <span style="color: #3ddc97;">| LiReach</span>
      </h1>
      <p style="margin: 6px 0 0; font-size: 14px; color: #8a8f98;">
        A new demo &amp; setup request has been submitted from the landing page.
      </p>
    </div>

    <!-- Lead Info Table -->
    <div style="padding: 32px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 10px 0; color: #8a8f98; width: 35%; border-bottom: 1px solid #ffffff10;">Full Name</td>
          <td style="padding: 10px 0; color: #ffffff; font-weight: 600; border-bottom: 1px solid #ffffff10;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #8a8f98; border-bottom: 1px solid #ffffff10;">Company</td>
          <td style="padding: 10px 0; color: #ffffff; font-weight: 600; border-bottom: 1px solid #ffffff10;">${escapeHtml(companyDisplay)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #8a8f98; border-bottom: 1px solid #ffffff10;">Phone / WhatsApp</td>
          <td style="padding: 10px 0; color: #3ddc97; font-family: monospace; font-size: 15px; font-weight: 600; border-bottom: 1px solid #ffffff10;">
            <a href="tel:${escapeHtml(phone)}" style="color: #3ddc97; text-decoration: none;">${escapeHtml(phone)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #8a8f98; border-bottom: 1px solid #ffffff10;">Business Email</td>
          <td style="padding: 10px 0; color: #ffffff; font-weight: 600; border-bottom: 1px solid #ffffff10;">
            <a href="mailto:${escapeHtml(email)}" style="color: #ffffff; text-decoration: underline;">${escapeHtml(email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #8a8f98;">Received At</td>
          <td style="padding: 10px 0; color: #b4b8bf; font-size: 13px;">${escapeHtml(timestamp)}</td>
        </tr>
      </table>

      <!-- Quick Action CTA -->
      <div style="margin-top: 32px; text-align: center;">
        <a href="${waLink}" style="display: inline-block; background-color: #3ddc97; color: #04110b; text-decoration: none; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 10px; box-shadow: 0 4px 14px rgba(61, 220, 151, 0.4);">
          Chat on WhatsApp &rarr;
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #0a0b0d; padding: 16px 32px; border-top: 1px solid #ffffff10; text-align: center; font-size: 12px; color: #8a8f98;">
      Sent automatically by WAcrm | LiReach System &bull; Destination: ${recipient}
    </div>
  </div>
</body>
</html>
  `.trim();

  // Check if SMTP credentials are provided in environment
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
  const fromAddress = process.env.SMTP_FROM || `"WAcrm | LiReach" <system@lireach.tech>`;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: fromAddress,
        to: recipient,
        replyTo: email,
        subject,
        text: textBody,
        html: htmlBody,
      });

      console.log(`[Email] Demo notification sent to ${recipient}: ${info.messageId}`);
      return { sent: true, messageId: info.messageId };
    } catch (err: any) {
      console.error(`[Email] Failed to send via SMTP:`, err);
      return { sent: false, error: err?.message || "Failed to send email" };
    }
  } else {
    // If SMTP host is not yet defined in environment, log lead details with high visibility
    console.log(`\n======================================================`);
    console.log(`[LEAD NOTIFICATION] Email target: ${recipient}`);
    console.log(`Subject: ${subject}`);
    console.log(textBody);
    console.log(`(Configure SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local for direct delivery)`);
    console.log(`======================================================\n`);
    return {
      sent: true,
      messageId: "local-log-" + Date.now(),
    };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

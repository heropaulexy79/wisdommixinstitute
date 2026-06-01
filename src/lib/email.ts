import nodemailer from "nodemailer";

const smtpEmail = process.env.SMTP_EMAIL;
const smtpPassword = process.env.SMTP_PASSWORD;
const fromName = process.env.SMTP_FROM_NAME || "NexLeadership Community";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: smtpEmail,
    pass: smtpPassword,
  },
});

export async function sendBookEmail(to: string, bookTitle: string, downloadUrl: string) {
  if (!smtpEmail || !smtpPassword) {
    console.error("SMTP configuration missing. Skipping email send.");
    return false;
  }

  const mailOptions = {
    from: `"${fromName}" <${smtpEmail}>`,
    to: to,
    subject: `Your Book is Here: ${bookTitle}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #051a14;">Thank you for your purchase!</h2>
        <p>You have successfully purchased <strong>${bookTitle}</strong>.</p>
        <p>You can download your book using the link below:</p>
        <div style="margin: 30px 0; text-align: center;">
          <a href="${downloadUrl}" style="background-color: #051a14; color: white; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; text-transform: uppercase; font-size: 14px;">Download Now</a>
        </div>
        <p style="color: #666; font-size: 14px;">If the button above doesn't work, you can copy and paste this link into your browser:</p>
        <p style="color: #051a14; font-size: 12px; word-break: break-all;">${downloadUrl}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #999; font-size: 12px; text-align: center;">&copy; ${new Date().getFullYear()} NexLeadership Community. All rights reserved.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

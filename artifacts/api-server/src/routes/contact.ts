import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";
import { SubmitContactBody } from "@workspace/api-zod";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid contact form body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, email, phone, industry, message } = parsed.data;

  const recipientEmail = process.env.CONTACT_EMAIL;
  if (!recipientEmail) {
    req.log.error("CONTACT_EMAIL environment variable is not set");
    res.status(500).json({ error: "Server configuration error" });
    return;
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  let transporter: nodemailer.Transporter;

  if (smtpHost && smtpUser && smtpPass) {
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  } else {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    logger.warn("SMTP not configured — using Ethereal test account");
  }

  const industryLabels: Record<string, string> = {
    healthcare: "Healthcare",
    finance: "Finance",
    insurance: "Insurance",
    manufacturing: "Manufacturing / Industry",
    other: "Other",
  };

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e3a5f; border-bottom: 2px solid #1e3a5f; padding-bottom: 10px;">
        New Consulting Inquiry
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 140px; vertical-align: top; color: #555;">Name:</td>
          <td style="padding: 8px 0;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; vertical-align: top; color: #555;">Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        ${phone ? `
        <tr>
          <td style="padding: 8px 0; font-weight: bold; vertical-align: top; color: #555;">Phone:</td>
          <td style="padding: 8px 0;">${phone}</td>
        </tr>` : ""}
        <tr>
          <td style="padding: 8px 0; font-weight: bold; vertical-align: top; color: #555;">Industry:</td>
          <td style="padding: 8px 0;">${industryLabels[industry] ?? industry}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; vertical-align: top; color: #555;">Message:</td>
          <td style="padding: 8px 0; white-space: pre-wrap;">${message}</td>
        </tr>
      </table>
      <p style="color: #888; font-size: 12px; margin-top: 20px;">
        This message was sent via the AI Consulting contact form.
      </p>
    </div>
  `;

  const textBody = [
    "New Consulting Inquiry",
    "======================",
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Industry: ${industryLabels[industry] ?? industry}`,
    `Message:\n${message}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const info = await transporter.sendMail({
      from: `"AI Consulting Website" <${smtpUser ?? "noreply@aiconsulting.com"}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `New Inquiry from ${name} — ${industryLabels[industry] ?? industry}`,
      text: textBody,
      html: htmlBody,
    });

    req.log.info({ messageId: info.messageId }, "Contact form email sent");

    if (!smtpHost) {
      logger.info({ previewUrl: nodemailer.getTestMessageUrl(info) }, "Ethereal preview URL");
    }

    res.json({ success: true, message: "Your inquiry has been received. We will be in touch shortly." });
  } catch (err) {
    req.log.error({ err }, "Failed to send contact form email");
    res.status(500).json({ error: "Failed to send your message. Please try again." });
  }
});

export default router;

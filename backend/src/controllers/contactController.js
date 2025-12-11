import transporter from "../config/mailer.js";
import { validateContact } from "../utils/validate.js";

export const sendContactMail = async (req, res) => {
  try {
    const error = validateContact(req.body);
    if (error) return res.status(400).json({ error });

    const { fullName, email, phone, occupation, subject, message } = req.body;

    const htmlEmail = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Occupation:</strong> ${occupation}</p>
      <p><strong>Subject:</strong> ${subject || "(none)"}</p>
      <p><strong>Message:</strong><br>${message || "(empty)"}</p>
    `;

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.SENDER_EMAIL}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: subject || `New Contact From ${fullName}`,
      html: htmlEmail
    });

    res.status(200).json({ ok: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("MAIL ERROR:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

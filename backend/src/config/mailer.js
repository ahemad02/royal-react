import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,          // smtp-relay.brevo.com
  port: Number(process.env.SMTP_PORT),  // 587
  secure: false,                        // for 587 always false
  auth: {
    user: process.env.SMTP_USER,        // 92b193001@smtp-brevo.com
    pass: process.env.SMTP_PASS,        // your SMTP key
  },
  tls: {
    rejectUnauthorized: false
  }
});

export default transporter;

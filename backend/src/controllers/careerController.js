import transporter from "../config/mailer.js";

export const sendCareerMail = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const mailOptions = {
      from: `"Website Contact" <${process.env.SENDER_EMAIL}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: "New Career Application",
      text: "A new CV has been submitted.",
      attachments: [
        {
          filename: req.file.originalname,
          content: req.file.buffer,
          contentType: req.file.mimetype,
        },
      ],
    };
    await transporter.sendMail(mailOptions);

    res.json({ message: "Application sent successfully!" });
  } catch (error) {
    console.error("Career error:", error);
    res.status(500).json({ error: "Server error." });
  }
};

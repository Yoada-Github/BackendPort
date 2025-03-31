import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, 
      subject: `New  Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    // Send Email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error sending message. Try again later." });
  }
});

export default router;

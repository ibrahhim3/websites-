const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail", // You can replace this with another service like SendGrid or Outlook
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send Activation Email
const sendActivationEmail = async (email, verificationCode) => {
  const mailOptions = {
    from: '"BATAS SPICE SHOP" <batas.spice@gmail.com>',
    to: email,
    subject: "Account Verification Code",
    html: `Your verification code is: ${verificationCode}. It will expire in 1 hour.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent");
  } catch (error) {
    console.error("Error sending activation email:", error);
  }
};

const sendResetEmail = async (email, resetLink) => {
  const mailOptions = {
    from: '"BATAS SPICE SHOP" <batas.spice@gmail.com>',
    to: email,
    subject: "Password Reset Request",
    html: `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent");
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};

module.exports = { sendActivationEmail, sendResetEmail };

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
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; border-radius: 5px;">
        <h2 style="color: #333;">Welcome to BATAS SPICE SHOP</h2>
        <p style="color: #555;">Thank you for signing up! Please use the verification code below to activate your account:</p>
        <h3 style="font-size: 24px; font-weight: bold; color: #2c3e50;">${verificationCode}</h3>
        <p style="color: #555;">The code will expire in 1 hour.</p>
        <p style="color: #555;">If you did not request this, please ignore this email.</p>
        <p style="color: #555;">Thank you,</p>
        <p style="color: #555;">BATAS SPICE SHOP Team</p>
      </div>
    `,
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
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; border-radius: 5px;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p style="color: #555;">We received a request to reset your password for your BATAS SPICE SHOP account. If you didn't request this, please ignore this email.</p>
        <p style="color: #555;">To reset your password, click the link below:</p>
        <a href="${resetLink}" style="font-size: 16px; color: white; background-color: #007bff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Your Password</a>
        <p style="color: #555; margin-top: 20px;">If the button above doesn't work, you can also click this link:</p>
        <a href="${resetLink}" style="color: #007bff;">${resetLink}</a>
        <p style="color: #555;">The link will expire in 1 hour.</p>
        <p style="color: #555;">Thank you,</p>
        <p style="color: #555;">BATAS SPICE SHOP Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent");
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};


module.exports = { sendActivationEmail, sendResetEmail };

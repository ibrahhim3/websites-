const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can replace this with another service like SendGrid or Outlook
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send Activation Email
const sendActivationEmail = async (email, verificationCode) => {
 
  const mailOptions = {
    from: '"Your E-Commerce App" <your-email@gmail.com>',
    to: email,
    subject: 'Account Verification Code',
    html: `Your verification code is: ${verificationCode}. It will expire in 1 hour.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent');
  } catch (error) {
    console.error('Error sending activation email:', error);
  }
};

module.exports = sendActivationEmail;

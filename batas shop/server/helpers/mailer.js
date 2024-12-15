const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Or use another service like SMTP
    auth: {
      user: 'batas.spice@gmail.com', // Your email
      pass: 'kdokwihkwtmivyro ', // Your email password or app-specific password
    },
  });

  await transporter.sendMail({
    from: 'batas.spice@gmail.com',
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;

const Iyzipay = require("iyzipay");

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY,
  secretKey: process.env.IYZICO_SECRET_KEY,
  uri: process.env.IYZICO_BASE_URL,
});

const initializePayment = (paymentData) => {
  return new Promise((resolve, reject) => {
    iyzipay.payment.create(paymentData, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

module.exports = { initializePayment };

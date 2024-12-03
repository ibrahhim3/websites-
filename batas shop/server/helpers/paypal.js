const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AaepEsU2NnQP_Yzk_ypfggro7Uo9Unt-Fnx8sgcP-9R3ZSV1hb4Kn2uspESGLEXmNJTqzlpn1m2BBa6f",
  client_secret: "EPd_v3X46IHTPI9z0Sl-iagLmjnBkCwxGC1nTEd7zgbHCY1cyZJssSgIB-jgS-SpGeIuxLBG4VS_oJ8x",
});

module.exports = paypal;
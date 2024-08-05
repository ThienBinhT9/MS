const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.APP_PASSWROD
    }
  });

module.exports = { transporter }
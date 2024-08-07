const route = require("express").Router();

const MailController = require("../controllers/mail.controller");
const { VerificationByAccessToken } = require("../middlewares/auth.middleware");

route.post("/send-otp", VerificationByAccessToken, MailController.SendOTP);
route.post("/verify-otp", VerificationByAccessToken, MailController.VerifyOTP);

module.exports = route;

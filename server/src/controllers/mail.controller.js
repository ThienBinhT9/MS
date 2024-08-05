const MailService = require("../services/mail.service");

class MailController {
  async SendOTP(req, res) {
    try {
      const { email } = req.body;
      return res.status(200).json(await MailService.SendOTP(email));
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async VerifyOTP(req, res) {
    try {
      const { token, otp } = req.body;
      return res.status(200).json(await MailService.VerifyOTP(token, otp));
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = new MailController();

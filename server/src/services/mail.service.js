const crypto = require("crypto");
const dotenv = require("dotenv");
const NodeCache = require("node-cache");

const { transporter } = require("../configs/node-mailer.config");

dotenv.config();
const otpCache = new NodeCache({ stdTTL: 120 });

class MailService {
  async SendOTP(email) {
    try {
      const otp = crypto.randomInt(100000, 999999);
      const otpToken = crypto.randomBytes(16).toString("hex");

      otpCache.set(otpToken, otp);

      const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: `${otp} là mã xác minh của bạn`,
        text: `Mã OTP của bạn là ${otp}. Hãy xác nhận bằng mã này trong 120 giây!`,
      };

      await transporter.sendMail(mailOptions);
      return {
        code: 200,
        metadata: {
          message: "Gửi mã OTP thành công!",
          data: otpToken,
        },
      };
    } catch (error) {
      return { code: 500, message: error.message };
    }
  }

  async VerifyOTP(token, otp) {
    try {
      const cachedOtp = otpCache.get(token);
      if (!cachedOtp) return { code: 400, message: "OTP đã hết hạn" };

      if (cachedOtp.toString() === otp) {
        otpCache.del(token);
        return { code: 200, metadata: "OTP xác minh thành công!" };
      }

      return { code: 400, message: "OTP không hợp lệ!" };
    } catch (error) {
      return { code: 500, message: error.message };
    }
  }
}

module.exports = new MailService();

const lodash = require("lodash");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");

const {
  findUserById,
  getListUserByQuery,
} = require("../models/repo/user.repo");
const MailService = require("../services/mail.service");
const { areFriends } = require("../models/repo/friendShip.repo");
class UserService {
  async getDetailUser(client_id, user_id) {
    try {
      const foundUser = await findUserById(user_id);
      if (!foundUser) return { code: 404, message: "Account does not exist" };

      const { password, privacy, settings, ...passFeild } = foundUser;

      // Trường hợp là chính bạn => return all feild
      if (client_id.toString() === user_id)
        return { code: 200, metadata: { ...passFeild, settings, privacy } };

      //Trường hợp là bạn bè => return feild public, friends
      if (await areFriends(client_id, user_id)) {
        const data = lodash.omitBy(passFeild, (value, key) => {
          return lodash.get(privacy, `${key}`) === "private";
        });
        return { code: 200, metadata: data };
      }

      //Trường hợp không phải bạn bè => return feild public
      const data = lodash.omitBy(passFeild, (value, key) => {
        const privacyValue = lodash.get(privacy, `${key}`);
        return privacyValue === "private" || privacyValue === "friends";
      });
      return { code: 200, metadata: data };
    } catch (error) {
      return error.message;
    }
  }

  async updateUser(body, key) {
    try {
      const user = await findUserById(key.keyUserId);
      if (!user) return { code: 401, message: "Account does not exist" };

      const userAfterUpdate = await User.findByIdAndUpdate(
        key.keyUserId,
        {
          $set: {
            ...body,
          },
        },
        { new: true }
      ).lean();

      const { password, ...passFeilds } = userAfterUpdate;
      return { code: 200, metadata: passFeilds };
    } catch (error) {
      return error.message;
    }
  }

  async searchUser(query, page) {
    try {
      const regex = new RegExp(query, "i");
      const _query = {
        $or: [{ firstName: regex }, { lastName: regex }, { homeTown: regex }],
      };

      const data = await getListUserByQuery({
        select: ["firstName", "lastName", "avatar"],
        query: _query,
        page,
      });
      return { code: 200, metadata: data };
    } catch (error) {
      return { code: 500, messge: error.message };
    }
  }

  async ResetPassword(token, otp, newPassword, oldPassword, userId) {
    try {
      if (!token || !otp || !newPassword)
        return {
          code: 400,
          message: "Token, OTP, and new password are required.",
        };

      const result = await MailService.VerifyOTP(token, otp);
      if (result.code !== 200) return { code: 400, message: result.message };

      const user = await findUserById(userId);
      if (!user) return { code: 400, message: "Tài khoản không tồn tại" };

      const passwordValid = await bcrypt.compare(oldPassword, user.password);
      if (!passwordValid) return { code: 400, message: "Mật khẩu không đúng" };

      const _newPassword = await bcrypt.hash(newPassword, 10);
      const userAfterUpdate = await User.findByIdAndUpdate(userId, {
        $set: { password: _newPassword },
      });
      if (!userAfterUpdate)
        return {
          code: 400,
          message: "Đổi mật khẩu không thành công. Xin thử lại lần nữa!",
        };

      return { code: 200, metadata: "Đổi mật khẩu thành công!" };
    } catch (error) {
      return { code: 500, message: error.message };
    }
  }
}

module.exports = new UserService();

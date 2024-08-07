const bcrypt = require("bcrypt");
const crypto = require("crypto");
const dotenv = require("dotenv");

const {
  findUserById,
  deleteUserById,
  findUserByEmail,
} = require("../models/repo/user.repo");
const { createTokens, createKey } = require("../utils");

const Key = require("../models/key.model");
const User = require("../models/user.model");
dotenv.config()
class AuthService {
  async signUp({ email, password, ...fields }) {
    try {
      const findUserEmail = await findUserByEmail(email);
      if (findUserEmail) return { code: 401, message: "Email has been used!" };

      const hashed_password = await bcrypt.hash(password, 10);

      const new_user = await User.create({ email, password: hashed_password, ...fields });
      if (!new_user) return { code: 400, message: "Account creation failed!" };

      const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: { type: "pkcs1", format: "pem" },
        privateKeyEncoding: { type: "pkcs1", format: "pem" },
      });

      const tokens = createTokens(privateKey, { userId: new_user._id });
      const key = await createKey(
        publicKey,
        privateKey,
        tokens.refresh_token,
        new_user._id
      );
      if (key === null) {
        await deleteUserById(new_user._id);
        return { code: 400, message: "Key creation failed!" };
      }

      const { password: _password, privacy, ...passField } = new_user._doc;
      return { code: 201, metadata: { ...tokens, ...passField } };
    } catch (error) {
      return error.message;
    }
  }

  async SignIn({ email, password }) {
    try {
      const findUserEmail = await findUserByEmail(email);
      if (!findUserEmail)
        return { code: 404, message: "Account does not exist" };

      const valid_password = await bcrypt.compare(
        password,
        findUserEmail.password
      );
      if (!valid_password) return { code: 401, message: "Invalid password" };

      const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: { type: "pkcs1", format: "pem" },
        privateKeyEncoding: { type: "pkcs1", format: "pem" },
      });

      const tokens = createTokens(privateKey, { userId: findUserEmail._id });
      const key = createKey(
        publicKey,
        privateKey,
        tokens.refresh_token,
        findUserEmail._id
      );
      if (key === null) return { code: 400, message: "Key creation failed!" };
      const { password: _password, privacy, ...passField } = findUserEmail;
      return { code: 200, metadata: { ...tokens, ...passField } };
    } catch (error) {
      return error.message;
    }
  }

  async SignOut({ userId }) {
    try {
      const foundUser = await findUserById(userId);
      if (!foundUser) return { code: 401, message: "Unauthorized! 2" };

      await Key.findOneAndDelete({ keyUserId: userId });
      return { code: 200, metadata: "Đăng xuất thành công!" };
    } catch (error) {
      return error.message;
    }
  }

  async RefreshToken({ refresh_token, key }) {
    try {
      const { keyUserId, privateKey, refreshTokenUsed, _id } = key;
      if (refreshTokenUsed.includes(refresh_token)) {
        await Key.findByIdAndDelete(_id);
        return { code: 401, message: "Please! Re-login" };
      }

      if (refresh_token !== key.refreshToken)
        return { code: 401, message: "Unauthorized!" };

      const found_user = await findUserById(keyUserId);
      if (!found_user) return { code: 401, message: "Not you!" };

      const tokens = createTokens(privateKey, { userId: keyUserId });
      await Key.updateOne(
        { keyUserId },
        {
          $addToSet: {
            refreshTokenUsed: refresh_token,
          },
          $set: {
            refreshToken: refresh_token,
          },
        }
      );

      return { code: 200, metadata: tokens };
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = new AuthService();

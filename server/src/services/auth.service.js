const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { findUserByEmail, deleteUserById } = require("../models/repo/user.repo");
const { createTokens, createKey } = require("../utils");

const User = require("../models/user.model");

class AuthService {
  async signUp({ email, password }) {
    try {
      const findUserEmail = await findUserByEmail(email);
      if (findUserEmail) return { code: 401, message: "Email has been used!" };

      const hashed_password = await bcrypt.hash(password, 10);

      const new_user = await User.create({ email, password: hashed_password });
      if (!new_user) return { code: 400, message: "Account creation failed!" };

      const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: { type: "pkcs1", format: "pem" },
        privateKeyEncoding: { type: "pkcs1", format: "pem" },
      });

      const tokens = createTokens(privateKey, { id: new_user._id });
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

      const { password: _password, ...passField } = new_user._doc;
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

      const tokens = createTokens(privateKey, { id: findUserByEmail._id });
      const key = createKey(
        publicKey,
        privateKey,
        tokens.refresh_token,
        findUserEmail._id
      );
      if (key === null) return { code: 400, message: "Key creation failed!" };

      const { password: _password, ...passField } = findUserEmail._doc;
      return { code: 200, metadata: { ...tokens, ...passField } };
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = new AuthService();

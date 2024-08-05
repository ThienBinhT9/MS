const lodash = require("lodash");
const jwt = require("jsonwebtoken");

const Key = require("../models/key.model");

const createTokens = (key, payload) => {
  const access_token = jwt.sign(payload, key, {
    algorithm: "RS256",
    expiresIn: "2h",
  });

  const refresh_token = jwt.sign(payload, key, {
    algorithm: "RS256",
    expiresIn: "30 days",
  });

  return { access_token, refresh_token };
};

const createKey = async (publicKey, privateKey, refreshToken, keyUserId) => {
  try {
    const key = Key.findOneAndUpdate(
      { keyUserId },
      {
        publicKey,
        privateKey,
        refreshToken,
      },
      { upsert: true, new: true }
    );

    return key ? key : null;
  } catch (error) {
    return null;
  }
};

const getInfoDataByObject = ({ feilds = [], object = {} }) => {
  return lodash.pick(object, feilds);
};

const getInfoDataByList = ({ feilds = [], array = [] }) => {
  return array.map((item) => lodash.pick(item, feilds));
};

module.exports = {
  createTokens,
  createKey,
  getInfoDataByObject,
  getInfoDataByList
};

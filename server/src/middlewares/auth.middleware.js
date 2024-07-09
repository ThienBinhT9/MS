const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const Key = require("../models/key.model");

dotenv.config();

const VerificationByRefreshToken = async (req, res, next) => {
  const refresh_token = req.headers[process.env.REFRESH_TOKEN]?.toString();
  if (!refresh_token)
    return res.status(401).json({
      code: 401,
      message: "Unauthorized!",
    });

  const client_id = req.headers[process.env["X-CLIENT-ID"]]?.toString();
  if (!client_id)
    return res.status(401).json({
      code: 401,
      message: "Unauthorized!",
    });

  const key = await Key.findOne({ keyUserId: client_id });
  if (!key)
    return res.status(401).json({
      code: 401,
      message: "Unauthorized!",
    });

  jwt.verify(refresh_token, key.publicKey, (err, payload) => {
    if (err)
      return res.status(401).json({ code: 401, message: "Unauthorized!" });

    if (payload.userId !== client_id)
      return res.status(401).json({
        code: 401,
        message: "Unauthorized!",
      });

    req.key = key;
    req.refresh_token = refresh_token;
    return next();
  });
};

const VerificationByAccessToken = async (req, res, next) => {
  const access_token = req.headers[process.env.ACCESS_TOKEN]?.toString();
  if (!access_token)
    return res.status(401).json({ code: 401, message: "Unauthorized!" });

  const client_id = req.headers[process.env["X-CLIENT-ID"]]?.toString();
  if (!client_id)
    return res.status(401).json({ code: 401, message: "Unauthorized!" });

  const key = await Key.findOne({ keyUserId: client_id });
  if (!key)
    return res.status(401).json({ code: 401, message: "Unauthorized!" });
  console.log({ access_token, client_id, key });

  jwt.verify(access_token, key.publicKey, (err, payload) => {
    if (err)
      return res.status(401).json({ code: 401, message: "Unauthorized!" });
    if (client_id !== payload.userId)
      return res.status(401).json({ code: 401, message: "Unauthorized!" });
    req.key = key;
    req.access_token = access_token;
    return next();
  });
};

module.exports = { VerificationByAccessToken, VerificationByRefreshToken };

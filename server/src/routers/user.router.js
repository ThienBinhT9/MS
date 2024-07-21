const route = require("express").Router();
const UserController = require("../controllers/user.controller");
const { VerificationByAccessToken } = require("../middlewares/auth.middleware");

route.get("/detail/:id", VerificationByAccessToken, UserController.getDetailUser);

route.patch("/update", VerificationByAccessToken, UserController.updateUser);

module.exports = route;

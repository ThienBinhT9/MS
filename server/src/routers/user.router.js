const route = require("express").Router();
const UserController = require("../controllers/user.controller");
const { VerificationByAccessToken } = require("../middlewares/auth.middleware");

route.get("/detail/:id", VerificationByAccessToken, UserController.getDetailUser);

route.get("/search", VerificationByAccessToken, UserController.searchUser);

route.patch("/update", VerificationByAccessToken, UserController.updateUser);

route.patch("/reset-password", VerificationByAccessToken, UserController.resetPassword);






module.exports = route;

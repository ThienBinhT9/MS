const route = require("express").Router();
const UserController = require("../controllers/user.controller");
const { VerificationByAccessToken } = require("../middlewares/auth.middleware");

route.get("/detail/:id", VerificationByAccessToken, UserController.getDetailUser);


module.exports = route;

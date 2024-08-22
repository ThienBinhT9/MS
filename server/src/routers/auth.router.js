const router = require("express").Router();

const AuthController = require("../controllers/auth.controller");
const {
  VerificationByAccessToken,
  VerificationByRefreshToken,
} = require("../middlewares/auth.middleware");

router.post("/sign-up", AuthController.signUp);
router.post("/sign-in", AuthController.signIn);
router.post("/sign-out", VerificationByAccessToken, AuthController.signOut);
router.post("/refresh-token", VerificationByRefreshToken, AuthController.refreshToken);
router.post("/reset-password", AuthController.resetPassword);

module.exports = router;

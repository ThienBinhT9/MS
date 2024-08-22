const AuthService = require("../services/auth.service");

class AuthController {
  async signUp(req, res) {
    try {
      return res.status(200).json(await AuthService.signUp(req.body));
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async signIn(req, res) {
    try {
      return res.status(200).json(await AuthService.SignIn(req.body));
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async signOut(req, res) {
    try {
      const { keyUserId } = req.key;
      return res
        .status(200)
        .json(await AuthService.SignOut({ userId: keyUserId }));
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async refreshToken(req, res) {
    try {
      return res.status(200).json(
        await AuthService.RefreshToken({
          key: req.key,
          refresh_token: req.refresh_token,
        })
      );
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async resetPassword(req, res) {
    try {
      return res
        .status(200)
        .json(await AuthService.resetPassword(req.body));
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = new AuthController();

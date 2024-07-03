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
      return res.status(200).json(await AuthService.SignOut());
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = new AuthController();

const UserService = require("../services/user.service")

class UserController {
  async getDetailUser(req, res) {
    try {
        const {id} = req.params
        return res.status(200).json(await UserService.getDetailUser())
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = new UserController();

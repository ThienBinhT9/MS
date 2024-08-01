const UserService = require("../services/user.service");

class UserController {
  async getDetailUser(req, res) {
    try {
      const { id: userId } = req.params;
      const { keyUserId } = req.key;
      return res.status(200).json(await UserService.getDetailUser(keyUserId, userId));
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async updateUser(req, res) {
    try {
      return res.status(200).json(await UserService.updateUser(req.body, req.key))
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  async searchUser(req, res) {
    try {
      const {q, page} = req.query
      return res.status(200).json(await UserService.searchUser(q, page))
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  async setting(req, res) {
    try {
      const { keyUserId } = req.key
      return res.status(200).json(await UserService.settings(keyUserId, req.body))
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = new UserController();

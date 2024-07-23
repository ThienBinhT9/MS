const FriendShipService = require("../services/friendship.service")

class FriendShipController{
    async request(req, res) {
        try {
            const { keyUserId } = req.key
            const { friendId } = req.body
            return res.status(200).json(await FriendShipService.request(keyUserId, friendId))
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async cancelRequest(req, res) {
        try {
            const { keyUserId } = req.key
            const { friendId } = req.body
            return res.status(200).json(await FriendShipService.cancelRequest(keyUserId, friendId))
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async accepted(req, res){
        try {
            const { keyUserId } = req.key
            const { friendId } = req.body
            return res.status(200).json(await FriendShipService.accepted(keyUserId, friendId))
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async cancel(req, res) {
        try {
            const { keyUserId } = req.key
            const { friendId } = req.body
            return res.status(200).json(await FriendShipService.cancel(keyUserId, friendId))
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async getMutualFriendsCount(req, res){
        try {
            const { keyUserId } = req.key
            const { friendId } = req.body
            return res.status(200).json(await FriendShipService.getMutualFriendsCount(keyUserId, friendId))
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async searchFriends(req, res){
        try {
            const {q, page} = req.query
            const { keyUserId } = req.key
            return res.status(200).json(await FriendShipService.searchFriend(keyUserId, q, page))
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async getListFriend(req, res){
        try {
            const { keyUserId } = req.key
            const { page } = req.query
            return res.status(200).json(await FriendShipService.getListFriend(keyUserId, page))
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = new FriendShipController()
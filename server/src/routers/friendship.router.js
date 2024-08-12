const route = require("express").Router()

const FriendShipController = require("../controllers/friendship.controller")
const {VerificationByAccessToken} = require("../middlewares/auth.middleware")

route.post("/request", VerificationByAccessToken, FriendShipController.request)

route.post("/accepted", VerificationByAccessToken, FriendShipController.accepted)

route.post("/cancel", VerificationByAccessToken, FriendShipController.cancel)

route.post("/cancelRequest", VerificationByAccessToken, FriendShipController.cancelRequest)

route.get("/mutualCount/:friendId", VerificationByAccessToken, FriendShipController.getMutualFriendsCount)

route.get("/numberOfFriend/:friendId", VerificationByAccessToken, FriendShipController.getNumberOfFriend)

route.get("/search", VerificationByAccessToken, FriendShipController.searchFriends)

route.get("/list", VerificationByAccessToken, FriendShipController.getListFriend)

module.exports = route
const {
  areFriends,
  addFriends,
  getList,
} = require("../models/repo/friendShip.repo");
const { findUserById } = require("../models/repo/user.repo");
const FriendShip = require("../models/friendship.model");

class FriendShipService {
  async request(client_id, friend_id) {
    try {
      //Kiểm tra xem đã là bạn bè chưa
      const result = await areFriends(client_id, friend_id);
      if (result) return { code: 401, message: "Friendship already exists" };

      const friendship = await FriendShip.findOne({
        $or: [
          { user: client_id, friend: friend_id, status: "pending" },
          { user: friend_id, friend: client_id, status: "pending" },
        ],
      });
      if (friendship)
        return { code: 401, message: "Friendship already exists" };

      if (client_id.toString() === friend_id)
        return { code: 401, message: "Friendship already exists" };

      //gửi lời mời kết bạn
      await addFriends(client_id, friend_id);
      return { code: 201, metadata: "Friend request sent successfully" };
    } catch (error) {
      return error.message;
    }
  }

  async cancelRequest(client_id, friend_id) {
    try {
      const friendship = await FriendShip.findOneAndDelete({
        $or: [
          { user: client_id, friend: friend_id, status: "pending" },
          { user: friend_id, friend: client_id, status: "pending" },
        ],
      });

      if (!friendship) return { code: 401, message: "cancel request failed" };

      return { code: 200, metadata: "cancel request successfully" };
    } catch (error) {
      return error.message;
    }
  }

  async accepted(client_id, friend_id) {
    try {
      const friendship = await FriendShip.findOneAndUpdate(
        { user: friend_id, friend: client_id, status: "pending" },
        { status: "accepted" },
        { new: true }
      );

      if (!friendship)
        return { code: 401, message: "Friend request not found" };

      await FriendShip.create({
        user: client_id,
        friend: friend_id,
        status: "accepted",
      });
      return { code: 200, metadata: "Friend request accepted" };
    } catch (error) {
      return error.message;
    }
  }

  async cancel(client_id, friend_id) {
    try {
      const friendship1 = await FriendShip.findOneAndDelete({
        user: client_id,
        friend: friend_id,
        status: "accepted",
      });
      const friendship2 = await FriendShip.findOneAndDelete({
        user: friend_id,
        friend: client_id,
        status: "accepted",
      });

      if (!friendship1 && !friendship2)
        return { code: 401, message: "unfriend failed" };
      return { code: 200, metadata: "unfriend successfully" };
    } catch (error) {
      return error.message;
    }
  }

  async getMutualFriendsCount(client_id, user_id) {
    try {
      const friendOfClient = await FriendShip.find({
        user: client_id,
        status: "accepted",
      })
        .select("friend")
        .lean();
      const clientFriendsIds = friendOfClient.map((friendship) =>
        friendship.friend.toString()
      );

      const count = await FriendShip.countDocuments({
        user: user_id,
        friend: { $in: clientFriendsIds },
        status: "accepted",
      }).exec();

      return { code: 200, metadata: count };
    } catch (error) {
      return { code: 500, message: error.message };
    }
  }

  async getNumberOfFriend(client_id, user_id) {
    try {
      const _user = await findUserById(user_id);
      if (!_user) return { code: 404, message: "Account does not exist" };

      const { friend } = _user.settings;

      const count = await FriendShip.countDocuments({
        user: user_id,
        status: "accepted",
      }).exec();

      if (friend === "public" || client_id.toString() === user_id)
        return { code: 200, metadata: count };

      if (friend === "friend" && (await areFriends(user_id, client_id)))
        return { code: 200, metadata: count };

      if (friend === "private" && client_id.toString() === user_id)
        return { code: 200, metadata: count };

      return { code: 401, message: "Bạn không có quyền!" };
    } catch (error) {
      return { code: 500, message: error.message };
    }
  }

  async searchFriend(client_id, query, page = 1) {
    try {
      const _query = { user: client_id, status: "accepted" };
      const regex = new RegExp(query, "i");

      const options = {
        page,
        limit: 20,
      };

      const aggregateQuery = FriendShip.aggregate([
        { $match: _query },
        {
          $lookup: {
            from: "user", // Tên collection của bảng User
            localField: "friend",
            foreignField: "_id",
            as: "friendDetails",
          },
        },
        { $unwind: "$friendDetails" },
        {
          $match: {
            $or: [
              { "friendDetails.firstName": regex },
              { "friendDetails.lastName": regex },
              { "friendDetails.homeTown": regex },
            ],
          },
        },
        {
          $project: {
            user: 1,
            friend: 1,
            status: 1,
            "friendDetails.firstName": 1,
            "friendDetails.lastName": 1,
            "friendDetails.avatar": 1,
          },
        },
      ]);

      const paginatedResults = await FriendShip.aggregatePaginate(
        aggregateQuery,
        options
      );

      return { code: 200, metadata: paginatedResults };
    } catch (error) {
      return { code: 500, message: error.message };
    }
  }

  async getListFriend(client_id, page) {
    try {
      const query = { user: client_id, status: "accepted" };
      const data = await getList({
        page,
        query,
        populate: {
          path: "friend",
          select: "firstName lastName avatar",
        },
      });

      return { code: 200, metadata: data };
    } catch (error) {
      return { code: 500, message: error.message };
    }
  }
}

module.exports = new FriendShipService();

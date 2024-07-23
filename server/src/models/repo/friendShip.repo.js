const FriendShip = require("../friendship.model");

const areFriends = async (userId, friendId) => {
  const friendship = await FriendShip.findOne({
    $or: [
      { user: userId, friend: friendId, status: "accepted" },
      { user: friendId, friend: userId, status: "accepted" },
    ],
  });

  return !!friendship;
};

const addFriends = async (userId, friendId) => {
  return await FriendShip.create({ user: userId, friend: friendId });
};

const getList = async ({query, populate, page = 1}) => {
  const options = {
    page,
    populate,
    limit:15,
    sort: { createdAt: -1 },
  };

  const result = await FriendShip.paginate(query, options)

  return {
    data: result.docs,
    totalDocs: result.totalDocs,
    totalPages: result.totalPages,
    page: result.page,
    limit: result.limit,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevPage: result.prevPage,
    nextPage: result.nextPage
  };
};

module.exports = { areFriends, addFriends, getList };

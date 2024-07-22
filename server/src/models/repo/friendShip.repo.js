const FriendShip = require("../friendship.model")

const areFriends = async (userId, friendId) => {
  const friendship = await FriendShip.findOne({
    $or: [
      { user: userId, friend: friendId, status: 'accepted' },
      { user: friendId, friend: userId, status: 'accepted' }
    ]
  });

  return !!friendship;
};

const addFriends = async (userId, friendId) => {
  return await FriendShip.create({user:userId, friend:friendId})
};

module.exports = { areFriends, addFriends }
const { areFriends, addFriends } = require("../models/repo/friendShip.repo")
const FriendShip = require("../models/friendship.model")
const mongoose = require("mongoose")

class FriendShipService{
    async request(client_id, friend_id){
        try {
            //Kiểm tra xem đã là bạn bè chưa
            const result = await areFriends(client_id, friend_id)
            if(result) return {code:401, message:"Friendship already exists"}

            const friendship = await FriendShip.findOne({
                $or:[
                    {user:client_id, friend:friend_id, status:"pending"},
                    {user:friend_id, friend:client_id, status:"pending"},
                ]
            })
            if(friendship) return {code:401, message:"Friendship already exists"}

            if(client_id.toString() === friend_id) return {code:401, message:"Friendship already exists"}

            //gửi lời mời kết bạn
            await addFriends(client_id, friend_id)
            return {code:201, metadata:"Friend request sent successfully"} 

        } catch (error) {
            return error.message
        }
    }

    async cancelRequest(client_id, friend_id){
        try {
            const friendship = await FriendShip.findOneAndDelete({
                $or:[
                    {user:client_id, friend:friend_id, status:"pending"},
                    {user:friend_id, friend:client_id, status:"pending"}
                ]
            })

            if(!friendship) return {code:401, message:"cancel request failed"}

            return { code:200, metadata:"cancel request successfully" }

        } catch (error) {
            return error.message
        }
    }

    async accepted(client_id, friend_id){
        try {
            const friendship = await FriendShip.findOneAndUpdate(
                {user:friend_id, friend:client_id, status:"pending"},
                {status:"accepted"},
                {new:true}
            )

            if(!friendship) return {code:401, message:"Friend request not found"}

            await FriendShip.create({ user: client_id, friend: friend_id, status: 'accepted' });
            return {code:200, metadata:"Friend request accepted"}
        } catch (error) {
            return error.message
        }
    }

    async cancel(client_id, friend_id){
        try {
            const friendship1 = await FriendShip.findOneAndDelete({user:client_id, friend:friend_id, status:"accepted"})
            const friendship2 = await FriendShip.findOneAndDelete({user:friend_id, friend:client_id, status:"accepted"})

            if(!friendship1 && !friendship2) return {code:401, message:"unfriend failed"}
            return {code:200, metadata:"unfriend successfully"}
              
        } catch (error) {
            return error.message
        }
    }

    async getMutualFriendsCount(client_id, user_id){
        try {
            const friendOfClient = await FriendShip.find({ user: client_id, status: 'accepted' }).select('friend').lean();
            const clientFriendsIds = friendOfClient.map(friendship => friendship.friend.toString());

            const count = await FriendShip.countDocuments({
                user: user_id,
                friend: { $in: clientFriendsIds },
                status: 'accepted'
              }).exec();

            return {code:200, metadata: count}
        } catch (error) {
            return {code:500, message:error.message}
        }
    }

    async searchFriend(client_id){
        try {
           
        } catch (error) {
            return {code:500, message:error.message}
        }
    }

    async getListFriend(client_id, page){
        
        try {
            return 123
        } catch (error) {
            return {code:500, message:error.message}
        }
    }

    
}

module.exports = new FriendShipService()
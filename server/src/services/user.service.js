const lodash = require("lodash")

const User = require("../models/user.model")

const { findUserById, getListUserByQuery } = require("../models/repo/user.repo");
const { areFriends } = require("../models/repo/friendShip.repo")

class UserService {
  async getDetailUser(client_id, user_id) {
    try {
      const foundUser = await findUserById(user_id);
      if (!foundUser) return { code: 404, message: "Account does not exist" };

      const { password, ...passFeild } = foundUser;

      // Trường hợp là chính bạn => return all feild
      if(client_id.toString() === user_id) return { code:200, metadata:passFeild }

      //Trường hợp là bạn bè => return feild public, friends 
      if(await areFriends(client_id, user_id)){
        const data = lodash.omitBy(passFeild, (value, key) => {
          return lodash.get(passFeild, `privacy.${key}`) === "private"
        })

        return {code:200, metadata:data}
      }

      //Trường hợp không phải bạn bè => return feild public
      const data = lodash.omitBy(passFeild, (value, key) => {
        const privacyValue = lodash.get(passFeild, `privacy.${key}`);
        return privacyValue === 'private' || privacyValue === 'friends'
      })
      return {code:200, metadata:data}

    } catch (error) {
      return error.message;
    }
  }

  async updateUser(body, key){
    try {
      const user = await findUserById(key.keyUserId)
      if(!user) return {code:401, message:"Account does not exist"}

      const userAfterUpdate = await User.findByIdAndUpdate(key.keyUserId, {
        $set:{
            ...body
        }
      }, {new:true})
      return {code:200, metadata:userAfterUpdate}
    } catch (error) {
      return error.message
    }
  }

  async searchUser(query){
    try {
      const regex = new RegExp(query, 'i'); 
      const _query = {
        $or: [
          { firstName: regex },
          { lastName: regex },
          { homeTown: regex }
        ]
      };
      const data = await getListUserByQuery(_query, ["firstName", "lastName", "avatar"])
      return { code:200, metadata:data }
    } catch (error) {
      return error.message
    }
  }


}

module.exports = new UserService();

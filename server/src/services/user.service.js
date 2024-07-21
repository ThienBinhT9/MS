const { findUserById } = require("../models/repo/user.repo");
const lodash = require("lodash")

class UserService {
  async getDetailUser(client_id, user_id) {
    try {
      const foundUser = await findUserById(user_id);
      if (!foundUser) return { code: 404, message: "Account does not exist" };

      const { password, ...passFeild } = foundUser;

      // Trường hợp là chính bạn => return all feild
      if(client_id.toString() === user_id) return { code:200, metadata:passFeild }

      //Trường hợp là bạn bè => return feild public, friends 
      if(passFeild.friends.includes(client_id)){
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

  async updateUser(body){
    try {
      
    } catch (error) {
      return error.message
    }
  }
}

module.exports = new UserService();

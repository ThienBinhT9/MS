const User = require("../user.model");

const findUserById = async (id) => {
  return await User.findById(id).lean();
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email }).lean();
};

const findUserByPhone = async (phone) => {
  return await User.findOne({ phone }).lean();
};

const deleteUserById = async (id) => {
  return await User.deleteOne({ _id: id }).lean();
};

module.exports = {
  findUserByEmail,
  findUserByPhone,
  deleteUserById,
  findUserById,
};

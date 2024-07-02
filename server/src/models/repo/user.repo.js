const User = require("../user.model");

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserByPhone = async (phone) => {
  return await User.findOne({ phone });
};

const deleteUserById = async (id) => {
  return await User.deleteOne({ _id: id });
};

module.exports = { findUserByEmail, findUserByPhone, deleteUserById };

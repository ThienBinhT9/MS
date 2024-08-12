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

const getListUserByQuery = async({query, select, page = 1}) => {

  const options = {
    page,
    select,
    limit:15,
    sort:{ createdAt: -1 }
  }
  
  const result = await User.paginate(query, options)

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
  
}

module.exports = {
  findUserByEmail,
  findUserByPhone,
  deleteUserById,
  findUserById,
  getListUserByQuery
};

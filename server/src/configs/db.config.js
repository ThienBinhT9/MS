const mongoose = require("mongoose");

const connect = async () => {
  try {
    return await mongoose.connect(`mongodb://127.0.0.1/MS`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connect };

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const keySchema = new Schema(
  {
    keyUserId: { type: Schema.Types.ObjectId, require: true, ref: "user" },
    publicKey: { type: String, require: true },
    privateKey: { type: String, requrie: true },
    refreshToken: { type: String, require: true },
    refreshTokenUsed: { type: Array, default: [] },
  },
  {
    timestamps: true,
    collection: "key",
  }
);

module.exports = mongoose.model("key", keySchema);

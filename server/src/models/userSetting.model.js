const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSetting = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "user" },
    language: { type: String, enum: ["vi", "en"], default: "vi" },
    mode: { type: String, enum: ["light", "dark"], default: "light" },
    friend_mode: {
      type: String,
      default: "public",
      enum: ["public", "friend", "private"],
    },
  },
  { timestamps: true, collection: "userSetting" }
);

module.exports = mongoose.model("userSetting", UserSetting);

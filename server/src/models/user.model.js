const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    password: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String },
    bio: { type: String },
    username: {
      type: new Schema({ lastName: String, firstName: String }, { _id: false }),
    },
    profilePicture: {
      type: new Schema({ avatar: String, background: String }, { _id: false }),
      default: {
        avatar:
          "https://i.pinimg.com/564x/fa/bc/c4/fabcc4fb39e3002fb5c812cef98e59ae.jpg",
        background: "",
      },
    },
    address: {
      type: new Schema(
        { homeTown: String, currentResidence: String },
        { _id: false }
      ),
    },
    friends: {
      type: [{ type: Schema.Types.ObjectId, ref: "user" }],
      default: [],
    },
    posts: {
      type: [{ type: Schema.Types.ObjectId, ref: "post" }],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "user",
  }
);

module.exports = mongoose.model("user", userSchema);

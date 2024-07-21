const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    password: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, default: "" },
    bio: { type: String, default: "" },
    gender: { type: String, default: "" },
    username: {
      type: new Schema({ lastName: String, firstName: String }, { _id: false }),
      default: { lastName: "", firstName: "" },
    },
    profilePicture: {
      type: new Schema({ avatar: String, background: String }, { _id: false }),
      default: { avatar:"https://i.pinimg.com/564x/fa/bc/c4/fabcc4fb39e3002fb5c812cef98e59ae.jpg", background: "" }
    },
    address: {
      type: new Schema({ homeTown: String, currentResidence: String }, { _id: false }),
      default: { homeTown: "", currentResidence: "" },
    },
    friends: {
      type: [{ type: Schema.Types.ObjectId, ref: "user" }],
      default: [],
    },
    posts: {
      type: [{ type: Schema.Types.ObjectId, ref: "post" }],
      default: [],
    },
    education: {
      type: new Schema({ university: String, highSchool: String }, { _id: false }),
      default: { university: "", highSchool: "" }
    },
    relationship: { type: String, default: "" },
    link: { type: String, default: "" },
    currentJob: { type: String, default: "" },
  },
  {
    timestamps: true,
    collection: "user",
  }
);

module.exports = mongoose.model("user", userSchema);

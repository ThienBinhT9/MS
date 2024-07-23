const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const privacySchema = new Schema({
  bio: { type: String, enum: ['public', 'friends', 'private'], default: 'friends' },
  gender: { type: String, enum: ['public', 'friends', 'private'], default: 'private' },
  phone: { type: String, enum: ['public', 'friends', 'private'], default: 'public' },
  homeTown: { type: String, enum: ['public', 'friends', 'private'], default: 'friends' },
  currentResidence: { type: String, enum: ['public', 'friends', 'private'], default: 'public' },
  university: { type: String, enum: ['public', 'friends', 'private'], default: 'public' },
  highSchool: { type: String, enum: ['public', 'friends', 'private'], default: 'public' },
  relationship: { type: String, enum: ['public', 'friends', 'private'], default: 'public' },
  currentJob: { type: String, enum: ['public', 'friends', 'private'], default: 'private' },
},{_id:false});

const userSchema = new Schema(
  {
    password: { type: String, require: true },
    email: { type: String, require: true },
    gender: { type: String, default: "" },
    phone: { type: String, default: "" },
    bio: { type: String, default: "" },
    lastName: { type: String, default: "" },
    firstName: { type: String, default: "" },
    homeTown: { type: String, default: "" },
    currentResidence: { type: String, default: "" },
    background: { type: String, default: "" },
    university: { type: String, default: "" },
    highSchool: { type: String, default: "" },
    relationship: { type: String, default: "" },
    currentJob: { type: String, default: "" },
    link: { type: String, default: "" },
    posts: {
      type: [{ type: Schema.Types.ObjectId, ref: "post" }],
      default: [],
    },
    avatar: {
      type: String,
      default:
        "https://i.pinimg.com/564x/fa/bc/c4/fabcc4fb39e3002fb5c812cef98e59ae.jpg",
    },
    privacy: { type: privacySchema, default: {}},
  },
  {
    timestamps: true,
    collection: "user",
  }
);

userSchema.index({firstName:"text", lastName:"text", homeTown:"text"})
userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("user", userSchema);

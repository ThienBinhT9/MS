const mongoose = require("mongoose")
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2');

const friendShipSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    friend: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted'], default: 'pending' },
},{
    timestamps:true,
    collection:"FriendShip"
})

friendShipSchema.index({ user: 1, status: 1 });
friendShipSchema.index({ friend: 1, status: 1 });
friendShipSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("FriendShip", friendShipSchema);
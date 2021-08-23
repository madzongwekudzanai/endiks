const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "product",
        },
        seller: {
          type: Schema.Types.ObjectId,
          ref: "seller",
        },
        quantity: { type: Number },
      },
    ],
  },
  wishlist: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "product",
        },
      },
    ],
  },
});

module.exports = User = mongoose.model("user", UserSchema);

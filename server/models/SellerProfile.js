const mongoose = require("mongoose");

const sellerProfileSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seller",
  },
  storeName: {
    type: String,
    required: true,
  },
  storeAddress: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  storeImage: {
    type: String,
    required: true,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      stars: {
        type: Number,
      },
      text: {
        type: String,
      },
    },
  ],
  aliPayID: {
    type: String,
    required: true,
  },
  weChatID: {
    type: String,
    required: true,
  },
});

module.exports = SellerProfile = mongoose.model(
  "sellerProfile",
  sellerProfileSchema
);

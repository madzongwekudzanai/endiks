const mongoose = require("mongoose");

const freightProfileSchema = new mongoose.Schema({
  freight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "freight",
  },
  freightName: {
    type: String,
    required: true,
    unique: true,
  },
  freightAddress: {
    type: String,
    required: true,
  },
  freightImage: {
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

module.exports = FreightProfile = mongoose.model(
  "freightprofile",
  freightProfileSchema
);

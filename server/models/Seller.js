const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tradeName: {
    type: String,
    required: true,
  },
  locale: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  currencyCode: {
    type: String,
    required: true,
  },
  shipping: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Seller = mongoose.model("seller", sellerSchema);

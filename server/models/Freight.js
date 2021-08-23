const mongoose = require("mongoose");

const FreightSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: true,
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
  verified: {
    type: Boolean,
    default: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Freight = mongoose.model("freight", FreightSchema);

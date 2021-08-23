const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
  tradeName: {
    type: String,
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
  avatar: {
    type: String,
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
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Invite = mongoose.model("invite", inviteSchema);

const mongoose = require("mongoose");

const bankDepositSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  receivedPayment: {
    type: Boolean,
    default: false,
  },
  amount: {
    type: Number,
    required: true,
  },
  totalOrderPrice: {
    type: Number,
  },
  used: {
    type: Boolean,
    default: false,
  },
});

module.exports = Invite = mongoose.model("bankdeposit", bankDepositSchema);

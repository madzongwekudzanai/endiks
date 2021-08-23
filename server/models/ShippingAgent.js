const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShippingSchema = new Schema({}, { strict: false });

module.exports = ShippingAgent = mongoose.model(
  "shippingagent",
  ShippingSchema
);

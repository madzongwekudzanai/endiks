const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConditionSchema = new Schema({
  en: {
    type: String,
    required: true,
  },
  zh: {
    type: String,
    required: true,
  },
});

module.exports = Destination = mongoose.model("condition", ConditionSchema);

const mongoose = require("mongoose");

const keywordSchema = new mongoose.Schema({
  en: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  category: {
    en: {
      type: String,
    },
    zh: {
      type: String,
    },
  },
});

module.exports = Keyword = mongoose.model("keyword", keywordSchema);

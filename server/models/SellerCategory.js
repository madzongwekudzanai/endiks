const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SellerCategorySchema = new Schema(
  {
    category: {
      en: {
        type: String,
      },
      zh: {
        type: String,
      },
    },
  },
  { strict: false }
);

module.exports = Category = mongoose.model(
  "sellercategory",
  SellerCategorySchema
);

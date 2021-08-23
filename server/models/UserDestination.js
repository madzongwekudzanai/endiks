const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserDestinationSchema = new Schema(
  {
    country: {
      en: {
        type: String,
      },
      zh: {
        type: String,
      },
    },
    hasState: {
      type: Boolean,
      default: false,
    },
  },
  { strict: false }
);

module.exports = UserDestination = mongoose.model(
  "userdestination",
  UserDestinationSchema
);

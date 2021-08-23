const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FreightDestinationSchema = new Schema(
  {
    country: {
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

module.exports = FreightDestination = mongoose.model(
  "freightdestination",
  FreightDestinationSchema
);

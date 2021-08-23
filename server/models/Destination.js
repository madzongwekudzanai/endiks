const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DestinationSchema = new Schema({
  freight: {
    type: Schema.Types.ObjectId,
    ref: "freight",
  },
  freightName: {
    type: String,
    required: true,
  },
  country: {
    en: {
      type: String,
      required: true,
    },
    zh: {
      type: String,
      required: true,
    },
  },
  freightType: {
    en: {
      type: String,
      required: true,
    },
    zh: {
      type: String,
      required: true,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  deliveryDays: {
    type: Number,
    required: true,
  },
  destinationAddress: {
    type: String,
    required: true,
  },
  originAddress: {
    type: String,
    required: true,
  },
  city: {
    en: {
      type: String,
    },
    zh: {
      type: String,
    },
  },
  stateObject: {
    state: {
      en: {
        type: String,
      },
      zh: {
        type: String,
      },
    },
    city: {
      en: {
        type: String,
      },
      zh: {
        type: String,
      },
    },
  },
  date: {
    type: Date,
    default: Date.now(),
  },
}, { strict: false });

module.exports = Destination = mongoose.model("destination", DestinationSchema);

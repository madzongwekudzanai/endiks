const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new mongoose.Schema({
  buyer: {
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    received: {
      type: Boolean,
      default: false,
    },
    readyForCollection: {
      type: Boolean,
      default: false,
    },
    dateOrdered: {
      type: Date,
      default: Date.now(),
    },
    dateReadyForCollection: {
      type: Date,
    },
    dateReceived: {
      type: Date,
    },
  },
  seller: {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "seller",
    },
    trackingCode: {
      type: String,
    },
    sellerAliPayId: {
      type: String,
    },
    sellerWeChatId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    shipmentAddress: {
      type: String,
      required: true,
    },
    sellerPaid: {
      type: Boolean,
      default: false,
    },
    sent: {
      type: Boolean,
      default: false,
    },
    locale: {
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
    totalPrice: {
      type: Number,
      required: true,
    },
    estimateWeight: {
      type: Number,
      required: true,
    },
    dateSent: {
      type: Date,
    },
    datePaid: {
      type: Date,
    },
  },
  freight: {
    freightId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    trackingCode: {
      type: String,
    },
    freightAliPayId: {
      type: String,
    },
    freightWeChatId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
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
    destinationAddress: {
      type: String,
      required: true,
    },
    freightSent: {
      type: Boolean,
      default: false,
    },
    freightReceived: {
      type: Boolean,
      default: false,
    },
    freightPaid: {
      type: Boolean,
      default: false,
    },
    locale: {
      type: String,
      required: true,
    },
    currencyCode: {
      type: String,
      required: true,
    },
    shipping: {
      type: Number,
    },
    actualWeight: {
      type: Number,
    },
    dateReceived: {
      type: Date,
    },
    dateSent: {
      type: Date,
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
    }
  },
  currentLocation: {
    type: String,
  },
  products: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: { type: Number },
      },
    ],
  },
});

module.exports = Order = mongoose.model("order", OrderSchema);

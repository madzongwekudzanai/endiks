const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: "seller",
  },
  name: {
    type: String,
    required: true,
  },
  condition: {
    en: {
      type: String,
    },
    zh: {
      type: String,
    },
  },
  shipping: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  firstOptionProductRef: {
    type: String,
  },
  secondOptionProductRef: {
    type: String,
  },
  thirdOptionProductRef: {
    type: String,
  },
  fourthOptionProductRef: {
    type: String,
  },
  keywords: {
    seller: {
      type: String,
    },
    en: {
      type: String,
    },
  },
  titles: {
    seller: {
      type: String,
      required: true,
    },
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
  brand: {
    type: String,
  },
  weight: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
  },
  grade: {
    type: String,
  },
  color: {
    type: String,
  },
  review: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      stars: {
        type: Number,
      },
      text: {
        type: String,
      },
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number,
    default: null,
  },
  priceChange: {
    type: Number,
    default: null,
  },
  scaledPriceChange: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  optionsLevel: {
    type: Number,
    default: 0,
    required: true,
  },
  firstOptions: {
    attribute: {
      en: {
      type: String,
    },
    seller: {
      type: String,
    },
    },
    options: [{
      productRef: {
        type: String,
        default: null,
        required: true,
      },
      en: {
        type: String,
        required: true
      },
      seller: {
        type: String,
        required: true
      }
      }]
  },
  secondOptions: {
    attribute: {
      en: {
      type: String,
    },
    seller: {
      type: String,
    },
    },
    options: [{
      productRef: {
        type: String,
        default: null,
        required: true,
      },
      en: {
        type: String,
        required: true
      },
      seller: {
        type: String,
        required: true,
      },
      }]
  },
  thirdOptions: {
    attribute: {
      en: {
      type: String,
    },
    seller: {
      type: String,
    },
    },
    options: [{
      productRef: {
        type: String,
        default: null,
        required: true,
      },
      en: {
        type: String,
        required: true
      },
      seller: {
        type: String,
        required: true,
      }
      }]
  },
  fourthOptions: {
    attribute: {
      en: {
      type: String,
    },
    seller: {
      type: String,
    },
    },
    options: [{
      productRef: {
        type: String,
        default: null,
        required: true,
      },
      en: {
        type: String,
        required: true
      },
      seller: {
        type: String,
        required: true,
      }
      }]
  },
  descriptions: {
    seller: {
      type: String,
      required: true,
    },
  },
  category: {
    categoryTitle: {
      en: {
        type: String,
      },
      zh: {
        type: String,
      },
    },
    subCategory: {
      subCategoryTitle: {
        en: {
          type: String,
        },
        zh: {
          type: String,
        },
      },
      groupTitle: {
        en: {
          type: String,
        },
        zh: {
          type: String,
        },
      },
    },
  },
  slides: [String],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("product", productSchema);

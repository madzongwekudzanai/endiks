const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FreightTypeSchema = new Schema({
    en: {
        type: String,
        required: true,
    },
    zh: {
        type: String,
        required: true,
    },
});

module.exports = FreightType = mongoose.model("freighttype", FreightTypeSchema);

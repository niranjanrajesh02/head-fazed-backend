const mongoose = require('mongoose');

const sellerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  date: {
    type: Date,
    default: Date.now()
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
})

module.exports = mongoose.model('Seller', sellerSchema);

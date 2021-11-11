const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  short_description: {
    type: String,
    required: true
  },
  long_description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 99999
  },
  images: [String],
  date: {
    type: Date,
    default: Date.now()
  },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
  ratings: [Number],
  avg_rating: {
    type: Number,
    min: 0,
    max: 5
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  wishlisted: [String],
  categories: {
    type: [String],
    enum: ["audio-technica", "jbl", "razer", "skullcandy", "sony", "casual", "studio", "audiophile", "gaming", "wired", "wireless", "over-ear", "in-ear", "cables", "cases", "amps", "speakers"]
  }
})

module.exports = mongoose.model('Product', productSchema);
// https://stackoverflow.com/questions/19145039/associative-array-with-mongoose-schema
// https://mongoosejs.com/docs/populate.html
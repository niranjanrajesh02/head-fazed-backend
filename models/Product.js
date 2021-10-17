const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  description: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 9999
  },
  images: [String],
  date: {
    type: Date,
    default: Date.now()
  }
  // seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' }
})

module.exports = mongoose.model('Product', productSchema);
// https://stackoverflow.com/questions/19145039/associative-array-with-mongoose-schema
// https://mongoosejs.com/docs/populate.html
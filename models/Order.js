const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{
    productId: String,
    quantity: Number,
    name: String,
    price: Number,
    image: String
  }],
  date: {
    type: Date,
    default: Date.now()
  },
  total_val: Number
})

module.exports = mongoose.model('Order', OrderSchema);
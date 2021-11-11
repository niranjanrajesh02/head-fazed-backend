const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  user_id: String,
  products: [{
    productId: String,
    quantity: Number,
    name: String,
    price: Number,
    image: String
  }],
  total_val: Number
})

module.exports = mongoose.model('Cart', CartSchema);
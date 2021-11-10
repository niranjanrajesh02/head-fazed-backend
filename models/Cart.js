const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  total_val: Number
})

module.exports = mongoose.model('Cart', CartSchema);
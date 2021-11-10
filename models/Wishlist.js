const mongoose = require('mongoose');

const WishlistSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
})

module.exports = mongoose.model('Wishlist', WishlistSchema);
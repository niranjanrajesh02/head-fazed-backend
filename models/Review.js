const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userName: String,
  date: {
    type: Date,
    default: Date.now()
  },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  reviewTitle: {
    type: String,
    required: true
  },
  reviewText: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  }
})

module.exports = mongoose.model('Review', reviewSchema);

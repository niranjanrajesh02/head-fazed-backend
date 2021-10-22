const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  user_name: String,
  date: {
    type: Date,
    default: Date.now()
  },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  reviewTitle: {
    type: String,
    min: 3,
    max: 60,
    required: true
  },
  reviewText: {
    type: String,
    min: 3,
    max: 2048
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  }
})

module.exports = mongoose.model('Review', reviewSchema);

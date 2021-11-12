const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Review = require('../models/Review')
const Order = require('../models/Order')

const mongoose = require('mongoose');

// const verify = require('./privateRoutes')
// middleware that is specific to this router

// GET ALL reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('userId')
    res.json(reviews)
  } catch (err) {
    res.json({ message: err })
  }
})
const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
//SUBMIT A REVIEW
router.post('/', async (req, res) => {
  // console.log(req.body);
  const { reviewTitle, productId, reviewText, rating, userId, userName } = req.body;
  try {
    const matchedOrders = await Order.find({ user: userId })
    let verified = false;
    if (matchedOrders) {
      matchedOrders.forEach((order) => (
        order.products.forEach((product) => {
          if (product.productId === productId) {
            verified = true
          }
        })
      ))
    }
    const reviewToCreate = new Review({
      _id: new mongoose.Types.ObjectId,
      reviewTitle,
      reviewText,
      userId,
      userName,
      productId,
      rating,
      verified
    })
    const savedReview = await reviewToCreate.save()
    const reviewewdProduct = await Product.findByIdAndUpdate(productId, { $push: { ratings: rating, reviews: reviewToCreate._id } }, { new: true });
    let averageRating = 0;
    if (reviewewdProduct.ratings.length > 0) {
      averageRating = average(reviewewdProduct.ratings).toFixed(2);
      const updatedProduct = await Product.findByIdAndUpdate(productId, { avg_rating: averageRating }, { new: true });
    }
    res.json(savedReview);
  } catch (err) {
    res.json({ message: err })
  }
})

router.post('/testVerified', async (req, res) => {
  const { reviewTitle, productId, reviewText, rating, userId, userName } = req.body;
  const matchedOrders = await Order.find({ user: userId })
  let verified = false;
  if (matchedOrders) {
    matchedOrders.forEach((order) => (
      order.products.forEach((product) => {
        if (product.productId === productId) {
          verified = true
        }
      })
    ))
  }
  res.json({ matchedOrders, verified })
})



module.exports = router
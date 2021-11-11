const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Review = require('../models/Review')
const User = require('../models/User')
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
    const reviewToCreate = new Review({
      _id: new mongoose.Types.ObjectId,
      reviewTitle,
      reviewText,
      userId,
      userName,
      productId,
      rating
    })
    const savedReview = await reviewToCreate.save()
    const reviewewdProduct = await Product.findByIdAndUpdate(productId, { $push: { ratings: rating, reviews: reviewToCreate._id } }, { new: true });
    let averageRating = 0;
    if (reviewewdProduct.ratings.length > 0) {
      averageRating = average(reviewewdProduct.ratings).toFixed(2);
      const updatedProduct = await Product.findByIdAndUpdate(productId, { avg_rating: averageRating }, { new: true });
      console.log(updatedProduct);
    }
    res.json(savedReview);
  } catch (err) {
    res.json({ message: err })
  }
})

router.get('/testRatings', async (req, res) => {
  try {
    const ourProduct = await Product.findById("618c46627d71813b2103579d");
    let averageRating = 0;
    if (ourProduct.ratings.length > 0) {
      averageRating = average(ourProduct.ratings).toFixed(2);
      const updatedProduct = await Product.findByIdAndUpdate("618c46627d71813b2103579d", { avg_rating: averageRating }, { new: true });
      console.log(updatedProduct);
    }
    console.log(averageRating);
    res.json("TEST")
  } catch (err) {
    res.json({ message: err })
  }
})



module.exports = router
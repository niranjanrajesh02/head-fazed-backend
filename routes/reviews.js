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
    console.log(reviewToCreate);
    const savedReview = await reviewToCreate.save()
    await Product.findByIdAndUpdate(productId, { $push: { ratings: rating, reviews: reviewToCreate._id } })
    res.json(savedReview);

  } catch (err) {
    res.json({ message: err })
  }
})




module.exports = router
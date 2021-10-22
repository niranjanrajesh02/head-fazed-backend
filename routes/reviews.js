const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Review = require('../models/Review')
const mongoose = require('mongoose');

// const verify = require('./privateRoutes')
// middleware that is specific to this router

// GET ALL reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
    res.json(reviews)
  } catch (err) {
    res.json({ message: err })
  }
})


//SUBMIT A REVIEW
router.post('/', async (req, res) => {
  // console.log(req.body);
  const { userName, reviewTitle, productId, reviewText, rating } = req.body;
  const reviewToCreate = new Review({
    _id: new mongoose.Types.ObjectId,
    reviewTitle,
    reviewText,
    userName,
    productId,
    rating
  })
  try {
    const savedReview = await reviewToCreate.save()
    await Product.findByIdAndUpdate(productId, { $push: { ratings: rating, reviews: reviewToCreate._id } })
    res.json(savedReview);
  } catch (err) {
    res.json({ message: err })
  }
})




module.exports = router
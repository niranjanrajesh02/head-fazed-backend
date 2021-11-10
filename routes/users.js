const express = require('express')
const router = express.Router()
const User = require('../models/User')
const mongoose = require('mongoose');
const Product = require('../models/Product');

// GET ALL USERS with pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const users = await User.find().populate('wishlist').populate('cart')
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await User.countDocuments();
    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    })
  } catch (err) {
    res.json({ message: err })
  }
})

router.post('/', async (req, res) => {
  const { email } = req.body;
  const UserToCreate = new User({
    _id: new mongoose.Types.ObjectId,
    name: email,
    email
  })
  try {
    const savedUser = await UserToCreate.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err })
  }
})

router.get('/find', async (req, res) => {
  const { emailID } = req.query;
  try {
    console.log(emailID);
    const foundUser = await User.findOne({ email: emailID })
    res.json(foundUser ? true : false)
  } catch (err) {
    res.json({ message: err })
  }
})

//route to add product to user's wishlist
router.post('/wishlist', async (req, res) => {
  const { wishlist_id, user_id } = req.body;
  if (!wishlist_id) return (res.json({ message: "wishlist_id needs be an id of the product" }))
  try {
    await User.findByIdAndUpdate(user_id, { $push: { wishlist: wishlist_id } })
    res.json({ message: `Success! ${wishlist_id} added to ${user_id}'s cart'` })
  } catch (err) {
    res.json({ message: err })
  }
})

//route to add product to user's cart
router.post('/cart', async (req, res) => {
  const { cart_id, user_id } = req.body;
  if (!cart_id) return (res.json({ message: "cart_id needs be an id of the product" }))
  try {
    await User.findByIdAndUpdate(user_id, { $push: { cart: cart_id } })
    res.json({ message: `Success! ${cart_id} added to ${user_id}'s cart'` })
  } catch (err) {
    res.json({ message: err })
  }
})


module.exports = router
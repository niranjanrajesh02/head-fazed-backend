const express = require('express')
const router = express.Router()
const User = require('../models/User')
const mongoose = require('mongoose');
const Product = require('../models/Product');

// GET ALL USERS 
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('wishlist').populate('cart')
    res.json(users)
  } catch (err) {
    res.json({ message: err })
  }
})

// GET ONE USER 
router.get('/:emailID', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.emailID }).populate('wishlist').populate('cart')
    res.json(user)
  } catch (err) {
    res.json({ message: err })
  }
})

router.post('/', async (req, res) => {
  const { email, username } = req.body;
  const UserToCreate = new User({
    _id: new mongoose.Types.ObjectId,
    username: username,
    email: email
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
const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')
const User = require('../models/User')
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  const { u_id } = req.body;
  try {
    const foundCart = await Cart.findOne({ user_id: u_id })
    res.json(foundCart)
  } catch (err) {
    res.json({ message: err })
  }
})
router.get('/all', async (req, res) => {
  try {
    const foundCarts = await Cart.find().populate('user')
    res.json(foundCarts)
  } catch (err) {
    res.json({ message: err })
  }
})



router.post('/', async (req, res) => {
  const { u_id } = req.body;
  try {
    const userFound = User.findById(u_id);
    if (userFound) {
      const cartToCreate = new Cart({
        _id: new mongoose.Types.ObjectId,
        user: u_id,
        user_id: u_id,
        products: [],
        total_val: 0
      })
      savedCart = cartToCreate.save()
      await User.findByIdAndUpdate(u_id, { $push: { cart: cartToCreate._id } })
      res.json(cartToCreate)
    }
    else {
      res.json({ message: "User not found" })
    }
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router;
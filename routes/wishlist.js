const express = require('express')
const router = express.Router()
const Wishlist = require('../models/Wishlist')
const User = require('../models/User')
const mongoose = require('mongoose');
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const { u_id } = req.body;
  try {
    const foundWishlist = await Wishlist.findOne({ user_id: u_id })
    res.json(foundWishlist)
  } catch (err) {
    res.json({ message: err })
  }
})
router.get('/all', async (req, res) => {
  try {
    const foundWishlists = await Wishlist.find().populate('user')
    res.json(foundWishlists)
  } catch (err) {
    res.json({ message: err })
  }
})



router.post('/', async (req, res) => {
  const { u_id } = req.body;
  try {
    const userFound = User.findById(u_id);
    if (userFound) {
      const wishlistToCreate = new Wishlist({
        _id: new mongoose.Types.ObjectId,
        user: u_id,
        user_id: u_id,
        products: []
      })
      savedWishlist = wishlistToCreate.save()
      await User.findByIdAndUpdate(u_id, { $push: { wishlist: wishlistToCreate._id } })
      res.json(wishlistToCreate)
    }
    else {
      res.json({ message: "User not found" })
    }
  } catch (err) {
    res.json({ message: err })
  }
})


router.patch('/', async (req, res) => {
  const { wishlist_id, product_id } = req.body;
  try {
    const wishlistUpdated = await Wishlist.findByIdAndUpdate(
      wishlist_id,
      { $push: { products: product_id } },
      { new: true }
    )
    const productUpdated = await Product.findByIdAndUpdate(
      product_id,
      { $push: { wishlisted: wishlist_id } },
      { new: true }
    )
    res.json({ wishlistUpdated, productUpdated })
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router;
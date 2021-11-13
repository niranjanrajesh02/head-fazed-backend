const express = require('express')
const router = express.Router()
const Wishlist = require('../models/Wishlist')
const User = require('../models/User')
const mongoose = require('mongoose');
const Product = require('../models/Product');

router.get('/:u_id', async (req, res) => {
  try {
    const foundWishlist = await Wishlist.findOne({ user_id: req.params.u_id }).populate('products')
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
  const { user_id } = req.body;
  try {
    const userFound = await User.findById(user_id);
    console.log(userFound);
    if (userFound) {
      const wishlistToCreate = new Wishlist({
        _id: new mongoose.Types.ObjectId,
        user_id: user_id,
        products: []
      })
      console.log(wishlistToCreate);
      savedWishlist = await wishlistToCreate.save()
      await User.findByIdAndUpdate(user_id, { wishlist: wishlistToCreate._id })
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
  const { user_id, product_id } = req.body;
  try {
    let wishlistFound = await Wishlist.findOne({ user_id: user_id });
    wishlistFound.products.push(product_id);
    let updatedWishlist = await Wishlist.findOneAndUpdate(
      { user_id: user_id },
      { $push: { products: product_id } },
      { new: true }
    );
    let productFound = await Product.findById(product_id);
    if (productFound.wishlisted) {
      productFound.wishlisted.push(user_id);
    }
    else {
      productFound.wishlisted = [user_id];
    }
    let updatedProduct = await productFound.save()
    res.json({ updatedWishlist, updatedProduct })
  } catch (err) {
    res.json({ message: err })
  }
})

router.patch('/remove', async (req, res) => {
  const { user_id, product_id } = req.body;
  try {
    let wishlistFound = await Wishlist.findOne({ user_id: user_id });
    let itemIndex = wishlistFound.products.findIndex(p => p == product_id)
    wishlistFound.products.splice(itemIndex, 1)
    let updatedWishlist = wishlistFound.save();
    let productFound = await Product.findById(product_id);
    let userItemIndex = productFound.wishlisted.findIndex(u => u == user_id);
    // console.log(productFound);
    productFound.wishlisted.splice(userItemIndex, 1);
    let updatedProduct = await productFound.save()
    console.log(updatedWishlist, updatedProduct);
    res.json("TEST")
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router;
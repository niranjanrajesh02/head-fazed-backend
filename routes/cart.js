const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')
const User = require('../models/User')
const Product = require('../models/Product')
const mongoose = require('mongoose');

router.get('/:userid', async (req, res) => {
  try {
    const foundCart = await Cart.findOne({ user_id: req.params.userid })
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
    const userFound = await User.findById(u_id);
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

router.patch('/', async (req, res) => {
  const { u_id, product_id, action, quantity } = req.body;
  try {
    const foundProduct = await Product.findById(product_id);
    const foundCart = await Cart.findOne({ user_id: u_id })
    let itemIndex = foundCart.products.findIndex(p => p.productId == product_id);
    // itemIndex = -1 when product does not exist
    if (itemIndex === -1) {
      let productToCreate = {
        productId: product_id,
        quantity: 1,
        name: foundProduct.name,
        price: foundProduct.price,
        image: foundProduct.images[0]
      }
      foundCart.products.push(productToCreate);
      let sum = 0;
      foundCart.products.forEach(p => sum += (p.price * p.quantity))
      foundCart.total_val = sum;
      let updatedCart = await foundCart.save();
      res.json(updatedCart)
    }
    else {
      if (action === "cQuantity") {
        let productItem = foundCart.products[itemIndex];
        productItem.quantity = quantity;
        foundCart.products[itemIndex] = productItem;
        let sum = 0;
        foundCart.products.forEach(p => sum += (p.price * p.quantity))
        foundCart.total_val = sum;
        const updatedCart = await foundCart.save();
        res.json(updatedCart)
      }

      else if (action === "remove") {
        foundCart.products.splice(itemIndex, 1);
        let sum = 0;
        foundCart.products.forEach(p => sum += (p.price * p.quantity))
        foundCart.total_val = sum;
        const updatedCart = await foundCart.save();
        res.json(updatedCart);
      }
    }
    // console.log(foundProduct, foundCart, itemIndex);
    // res.json("TEST")
  } catch (err) {
    res.json({ message: err })
  }
})



module.exports = router;
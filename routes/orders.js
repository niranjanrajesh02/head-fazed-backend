const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Cart = require('../models/Cart')
// const Order = require('../models/Order')
const mongoose = require('mongoose');
const Order = require('../models/Order');

router.post('/checkout', async (req, res) => {
  const { cart_id, user_id } = req.body;
  try {
    const checkedOutCart = await Cart.findById(cart_id);
    if (checkedOutCart) {
      if (checkedOutCart.products.length === 0) {
        res.json({ message: "Cart is empty" })
      }
      else {
        const orderToCreate = new Order({
          _id: new mongoose.Types.ObjectId,
          user: user_id,
          products: checkedOutCart.products,
          total_val: checkedOutCart.total_val
        });
        const savedOrder = await orderToCreate.save();
        checkedOutCart.products = [];
        const updatedCart = await checkedOutCart.save();
        res.json(savedOrder)
      }
    } else {
      res.json({ message: "No cart found" })
    }
  } catch (err) {
    res.json({ message: err })
  }
})

router.get('/:userId', async (req, res) => {
  try {
    const foundOrders = await Order.find({ user: req.params.userId })
    res.json(foundOrders)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
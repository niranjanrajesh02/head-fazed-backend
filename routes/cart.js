const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')
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
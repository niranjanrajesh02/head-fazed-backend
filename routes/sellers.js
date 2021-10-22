const express = require('express')
const router = express.Router()
const Seller = require('../models/Seller')
const mongoose = require('mongoose');

// const verify = require('./privateRoutes')
// middleware that is specific to this router

// define the home page base for given route (GET ALL POSTS)
router.get('/', async (req, res) => {
  try {
    const sellers = await Seller.find().populate('products');
    res.json(sellers)
  } catch (err) {
    res.json({ message: err })
  }
})


//SUBMIT A POST
router.post('/', async (req, res) => {
  // console.log(req.body);
  const { name } = req.body;
  const sellerToCreate = new Seller({
    _id: new mongoose.Types.ObjectId,
    name
  })
  try {
    const savedSeller = await sellerToCreate.save()
    res.json(savedSeller);
  } catch (err) {
    res.json({ message: err })
  }
})


// GET SPECIFIC POST
router.get('/:sellerID', async (req, res) => {
  // console.log(req.params.postID);
  try {
    const foundSeller = await Seller.findById(req.params.sellerID).populate('products')
    res.json(foundSeller)
  } catch (err) {
    res.json({ message: err })
  }
})



module.exports = router
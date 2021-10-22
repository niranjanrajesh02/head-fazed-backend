const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Seller = require('../models/Seller')
const mongoose = require('mongoose');

// const verify = require('./privateRoutes')
// middleware that is specific to this router

// define the home page base for given route (GET ALL POSTS)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('seller');
    res.json(products)
  } catch (err) {
    res.json({ message: err })
  }
})


//SUBMIT A POST
router.post('/', async (req, res) => {
  // console.log(req.body);
  const { name, description, price, images, sellerID } = req.body;
  const productToCreate = new Product({
    _id: new mongoose.Types.ObjectId,
    name,
    description,
    price,
    images,
    seller: sellerID
  })
  try {
    const savedProduct = await productToCreate.save()
    await Seller.findByIdAndUpdate(sellerID, { $push: { products: productToCreate._id } })
    res.json(savedProduct);
  } catch (err) {
    res.json({ message: err })
  }
})


// GET SPECIFIC POST
router.get('/:prodID', async (req, res) => {
  // console.log(req.params.prodID);
  try {
    const foundProduct = await Product.findById(req.params.prodID).populate('seller')
    res.json(foundProduct)
  } catch (err) {
    res.json({ message: err })
  }
})



module.exports = router
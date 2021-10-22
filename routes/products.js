const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Seller = require('../models/Seller')
const mongoose = require('mongoose');

// const verify = require('./privateRoutes')
// middleware that is specific to this router

// GET ALL PRODUCTS with pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const products = await Product.find().populate('seller').populate('reviews')
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await Product.countDocuments();
    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    })
  } catch (err) {
    res.json({ message: err })
  }
})


//SUBMIT A PRODUCT
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


// GET SPECIFIC PRODUCT
router.get('/find/:prodID', async (req, res) => {
  // console.log(req.params.prodID);
  try {
    const foundProduct = await Product.findById(req.params.prodID).populate('seller').populate('reviews')
    res.json(foundProduct)
  } catch (err) {
    res.json({ message: err })
  }
})



module.exports = router
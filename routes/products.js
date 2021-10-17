const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
// const verify = require('./privateRoutes')
// middleware that is specific to this router

// define the home page base for given route (GET ALL POSTS)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products)
  } catch (err) {
    res.json({ message: err })
  }
})


//SUBMIT A POST
router.post('/', async (req, res) => {
  // console.log(req.body);
  const { name, description, price, images } = req.body;
  const productToCreate = new Product({
    name,
    description,
    price,
    images
  })
  try {
    const savedProduct = await productToCreate.save()
    res.json(savedProduct);
  } catch (err) {
    res.json({ message: err })
  }
})


// GET SPECIFIC POST
router.get('/:postID', async (req, res) => {
  // console.log(req.params.postID);
  try {
    const foundProduct = await Product.findById(req.params.postID)
    res.json(foundProduct)
  }
  catch (err) {
    res.json({ message: err })
  }
})



module.exports = router
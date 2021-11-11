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
    const products = await Product.find().populate('seller').populate('reviews')
    res.json(products)
  } catch (err) {
    res.json({ message: err })
  }
})

router.get('/collection/:collectionQuery', async (req, res) => {
  try {
    const collection = await Product.find({ categories: req.params.collectionQuery });
    res.json(collection)
  } catch (err) {
    res.json({ message: err })
  }
})

const handleQuerySort = (query) => {
  try {
    // convert the string to look like json object
    // example "id: -1, name: 1" to "{ "id": -1, "name": 1 }"
    const toJSONString = ("{" + query + "}").replace(/(\w+:)|(\w+ :)/g, (matched => {
      return '"' + matched.substring(0, matched.length - 1) + '":';
    }));

    return JSON.parse(toJSONString);
  } catch (err) {
    return JSON.parse("{}"); // parse empty json if the clients input wrong query format
  }
}

//Sort results
//Route: products/sorted?sort=price:-1
router.get('/sorted', async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const sort = handleQuerySort(req.query.sort)
  try {
    const sortedProducts = await Product.find().sort(sort).populate('seller').populate('reviews')
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await Product.countDocuments();
    res.json({
      sortedProducts,
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
  const { name, short_description, long_description, price, images, sellerID, categories } = req.body;
  const productToCreate = new Product({
    _id: new mongoose.Types.ObjectId,
    name,
    short_description,
    long_description,
    price,
    images,
    seller: sellerID,
    categories
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
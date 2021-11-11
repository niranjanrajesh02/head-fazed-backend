const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Seller = require('../models/Seller')
const mongoose = require('mongoose');


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

// GET ALL PRODUCTS with pagination
router.get('/', async (req, res) => {
  const { sort = null } = req.query;
  try {
    if (!sort) {
      const products = await Product.find()
      res.json(products)
    }
    else {
      const sortObj = handleQuerySort(sort);
      console.log(sortObj);
      const sortedProducts = await Product.find().sort(sortObj)
      res.json(sortedProducts)
    }
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



//Sort results
//Route: products/sorted?sort=price:-1
router.get('/sorted', async (req, res) => {
  const sort = handleQuerySort(req.query.sort)
  try {
    const sortedProducts = await Product.find().sort(sort)
    res.json(sortedProducts)
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
    categories,
    avg_rating: 0
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
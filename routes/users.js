const express = require('express')
const router = express.Router()
const User = require('../models/User')
const mongoose = require('mongoose');

// GET ALL USERS with pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await User.countDocuments();
    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    })
  } catch (err) {
    res.json({ message: err })
  }
})


module.exports = router
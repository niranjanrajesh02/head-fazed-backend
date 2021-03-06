const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')
const app = express();
const { auth, requiresAuth } = require('express-openid-connect');


//*Middlewares
//adds ability to read incoming JSON body objects
app.use(express.json());
//CORS Policy
app.use(cors());


//Import Route MW
const productsRoute = require('./routes/products')
app.use('/products', productsRoute)

const sellersRoute = require('./routes/sellers')
app.use('/sellers', sellersRoute)

const reviewsRoute = require('./routes/reviews')
app.use('/reviews', reviewsRoute)

const usersRoute = require('./routes/users')
app.use('/users', usersRoute)

const cartRoute = require('./routes/cart')
app.use('/cart', cartRoute)

const wishlistRoute = require('./routes/wishlist')
app.use('/wishlist', wishlistRoute)

const ordersRoute = require('./routes/orders')
app.use('/orders', ordersRoute)




//ROUTES


//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log('Connected to the DATABASEE');
})

//Listening to the server
app.listen(4000, () => console.log("Server running!"))
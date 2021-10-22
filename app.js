const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')
const app = express();

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


//Auth Routes
// const authRoute = require('./routes/auth')
// app.use('/auth', authRoute)

//ROUTES
app.get('/', (req, res) => {
  res.send("At home now lolz")
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log('Connected to the DATABASEE');
})

//Listening to the server
app.listen(4000, () => console.log("Server running!"))
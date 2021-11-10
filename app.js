const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')
const app = express();
const { auth, requiresAuth } = require('express-openid-connect');

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
//*Middlewares
//adds ability to read incoming JSON body objects
app.use(express.json());
//CORS Policy
app.use(cors());

app.use(allowCrossDomain);

//Import Route MW
const productsRoute = require('./routes/products')
app.use('/products', productsRoute)

const sellersRoute = require('./routes/sellers')
app.use('/sellers', sellersRoute)

const reviewsRoute = require('./routes/reviews')
app.use('/reviews', reviewsRoute)

const usersRoute = require('./routes/users')
app.use('/users', usersRoute)


//Auth
const config = {
  authRequired: false,
  routes: { login: false },
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

//ROUTES
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log('Connected to the DATABASEE');
})

//Listening to the server
app.listen(4000, () => console.log("Server running!"))
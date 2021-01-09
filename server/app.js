const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');




//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

//Import Routes
const postsRoute = require('./routes/posts');
const restaurantsRoute = require('./routes/restaurants');
const authRoute = require('./routes/auth')
const orderRoute = require('./routes/orders')

//Routes
app.use('/restaurants', restaurantsRoute)
app.use('/posts', postsRoute)
app.use('/user', authRoute)
app.use('/orders', orderRoute)


//Connect To DB
mongoose
    .connect(process.env.DB_CONNECTION,{ useUnifiedTopology: true, useNewUrlParser: true }) 
    .then(() => {
        console.log('connect to DB!')
    })
    .catch( err => {
        console.log(`${err.message}`)
    })

//How to we start lsirening ro rhe server
app.listen(3000)
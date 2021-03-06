const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    country: {
        type: Array,
        require: true
    },
    food: {
        type: Array,
        require: true
    },
    openTime: {
        type: String,
        require: true
    },
    closeTime:{
        type: String,
        require: true
    },
    delivery:{
        type: Boolean,
        require: true
    },
    logo: {
        type: String,
        require: true
    },
    id:{
        type: Number,
        require: true
    }
})


module.exports = mongoose.model('Restaurants', RestaurantSchema)
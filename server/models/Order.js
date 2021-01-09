const mongoose = require('mongoose');


const OrderSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    telefon: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    comment: {
        type: String,
        require: true
    },
    payment: {
        type: String,
        require: true
    },
    cart: {
        type: Array,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    id: {
        type: String,
        require: true
    },
    orderid: {
        type: String,
        require: true
    },
})


module.exports = mongoose.model('Orders', OrderSchema)
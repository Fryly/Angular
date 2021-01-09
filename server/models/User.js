const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        min: 6
    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    name: {
        type: String,
        require: true,
    },
    telefon: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    street: {
        type: String,
        require: true
    },
    house: {
        type: String,
        require: true
    },
    admin: {
        type: Boolean,
        require: true
    }
})


module.exports = mongoose.model('Users', UserSchema)
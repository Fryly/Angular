const mongoose = require('mongoose');

const DishesSchema = mongoose.Schema({
    nameMenu: {
        type: String,
        require: true
    },
    menu: {
        type: Array,
        require: true,
    },
    id: {
        type: Number,
        require: true,
    },
})



module.exports = mongoose.model('Dishes', DishesSchema)
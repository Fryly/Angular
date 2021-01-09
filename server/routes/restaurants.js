const express = require('express');
const Dishes = require('../models/Dishes');
const router = express.Router();
const Restaurant = require('../models/Restaurant')

router.get('/', async (req, res) => {
    try{
        const restaurants = await Restaurant.find();
        res.json(restaurants)
    }catch(err){
        res.json({massage: err})
    }
});

router.get('/:id', async (req, res) => {
    try{
        const dishes = await Dishes.findOne({id: req.params.id});
        res.json(dishes)
    }catch(err){
        res.json({massage: err})
    }
});

module.exports = router
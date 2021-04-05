const express = require('express');
const Dishes = require('../models/Dishes');
const Restaurant = require('../models/Restaurant')
const router = express.Router();
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../just-eat/src/assets/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage, 
});


router.get('/', async (req, res) => {
    try{
        const restaurants = await Restaurant.find();
        res.json(restaurants)
    }catch(err){
        res.json({message: err})
    }
});

router.post('/update',upload.single('file'), async (req, res) => {
    let massKitchen = req.body.kitchen
    const rest = new Restaurant({
        name: req.body.name,
        country: massKitchen.split(','),
        food: req.body.eat,
        openTime: req.body.open,
        closeTime: req.body.close,
        delivery: req.body.delivery,
        id: +req.body.id,
        logo: req.file.filename
    });

    try{
        const saveRest = await rest.save()
        res.json(saveRest);
    } catch(err){
        res.json({massage: err})
    }

});

router.get('/search/:name', async (req, res) => {
    try{
        const search = await Restaurant.findOne({name: req.params.name});
        res.json(search)
    }catch(err){
        res.json({message: err})
    }
});

router.put('/change/:id', async (req, res) => {
    try{
        const updateRestaurant = await Restaurant.updateOne(
            { _id: req.params.id }, 
            {   $set:{
                    name: req.body.name,
                    country: req.body.country,
                    food: req.body.food,
                    openTime: req.body.openTime,
                    closeTime: req.body.closeTime,
                    delivery: req.body.delivery,
                }
            }
        );
        res.json(updateRestaurant)
    }catch(err){
        res.json({ message: err });
    }
})

router.patch('/change/:id',upload.single('file'), async (req, res) => {
    try{
        const updateImg = await Restaurant.updateOne(
            { _id: req.params.id },
            {   
                $set: {logo: req.file.filename}
            }
        );
        res.json(updateImg);
    } catch(err){
        res.json({message: err})
    }
});

router.get('/:id', async (req, res) => {
    try{
        const dishes = await Dishes.findOne({id: req.params.id});
        res.json(dishes)
    }catch(err){
        res.json({message: err})
    }
});

module.exports = router
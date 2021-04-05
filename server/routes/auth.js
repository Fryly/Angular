const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const { registerValidation, loginValidation } = require('../validation')



router.post('/register', async (req, res) => {

    //Validate the data before we a user
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //Cheking if the user is already in the database
    const emailExist = await User.findOne({
        email: req.body.email,
    })
    if(emailExist) return res.status(400).send('Email already exist')

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        name: "",
        telefon: "",
        city: "",
        street: "",
        house: "",
        email: req.body.email,
        password: hashedPassword,
        admin: false
    });
    try{
        const savedUser = await user.save();
        res.send(res.json(savedUser))
    }catch(err){
        res.status(400).send(err)
    }

});

//login
router.post('/login', async (req, res) => {
    //Validate the data before we a user
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    //Cheking if the user exist
    const user = await User.findOne({
        email: req.body.email,
    })
    if(!user) return res.status(400).send('Email is not found')
    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Invalid password')

    //Create and assign a token
    const token = jwt.sign({ _id: user.id, admin: user.admin }, process.env.TOKEN_SECRET)
    res.json({token})
})


router.get('/:id', async (req, res) => {
    try{
        const user = await User.findOne({
            _id: req.params.id
        });
        res.json(user)
    }catch(err){
        res.json({message: err})
    }
});


router.patch('/change/:id', async (req, res) => {
    try{
        const updateChangeForm = await User.findOneAndUpdate(
            { _id: req.params.id }, 
            { $set: {
                email: req.body.email,
                name: req.body.name,
                telefon: req.body.telefon
            }}
        )
        res.send(updateChangeForm)
    }catch(err){
        res.json({ message: err });
    }
})

router.patch('/adress/:id', async (req, res) => {
    try{
        const updateAdressForm = await User.findOneAndUpdate(
            { _id: req.params.id }, 
            { $set: {
                city: req.body.city,
                street: req.body.street,
                house: req.body.house
            }}
        );
        res.json(updateAdressForm)
    }catch(err){
        res.json({ message: err });
    }
})


module.exports = router
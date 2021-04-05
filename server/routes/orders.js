const express = require('express');
const router = express.Router();
const Order = require('../models/Order')


router.post('/', async (req, res) => {
    const order = new Order({
        name: req.body.name,
        email: req.body.email,
        telefon: req.body.telefon,
        address: req.body.address,
        comment: req.body.comment,
        payment: req.body.payment,
        cart: req.body.cart,
        id: req.body.id,
        status: 'Ожидание проверки',
        orderid: req.body.orderid
    });

    try{
        const saveOrder = await order.save()
        res.json(saveOrder);
    } catch(err){
        res.json({message: err})
    }

});

router.get('/:id', async (req, res) => {
    try{
        const userOrder = await Order.find({
            id: req.params.id
        },{cart: true});
        res.json(userOrder)
    }catch(err){
        res.json({message: err})
    }
});

router.get('/', async (req, res) => {
    try{
        const orders = await Order.find({$or: [{status: 'Ожидание проверки'}, {status: 'Оформление заказа'} ]});
        res.json(orders)
    }catch(err){
        res.json({message: err})
    }
});

router.patch('/status/:orderid', async (req, res) => {
    try{
        const updateStatus = await Order.findOneAndUpdate(
            { orderid: req.params.orderid }, 
            { $set: {
                status: req.body.status,
            }}
        );
        res.json(updateStatus)
    }catch(err){
        res.json({ message: err });
    }
})

module.exports = router
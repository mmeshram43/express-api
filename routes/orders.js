const express = require('express')
const router= express.Router()
const Order  = require('../models/Order')
const Customer = require('../models/Customer')

router.get('/orders' , (req,res)=>{
    res.status(200).send('Hello from Orders')
})

router
.get('/customer' ,async (req,res)=>{
    try {
        const dbRes = await Customer.find()
        res.status(200).json(dbRes) 
    } catch (error) {
        res.status(500)
    }
})
.post('/customer', async (req,res)=>{
    try {
        const newDoc= new Customer({
            name : req.body.name,
            email : req.body.email
        })
        const dbRes = await newDoc.save()
        res.status(201).json(dbRes)
    } 
    catch (error) {
        res.status(500).send('Server error')
    }
})
module.exports = router




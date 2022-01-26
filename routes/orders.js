const express = require('express')
const router= express.Router()
const Order  = require('../models/Order')
const Customer = require('../models/Customer')
const product = require('../models/Product')
const user = require('../models/User')

router.get('/orders' , (req,res)=>{
    res.status(200).send('Hello from Orders')
})

router.
post( '/placeorder' , async (req,res)=>{
   const { id } = req.body
   const {product_ids} = req.body
   try {
       // getting unique user id from loginid
       const uniqeId = await user.find({id : id})
       let unqUserId = uniqeId[0]._id

       console.log(uniqeId[0]._id)

       // if order placed for more than one product
      

    //    const prod = await product.findById(product_id)
    //    if(prod){
    //        const resp = await Order.create(
    //            {
    //                product_id : product_id,
    //                total : prod.price,
    //                user_id : unqUserId
    //            }
    //        )
    //        const summary = await Order.find({ _id : resp._id}).populate('product_id')
    //    res.status(200).json(summary)
          res.send('Ok')
       } 
    catch (error) {
       console.log(error)
       res.status(500).send('Server error')
   }

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




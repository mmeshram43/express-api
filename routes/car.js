const express = require('express')
const Car = require('../models/Car')
const router = express.Router()

router
.get( '/cars' , async (req,res) => {
    console.log(req.headers)
    try {
        const car = await Car.find()
        res.status(200).json(car)
        
    } catch (error) {
        res.send("Error Getting the data")
    }

})
.post('/cars' , async (req,res) => {

    try {
        const car = new Car({
            model : req.body.model ,
            maker : req.body.maker,
            mileage : req.body.mileage,
            topSpeed : req.body.topSpeed
        })
        const c1 = await car.save()
        res.status(200).json(c1)
    } catch (error) {
        res.send('Error in request',error)
    }
}  )

module.exports = router
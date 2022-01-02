const express = require('express')
const Phone = require('../models/Phone')
const router  = express.Router()

router
.get( '/phones' , async ( req, res ) => {
    try {
    const phone = await Phone.find()
    res.status(200).json(phone)

    } catch (error) {
        res.send("Error in processing request.")
        
    }

} )
.post( '/phones', async (req,res)=>{
    try {
        const phone = new Phone({
            model : req.body.model,
            launchYear : req.body.launchYear,
            maker : req.body.maker
        })

        const p1 = await phone.save()
        res.status(200).json(p1)

        
    } catch (error) {
        res.send('Error processing the request')
    }
 } )

 module.exports = router
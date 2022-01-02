const express = require('express')
const router = express.Router()
const marvel = require('../models/Marvel')

router
.get( '/marvel' , async (req,res)=>{ 
    try {
        const item = await marvel.find()
        res.status(200).json(item)
        
    } catch (error) {
        res.send("Error")
    }

}  )
.post( '/marvel' , async (req,res) =>{
    
    const payload = new marvel({
        title : req.body.title ,
        superhero : req.body.superhero,
        ott   : req.body.ott,
        releasedDate : req.body.releasedDate
    }) 
    const m1 = await payload.save()
    res.status(200).json(m1)
} )
.delete( '/marvel/:id' , async (req,res)=> {
    const {id} = req.params 
    try {
        const doc = await marvel.findById(id)
        console.log(doc)
        if(doc){
            const response  = await doc.remove() 
            res.status(200).json(response)
        } 
        else return res.send("doesn't exist")
    } catch (error) {
        res.send("Error")
    }
})

router.get( '/marvel/:id' ,async (req,res)=>{
    const {id} = req.params
    try {
        const result = await marvel.findById(id)
        if(id) res.status(200).json(result)
        else res.status(404)
    } catch (error) {
        res.send('Error Occured')
    }
})

module.exports = router 
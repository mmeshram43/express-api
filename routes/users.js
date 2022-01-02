const express = require('express')
const router = express.Router()
const User = require('../models/User')


router
.get( '/user' , async (req,res)=> {
    try {
        const user  = await User.find()
        res.json(user)
        
    } catch (error) {
        res.send('Error')
    }
})
.post( '/user' , async (req,res)=>{
    console.log(req.body);
    const user = new User(
        {
            id : req.body.id ,
            password : req.body.password,
            name : req.body.name,
            email : req.body.email
        }
    ) 
    try {
        const u1 = await user.save()
        res.json(u1).status(201)
    } catch (error) {
        res.send("Error")
    }
})

router.post( '/user/login' ,async (req,res)=>{
    const { id } = req.body 
    const {password} = req.body
    try {
        const doc = await User.findOne( { id: id } )
        if(doc){
            if (doc.password == password)
            res.status(200).json({ loggedIn : true , message : "loggedIn" })
            else
            res.status(401).json({ loggedIn : false , message : "Incorrect password"  })
        }
        else res.status(404).json({ loggedIn : false , message : "User ID doesn't exist"  })
        
    } catch (error) { res.status(500).send("Server error.")    }
})

module.exports = router
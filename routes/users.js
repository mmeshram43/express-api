const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')


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
        const existing = await User.findOne({ id : req.body.id })
        if(existing){
            res.status(200).json( { registered : false , message : "User ID Exists"} )
            return
        }
        else{
            const u1 = await user.save()
            res.status(201).json({ registered : true , message : "User ID registered."})
        }
    } catch (error) {
        res.send("Server Error")
    }
})
.delete( '/user/:id' , async (req,res)=> {
    const {id} = req.params
    try {
        const doc = await User.findById(id)
        if(doc){
            const response  = await doc.remove()
            res.status(200).json(response)
        }
        else{
            res.status(404).send("Id invalid")
        }
        
    } catch (error) {
        res.send("Server error.")
        
    }

 })

router.post( '/user/login' ,async (req,res)=>{
    const { id } = req.body 
    const {password} = req.body
    try {
        const doc = await User.findOne( { id: id } )
        if(doc){
            if (doc.password == password)
            {
                let token = jwt.sign( req.body , 'key' )
                res.status(200).send({token})
            }
            else
            res.status(401).json({ loggedIn : false , message : "Incorrect password"  })
        }
        else res.status(404).json({ loggedIn : false , message : "User ID doesn't exist"  })  
    } 
    catch (error) { res.status(500).send("Server error.")    }
})


const events = [ 
    { name : "Unlimited Veg Buffet" , date :'01-04-2022' , charges :'500'   },
    { name : "Vegan Delight Buffet" , date :'05-04-2022' , charges :'500'   },
    { name : "The Grill Festival " , date :'10-04-2022' , charges :'1500'   },
    { name : "Thanksgiving Dinner Party" , date :'15-04-2022' , charges :'450'} ,
    { name : "Anniversary Offer" , date :'15-04-2022' , charges :'200'} 
]

router.get( '/events' , verifyToken ,  (req,res)=>{
    res.status(200).json(events)
} )


function verifyToken( req,res ,next ){
    if(!req.headers.authorization){
        res.status(401).send("Unauthorized")
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === null){
        res.status(401).send("Unauthorized")
    }
    jwt.verify(token , 'key' , (err,user)=>{ 
        if(err){ return res.status(401).send("Bad Token") }
        console.log(user)
    })
    next();
}

module.exports = router
const express = require('express')
const env = require('dotenv').config()
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const verify = require('../middleware/verify')
const bcrypt = require('bcrypt')

// const serverError = { message : "Server unavailable." }

// only meshra1 id will have the access to user db 
let dataAccess = function(req,res,next){
    console.log('Data Access middleware..')
    console.log(req.params)
    if(req.params.id == 'meshra1') {
        console.log('User has admin ID')
    next()
    }
    else {
        return res.send('Not Allowed')
         console.log('Passed from middleware..')
        next()
    }

}

router
.get('/users/:id', dataAccess, async (req,res)=> {
    if(true)
    {
        console.log('Inside if')
        try {
            const user  = await User.find()
            res.status(200).json(user)
            } 
        catch (error) {res.send('Server Error')}
    }
    else{
       res.status(404)   
    }
})
// Create new user
.post( '/user/signup' , async (req,res)=>{
    console.log(req.body);
    let hash = bcrypt.hashSync(req.body.password , 2)
    console.log(hash)
    const user = new User(
        {
            id : req.body.id ,
            password : req.body.password,
            name : req.body.name,
            email : req.body.email
        }
    ) 
    try {
        const existing = await User.findOne({id:req.body.id})
        if(existing){
            const userExistsRes = {
                 registered : false , 
                 message : "User ID Exists"
                }
            res.status(200).json(userExistsRes)
            return
        }
        else{
            const u1 = await user.save()
            const registeredIdRes = { 
                registered : true , 
                message : "User ID registered."}
            res.status(201).json(registeredIdRes)
        }
        // res.status(200)
    } catch (error) {
        res.send("Server Error")
    }
})
// Delete user 
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
    } catch (error) { res.send("Server error")}

 })
// logging user in 
router.post('/user/login', async (req,res)=>{
    const { id } = req.body 
    const {password} = req.body
    try {
        const doc = await User.findOne( { id: id } )
        if(doc){
            if (doc.password == password)
            {
                let token = jwt.sign( req.body,process.env.JWT_KEY)
                res.status(200).send({token})
            }
            else{
                const invPassRes ={ 
                    loggedIn : false , 
                    message : "Incorrect password"
                }
                res.status(401).json(invPassRes)
            }
        }
        else{
            const invIdRes = { 
                loggedIn : false , 
                message : "UserID doesn't exist" 
            }
            res.status(404).json(invIdRes) 
        }  
    } 
    catch (error) 
    { res.status(500).send("Server error.") }
})

router.patch( '/user/:id' , async (req,res)=> {
    const {id} = req.params
    try {
        const user = await User.findById(id)
        if(!user) return res.status(404).send('User Id invalid')
        user.isAdmin = true
        const response = await user.save()
        res.status(200).json(response)
    } catch (error) {
        res,status(500).send('Server error')
    }
 })

// Middleware to verify token
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
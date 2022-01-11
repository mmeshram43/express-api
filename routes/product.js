const { Route } = require('express')
const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

 // Get All  Products
 router
.get('/products',async ( req , res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        // console.log()
        res.status(500).json('Server error')
    }
  })
.post('/products' , async ( req, res ) =>{
    const newProduct = new Product({
        id : req.body.id,
        title : req.body.title,
        productType : req.body.productType,
        category : req.body.category,
        description : req.body.description,
        image : req.body.image,
        price : req.body.price,
        mrp : req.body.mrp,
        rating : { 
            rate : req.body.rating.rate , 
            count : req.body.rating.count 
                }
    })
    try {
        const doc = await newProduct.save()
        res.status(201).json(doc)
        } 
    catch (error) {
         res.status(500).send("Server error") 
        }
  })
// Get review by Id
router.
get('/products/:id' ,async (req,res) =>{
      const {id} = req.params
      try {
          const doc = await Product.findById(id)
          if(doc) 
          return res.status(200).json(doc)
          else 
          return res.status(404).send('Invalid Id')
      } 
      catch (error) {
          res.status(500).send('Server error')
      }
  })
router
.patch('/reviews/:id',async (req,res)=>{
    const { id } = req.params
    try {
        const updatedReview = await review.findById(id)
        if(!updatedReview) return res.status(404).send('Invalid ID')
        updatedReview.title = req.body.title
        updatedReview.subTitle = req.body.subTitle
        updatedReview.body = req.body.body
        updatedReview.author = req.body.author
        updatedReview.imageUrl = req.body.imageUrl
        updatedReview.date = req.body.date
        updatedReview.hidden = false
        const doc = await updatedReview.save()
        res.status(200).json(doc)
        } 
    catch (error) {
         res.status(500).send("Server error") 
        }
})

let cartItem = [ ]
router
.get('/cart' , async (req,res) => {
    console.log('In updated call')
    let newList = []
    for  (const variable of cartItem) {
        console.log('Inside for loop')
        const prod = await Product.findById(variable._id)   
        newList.push(prod)
      }
    res.status(200).json(newList)
})

router.get('/ca' , (req,res)=>{ 
    res.status(200).json(cartItem)
})
router.patch('/cart' ,(req ,res) =>{
    const {body} = req;
    cartItem.push(body)
    res.status(200).json(cartItem)
})

router.delete('/cart/:id',(req,res)=>{
    console.log('Inside Delete')
    const { id } = req.params
    console.log('ID to be deleted is ')
    cartItem.map( ( element , index )=>{
        if(element._id == id)
        { 
            cartItem.splice(index,1)
        }
    })
    res.status(200).json(cartItem)
})

module.exports = router
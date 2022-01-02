const express = require("express")
const router = express.Router()
const blog = require('../models/Blog')

router
.get( '/blog' , async (req,res)=>{

    try {
        const b1 = await blog.find()
        res.status(200).json(b1)
        
    } catch (error) {
        res.status(500).send("Server error")
    }

} )
.post( '/blog' , async (req,res)=>{

    try {

        const request = new blog({
            title : req.body.title,
            author : req.body.author,
            body : req.body.body,
            imgUrl:req.body.imgUrl,
            comments : req.body.comments
        })

        const doc = await request.save();
        res.status(200).json(doc)
        
    } catch (error) {
        res.send("Server Error")
    }

} )
.delete( '/blog/:id' , async (req , res) => { 
    const {id} = req.params 
    try {
        const request = await blog.findById(id)
        if(request){
            const response = await request.remove()
            res.status(200).json(response)
        }
        else{
            res.send('Not Found')
        }
        
    } catch (error) {
        res.status(500).send("Server Error")
        
    }
  } )
  router.get( '/blog/:id' , async ( req, res )=>{
      const {id} = req.params
      try {
          const doc = await blog.findById(id)
          if(doc)
          res.status(200).json(doc)
          else res.send("Not Found").status(404)
          
      } catch (error) {
          res.send("Server not available")
          
      }
  })
  .patch( '/blog/:id' , async (req,res)=>{
      const {id} = req.params
      const {comments} = req.body
      try {
          const doc  = await blog.findById(id)
          doc.comments = comments 
          const response  = await doc.save()
          res.status(200).json(response)
          
      } catch (error) {   
          res.status(500).send("Server not available")
      }
  } )

module.exports = router
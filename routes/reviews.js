const express = require('express')
const router = express.Router()
const review = require('../models/Review')
const logger = require('../middleware/logger')

 // Route for reviews
 router
 .get('/reviews' , logger , async (req,res)=>{
    try {
        const reviews = await review.find()
        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json('Server error')
    }
  })
  // Add new comment on a review
  .patch( '/reviews/comment/:id' , async (req,res)=> {
    const { id } = req.params
    const newComment = {
        comment : req.body.comment,
        created : Date.now() ,
        user : req.body.user
    }
    try {
        let doc  = await review.findById(id)
        doc.comments.push(newComment)
        const response  = await doc.save()
        res.status(200).json(response)
        } 
    catch (error) {   
        console.log(error)
        res.status(500).send("Server error.") 
    }
  })
  .post( '/reviews' , async (req,res)=> {
    const newReview = new review({
        title : req.body.title,
        subTitle : req.body.subTitle,
        body : req.body.body,
        author : req.body.author,
        imageUrl : req.body.imageUrl,
        date : req.body.date,
        hidden : false,
        meta : { votes : 0 , favs : 0 },
    })
    try {
        const doc = await newReview.save()
        res.status(201).json(doc)
             
        } 
    catch (error) {
         res.status(500).send("Server error") 
        }
  })
// Get review by Id
  router.get( '/reviews/:id' , async (req,res)=>{
      const {id} = req.params
      try {
          const doc = await review.findById(id)
          if(doc) return res.status(200).json(doc)
          else return res.status(404).send('Invalid Id')
      } 
      catch (error) {
          res.status(500).send('Server error')
      }
  })

  // Increase like count 
  router.patch( '/reviews/like/:id' , async( req,res )=>{
    const { id } = req.params
    const { user } = req.body
    // Incoming request along with id in params
    try {
        let doc  = await review.findById(id)
        let  likeCount = doc.meta.favs
        newLikeCount = likeCount+1
        doc.meta.favs = newLikeCount
        const response  = await doc.save()
        res.status(200).json(response)
    } catch (error) {   
        console.log(error)
        res.status(500).send("Server error.") 
    }
  })

// unlike 
  router.patch( '/reviews/unlike/:id' , async( req,res )=>{
    const { id } = req.params
    const { user } = req.body
    // Incoming request along with id in params
    try {
        let doc  = await review.findById(id)
        let  likeCount = doc.meta.favs
        newLikeCount = likeCount-1
        doc.meta.favs = newLikeCount
        const response  = await doc.save()
        res.status(200).json(response)
        } 
    catch (error) 
    {   
        console.log(error)
        res.status(500).send("Server error.") 
    }
  })

// Vote count ++
  router.patch( '/reviews/vote/:id' , async( req,res )=>{
    const { id } = req.params
    const { user } = req.body
    // Incoming request along with id in params
    try {
        let doc  = await review.findById(id)
        let  voteCount = doc.meta.votes
        newvoteCount = voteCount+1
        doc.meta.votes = newvoteCount
        const response  = await doc.save()
        res.status(200).json(response)
    } catch (error) {   
        console.log(error)
        res.status(500).send("Server error.") 
    }
  })

  router.patch( '/reviews/:id' , async (req,res)=> {
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



  module.exports = router
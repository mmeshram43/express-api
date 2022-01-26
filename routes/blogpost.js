const express = require('express')
const router = express.Router()
const blogpost = require('../models/Blogpost')
const logger = require('../middleware/logger')

 // Route for reviews
 router
 // get all the blog posts
 .get('/blogposts' , logger , async (req,res)=>{
  console.log(req.query)
  const {page} = req.query
  const {limit} = req.query
  if (page)
  {
    const startIndex = (parseInt(page) -1 )*limit
  } 
  else startIndex = 0
    try {
        const blogposts = await blogpost.find().skip( startIndex ? startIndex : 0 ).limit(parseInt(limit))
        res.status(200).json(blogposts)
    } catch (error) {
        res.status(500).json('Server error')
    }
  })
  // create a new blogpost
  .post('/blogposts' , async (req,res)=> {
    const newBlog = new blogpost({
        title : req.body.title,
        subTitle : req.body.subTitle,
        category : req.body.category,
        body : req.body.body,
        author : req.body.author,
        imageUrl : req.body.imageUrl,
        readTime : 5 ,
        tags : req.body.tags,
        rating : 4,
        date : req.body.date,
        hidden : false,
        meta : { votes : 10 , favs : 15 },
    })
    try {
        const doc = await newBlog.save()
        res.status(201).json(doc)
        } 
    catch (error) {
         res.status(500).send("Server error") 
        }
  })
  // Add new comment on a review
  .patch( '/blogposts/comment/:id' , async (req,res)=> {
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


// Get review by Id
  router.get( '/blogposts/:id' , async (req,res)=>{
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
  router.patch( '/blogposts/like/:id' , async( req,res )=>{
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
  router.patch( '/blogposts/unlike/:id' , async( req,res )=>{
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
  router.patch( '/blogposts/vote/:id' , async( req,res )=>{
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

  router.patch( '/blogposts/:id' , async (req,res)=> {
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
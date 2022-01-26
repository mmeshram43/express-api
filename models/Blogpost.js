const mongoose = require('mongoose')

const Blogpost = new mongoose.Schema({
    
    title : String,
    subTitle : String,
    category : String,
    body : String,
    author : String,
    imageUrl : String,
    readTime : Number,
    tags : [String],
    rating : Number ,
    date : { type : Date , default : Date.now },
    hidden : Boolean,
    meta : { votes : Number , favs : Number },
    comments : [{ user : String, comment :String, 
                 created : { type : Date , default : Date.now}
 }]
})

module.exports = mongoose.model('Blogpost', Blogpost )
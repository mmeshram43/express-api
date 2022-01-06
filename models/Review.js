const mongoose = require('mongoose')

const Review = new mongoose.Schema({
    
    title : String,
    subTitle : String,
    body : String,
    author : String,
    imageUrl : String,
    date : { type : Date , default : Date.now },
    hidden : Boolean,
    meta : { votes : Number , favs : Number },
    comments : [{ user : String, comment :String, 
                created : { type : Date , default : Date.now}
 }]
})

module.exports = mongoose.model('Review', Review)
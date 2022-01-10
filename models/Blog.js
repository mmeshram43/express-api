const mongoose = require('mongoose')

const Blog  = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        default : "Mayur Meshram"
    },
    body : {
        type :String,
        required : true
    },
    createdDate : {
        type : Date,
        default : Date.now 
    },
    imgUrl : {
        type : String
    },
    comments : [String]
})

module.exports = mongoose.model('Blog',Blog)

const mongoose = require('mongoose')

const Blog  = new mongoose.Schema({
    title : {
        type : String
    },
    author : {
        type : String,
        default : "Mayur Meshram"
    },
    body : {
        type :String
    },
    createdDate : {
        type : Date,
        default : Date.now 
    },
    imgUrl : {
        type : String
    },
    comments : {
        type : [String]
    }
})

module.exports = mongoose.model('Blog',Blog)

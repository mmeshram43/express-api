const mongoose = require('mongoose')

const Marvel = new mongoose.Schema({

    title : {
        type : String
    },
    superhero : {
        type : String
    },
    ott   : {
        type : String
    },
    releasedDate : {
        type : Date ,
        default : Date.now 
    },
    createdDate :{
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Marvel' , Marvel)
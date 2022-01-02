const mongoose = require('mongoose')

const Phone = new mongoose.Schema({

    model : {
        type :String ,
    },
    launchYear :{
        type :String,
    },
    maker : {
        type : String,
    }
})

module.exports = mongoose.model('Phone' , Phone)
const mongoose = require('mongoose')

const Team = new mongoose.Schema({
    name : {
        type : String
    },
    captain : {
        type : String
    },
    owner :{
        type :String
    },
    homeGround : {
        type : String
    },
    _createdDate : {
        type : Date,
        default : Date.now
    },
    _apiOwner:{
        type : String,
        default : "Mayur Meshram"
    }
})

module.exports = mongoose.model('Team',Team )
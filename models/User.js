const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id : {
        type :String ,
        required : true
    },
    password : {
        type :String ,
        required : true
    },
    name :{
        type :String,
    },
    email : {
        type : String,
    }
})

module.exports = mongoose.model('User' , userSchema)
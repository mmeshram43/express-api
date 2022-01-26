const mongoose = require('mongoose')

const Course = new mongoose.Schema({
    courseName : String ,
    fees : Number,
    instructor : String,
    duration : Number
})

module.exports = mongoose.model('Course', Course)
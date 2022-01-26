const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const course = require('./Course')

const Student = new mongoose.Schema({
    name : String ,
    email : String,
    password : String,
    age : Number,
    enrolledCourses : [ {type : mongoose.Schema.ObjectId , ref : course } ]
})

module.exports = mongoose.model('Student', Student)
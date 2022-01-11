const mongoose = require('mongoose')

const customer = new mongoose.Schema({
    name : String ,
    email : String
})

module.exports = mongoose.model('Customer',customer)
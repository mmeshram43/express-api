const mongoose = require('mongoose')

const Product = new mongoose.Schema({
    id : Number ,
    title : String,
    category : String,
    description : String,
    image : String,
    price : Number ,
    mrp : Number,
    rating : { rate : Number , count : Number }
})
module.exports = mongoose.model('Product', Product )
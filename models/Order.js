const mongoose = require('mongoose')
const customer = require('./Customer')
const product = require('./Product')
const user = require('./User')

const order = new mongoose.Schema({
    
    product_id : {
        type : mongoose.Schema.ObjectId,
        ref : product,
        index : true
    },
    total :{
        type : Number
    },
    user_id :{
        type : mongoose.Schema.ObjectId,
        ref : user,
        index : true
    }
})

module.exports = mongoose.model('Order',order)
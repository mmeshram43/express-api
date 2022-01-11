const mongoose = require('mongoose')
const Customer = require('./Customer')

const order = new mongoose.Schema({
    item : String ,
    total : Number ,
    customer_id : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : Customer,
        index : true
    }
})

module.exports = mongoose.model('Order',order)
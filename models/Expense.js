// const { Admin } = require('mongodb')
const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    category :{
        type :String,
        required : true
    },
    amount :{
        type :Number,
        required : true
    },
    description :{
        type :String,
        required : false
    },
    paidBy : {
        type : String,
        required : false
    },
    sharingGroup : {
        type : [String],
        required : true
    },
    isSettled : {
        type : Boolean,
        required : false,
        default : false
    },
    txnDate : {
        type : Date,
        required : false,
        default :  Date.now
    }
})

module.exports = mongoose.model('Expense' , expenseSchema)
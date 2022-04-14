const express = require('express')
const router = express.Router()
const Expense = require('../models/Expense')


router
.get('/expense' , async (req,res)=>{
    const resp = await Expense.find();
    res.json(resp)
})
.delete('/expense/:id', async (req,res) =>{
    const { id } = req.params
    if(!id) res.json({ code:"ID_MISSING" , message:"Id not found" })
    const dbRes = await Expense.findByIdAndDelete(id)

    if(!dbRes) res.json({code:"NOT_FOUND" , message:"No record found"})
    else
    res.json(dbRes)
})
.post('/expense', async (req,res)=>{
    let newExpense = new Expense({
        category : req.body.category,
        amount : req.body.amount,
        description : req.body.description,
        paidBy : req.body.paidBy,
        txnDate: req.body.txnDate
    })
    const dbRes = await newExpense.save();
    if(dbRes)
    res.json(dbRes)
    else
    res.status(500)
})
.put('/expense/:id', async (req,res)=>{
    const { id } = req.params
    console.log(req.body)
    let expenseToUpdate  = req.body
    let validationError = []
    const existingExpense = await Expense.findById(id)
    for (const key in expenseToUpdate) {
        if ( key in existingExpense) {     
            existingExpense[key] = expenseToUpdate[key]
        }
        else
        validationError.push(key)
    }
    const updateExpense = await existingExpense.save()
    res.json({updateExpense, validationError:validationError})

})

module.exports = router
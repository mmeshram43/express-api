const mongoose = require('mongoose')

const connection = mongoose.connect(
    "mongodb://localhost/ekart" , ()=>{
        console.log('Connected to local')
    }
)
module.exports = connection
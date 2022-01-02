const mongoose = require('mongoose')

const Car = new mongoose.Schema({
    model : {
        type: String
    },
    maker :{
        type : String
    },
    mileage : {
        type : Number
    },
    topSpeed : {
        type : String
    }
}
)

module.exports = mongoose.model( 'Car' , Car )
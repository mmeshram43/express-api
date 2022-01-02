const express =  require('express')
const mongoose  = require('mongoose')
const bodyParser = require('body-parser')

// Basic Authentication
const basicAuth = require('express-basic-auth')

// importing all the routes
const Phone = require('./routes/phone')
const users = require('./routes/users')
const Car = require('./routes/car')
const Marvel = require('./routes/marvel')
const team = require('./routes/teams')
const blog  = require('./routes/blog')

// importing the middleware
const logger = require('./middleware/logger')
const req = require('express/lib/request')


// Database Connection String 
const collection = 'mayur'
const url = 'mongodb://localhost/'+collection ;

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('./public'))


// connecting to mongo
mongoose.connect( url , {useNewUrlParser : true} )
const con = mongoose.connection
// console.log(con)
con.on( 'open', ()=>console.log("connected.."))

//Handle authentication
// app.use(basicAuth({
//     users : { 
//              'admin':'supersecret',
//              'mayur' :'password'
//             }
//                  })
//         )
// "Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH")
    next();
  });
// api routes for different models

app.use('/api', blog )
app.use('/api' ,logger, team)
app.use('/api' , Marvel)
app.use('/api' , users  )
app.use('/api', Phone)
app.use('/api', Car)

//Home page
app.get( '/home' , logger , (req,res)=>{
    
    // res.render('index')
} )

app.listen(3000 ,()=>console.log('Running on 3000') )
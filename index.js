const env = require('dotenv').config()
const express =  require('express')
const mongoose  = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
// const morgan =require('morgan')
const cookieparser = require('cookie-parser')
const session = require('express-session')



//Basic Authentication
//const basicAuth = require('express-basic-auth')

//importing all the routes
const users = require('./routes/users')
const blog  = require('./routes/blog')
const product = require('./routes/product')
const orders = require('./routes/orders')
const blogpost = require('./routes/blogpost')

//importing all the models
const customer = require('./models/Customer')
const prod = require('./models/Product')
const Order = require('./models/Order')
const course  = require('./models/Course')
const student = require('./models/Student')
const mongo = require('./mongoQuery')
const mongoQ = require('./mongoQuery')

//importing the middleware

const app = express()

// app.use(morgan()) express
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
// sessions middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge : 60000 }
}))

app.use(cookieparser());

app.use(express.static('./public'))

// Allowing all the origins - avoiding CORS error
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH")
  next();
});

let dbConnectionString = process.env.DB_HOST
let localDbUrl = 'mongodb://localhost/mayur'
let dbConnection = false 
let dbConnectionMsg = 'Not connected to server.'
mongoose.connect( localDbUrl , err => {
           if (err) console.log("DB Error",err)
           else
           {
            dbConnection = true ;
            dbConnectionMsg = 'Connected to Mongo Local '
            console.log("Connected to Mongo Local ")
            }
          })

//connecting to mongodb
// mongoose.connect( url , {useNewUrlParser : true} )
// const con = mongoose.connection
// Once the connection is established connected... will be logged in console
// con.on( 'open', () => console.log("connected..."))
//Handle basic auth  authentication
//app.use(basicAuth({ regUsers : { 'admin':'supersecret' } }))

// api routes for different models
app.use('/api',product)
app.use('/api',blog)
app.use('/api',users)
app.use('/api',orders )
app.use('/api',blogpost)
// app.use('/api' ,logger, team)

app.get('/api/v1/heartbeat' , (req,res)=>{
  const response =
  {
    success : dbConnection ,
    message : dbConnectionMsg
  }
  res.status(200).json(response)
})

// mongoQ() ;

app.listen(process.env.PORT || 3000 ,()=>{
  console.log(`Server running`)  })
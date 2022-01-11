const env = require('dotenv').config()
const express =  require('express')
const mongoose  = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

//Basic Authentication
const basicAuth = require('express-basic-auth')

//importing all the routes
const users = require('./routes/users')
const blog  = require('./routes/blog')
const review = require('./routes/reviews')
const product = require('./routes/product')
const orders = require('./routes/orders')

//importing the middleware
const logger = require('./middleware/logger')
const req = require('express/lib/request')
const authenticate = require('./middleware/jwt')
const Review = require('./models/Review')

const app = express()
// middlewares for accepting json request
app.use(express.json())
// middleware for cloudMongoDBUrl encoded request
app.use(bodyParser.urlencoded({extended:false}))
// static html files can be rendered which are present in public folder
app.use(express.static('./public'))

// Connecting to mongo db
let dbConnection = false 
let dbConnectionMsg = 'Not Connected'
mongoose.connect( process.env.LOCAL_DB_URL+process.env.LOCAL_DB , 
  err => {
           if (err) 
          console.log("DB Error",err)
           else
           {
            dbConnection = true ;
            dbConnectionMsg = 'Connected to Mongo local'
            console.log("Connected to Mongo local")
            }
          })

//connecting to mongodb
// mongoose.connect( url , {useNewUrlParser : true} )
// const con = mongoose.connection

// Once the connection is established connected... will be logged in console
// con.on( 'open', () => console.log("connected..."))

//Handle basic auth  authentication
//app.use(basicAuth({ regUsers : { 'admin':'supersecret' } }))

// Allowing all the origins - avoiding CORS error
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH")
    next();
  });

// api routes for different models
app.use('/v1/api/',product)
app.use('/v1/api/',blog)
app.use('/v1/api/',users)
app.use('/api/orders' , orders )
app.use('/v1/api' , review)
// app.use('/api' ,logger, team)


app.get('/v1/api/heartbeat' , (req,res)=>{
  const response =
  {
    success : dbConnection ,
    message : dbConnectionMsg
  }
  res.status(200).json(response)
})

app.listen(process.env.PORT ,()=>{
  console.log(`Server running ob ${process.env.PORT}`)  })
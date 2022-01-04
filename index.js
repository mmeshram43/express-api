const express =  require('express')
const mongoose  = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

//Basic Authentication
const basicAuth = require('express-basic-auth')

//importing all the routes
const users = require('./routes/users')
const Car = require('./routes/car')
const blog  = require('./routes/blog')

//importing the middleware
const logger = require('./middleware/logger')
const req = require('express/lib/request')
const authenticate = require('./middleware/jwt')

// Database Connection String 
const collection = 'mayur'
const url = 'mongodb://localhost/'+collection ;

const app = express()

// middlewares for accepting json request
app.use(express.json())
// middleware for url encoded request
app.use(bodyParser.urlencoded({extended:false}))
// static html files can be rendered which are present in public folder
app.use(express.static('./public'))

// Connecting to mongo db
mongoose.connect( url , err =>{
  if (err) console.log("Error",err)
  else  console.log("Connection to mongodb successful")
} )

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

app.use('/api', blog )
// app.use('/api' ,logger, team)
app.use('/api' , users  )
app.use('/api', Car)

// Home page
app.get( '/home' , logger , (req,res)=>{
    // res.render('index')
})

// Scores of the men
const regUsers = [  
  { id : 'rani' , password : "passrani"    } ,
  { id : 'mayur' , password : "passmayur"  } ,
  { id : 'harshu' , password : "passharshu"} ,
  { id : 'vicky' , password : "passvicky"  } 
]

const scores = [
 { id : 'mayur' , score : 50  } ,
 { id : 'rani' , score : 60  } 

]

app.get('/scores' , authenticate, (req,res)=>{
  res.json( scores.filter(e => e.id== req.user.id ))
})

app.post( '/login', (req,res)=>{
  // authenticate user
  const person = regUsers.find( user => user.id == req.body.id )
  if(person) { 
    if( person.password == req.body.password ){
      // res.status(200).json({ logIn : "success" })
      jwt.sign( person , 'secret' , (err, token) => { res.json({token}) })
    }
    else {
      res.status(401).send("Incorrect password")
      return
    }
  }
  else{
    res.status(200).send("User not registered")
    return
  }
  // end of authenticate user
  
  // if authenticated then 
  // console.log(req.body)
  // let user = { id : req.body.id }
  // jwt.sign( user , 'secret' , (err, token) => { res.json({token}) })
})

app.listen(3000 ,()=>console.log('Running on 3000') )
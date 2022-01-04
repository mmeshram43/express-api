const jwt = require('jsonwebtoken')

const auth = function authenticate( req, res , next )
{
  console.log('Middleware......')
  console.log(req.body)
  const bearer = req.headers['authorization']
  const token = bearer.split(' ')[1]
  if(token==null) return res.send('Bad request')

// verify bearer token

  jwt.verify( token ,'secret', (err , user)=>{
    if(err) return res.send("Bad token")
    // req.user = { id : "mayur" }
    console.log(user)
    
    req.user = user
    next()

  })
}
module.exports = auth
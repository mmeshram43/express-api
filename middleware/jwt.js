const jwt = require('jsonwebtoken')

// JWT verifies the User from the token that is issued after successful login

const auth = function authenticate( req, res , next )
{
  console.log('Verifying User....')
  console.log(req.body)
  const bearer = req.headers['authorization']
  if(!bearer) 
  return res.status(401).send('Unauthorized')
  const token = bearer.split(' ')[1]
  if(token==null) 
  return res.status(401).send('Bad request')
// verify bearer token
  jwt.verify( token ,'key', (err , user)=>{
    if(err) 
    return res.status(401).send("Bad token")
    console.log(user)
    // req.user = user
    next()
  })
}
module.exports = auth
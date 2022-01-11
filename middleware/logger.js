// logger is a middleware that lies between sent request and received request
// This looger is trying to log the event url and protocol
let logger =  ( req,res,next )=>{ 
    console.log(`New Request Logged`)
    console.log(`User ID:${req.body.user} |End Point - ${req.url}`)
    next();
}
module.exports = logger 
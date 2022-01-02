// logger is a middleware that lies between sent request and received request
// This looger is trying to log the event url and protocol

let logger =  ( req,res,next )=>{ 
    console.log(` New request has been logged.` )
    console.log(`${req.protocol} ------  ${req.url}`)
    next();
}

module.exports = logger 
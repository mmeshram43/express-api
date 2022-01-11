const jwt=require('jsonwebtoken')

let verifyToken = function ( req,res ,next ){
    if(!req.headers.authorization){
        res.status(401).send("Unauthorized")
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === null){
        res.status(401).send("Unauthorized")
    }
    jwt.verify(token , 'key' , (err,user)=>{ 
        if(err){ return res.status(401).send("Bad Token") }
        console.log(user)
    })
    next();
}

module.exports = verifyToken
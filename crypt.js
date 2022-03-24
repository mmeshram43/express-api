console.log('Crypt started')
const { reject } = require('bcrypt/promises')
const crypto = require('crypto')
const { resolve } = require('path')
const express =  require('express')
const res = require('express/lib/response')
const app   = express()
app.use(express.json())
let salt = crypto.randomBytes(1)
.toString('hex') ;
console.log(salt)

function getRecords( key ){
    let records = [ 'Mayur' ,"Rohan" , "Shrini" , "Sahir"];
    return new Promise( (resolve,reject)=>{
        if(key== 'mm')
        resolve(records);
        else
        reject('Unauthorized');

    })
}


async function apiCall(){
    // console.log(response);
}

apiCall()

app.get('/all' , async (req,res)=>{
    let response = await getRecords('mm').catch( err => res.status(401)) ;
    res.json(response);

})

app.listen(8080, () => console.log('Listening on 8080') )
// let response =  getRecords('mm').then(res=>console.log(res) ).catch(err=>console.log(err))

/* let hash = crypto.createHash('md5')
let a = new Promise( (resolve,reject) =>{
    if(false)
    resolve(`It's true`)
    else
    reject([1,2,3,4,5])

} )
a.then(res=>{
    console.log(res)
})
.catch( err => {
    let temp = err
    console.log(typeof temp)
} )
*/
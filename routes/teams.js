const express = require('express')
const router  = express.Router()
const teams = require('../models/Teams')

router.get( '/teams' ,async (req,res)=>{
    try {
        const doc  = await teams.find() 
        res.status(200).json(doc)
        
    } catch (error) {
        res.send("Error in GET")
        
    }
})
.post( '/teams' , async (req,res)=>{
    console.log(req.body)
    try {
        console.log(req.body)
        // const team must not be equal to global const name which is teams in this case
        const team = new teams({
            name: req.body.name ,
            captain: req.body.captain,
            owner: req.body.owner,
            homeGround :req.body.homeGround
           
        }) 
        const doc = await team.save()
        res.status(200).json(doc)
    } catch (error) {
        res.send("Error in POST")
    }
}  )
.delete( '/teams/:id' , async (req,res)=>{
    const {id} = req.params
    try {

        const team = await teams.findById(id)
        if(team) {
            const response  = await team.remove()
            res.status(200).json(response)
        }
        else
        res.send("Id Invlaid")
    } catch (error) {
        res.send("Server Error")

    }

} )

module.exports = router 

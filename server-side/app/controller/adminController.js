const User = require('../model/user')
const jwt = require('jsonwebtoken')
const adminController = {}

adminController.login = (req,res) =>{
    const body = req.body 
    
    if(body.key === process.env.ADMIN_KEY){
        const tokenData={
            role:'admin'
        }
        const token = jwt.sign(tokenData,process.env.JWT_ADMIN)
        res.json(token)
    }
    else{
        res.json({error:'InValid Admin Key'})
    }
}

adminController.show = (req,res) => {
    User.find()
        .then((user)=>{
            res.json(user)
        })
        .catch((error)=>{
            res.json(error)
        })
}

adminController.delete = (req,res) => {
    const id=req.params.id
    User.findByIdAndDelete({_id:id})
        .then((user)=>{
            res.json(user)
        })
        .catch((error)=>{
            res.json(error)
        })
}

adminController.update=(req,res)=>{
    const id = req.params.id
    const body = req.body
    User.findOneAndUpdate({_id:id},body,{new:true})
        .then((user)=>{
            res.json(user)
        })
        .catch((error)=>{
            res.json(error)
        })
}
module.exports = adminController
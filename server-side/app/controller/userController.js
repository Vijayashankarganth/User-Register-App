const User = require('../model/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userController = {}

userController.create = (req,res) =>{
    const body = req.body
    body.file = req.file.path
    const user = new User(body)
    user.save()
        .then((user)=>{
            res.json(user)
        })
        .catch((error)=>{
            res.json(error)
        })
}

userController.login = (req,res) => {
    const body = req.body
    User.findOne({email:body.email})
        .then((user)=>{
            if(user){
                bcryptjs.compare(body.password,user.password)
                        .then((matched)=>{

                            if(matched){
                            const tokenData = {
                                _id:user._id,
                                name:user.name,
                                email:user.email,
                                mobile:user.mobile,
                                country:user.country,
                                state:user.state,
                                city:user.city
                            }
                            const token = jwt.sign(tokenData,process.env.JWT_KEY)
                            res.json({token})
                            }
                            else{
                                res.json({error:'Invalid Email/UserName or Password'})
                            }
                        })
            }   
            else{
                res.json({error:'Invalid Email/UserName or Password'})
            }
        })
}

userController.show = (req,res) =>{
    const id = req.tokenData._id
    User.findOne({_id:id})
        .then((user)=>{
            res.json(user)
        })
        .catch((error)=>{
            res.json(error)
        })
}

module.exports = userController
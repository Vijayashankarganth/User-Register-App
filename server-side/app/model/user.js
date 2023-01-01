const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcryptjs = require('bcryptjs')

const userSchema = new Schema ({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:true
    }

})

userSchema.pre('save',function(next){
    bcryptjs.genSalt()
            .then((salt)=>{
                bcryptjs.hash(this.password,salt)
                        .then((encrypt)=>{
                            this.password = encrypt
                            next()
                        })
            }) 
})

const User = mongoose.model('User',userSchema)


module.exports = User
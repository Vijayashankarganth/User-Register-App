const jwt = require('jsonwebtoken')

const adminAuthentication = (req,res,next) =>{
    const token = req.header('X-Auth')
    let tokenData
    
    try{
        tokenData=jwt.verify(token,process.env.JWT_ADMIN)
        next()
    }
    catch(error){
        res.json(error.message)
    }

}

module.exports = adminAuthentication
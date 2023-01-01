const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const ConfigureDb = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/test-001')
            .then(()=>{
                console.log('connect to db')
            })
            .catch((error)=>{
                console.log(error)
            })
}

module.exports = ConfigureDb
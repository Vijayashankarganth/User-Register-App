const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
require('dotenv').config()
const port = 3322
app.use('/upload',express.static('upload'))

const ConfigureDb = require('./config/database')
ConfigureDb()

const router = require('./config/route')
app.use(router)

app.listen(port,()=>{
    console.log('connect to server')
})
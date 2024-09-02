const dotenv = require('dotenv')
dotenv.config()

const express = require('express')

const cors = require('cors')

const router = require('./routes')

require('./connection')

const ETserver = express()

ETserver.use(cors())
ETserver.use(express.json())
ETserver.use(router)

PORT = 4000 || process.env.PORT

ETserver.listen((PORT), ()=>{
    console.log(`Server Running Successfully at port: ${PORT}`);
})
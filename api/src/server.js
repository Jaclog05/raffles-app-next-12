const express = require('express')
const cookies = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')

//Initializations

const app = express()

//Settings

app.set('port', process.env.PORT || 4000)

//MiddleWares

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookies())
app.use(morgan('dev'))

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};


app.use(cors(corsOptions))

//routes

app.use(require('./routes/index.routes'))
module.exports = app
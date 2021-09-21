if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({path:'.env'});
}

const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

const mongoose = require('mongoose')

// set a view engine this time it is an ejs engine

app.set('view engine','ejs')

// set where the views are going to be coming from 

app.set('views', __dirname + '/views')

// set where the layouts are coming from

app.set('layout','layouts/layout')
app.use(expressLayout)

// tell express where the public files you want to use are located

app.use(express.static('public'))

app.use('/', indexRouter)

// setting up the database 

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true
})
const db = mongoose.connection

db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to the database successfully'))

// set the listening port

app.listen(process.env.PORT || 9000)
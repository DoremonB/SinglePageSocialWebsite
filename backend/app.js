var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')

require('dotenv').config()

var port = process.env.PORT
console.log('process.env.PORT '+process.env.PORT)


app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))

var Users = require('./routes/Users')
app.use('/users', Users)

mongoose.connect('mongodb+srv://'+process.env.MONGO_USERNAME+':'+process.env.MONGO_PASSWORD+'@node-rest-shop-qoquv.mongodb.net/'+process.env.MONGO_DB_NAME+'?retryWrites=true&w=majority',{
    useNewUrlParser: true
})


app.listen(port, function() {
    console.log('Server is running on port: ' + port)
})
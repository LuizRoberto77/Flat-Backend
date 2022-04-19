const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

var persons = require('./persons/persons')
var guests = require('./guests/guests')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended:false}))

app.use(bodyParser.json())

app.use(persons)
app.use(guests)

//Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))


 
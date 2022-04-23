const express = require('express');
const bodyParser = require('body-parser');

var persons = require('./persons/persons')
var guests = require('./guests/guests')

const app = express()
const port = process.env.PORT || 5000

//aceitar requisições pelo reader
app.use(bodyParser.urlencoded({ extended:false}))

//aceitarv requisições pelo body do typo json
app.use(bodyParser.json())

//routers
app.use(persons)
app.use(guests)

//Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))


 
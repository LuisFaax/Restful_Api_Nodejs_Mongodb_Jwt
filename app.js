//modules required
const express = require('express')
const  bodyParser = require('body-parser')

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())


//api concerts routes
require('./routes/concerts.js')(app)

//in case requesting for an undexisting route
app.all('*', (req, res) =>{
    res.status(404).send({message: 'Invalid route'})
})


// Configuring the database and server launching
  require('./config/database')(app)


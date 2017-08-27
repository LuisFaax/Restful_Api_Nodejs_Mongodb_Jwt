//this module open database and launch de server instance
module.exports = (app) => {

'use strict'

var  mongoose = require('mongoose')
var config = require('./settings.js');



  mongoose.connect(config.db, { useMongoClient: true });
  mongoose.Promise = global.Promise;
  mongoose.connection
    .once('open', () => {
      console.log('Connection to mongodb 200 ok')
              //once database is connected, run server
              app.listen(config.port, () => {    
              console.log(`Server is listening in port ${config.port}`)
              });
    })
    .on('error', (err) => {
      console.warn(`Warning connecting to mongo database:  ${err}`)
    });

  }
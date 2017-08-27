//this module requires Json Web Token service and creates a token
'use strict'

const service = require('./jwt')

exports.getToken = function(req, res){
    const user  = {
        email: 'luisfaax@gmail.com',
        name:'Luis Fax',
        password: 'p1w2s3'
    }


return res.status(201).send({ token: service.createToken(user) })
}

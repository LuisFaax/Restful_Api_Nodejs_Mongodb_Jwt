//this is a middleware module that validates that  requests header has a token 
// {Authorization: Bearer + space + Token}
'use strict'

const services = require('../services/jwt')

function isAuth (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'Access denied!' })
  }

  let token = req.headers.authorization.split(' ')[1]

  services.decodeToken(token)
    .then(response => {
      req.user = response
      next()
    })
    .catch(response => {
      res.status(response.status)
    })
}

module.exports = isAuth

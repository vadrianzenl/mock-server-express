var express = require('express')
var router = express.Router()
var data = require('./config')
var action = require('../src/action')

/* Data BPI */
Object.keys(data).map(function (key, index) {
  switch (data[key].method) {
    case 'GET':
      router.get('/' + data[key].url, (request, response) => action(request, response, data[key]))
      break
    case 'POST':
      router.post('/' + data[key].url, (request, response) => action(request, response, data[key]))
      break
    default:
      router.all('/' + data[key].url, (request, response) => action(request, response, data[key]))
      break
  }
})

module.exports = router

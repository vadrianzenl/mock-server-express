const path = require('path')
const fs = require('fs')
const mime = require('mime')
const fileSaver = require('file-saver')

const getResponseType = function (data) {
  let response = {contentType: 'application/json', extension: '.json'}
  if (data.responseType) {
    switch (data.responseType) {
      case 'json':
        response.contentType = 'application/json'
        response.extension = '.json'
        break
      case 'pdf':
        response.contentType = 'application/pdf'
        response.extension = '.pdf'
        break
      default:
        break
    }
  }
  return response
}

const actionError = function (request, response, elem) {
  if (elem.error) {
    let code = elem.error.code ? elem.error.code : 500
    let uri = '/data/'
    if (elem.error.message) {
      switch (elem.error.message) {
        case 'json':
          uri += elem.error.json ? elem.error.json + '.json' : 'default.json'
          response.status(code)
          response.contentType('application/json')
          response.sendFile(path.normalize(__dirname + uri))
          break
        default:
          response.status(code).send(elem.error.message)
          break
      }
    } else {
      response.sendStatus(code)
    }
  } else {
    response.sendStatus(500)
  }

}

const actionOk = function (request, response, elem) {
  let uri = ''
  if (elem.params) {
    let parameters = request.body
    let prop = elem.prop ? elem.prop.val: ''
    switch (elem.typeRequest) {
      case 'single':
        if (prop in parameters) uri = actionTypeParam(elem, parameters[prop])
        break
      case 'object':
        if (prop in parameters){
          let children = elem.children.val
          if (parameters[prop][children]) uri = actionTypeParam(elem, parameters[prop][children])
        }
        break
      case 'all':
        elem.typeParam = 'content'
        uri = actionTypeParam(elem, parameters)
        break
      default:
        if (prop in parameters) uri = actionTypeParam(elem, parameters[prop])
        break
    }
  }

  if (!elem.params || uri === '')
    if (elem.file) uri = '/data/' + elem.file + getResponseType(elem).extension
    else uri = '/data/' + elem.url + getResponseType(elem).extension

  response.contentType(getResponseType(elem).contentType)
  if (getResponseType(elem).extension === '.json') {
    response.sendFile(path.normalize(__dirname + uri))
  } else {
    response.download(__dirname + uri)
  }
}

const actionTypeParam = function (elem, param) {
  let uri = ''
  switch (elem.typeParam) {
    case 'prop':
      uri = '/data/' + elem.url + '/' + param.toLowerCase() + getResponseType(elem).extension
      break
    case 'value':
      if (elem.values) {
        let values = elem.values
        Object.keys(values).map(function (key, index) {
          if (values[key].id === param) uri = '/data/' + elem.url + '/' + values[key].json.toLowerCase() + getResponseType(elem).extension
        })
      }
      break
    case 'content':
      if (elem.values) {
        let values = elem.values
        Object.keys(values).map(function (key, index) {
          let idString = JSON.stringify(values[key].id)
          let paramString = JSON.stringify(param)
          if(idString===paramString) uri = '/data/' + elem.url + '/' + values[key].json.toLowerCase() + getResponseType(elem).extension
        })
      }
      break
    default:
      uri = '/data/' + elem.url + '/' + param.toLowerCase() + getResponseType(elem).extension
      break
  }
  return uri
}

const action = function (request, response, elem) {
  let time = elem.timeout ? elem.timeout : 0
  setTimeout(function () {
    if (elem.responseError) {
      actionError(request, response, elem)
    } else {
      actionOk(request, response, elem)
    }
  }, time)
}

module.exports = action

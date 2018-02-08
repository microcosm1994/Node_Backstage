const express = require('express')
const path = require('path')
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()

const eagoRouter = express.Router()
const eagoControllers = require(path.join(__dirname, '../controllers/eagoControllers.js'))

eagoRouter.get('/monthcount', multipartMiddleware, eagoControllers.monthcount)
eagoRouter.get('/terraceCount', multipartMiddleware, eagoControllers.terraceCount)

module.exports = eagoRouter

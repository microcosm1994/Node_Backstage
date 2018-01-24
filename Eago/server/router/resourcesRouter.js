const express = require('express')
const path = require('path')
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()

const resourcesRouter = express.Router()
const resourcesControllers = require(path.join(__dirname, '../controllers/resourcesControllers.js'))

resourcesRouter.get('/all', multipartMiddleware, resourcesControllers.all)
resourcesRouter.post('/save', multipartMiddleware, resourcesControllers.save)

module.exports = resourcesRouter

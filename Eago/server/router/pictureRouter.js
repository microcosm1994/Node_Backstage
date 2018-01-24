const express = require('express')
const path = require('path')
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()

const pictureRouter = express.Router()
const pictureControllers = require(path.join(__dirname, '../controllers/pictureControllers.js'))

pictureRouter.post('/upload', multipartMiddleware, pictureControllers.upload)
pictureRouter.get('/detailed', multipartMiddleware, pictureControllers.detailed)
pictureRouter.put('/update', multipartMiddleware, pictureControllers.update)
pictureRouter.get('/delete', multipartMiddleware, pictureControllers.del)

module.exports = pictureRouter

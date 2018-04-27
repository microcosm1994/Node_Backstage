const express = require('express')
const path = require('path')
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()

const pictureRouter = express.Router()
const pictureControllers = require(path.join(__dirname, '../controllers/pictureControllers.js'))

pictureRouter.post('/upload', multipartMiddleware, pictureControllers.upload)
pictureRouter.post('/portrait', multipartMiddleware, pictureControllers.portrait)
pictureRouter.get('/detailed', multipartMiddleware, pictureControllers.detailed)
pictureRouter.get('/slogan_detailed', multipartMiddleware, pictureControllers.slogan_detailed)
pictureRouter.put('/update', multipartMiddleware, pictureControllers.update)
pictureRouter.put('/slogan_update', multipartMiddleware, pictureControllers.slogan_update)
pictureRouter.get('/del', multipartMiddleware, pictureControllers.del)
pictureRouter.get('/slogan_del', multipartMiddleware, pictureControllers.slogan_del)

module.exports = pictureRouter

const express = require('express')
const path = require('path')
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()

const pictureRouter=express.Router();
const pictureControllers=require(path.join(__dirname,'../controllers/pictureControllers.js'))

pictureRouter.post('/upload',multipartMiddleware, pictureControllers.upload)


module.exports=pictureRouter




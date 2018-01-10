const express=require('express');
const path=require('path')

const accountRouter=express.Router();
const accountControllers=require(path.join(__dirname,'../controllers/accountControllers.js'))

accountRouter.post('/login', accountControllers.login)
accountRouter.get('/upload', function (req, res) {
  res.end('upload')
})
module.exports=accountRouter

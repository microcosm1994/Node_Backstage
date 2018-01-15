const express=require('express');
const path=require('path')
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()

const accountRouter=express.Router();
const accountControllers=require(path.join(__dirname,'../controllers/accountControllers.js'))

accountRouter.get('/login',multipartMiddleware, accountControllers.login)
// accountRouter.get('/login',multipartMiddleware,(req,res)=>{
//   console.log(req.query);
//   res.json({status:0, message:'请求成功'})
// })
accountRouter.get('/upload', function (req, res) {
  res.end('upload')
})
module.exports=accountRouter

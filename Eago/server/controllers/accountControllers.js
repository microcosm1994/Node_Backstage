const fs = require('fs');
const path = require('path');
const qs = require('querystring')
const db = require(path.join(__dirname, '../mongo/db.js'))

exports.login = (req, res) => {
  let result = {status: 0, message: '登录成功'}
  db.find('persons', req.body, (data) => {
    if (data.length) {
      result.data = req.body
      res.json(result)
    } else {
      result.status = 1
      result.message = '密码错误'
      res.json(result)
    }
  })
}

exports.register=(req,res)=>{
  let result={status:0,message:'注册成功'}
  db.insert('persons',req.body,(data)=>{
    if(data){
      res.json(result)
    }else{
      result.status=1
      result.message='服务器错误'
      res.json(result)
    }
  })
}

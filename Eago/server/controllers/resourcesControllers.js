const fs = require('fs');
const path = require('path');
const db = require(path.join(__dirname, '../mongo/db.js'))

exports.all=(req,res)=>{
  let result = {status: 0, message: '成功'}
  db.find('library',{},(data)=>{
    if (data.length) {
      result.data=data
      res.json(result)
    } else {
      result.status = 0
      result.message = '没有数据'
      res.json(result)
    }
  })
}

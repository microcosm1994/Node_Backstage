const fs = require('fs');
const path = require('path');
const db = require(path.join(__dirname, '../mongo/db.js'))

exports.login = (req, res) => {
  let result = {status: 0, message: '登录成功'}
  console.log(req.query);
  db.find('persons', req.query, (data) => {
    if (data.length) {
      res.json(result)
    } else {
      result.status = 1
      result.message = '密码错误'
      res.json(result)
    }
  })
}

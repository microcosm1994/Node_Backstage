// const fs = require('fs')
const path = require('path')
// const qs = require('querystring')
const db = require(path.join(__dirname, '../mongo/db.js'))
const crypto = require('crypto')

exports.login = (req, res) => {
  let result = {status: 0, message: '登录成功'}
  let users = req.body
  const hash = crypto.createHash('md5')
  users.password = hash.update(users.password).digest('hex')
  db.find('persons', users, (data) => {
    if (data.length) {
      res.cookie('sid', crypto.createHash('md5').update(users.username).digest('hex'), {
        domain: 'localhost',
        path: '/'
      })
      res.json(result)
    } else {
      result.status = 1
      result.message = '用户名或密码错误'
      res.json(result)
    }
  })
}

exports.register = (req, res) => {
  let result = {status: 0, message: '注册成功'}
  let users = req.body
  const hash = crypto.createHash('md5')
  users.password = hash.update(users.password).digest('hex')
  db.find('persons', {username: users.username}, (data) => {
    if (data.length) {
      result.status = 2
      result.message = '该账号已经被注册'
      res.json(result)
    } else {
      db.insert('persons', users, (data) => {
        if (data) {
          result.status = 0
          result.message = '注册成功'
          res.json(result)
        } else {
          result.status = 1
          result.message = '服务器错误'
          res.json(result)
        }
      })
    }
  })
}

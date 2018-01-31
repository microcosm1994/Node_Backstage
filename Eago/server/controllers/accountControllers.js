// const fs = require('fs')
const path = require('path')
// const qs = require('querystring')
// const db = require(path.join(__dirname, '../mongo/db.js'))
const crypto = require('crypto')
const User = require(path.join(__dirname, '../models/users.js'))

exports.login = (req, res) => {
  let result = {status: 0, message: '登录成功'}
  let users = req.body
  const hash = crypto.createHash('md5')
  users.password = hash.update(users.password).digest('hex')
  User.findOne(users, (err, data) => {
    if (err) throw err
    if (data) {
      let id = data._id.toString()
      res.cookie('_id', id, {
        domain: 'localhost',
        path: '/'
      })
      result.data = data
      delete result.data.password
      console.log(data)
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
  if (users.username === 'admin') {
    result.status = 1
    result.message = '不能以“admin"为账号进行注册'
    res.json(result)
  }
  const hash = crypto.createHash('md5')
  users.password = hash.update(users.password).digest('hex')
  users.isAdmin = false
  User.findOne({username: users.username}, (err, data) => {
    if (err) throw err
    if (data) {
      result.status = 1
      result.message = '该账号已经被注册'
      res.json(result)
    } else {
      users.portrait = ''
      User.create(users, (err, data) => {
        if (err) throw err
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

exports.user = (req, res) => {
  let result = {status: 0, message: '获取成功'}
  let query = req.query
  console.log(query)
  User.findById(query._id, (err, data) => {
    if (err) throw err
    console.log(data)
    if (data) {
      result.data = data
      delete result.data.password
      res.json(result)
    } else {
      result.status = 1
      result.message = '服务器错误'
      res.json(result)
    }
  })
}

exports.getaccount = (req, res) => {
  let result = {status: 0, message: '获取成功'}
  User.find({}, (err, data) => {
    if (err) throw err
    if (data) {
      for (let i = 0; i < data.length; i++) {
        delete data[i].password
      }
      result.data = data
      res.json(result)
    } else {
      result.status = 1
      result.message = '服务器错误'
      res.json(result)
    }
  })
}

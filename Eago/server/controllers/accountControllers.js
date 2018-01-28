// const fs = require('fs')
const path = require('path')
// const qs = require('querystring')
const db = require(path.join(__dirname, '../mongo/db.js'))
const crypto = require('crypto')
const mongoose = require('mongoose')

exports.login = (req, res) => {
  let result = {status: 0, message: '登录成功'}
  let users = req.body
  const hash = crypto.createHash('md5')
  users.password = hash.update(users.password).digest('hex')
  db.find('persons', users, (data) => {
    if (data.length) {
      let id = data[0]._id.toString()
      res.cookie('_id', id, {
        domain: 'localhost',
        path: '/'
      })
      result.data = data[0]
      delete result.data.password
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
  db.find('persons', {username: users.username}, (data) => {
    if (data.length) {
      result.status = 2
      result.message = '该账号已经被注册'
      res.json(result)
    } else {
      users.portrait = ''
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

exports.user = (req, res) => {
  let result = {status: 0, message: '获取成功'}
  let query = req.query
  query._id = mongoose.Types.ObjectId(query._id)
  db.find('persons', query, (data) => {
    if (data.length) {
      result.data = data[0]
      delete result.data.password
      res.json(result)
    } else {
      result.status = 1
      result.message = '服务器错误'
      res.json(result)
    }
  })
}

exports.adminLogin = (req, res) => {
  let result = {status: 0, message: '已验证你的身份为管理员'}
  let users = req.body
  const hash = crypto.createHash('md5')
  users.password = hash.update(users.password).digest('hex')
  db.find('controller', users, (data) => {
    if (data.length) {
      let id = data[0]._id.toString()
      res.cookie('_id', id, {
        domain: 'localhost',
        path: '/'
      })
      result.data = data[0]
      delete result.data.password
      res.json(result)
    } else {
      result.status = 1
      result.message = '管理员密码错误'
      res.json(result)
    }
  })
}

exports.adminId = (req, res) => {
  let result = {status: 0, message: '获取成功'}
  let query = req.query
  query._id = mongoose.Types.ObjectId(query._id)
  db.find('controller', query, (data) => {
    if (data.length) {
      result.data = data[0]
      delete result.data.password
      res.json(result)
    } else {
      result.status = 1
      result.message = '服务器错误'
      res.json(result)
    }
  })
}

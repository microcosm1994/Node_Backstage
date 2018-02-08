// const fs = require('fs')
const path = require('path')
// const qs = require('querystring')
// const db = require(path.join(__dirname, '../mongo/db.js'))
const crypto = require('crypto')
const async = require('async')
const Source = require(path.join(__dirname, '../models/source.js'))
const Seting = require(path.join(__dirname, '../models/setings.js'))

exports.monthcount = (req, res) => {
  let result = {status: 0, message: '登录成功'}
  let monthArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  let dayArray = []
  let query = req.body
  let date = new Date()
  let year = date.getFullYear()
  for (let i = 0; i < monthArray.length; i++) {
    date.setMonth(monthArray[i])
    date.setDate(0)
    dayArray.push(date.getDate())
  }
  Source.find({
    date: {
      $gte: new Date(year + '-' + 1 + '-' + 1),
      $lte: new Date(year + '-' + 12 + '-' + 31)
    }
  }, (err, data) => {
    if (err) throw err
    if (data) {
      console.log(data)
      result.data = data
      res.json(result)
    }
  })
}

exports.terraceCount = (req, res) => {
  let result = {status: 0, message: '登录成功'}
  Seting.find({}, (err, data) => {
    if (err) throw err
    if (data) {
      let angleList = data.angleList
      let terraceList = data.terraceList
      Source.find()
    } else {
      result.status = 1
      result.message = '获取配置信息失败'
      res.json(result)
    }
  })
}

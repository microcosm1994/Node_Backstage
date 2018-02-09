// const fs = require('fs')
const path = require('path')
// const qs = require('querystring')
// const db = require(path.join(__dirname, '../mongo/db.js'))
const crypto = require('crypto')
const async = require('async')
const Source = require(path.join(__dirname, '../models/source.js'))
const Seting = require(path.join(__dirname, '../models/setings.js'))

exports.monthcount = (req, res) => {
  let result = {status: 0, message: '获取数据成功'}
  let monthArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  let dayArray = []
  let date = new Date()
  let year = date.getFullYear()
  let array = {}
  let terraceList = req.body
  let num = 0
  for (let i = 0; i < monthArray.length; i++) {
    date.setMonth(monthArray[i])
    date.setDate(0)
    dayArray.push(date.getDate())
  }
  async.each(terraceList, function (item, callback) {
    let terrace = item
    let terraceCount = {}
    async.each(monthArray, function (item, calback) {
      Source.find({
        terrace: terrace,
        date: {
          $gte: new Date(year + '-' + item + '-' + 1),
          $lte: new Date(year + '-' + item + '-' + dayArray[(item - 1)])
        }
      }, (err, data) => {
        if (err) throw err
        terraceCount['month' + item] = data
        calback(null)
      })
    }, function (err) {
      num++
      array['terrace' + num] = terraceCount
      result.data = array
      if (err) throw err
      callback(null)
    })
  }, function (err) {
    res.json(result)
    if (err) throw err
  })
}

exports.terraceCount = (req, res) => {
  let result = {status: 0, message: '数据获取成功'}
  Seting.find({}, (err, data) => {
    if (err) throw err
    if (data) {
      let angleList = data[0].angleList
      let terraceList = data[0].terraceList
      let terraceCount = []
      let angleCount = []
      async.each(terraceList, function (item, callback) {
        Source.count({terrace: item}, (err, data) => {
          if (err) throw err
          let obj = {}
          obj[item] = data
          terraceCount.push(obj)
          callback()
        })
      }, function (err) {
        if (err) throw err
        async.each(angleList, function (item, callback) {
          Source.count({'source.angle': item}, (err, data) => {
            if (err) throw err
            let obj = {}
            obj[item] = data
            angleCount.push(obj)
            callback()
          })
        }, function (err) {
          if (err) throw err
          result.angledata = angleCount
          result.terracedata = terraceCount
          res.json(result)
        })
      })
    }
  })
}

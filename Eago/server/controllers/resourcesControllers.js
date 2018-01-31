// const fs = require('fs')
const path = require('path')
const source = require(path.join(__dirname, '../models/source.js'))

exports.all = (req, res) => {
  let result = {status: 0, message: '成功'}
  source.find({}, (err, data) => {
    if (err) throw err
    if (data) {
      result.data = data
      res.json(result)
    } else {
      result.status = 0
      result.message = '没有数据'
      res.json(result)
    }
  })
}

exports.save = (req, res) => {
  let result = {status: 0, message: '保存成功'}
  let reqData = req.body
  console.log(reqData)
  source.create(reqData, (err, data) => {
    if (err) throw err
    console.log(data)
    if (data) {
      res.json(result)
    } else {
      result.status = 1
      result.message = '服务器错误'
      res.json(result)
    }
  })
}

exports.find = (req, res) => {
  let result = {status: 0, message: '查找成功'}
  let query = req.query
  for (let key in query) {
    let regexp = new RegExp(query[key])
    if (key === 'sourceName') query.sourceName = regexp
    if (key === 'country') query.country = regexp
    if (key === 'terrace') query.terrace = regexp
  }
  source.find(query, (err, data) => {
    if (err) throw err
    console.log(data)
    if (data) {
      result.data = data
      res.json(result)
    } else {
      result.status = 1
      result.message = '服务器错误'
      res.json(result)
    }
  })
}

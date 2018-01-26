// const fs = require('fs')
const path = require('path')
const db = require(path.join(__dirname, '../mongo/db.js'))

exports.all = (req, res) => {
  let result = {status: 0, message: '成功'}
  db.find('library', {}, (data) => {
    if (data.length) {
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
  db.insert('library', reqData, (data) => {
    let status = data.result.ok
    if (status === 1) {
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
    if (key === 'sourceName') {
      query.sourceName = regexp
    } else {
      query.country = regexp
    }
  }
  db.find('library', query, (data) => {
    if (data.length) {
      result.data = data
      res.json(result)
    } else {
      result.status = 1
      result.message = '服务器错误'
      res.json(result)
    }
  })
}

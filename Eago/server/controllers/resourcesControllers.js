// const fs = require('fs')
const path = require('path')
const source = require(path.join(__dirname, '../models/source.js'))

exports.all = (req, res) => {
  let result = {status: 0, message: '成功'}
  let page = (req.query.page - 1) * req.query.size
  let size = req.query.size - 0
  source.count({}, (err, data) => {
    if (err) throw err
    if (data) {
      let count = data
      source.find({}, (err, data) => {
        if (err) throw err
        if (data) {
          result.data = data
          result.count = count
          res.json(result)
        } else {
          result.status = 0
          result.message = '没有数据'
          res.json(result)
        }
      }).skip(page).limit(size)
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
  source.create(reqData, (err, data) => {
    if (err) throw err
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
  let query = {}
  let page = (req.query.page - 1) * req.query.size
  let size = req.query.size - 0
  for (let key in req.query) {
    let regexp = new RegExp(req.query[key])
    if (key === 'sourceName') query.sourceName = regexp
    if (key === 'country') query.country = regexp
    if (key === 'terrace') query.terrace = regexp
  }
  source.count(query, (err, data) => {
    if (err) throw err
    if (data) {
      let count = data
      source.find(query, (err, data) => {
        if (err) throw err
        if (data) {
          result.data = data
          result.count = count
          res.json(result)
        } else {
          result.status = 1
          result.message = '没有找相关到数据'
          res.json(result)
        }
      }).skip(page).limit(size)
    } else {
      result.status = 1
      result.message = '服务器错误'
      res.json(result)
    }
  })
}

exports.personal = (req, res) => {
  let result = {status: 0, message: '数据获取成功'}
  let page = (req.query.page - 1) * req.query.size
  let size = req.query.size - 0
  source.count({'user.username': req.cookies._name}, (err, data) => {
    if (err) throw err
    if (data) {
      let count = data
      source.find({'user.username': req.cookies._name}, (err, data) => {
        if (err) throw err
        if (data) {
          result.data = data
          result.count = count
          res.json(result)
        } else {
          result.status = 1
          result.message = '数据获取失败'
          res.json(result)
        }
      }).skip(page).limit(size)
    } else {
      result.status = 1
      result.message = '数据获取失败'
      res.json(result)
    }
  })
}

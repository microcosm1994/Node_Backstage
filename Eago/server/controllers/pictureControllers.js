// const fs = require('fs')
const path = require('path')
const db = require(path.join(__dirname, '../mongo/db.js'))
const oss = require('ali-oss')
const co = require('co')
const mongoose = require('mongoose')

const client = new oss.Wrapper({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIXx905tkhWOmO',
  accessKeySecret: '3UgvOW1islp4IVrvXiVk6JfL9eQp4n',
  bucket: 'eago-picture'
})
co(function* () {
  var result = yield client.putBucketACL('eago-picture', 'oss-cn-beijing', 'public-read')
  // console.log(result)
}).catch(function (err) {
  console.log(err)
})
exports.upload = (req, res) => {
  let file = req.files.file
  let fileName = file.name
  let filePath = file.path
  let result = {status: 0, message: '上传成功'}
  co(function* () {
    var results = yield client.put(fileName, filePath)
    result.data = {
      name: results.name,
      url: results.url,
      creatTime: results.res.headers.date
    }
    result.status = results.res.status
    res.json(result)
  }).catch(function (err) {
    if (err) {
      res.status(503)
      res.set('Content-Type', 'application/json charset=utf-8')
      res.json(err)
    }
  })
}

exports.detailed = (req, res) => {
  let result = {status: 0, message: '获取成功'}
  let query = req.query
  let id = mongoose.Types.ObjectId(query._id)
  query._id = id
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

exports.update = (req, res) => {
  let body = req.body.query
  let id = mongoose.Types.ObjectId(req.body._id)
  let query = {}
  let result = {status: 0, message: '素材内容已更新'}
  query._id = id
  db.update('library', query, body, (data) => {
    if (data.result.ok === 1) {
      res.json(result)
    } else {
      result.status = 1
      result.message = '服务器错误'
      res.json(result)
    }
  })
}

exports.del = (req, res) => {
  let result = {status: 0, message: '已删除'}
  let query = req.query
  let id = mongoose.Types.ObjectId(query._id)
  query._id = id
  db.del('library', query, true, (data) => {
    res.json(result)
  })
}
// co(function* () {
//   var result = yield client.listBuckets()
//   console.log(result)
// }).catch(function (err) {
//   console.log(err)
// })

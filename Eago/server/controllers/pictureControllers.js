// const fs = require('fs')
const path = require('path')
const oss = require('ali-oss')
const co = require('co')
const source = require(path.join(__dirname, '../models/source.js'))

const client = new oss.Wrapper({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIXx905tkhWOmO',
  accessKeySecret: '3UgvOW1islp4IVrvXiVk6JfL9eQp4n',
  bucket: 'eago-picture'
})
co(function* () {
  yield client.putBucketACL('eago-picture', 'oss-cn-beijing', 'public-read')
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
  source.findById(query._id, (err, data) => {
    if (err) throw err
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

exports.update = (req, res) => {
  let query = {}
  query.source = req.body.source
  query.sourceName = req.body.source.angle
  query.terrace = req.body.source.terrace
  query.country = req.body.source.country
  let result = {status: 0, message: '素材内容已更新'}
  source.findByIdAndUpdate(req.body._id, query, {new: true}, (err, data) => {
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

exports.del = (req, res) => {
  let result = {status: 0, message: '已删除'}
  source.findByIdAndRemove(req.query._id, (err, data) => {
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
// co(function* () {
//   var result = yield client.listBuckets()
//   console.log(result)
// }).catch(function (err) {
//   console.log(err)
// })

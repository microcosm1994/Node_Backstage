const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const accountRouter = require(path.join(__dirname, './router/accountRouter.js'))
const resourcesRouter = require(path.join(__dirname, './router/resourcesRouter.js'))
const pictureRouter = require(path.join(__dirname, './router/pictureRouter.js'))
// const db = require(path.join(__dirname, './mongo/db.js'))

const app = express()

app.use(bodyParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static('../dist'))

app.use(function (req, res, next) {
  let end = req.originalUrl.indexOf('?')
  let url = req.originalUrl.slice(0, end)
  if (end === -1) {
    url = req.originalUrl
  }
  let adminId = '5a6c277c048c364ddf629dfd'
  if (url !== '/account/login' && url !== '/account/adminLogin' && url !== '/account/register' && !req.cookies._id) {
    let result = {}
    result.status = 1
    result.message = '用户没有登录，所有操作将不被保存，请登录后再进行操作'
    return res.json(result)
  }
  if (req.cookies._id === adminId) {
    if (url === '/picture/del' || url === '/picture/update' || url === '/picture/upload' || url === '/picture/upload' || url === '/resources/save') {
      let result = {}
      result.status = 1
      result.message = '管理员账号只用来管理后台账号使用，无法进行素材库的操作'
      return res.json(result)
    }
  }
  next()
})

// app.use('/', (req, res) => {
//   console.log(req.cookies)
// })
app.use('/account', accountRouter)
app.use('/resources', resourcesRouter)
app.use('/picture', pictureRouter)
app.listen(3000, function () {
  console.log('3000')
})

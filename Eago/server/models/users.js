const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 声明一个数据集 对象
const userSchema = new Schema({
  nickname: {
    type: String
  },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  portrait: {
    type: String
  },
  isAdmin: {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now
  }
})
// 将数据模型暴露出去
module.exports = mongoose.model('users', userSchema)

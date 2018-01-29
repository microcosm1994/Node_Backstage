const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 声明一个数据集 对象
const sourceSchema = new Schema({
  source: {
    angle: {// 名称
      type: String
    },
    terrace: {// 平台
      type: String
    },
    opeavtor: {
      type: String
    },
    reveal: {// 展示
      type: String
    },
    click: {// 点击数
      type: String
    },
    CTR: {
      type: String
    },
    CPC: {
      type: String
    },
    CPM: {
      type: String
    },
    conversion: {
      type: String
    },
    CR: {
      type: String
    },
    consume: {// 消耗
      type: String
    },
    retrieve: {// 回收
      type: String
    },
    RI: {
      type: String
    },
    remarks: {// 备注
      type: String
    },
    country: {// 国家
      type: String
    }
  },
  titlePage: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    url: {
      type: String
    }
  },
  list: [],
  user: {
    uname: {
      type: String
    },
    id: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
})
// 将数据模型暴露出去
module.exports = mongoose.model('source', sourceSchema)

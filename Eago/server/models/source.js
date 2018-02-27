const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 声明一个数据集 对象
const sourceSchema = new Schema({
  sourceName: {
    type: String
  },
  terrace: {
    type: String
  },
  country: {
    type: String
  },
  type: {
    type: String
  },
  // Mixed: mongoose.Schema.Types.Mixed,
  source: {
    sourceName: {// 名称
      type: String
    },
    Angle: {// 分类
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
      type: Number
    },
    CTR: {
      type: Number
    },
    CPC: {
      type: Number
    },
    CPM: {
      type: Number
    },
    conversion: {// 转化
      type: String
    },
    Spent: {// 消耗
      type: Number
    },
    Revenue: {// 回收
      type: Number
    },
    ROI: {
      type: Number
    },
    profit: {// 收益
      type: Number
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
    date: {
      type: Date
    },
    nickname: {
      type: String
    },
    username: {
      type: String
    },
    portrait: {
      type: String
    },
    isAdmin: {
      type: Boolean
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

const fs = require('fs');
const path = require('path');
const db = require(path.join(__dirname, '../mongo/db.js'))
const oss = require('ali-oss')
const co = require('co')

const client = new oss.Wrapper({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIXx905tkhWOmO',
  accessKeySecret: '3UgvOW1islp4IVrvXiVk6JfL9eQp4n',
  bucket: 'eago-picture'
})

exports.upload=(req,res)=>{
  co(function* () {
    var result = yield client.put('object-key', 'local-file');
    console.log(result);
  }).catch(function (err) {
    console.log(err);
  });
}

co(function* () {
  var result = yield client.listBuckets();
  console.log(result);
}).catch(function (err) {
  console.log(err);
});


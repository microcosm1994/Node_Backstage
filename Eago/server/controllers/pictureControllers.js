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
co(function* () {
  var result = yield client.putBucketACL('eago-picture', 'oss-cn-beijing', 'public-read');
  // console.log(result);
}).catch(function (err) {
  console.log(err);
});
exports.upload=(req,res)=>{
  let file = req.files.file
  let fileName = file.name
  let filePath = file.path
  let result = {status: 0, message: '上传成功'}
  co(function* () {
    var results = yield client.put(fileName, filePath);
    result.data = {
      name: results.name,
      url: results.url,
      creatTime: results.res.headers.date
    }
    result.status = results.res.status
    res.json(result);
  }).catch(function (err) {
    if(err){
      res.status(503)
      res.set('Content-Type', 'application/json; charset=utf-8');
      res.json(err)
    }
  });
}


// co(function* () {
//   var result = yield client.listBuckets();
//   console.log(result);
// }).catch(function (err) {
//   console.log(err);
// });


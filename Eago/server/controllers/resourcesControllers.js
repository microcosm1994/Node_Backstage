const fs = require('fs');
const path = require('path');
const db = require(path.join(__dirname, '../mongo/db.js'))

exports.all=(req,res)=>{
  let result = {status: 0, message: '成功'}
  db.find('librar',{},(data)=>{
    console.log(data);
    if (data.length) {
      result.data=data
      res.json(result)
    } else {
      result.status = 0
      result.message = '没有数据'
      res.json(result)
    }
  })
}

exports.save=(req,res)=>{
  let result = {status: 0, message: '保存成功'}
  let reqData=req.body
  db.insert('library',reqData,(data)=>{
    let status=data.result.ok
    if(status==1){
      res.json(result)
    }else{
      result.status = 1
      result.message = '服务器错误'
      res.json(result)
    }
  })
}




// 图片上传
router.all('/upload2', upload.single('file'), function(req, res, next){
  // 文件路径
  var filePath = './' + req.file.path;
  // 文件类型
  var temp = req.file.originalname.split('.');
  var fileType = temp[temp.length - 1];
  var lastName = '.' + fileType;
  // 构建图片名
  var fileName = Date.now() + lastName;
  // 图片重命名
  fs.rename(filePath, fileName, (err) => {
    if (err) {
      res.end(JSON.stringify({status:'102',msg:'文件写入失败'}));
    }else{
      var localFile = './' + fileName;
      var key = fileName;

      // 阿里云 上传文件
      co(function* () {
        client.useBucket(ali_oss.bucket);
        var result = yield client.put(key, localFile);
        var imageSrc = 'http://image.hgdqdev.cn/' + result.name;
        // 上传之后删除本地文件
        fs.unlinkSync(localFile);
        res.end(JSON.stringify({status:'100',msg:'上传成功',imageUrl:imageSrc}));
      }).catch(function (err) {
        // 上传之后删除本地文件
        fs.unlinkSync(localFile);
        res.end(JSON.stringify({status:'101',msg:'上传失败',error:JSON.stringify(err)}));
      });
    }
  });
})

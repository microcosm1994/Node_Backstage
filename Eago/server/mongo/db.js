const mongodb=require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectId=mongodb.ObjectId
const Server=mongodb.Server;
const Db=mongodb.Db;
const server=new Server('127.0.0.1','27017',{auto_reconnect:true})
const db=new Db('eago',server)
function opencollections(colName,callback){
  db.open((err)=>{
    if(!err){
      db.collection(colName,(err,col)=>{
        if(!err){
          callback(col)
        }else{
          console.log(err);
        }
      })
    }else{
      throw err
    }
    db.close()
  })
}

exports.ObjectId =new ObjectId()
exports.find=(collection,query,callback)=>{
  opencollections(collection,(col)=>{
    col.find(query).toArray((err,data)=>{
      if(!err){
        callback(data);
      }else{
        console.log(err);
      }
    })
  })
}

exports.insert=(collection,query,callback)=>{
  opencollections(collection,(col)=>{
    col.insert(query,(err,data)=>{
      if(!err){
        callback(data);
      }else{
        console.log(err);
      }
    })
  })
}



exports.update=(collection,query,querydata,callback)=>{
  opencollections(collection,(col)=>{
    col.update(query,{ $set: querydata },(err,data)=>{
      if(!err){
        callback(data);
      }else{
        console.log(err);
      }
    })
  })
}


exports.delete=(collection,query,callback)=>{
  opencollections(collection,(col)=>{
    col.delete(query,(err,data)=>{
      if(!err){
        callback(data);
      }else{
        console.log(err);
      }
    })
  })
}


// const DbUrl='mongodb://127.0.0.1:27017/foobar'
// exports.ObjectId=ObjectId
//
// function getDb(callback){
//   MongoClient.connect(DbUrl,(err,db)=>{
//     if(err){
//       throw err
//     }
//     console.log('连接成功');
//     callback(err,db)
//   })
// }
//
// //查询一个的公用方法
// exports.find = (collectionName,collectionCondition,callback)=>{
//   //1.获取到db对象
//   getDb((err,db)=>{
//     //2.根据控制器传递过来的collectionName,collectionCondition 做事
//     db.collection(collectionName).find(collectionCondition,()=>{
//
//     })
//   })
// }



const express = require('express')
const path=require('path')
const accountRouter=require(path.join(__dirname,'./router/accountRouter.js'))

const app = express();


app.use(express.static('../dist'))

app.all('/', function (req, res) {
  res.end('hello')
})

app.use('/account', accountRouter);
app.listen(3000, function () {
  console.log('3000');
})

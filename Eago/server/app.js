const express = require('express')
const path=require('path')
const bodyParser=require('body-parser')
const accountRouter=require(path.join(__dirname,'./router/accountRouter.js'))
const resourcesRouter=require(path.join(__dirname,'./router/resourcesRouter.js'))
const pictureRouter = require(path.join(__dirname,'./router/pictureRouter.js'))

const app = express();


app.use(express.static('../dist'))
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.all('/', function (req, res) {
  res.end('hello')
})

app.use('/account', accountRouter);
app.use('/resources', resourcesRouter);
app.use('/picture', pictureRouter);
app.listen(3000, function () {
  console.log('3000');
})


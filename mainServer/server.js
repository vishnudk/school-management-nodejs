var createError = require('http-errors');
var express = require('express');
var bodyParser =require('body-parser');
var loginPage = require('./app');

// const apihtml = require("./apForHtml.js");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var opn = require('opn');
const fetch = require("node-fetch");

const open = require('open');
var XMLHttpRequest = require("xmlhttprequest");

var request = require('request');


var mongoose = require('mongoose');
var app = express();
const http = require('http').Server(app);
var urlParser = bodyParser.urlencoded({extended:false});
var url = require('url');

app.use("/login",loginPage);
// app.get('/apForHtml',apihtml);
app.use(express.static(path.join(__dirname, 'public')));
function test(){
  var i
  for (i =0;i<9;i++){
    console.log("how are you my boy");
  }
}


app.get('/',function(req,res){
  
studentD.find().then((studentData) => {
  console.log("this was supposed to be the data");
  res.json(studentData);
  // res.send("is this coming in the screen!!")

}).catch(err => {
  if(err){
      throw err;
  }
})

});
app.get('/get',function(req,res) {
  res.sendFile(path.join(__dirname,'getIndex.html'));
  console.log(__dirname);
  var tmpUserid = req.query.user_id;
  var tmpPasWRd = req.query.passWrd;
  console.log(req.query.user_id);
  console.log(req.query.passWrd);

});

app.get('/post1',function(req,res) {
  res.sendFile(path.join(__dirname,'index.html'));
  console.log(__dirname)
  var tmpUserid = req.query.user_id;
  var tmpPasWRd = req.query.passWrd;
  var q = url.parse(adr, true);
  
  if (tmpUserid == 'vishnu'){
    console.log("boss has arrived");
  }

});
app.post('/post', urlParser,function(req,res){
  console.log(req.body)

  request.post(
    'http://localhost:8080/api',
    { json: req.body },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
  );
  
  res.send("hello "+req.body.user_id);
  

});
app.get('/hello/:name',function(req,res){
  const name = req.params.name
  
  
  res.send("the name is "+name)
});
app.get('/home/aums',function(req,res){
  res.render('index',{title:'hello test 123'})
  opn("https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2F736x%2F15%2F26%2F62%2F152662373b8c743a65c1ae9f42b8f8a2.jpg&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F825636544170514839%2F&tbnid=h3H5-RmtWxU9MM&vet=12ahUKEwi8yrP218fsAhUq1HMBHUX6DVcQMygDegUIARC8AQ..i&docid=Jr7IM2PJuu82qM&w=570&h=835&itg=1&q=minion&hl=en-US&ved=2ahUKEwi8yrP218fsAhUq1HMBHUX6DVcQMygDegUIARC8AQ")
  console.log("test")
});
// app.listen(3000, "192.183.190.3");
// app.listen(3000, '0.0.0.0');
http.listen(80,function(req,res){
  
  console.log("the server has started at  ip:80")
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

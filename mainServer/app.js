var createError = require('http-errors');
var express = require('express');
var bodyParser =require('body-parser');
const axios = require('axios')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var opn = require('opn');
const fetch = require("node-fetch");
// var fetch = require('fetch');
const open = require('open');
var XMLHttpRequest = require("xmlhttprequest");

var request = require('request');


var app = express();
const http = require('http').Server(app)
var urlParser = bodyParser.urlencoded({extended:false});
var url = require('url');
const { resolve } = require('path');
const { rejects } = require('assert');
var adr = 'https://www.w3schools.com';
function test(){
  setTimeout(() => {
    console.log("this is the out put from the functino test");
  }, 1000);
 
}
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',function(req,res){
  console.log('server starte at http:\\127.0.0.1:9000 out put before the function call')
  test()
  console.log("this is the out put after the fucntion call")
  res.send("hello welcome to the hoem page of my web site")
  
  
});
app.get('/get',function(req,res) {
  res.sendFile(path.join(__dirname,'getIndex.html'));
  console.log(__dirname)
  var tmpUserid = req.query.user_id
  var tmpPasWRd = req.query.passWrd
  console.log(req.query.user_id)
  console.log(req.query.passWrd)

});

app.get('/post1',function(req,res) {

  console.log(req.params);
  res.sendFile(path.join(__dirname,'index.html'));
  // var d=window.document.getElementById('login_input').reset();

  console.log(__dirname)
  var tmpUserid = req.query.user_id;
  var tmpPasWRd = req.query.passWrd;
  var q = url.parse(adr, true);
  

});

function resquestFunction(req){
  return new Promise((resp,rejec)=>{
    axios
    .post('http://localhost:8080/api', { user_id:req.user_id, passWrd:req.passWrd })
    .then(res => {
      console.log("got the response from the database!");
      resp(res.data);
    })
    .catch(error => {
  
      console.error(error)
    })
  });

}
app.post('/post', urlParser,function(req,res){
  // alert("hello there ");
    console.log(req.body);
    console.log(req.body.user_id);
    console.log(req.body.passWrd);
    var data ={
      'user_id':req.body.user_id,
      'passWrd':req.body.passWrd
    }
     var p = resquestFunction(data);
     p.then((apiData)=>{
       console.log(apiData);
       if(apiData.body == true){
        //  axios
          // .get("http://localhost:801/signin");

       res.json(apiData);
       }
       else{
         res.send("The entered credentials were wrong, you will have to check the data or will have to make a new account!!");
          // axios
          // .get("http://localhost:801/signin");
        // app.location.replace("http://www.w3schools.com");
         console.log("some error occured!!");
        //  axios
        //   .get('http://localhost/login/');
       }
      });
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
// server.listen(3000, '192.168.42.195');
// ng serve --host 192.168.42.195 --port 3000
http.listen(3000,function(req,res){
  // res.send("this is a test ")
  console.log("the server has started at  ip:3000")
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

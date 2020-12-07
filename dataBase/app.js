


// mongodb password for altals=>  KFD7cusZGT6rVGV


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser =require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var MongoClient = require('mongodb').MongoClient;
const connection_string = "mongodb://localhost:27017/"
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { promises } = require('fs');
const { resolve } = require('path');
const { rejects } = require('assert');
var urlParser = bodyParser.urlencoded({extended:false});
var app = express();
var mongoose = require('mongoose');
const http = require('http').Server(app)
const schema = require("./studentSchema")
const studentD = mongoose.model("dataStudent",'studentData');


mongoose.connect('mongodb+srv://schoolUser:KFD7cusZGT6rVGV@schoolmanagementdatabas.13bcs.mongodb.net/schoolManagement?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true},() => {
  console.log("Database is connected");
});
app.use(express.json());

app.use("/creed",(req,res)=>{
  console.log("hello")
  res.send("this is the creed extension");
});

app.post("/api",urlParser,async (req,res)=>{
  studentD.find({name:req.body.json.user_id}).then((studentData) => {
    console.log("student data from the mongodb database=> "+studentData);
    if(req.body.json.passWrd == studentData[0].password){
    res.send(true);
    }
    else{
      res.send(false)
    }
    
  
  }).catch(err => {
       res.send(false);
    if(err){
        // throw err;
        console.log('err');
    }
  })

});


http.listen(8080,function(req,res){
  console.log("the server has started at  ip:8080");
})
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/login',function(req,res){
console.log("helo");
});
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




// mongodb password for altals=>  KFD7cusZGT6rVGV


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser =require('body-parser');
var cors = require('cors');
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
app.post("/singin",urlParser,async (req,res)=>{
      var studentData = {
        name: req.body.user_name,
        password:req.body.user_email,
        new:req.body.new
      }
      var stud = new studentD (studentData);
    
      stud.save().then(() => {
          console.log("New student data added!!")
      }).catch((err) => {
          if(err){
              throw err;
          }
      })
      res.send("a new student was added !!");
  // studentD.find({name:req.body.json.user_name}).then((studentData) => {
  //   console.log("student data from the mongodb database=> "+studentData);
  //   if(req.body.json.user_name == studentData[0].name){
  //   res.send(false);
  //   }
  //   else{
  //     res.send(false)
  //   }
    
  
  // }).catch(err => {
  //     var studentData = {
  //       name: req.body.user_name,
  //       password:req.body.user_email
  //     }
  //     var stud = new studentD (studentData)
    
  //     stud.save().then(() => {
  //         console.log("New student data added!!")
  //     }).catch((err) => {
  //         if(err){
  //             throw err;
  //         }
  //     })
  //     res.send(true);

  // })
  // res.send("hello new user!!");

});
app.options('/api', cors());
app.post("/api",urlParser,async (req,res)=>{
  studentD.find({name:req.body.user_id}).then((studentData) => {
   console.log(req);
    if(req.body.passWrd == studentData[0].password){
      console.log(req);
      console.log(true);
    res.json({body:true});

    }
    else{
      console.log(false);
      res.json({body:false});
    }
    
  
  }).catch(err => {
    console.log(false);
       res.json({body:false});
    if(err){
      
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

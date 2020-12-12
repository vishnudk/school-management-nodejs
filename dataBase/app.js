


// mongodb password for altals=>  KFD7cusZGT6rVGV

// url
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
var schema = require("./studentSchema")
const studentCredential = mongoose.model("credStudent","studentCredentials");
const dataSchema = mongoose.Schema;
const userDataSchema = new dataSchema({
  user_name:{
    type:String,
    require:true
},
user_address:{
    type:String,
    require:true
},
user_rollNumber:{
    type:String,
    require:false
},
user_department:{
    type:String,
    require:true
},
user_semester:{
    type:String,
    require:true
}
});
const studentDataMongodb = mongoose.model("studentData",userDataSchema,"studentData");


mongoose.connect('mongodb+srv://schoolUser:KFD7cusZGT6rVGV@schoolmanagementdatabas.13bcs.mongodb.net/schoolManagement?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true},() => {
  console.log("Database is connected");
});
app.use(express.json());
app.use(cors());
app.use("/creed",(req,res)=>{
  console.log("hello")
  res.send("this is the creed extension");
});
app.post("/singup",urlParser,async (req,res)=>{
  console.log("got the request!1");
      var studentDataUser = {
        name: req.body.user_name,
        password:req.body.user_password,
        // new:req.body.new
      }
      console.log("got the request!1");
      var stud = new  studentCredential(studentDataUser);
    
      stud.save().then(() => {
          console.log("New student data added!!")
          res.send(true);
      }).catch((err) => {
          if(err){
              throw err;
          }
      })
      
  
});
app.post("/credentials",urlParser,async (req,res)=>{
  console.log("got the request!1");
      var studentDataUser = {
        name: req.body.user_name,
        password:req.body.user_password,
        // new:req.body.new
        test:"hello"
      }
      console.log("got the request!1");
      var stud = new studentCredential (studentDataUser);
    
      stud.save().then(() => {
          console.log("New student credentials added!!")
          res.send(true);
      }).catch((err) => {
          if(err){
              throw err;
          }
      })
      // res.send("a new student was added !!");
  
});
app.post("/studentData",urlParser,async (req,res)=>{
  console.log("got the request!1 for the sutdent data entry ");
      var student_data = {
        user_name: req.body.name,
        user_address:req.body.address,
        user_rollNumber:req.body.roll_number,
        user_department:req.body.department,
        user_semester:req.body.semester
        // new:req.body.new
      }
      console.log("got the student data");
      var stud = new studentDataMongodb (student_data);
    
      stud.save().then(() => {
          console.log("New student data added!!")
          res.send(true);
      }).catch((err) => {
          if(err){
              throw err;
          }
      })
      
  
});

app.post("/api",urlParser,async (req,res)=>{
  studentCredential.find({name:req.body.user_id}).then((studentData) => {
   console.log(studentData._id);

    if(req.body.passWrd == studentData[0].password){
      // console.log(req);
      // console.log(true);
      
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

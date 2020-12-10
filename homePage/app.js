var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser =require('body-parser');
var urlParser = bodyParser.urlencoded({extended:false});

var app = express();
const http = require('http').Server(app)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/homePage1',(req,res)=>{
  // console.log("the name "+req.params.name);
  // console.log("the password is "+req.params.passWrd);
  res.render(path.join(__dirname,'views/index.jade'),{name:req.params.name,passWrd:"martine"});
});
app.post("/homePage",urlParser,async (req,res)=>{
  // res.render(path.join(__dirname,'views/index.jade'),{name:req.params.name,passWrd:"martine"})
  console.log("git request");
  res.send("got the request!1");
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// app.listen(802,'0.0.0.0');
http.listen(802,function(req,res){
  // console.log("the cookies are => "+req);
  console.log("the server has started at  ip:802");
})
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

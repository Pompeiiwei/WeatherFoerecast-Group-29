var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");


// let mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/CityName');
// mongoose.connection.on('open',function (error) {
//     if(error){
//     console.log("failed")
//     }else{
//         console.log("successfull")
//     }
// })
// //operate db
//     var Schema = mongoose.Schema;
//     var citySearch = new Schema({
//           id: Number,
//           name: String,
//           state: String,
//           country: String,
//           coord: Object
//     });
//     var cityModel = mongoose.model("citynames",citySearch);
//       cityModel.find({name:'12312312312'},function(err,docs){
//         if(!err){    
//           console.log(docs+"找到");
//         }else{
//             console.log(docs+"没找到");
//         }
//       })















var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var weatherRouter = require("./routes/weather");
var weatherForecastRouter = require("./routes/weatherForecast");

var defaultWeatherRouter = require("./routes/defaultWeather");
var defaultWeatherForecastRouter = require("./routes/defaultWeatherForecast");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  origin:['http://localhost:3000'],  //指定接收的地址
  methods:['GET','POST'],  //指定接收的请求类型
  alloweHeaders:['Content-Type','Authorization']  //指定header
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/weather", weatherRouter);
app.use('/weatherForecast',weatherForecastRouter);
app.use('/defaultWeather',defaultWeatherRouter);
app.use('/defaultWeatherForecast',defaultWeatherForecastRouter);

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

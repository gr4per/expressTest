var consul = require('consul')({ host: 'consul' })
consul.catalog.service.list(function (err, result) {
  if (err) {
    console.log("consul service discovery unavailable")
  }
  console.log('services found: ' + result)
})
var mysqlHost = '127.0.0.1';
var mysqlPort = '3306';
consul.catalog.service.nodes('mysql', function (err, result) {
  if (err) {
    console.log("no service discovery, using default settings for mySql");
  } else {
    console.log('mysql found: ' + JSON.stringify(result))
    mysqlHost = result[0].ServiceAddress
    mysqlPort = result[0].ServicePort
  }
  console.log('using mysql @ ' + mysqlHost + ':' + mysqlPort)
})

var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var index = require('./routes/index')
var users = require('./routes/users')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
console.log('__dirname =\'' + __dirname + '\'')
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
app.locals.title = 'expressTest'
console.log('init done')
module.exports = app

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var app = express();  // Mover esta línea antes de app.use(session(...))

// Configuración de sesión
app.use(session({
  secret: "78789689689790789689689798789", // Asegúrate de usar una clave secreta más segura en producción
  resave: false,             // Mejora el rendimiento y evita reescrituras innecesarias de sesión
  saveUninitialized: false,  // Crea una sesión solo si el usuario ha iniciado sesión
  cookie: { secure: false }  // Establece en true si usas HTTPS en producción
}));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

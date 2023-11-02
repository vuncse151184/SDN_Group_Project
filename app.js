const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');
require('./config/jwt');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

const mongoose = require("mongoose");
mongoose.set('strictQuery', true);


const adminRouter = require("./routes/adminRouter");
const recipeRouter = require("./routes/recipeRouter");
const ingredientRouter = require("./routes/ingredientRouter");
app.use(cors())
app.use('/admins', adminRouter);
app.use('/recipes', recipeRouter);
app.use('/ingredients', ingredientRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const url = 'mongodb://127.0.0.1:27017/group-project-SDN';
const connect = mongoose.connect(url);
connect.then((db) => {
  console.log("connect Ok");
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

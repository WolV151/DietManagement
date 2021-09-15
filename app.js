var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const flash  = require('express-flash');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const statsRouter = require('./routes/stats')
const editRouter = require('./routes/edit')
const catalogRouter = require('./routes/catalog')
const productDetailsRouter = require('./routes/productDetails')
const mealPlanRouter = require('./routes/mealPlan')
const mealPlanEditRouter = require('./routes/mealPlanEdit')
const mealPlanCreateRouter = require('./routes/mealPlanCreate')
const reportRouter = require('./routes/report')


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const initializePassport = require('./model/passport-config');

app.use(session({
  secret: "new-secret",
  resave: false,
  saveUninitialized: false
}))

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride('_method'))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/stats', statsRouter);
app.use('/edit', editRouter);
app.use('/catalog', catalogRouter);
app.use('/productDetails', productDetailsRouter);
app.use('/mealPlan', mealPlanRouter)
app.use('/report', reportRouter)
app.use('/mealPlanEdit', mealPlanEditRouter)
app.use('/mealPlanCreate', mealPlanCreateRouter)

app.delete('/logout', (req, res) =>{
  req.logOut();
  res.redirect('/login')
})

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

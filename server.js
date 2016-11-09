var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var db = require('./models');
// var isLoggedIn = require('./middleware/isLoggedIn');
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(flash());
app.use(session({
  secret: 'tacocat',
  resave: false,
  saveUninitialized: true
}));
// initialize the passport configuration and session as middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function (req, res) {
  res.redirect('/messages');
});

app.get('/query/', function (req, res) {
  console.log(req);
  db.message.findAll({
    where: {
      msg: {
        $like: '%Boy%'
      }
    }, include: [db.comment]
  }).then(function (result) {
    res.json(result)
  });
});

app.use('/auth', require('./controllers/auth'));
app.use('/messages', require('./controllers/message'));

var server = app.listen(process.env.PORT || 3000, function (req, res) { console.log('Listening to port'); });

module.exports = server;

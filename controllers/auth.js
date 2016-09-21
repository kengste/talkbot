var express = require('express');
var passport = require('../config/ppConfig');
var db = require('../models');
var router = express.Router();

router.get('/signup', function (req, res) {
  res.render('auth/signup');
});

// find or create a user, providing the name and password as default values
router.post('/signup', function (req, res) {
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function (user, created) {
    if (created) {
      // FLASH
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req, res);
    } else {
      // FLASH
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(function (error) {
    // FLASH
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  });
});
router.get('/login', function (req, res) {
  res.render('auth/login');
});
// modify the signup route to call the passport.authenticate function so user is logged in after signup
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}));
// call a function attached to req to log out
router.get('/logout', function (req, res) {
  req.logout();
  req.flash('success', 'You have logged out');
  res.redirect('/');
});

module.exports = router;

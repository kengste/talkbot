var express = require('express');
var db = require('../models');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');

router.get('/post', isLoggedIn, function (req, res) {
  db.message.findOne().then(function (message) {
  // load posts for this message
    message.getPosts().then(function (posts) {
      res.redirect('/');
    });
  });
});

router.post('/', isLoggedIn, function (req, res) {
  db.message.findOne().then(function (message) {
    message.createPost({
      reply: req.body.reply,
      postId: req.body.id
    }).then(function (comment) {
      res.json(comment);
    });
  });
});

module.exports = router;

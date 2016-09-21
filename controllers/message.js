var express = require('express');
var db = require('../models');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');

// CREATE - show new message form
router.get('/post', isLoggedIn, function (req, res) {
  res.render('messages/post');
});
// CREATE - post new message
router.post('/', isLoggedIn, function (req, res) {
  db.message.create({
    user: req.user.name,
    msg: req.body.msg
  }).then(function (created) {
    console.log(created);
    res.redirect('/messages/');
  });
});

// READ all messages
router.get('/', function (req, res) {
  db.message.findAll().then(function (messages) {
    res.render('messages/list', {messages: messages});
  });
});

// READ all messages
router.get('/display', function (req, res) {
  db.message.findAll().then(function (apple) {
    res.json(apple);
  });
});


// READ message
router.get('/:id', isLoggedIn, function (req, res) {
  db.message.find({
    where: {id: req.params.id},
    attributes: ['user', 'msg', 'id']
  }).then(function (message) {
    res.json(message);
  });
});

// DELETE - delete specific message
router.delete('/:id', isLoggedIn, function (req, res) {
  db.message.destroy({
    where: { id: parseInt(req.params.id) }
  }).then(function () {
    res.redirect('/messages/');
  });
});

// UPDATE - edit form, pre-populated with data
router.get('/:id/edit', isLoggedIn, function (req, res) {
  db.message.find({
    where: {id: parseInt(req.params.id)}
  }).then(function (tobeupdated) {
    res.render('messages/edit', {data: tobeupdated});
  });
});
// UPDATE - accept info from form, show updated message
router.put('/:id', isLoggedIn, function (req, res) {
  db.message.update({
    msg: req.body.msg
  }, {
    where: {
      id: req.params.id
    }
  }).then(function () {
    res.redirect('/messages/');
  });
});

module.exports = router;

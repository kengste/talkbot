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
  db.message.count().then(function (count) {
    var pageSize = 5;
    var pageCount = count / pageSize;
    var currentPage = 1;
    if (typeof req.query.page !== 'undefined') {
      currentPage = +req.query.page;
    }
    db.message.findAll({

      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
      order: [
        [ 'id', 'ASC'],
        [ db.comment, 'id', 'DESC']
      ],
      include: [db.comment]
    }).then(function (messages) {
      console.log(count);
      res.render('messages/list', {
        messages: messages,
        pageCount: pageCount,
        currentPage: currentPage
      });
    });
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

// POST comment
router.post('/:id/comments', isLoggedIn, function (req, res) {
  db.message.find({
    where: {id: req.params.id}
  }).then(function (message) {
    message.createComment({
      reply: req.body.reply,
      writer: req.user.name
    }).then(function (post) {
      res.redirect('/messages/');
    });
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
// router.get('/:id/edit', isLoggedIn, function (req, res) {
//   db.message.find({
//     where: {id: parseInt(req.params.id)}
//   }).then(function (tobeupdated) {
//     res.render('messages/list', {data: tobeupdated});
//   });
// });
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

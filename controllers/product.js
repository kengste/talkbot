var express = require('express');
var db = require('../models');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');

// CREATE - show new product form
router.get('/post', isLoggedIn, function (req, res) {
  res.render('products/post');
});
// CREATE - post new product
router.post('/', isLoggedIn, function (req, res) {
  db.product.create({
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price
  }).then(function (created) {
    console.log(created);
    res.redirect('/products/');
  });
});

// READ all products
router.get('/', function (req, res) {
  db.product.findAll().then(function (products) {
    res.render('products/list', {products: products});
  });
});

// READ all products
router.get('/display', function (req, res) {
  db.product.findAll().then(function (apple) {
    res.json(apple);
  });
});

// READ product
router.get('/:id', isLoggedIn, function (req, res) {
  db.product.find({
    where: {id: req.params.id},
    attributes: ['user', 'msg', 'id']
  }).then(function (product) {
    res.json(product);
  });
});

// DELETE - delete specific product
router.delete('/:id', isLoggedIn, function (req, res) {
  db.product.destroy({
    where: { id: parseInt(req.params.id) }
  }).then(function () {
    res.redirect('/products/');
  });
});

// UPDATE - edit form, pre-populated with data
router.get('/:id/edit', isLoggedIn, function (req, res) {
  db.product.find({
    where: {id: parseInt(req.params.id)}
  }).then(function (tobeupdated) {
    res.render('products/edit', {data: tobeupdated});
  });
});
// UPDATE - accept info from form, show updated product
router.put('/:id', isLoggedIn, function (req, res) {
  db.product.update({
    msg: req.body.msg
  }, {
    where: {
      id: req.params.id
    }
  }).then(function () {
    res.redirect('/products/');
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var querystring = require('querystring');

var five = require('johnny-five');
var controller = require('../../public/js/robot.js');

mongoose.connect('mongodb://localhost:27017/drinken');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log('db connected');
});

let drinkSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  img: String,
  ingredients: [{
    drink: String,
    amt: Number
  }]
}, {collection: 'drinks'});

let Drink = mongoose.model('drink', drinkSchema);

//Create Drink in DB
router.post('/newdrink', (req, res) => {
  new Drink(req.body).save((err) => {
    if (err) { res.send(err); }
    res.send('done');
  });
});

//Get all drinks from DB
router.get('/getalldrinks', (req,res) => {
  Drink.find({}, (err, drinks) => {
    if (err) { res.send(err); }
    res.json(drinks);
  });
});

//Get one drink from DB by name
router.get('/getdrink/:name', (req,res) => {
  Drink.find({name: req.params.name}, (err, drink) => {
    if (err) { res.send(err); }
    res.json(drink);
  });
});

//Update Drink in DB
router.post('/updatedrink', (req, res) => {
  Drink.update({_id: req.body._id}, req.body, (err, data) => {
    if (err) { res.send(err); }
    res.send(data);
  });
});

//Delete drink
router.get('/deletedrink/:name', (req, res) => {
  Drink.find({name: req.params.name}).remove(() => {
    res.send('done');
  });
});

//Test Pump
router.get('/testpump', (req, res) => {
  controller.testPump();
  res.send('done');
});

//Pour Drink
router.get('/pourdrink', (req, res) => {
  controller.pourDrink(req.query);
  res.send('done');
});

module.exports = router;

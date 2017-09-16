const express = require('express');
const router = express.Router();
var five = require('johnny-five');
var mongoose = require('mongoose');
var controller = require('../../public/js/robot.js');

var board, pump0, pump1, pump2, pump3, pump4;

board = controller.board;
pump0 = controller.pump0;
pump1 = controller.pump1;
pump2 = controller.pump2;
pump3 = controller.pump3;
pump4 = controller.pump4;

mongoose.connect('mongodb://localhost:27017/drinken');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log('db connected')
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
  console.log(req.body);
  Drink.update({_id: req.body._id}, req.body, (err, data) => {
    if (err) { res.send(err); }
    res.send(data);
  });
});

//test pump
router.get('/testpump', (req, res) => {
  controller.pump(pump0, 1000);
  // if (err) { res.send(err); }
  res.send('done')
});

//Delete drink
router.get('/deletedrink/:name', (req, res) => {
  Drink.find({name: req.params.name}).remove(() => {
    res.send('done');
  });
});

module.exports = router;

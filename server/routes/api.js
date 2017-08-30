const express = require('express');
const router = express.Router();

var mongoose = require('mongoose');

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
  ingredients: Array
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
router.get('/getdrink/:id', (req,res) => {
  Drink.find({_id: req.params.id}, (err, drink) => {
    if (err) { res.send(err); }
    res.json(drink);
  });
});

//Update Drink in DB
router.post('/updatedrink', (req, res) => {
  Drink.update({_id: req.body.id}, req.body, (err, data) => {
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

module.exports = router;
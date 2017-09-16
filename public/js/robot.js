var board, pump0, pump1, pump2, pump3, pump4;

var five = require('johnny-five'); //

board = new five.Board();
board.on('ready', function () {
  pump0 = new five.Led(7);
  pump1 = new five.Led(6);
  pump2 = new five.Led(5);
  pump3 = new five.Led(4);
  pump4 = new five.Led(3);

  console.log("Drinken Ready");
});

function pourDrink(ingredients, size) {
  console.log("Dispensing Drink");
  var counter;
  var multiplier = divide50ByTotalSum(ingredients);
  for (var i in ingredients) {
    var ms = calculateDuration(ingredients[i].amt, multiplier, size);
    var activePump = determinePump(counter);
    pump(activePump, ms);
    counter++;
  }
};

function divide50ByTotalSum(ingredients) {
  console.log('divide50ByTotalSum');
  var totalSum;
  for (var i in ingredients) {
    totalSum += ingredients[i].amt;
  }
  var multiplier = 50 / totalSum;
  return multiplier;
}

function calculateDuration(amt, multiplier, size) {
  console.log('calculateDuration');
  var duration;
  if ( size === "small") {
    duration = amt * multiplier * 2;
  } else if ( size === "medium") {
    duration = amt * multiplier * 4;
  } else {
    duration = amt * multiplier * 10;
  }
  return duration;
}

function determinePump(counter) {
  console.log('determinePump');
  if (counter === 0) {
    // pump0 = new five.Led(7);
    return pump0;
  } else if (counter === 1) {
    // pump0 = new five.Led(6);
    return pump1;
  } else if (counter === 2) {
    // pump0 = new five.Led(5);
    return pump2;
  } else if (counter === 3) {
    // pump0 = new five.Led(4);
    return pump3;
  } else {
    // pump0 = new five.Led(3);
    return pump4;
  }
}

function pump(pump, delay) {
  console.log('pump');
  pump.on();
  setTimeout(function(){
    pump.off();
  }, delay);
}

function testPump() {
  pump0.blink();
}

module.exports = {
  pump: pump,
  determinePump: determinePump,
  calculateDuration: calculateDuration,
  divide50ByTotalSum: divide50ByTotalSum,
  pourDrink: pourDrink,
  testPump: testPump,
  board: board
}

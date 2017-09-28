var board, pump0, pump1, pump2, pump3, pump4;

var five = require('johnny-five');

board = new five.Board();
board.on('ready', function () {
  pump0 = new five.Led(7);
  pump1 = new five.Led(6);
  pump2 = new five.Led(5);
  pump3 = new five.Led(4);
  pump4 = new five.Led(3);
  console.log("Drinken Ready");
});

function pourDrink(parameters) {
  console.log(parameters + " reached robot.js");
  if (params.pump === "pump0") {
    pump0.on();
    setTimeout(function(){ pump0.off(); }, params.delay);
  } else if (params.pump === "pump1") {
    pump1.on();
    setTimeout(function(){ pump1.off(); }, params.delay);
  } else if (params.pump === "pump2") {
    pump2.on();
    setTimeout(function(){ pump2.off(); }, params.delay);
  } else if (params.pump === "pump3") {
    pump3.on();
    setTimeout(function(){ pump3.off(); }, params.delay);
  } else if (params.pump === "pump4") {
    pump4.on();
    setTimeout(function(){ pump4.off(); }, params.delay);
  }
}

function testPump() {
  // pump0.on();
  pump1.on();
  // pump2.on();
  // pump3.on();
  // pump4.on();
  setTimeout(function(){
    // pump0.off();
    pump1.off();
    // pump2.off();
    // pump3.off();
    // pump4.off();
  }, 10000);
}

module.exports = {
  pourDrink: pourDrink,
  testPump: testPump
}

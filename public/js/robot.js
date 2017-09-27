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

function pourDrink(pump) {
  console.log(pump + " pumping");
  if (pump === "pump0") {
    pump0.on();
  } else if (pump === "pump1") {
    pump1.on();
  } else if (pump === "pump2") {
    pump2.on();
  } else if (pump === "pump3") {
    pump3.on();
  } else if (pump === "pump4") {
    pump4.on();
  }
}

function stopPump(pump) {
  console.log(pump + ' has stopped');
  if (pump === "pump0") {
    pump0.off();
  } else if (pump === "pump1") {
    pump1.off();
  } else if (pump === "pump2") {
    pump2.off();
  } else if (pump === "pump3") {
    pump3.off();
  } else if (pump === "pump4") {
    pump4.off();
  }
}

function testPump() {
  pump0.on();
  pump1.on();
  pump2.on();
  pump3.on();
  // pump4.on();
  setTimeout(function(){
    pump0.off()
    pump1.off();
    pump2.off();
    pump3.off();
    // pump4.off();
  }, 10000);
}

module.exports = {
  pourDrink: pourDrink,
  stopPump: stopPump,
  testPump: testPump,
  board: board
}

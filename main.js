var CIRCLE_RADIUS = 4;
var MAX_THROTTLE = 1000;
var mouse_down = false;
var serialOpen = false;

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var sp = new SerialPort("/dev/tty.usbserial-AL00EY1D", {
    baudrate: 9600,
    parser: serialport.parsers.readline("\n")
}, false);
var x = 0;

$(function(ev) {
    $('#circle').css({width: CIRCLE_RADIUS * 2, height: CIRCLE_RADIUS * 2});
    $(document).mousemove(function(e) {
	    if (mouse_down) {
		var throttle = px_to_throttle(e.pageX);
		set_throttle(throttle);
	    }
    });

    $(document).mousedown(function (e) {
	mouse_down = true;
	var throttle = px_to_throttle(e.pageX);
	set_throttle(throttle);
    }).mouseup(function(e) {
	mouse_down = false;
	recenter();
    });
    set_throttle(0);
});

// -MAX_THROTTLE to MAX_THROTTLE
function set_throttle(throttle) {
    if (throttle > MAX_THROTTLE) {
	throttle = MAX_THROTTLE;
    } else if (throttle < -MAX_THROTTLE) {
	throttle = -MAX_THROTTLE;
    }
    if (serialOpen) {
	sp.write(throttle + "\n");
    }

    var x = throttle_to_px(throttle);
    $('#circle').css({left: x - CIRCLE_RADIUS});
};

function throttle_to_px(throttle) {
    return throttle / 2 + MAX_THROTTLE / 2 + 100;
}

function px_to_throttle(px) {
    return 2 * (px - 100) - MAX_THROTTLE;
}

function recenter(x, y) {
    set_throttle(0);
};




//var doThing = function() {
  //sp.write("num " + x++ + "\n");
//};

sp.open(function () {
  sp.on('data', function(data) {
    console.log('received ' + data.length + ' bytes:' + data);
    if (data.substr(0, 5) == "Start") {
      console.log('YES');
      serialOpen = true;
    }
  });
  console.log('open');
});


var CIRCLE_RADIUS = 5;
var MAX_THROTTLE = 1000;
var moving = false;
$(function(ev) {
    console.log("DOM fully loaded and parsed");
    $('#circle').css({width: CIRCLE_RADIUS * 2, height: CIRCLE_RADIUS * 2});
    $(document).mousemove(function(e) {
	    if (moving) {
		var throttle = px_to_throttle(e.pageX);
		setThrottle(throttle);
	    }
    });

    $(document).mousedown(function (e) {
	moving = true;
    }).mouseup(function(e) {
	moving = false;
	recenter();
    });
});

// -MAX_THROTTLE to MAX_THROTTLE
function setThrottle(throttle) {
    console.log('set at', throttle);
    if (throttle > MAX_THROTTLE) {
	throttle = MAX_THROTTLE;
    } else if (throttle < -MAX_THROTTLE) {
	throttle = -MAX_THROTTLE;
    }
    var x = throttle_to_px(throttle);
    $('#circle').css({left: x - CIRCLE_RADIUS});
};

function throttle_to_px(throttle) {
    return throttle / 2 + MAX_THROTTLE / 2;
}

function px_to_throttle(px) {
    return 2 * px - MAX_THROTTLE;
}

function recenter(x, y) {
    setThrottle(0);
};

var CIRCLE_RADIUS = 4;
var MAX_THROTTLE = 1000;
var mouse_down = false;
$(function(ev) {
    console.log("DOM fully loaded and parsed");
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
    console.log('set at', throttle);
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

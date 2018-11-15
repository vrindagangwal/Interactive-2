var DateTime = luxon.DateTime;

const MISSISSIPI_BOX = [
	30.1477890014648,
	34.9960556030273,
	-91.6550140380859,
	-88.0980072021484
]

$(document).ready(function() {
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
			console.log(position);
			if (in_bounding_box(position.coords.latitude, position.coords.longitude, MISSISSIPI_BOX)) {
				do_mississipi();
			} else {
				$('h1').text('GO TO MISSISSIPI');
			}
		});
	} else {
	  do_mississipi();
	}
});

function in_bounding_box(x, y, box) {
	return x >= box[0] && x <= box[1] && y >= box[2] && y <= box[3];
}

function do_mississipi() {
	showCountdown($('h1'), $('img'));
	setInterval(function() { showCountdown($('h1'), $('img')) }, 10000);
}

function showCountdown(element, image) {
	var counter = -1;
	var countdown = setInterval(function() {
		console.log(counter);
		counter++;
		image.hide();
		if (counter === 0) {
			element.text(DateTime.fromObject({zone: 'UTC-6'}).toLocaleString(DateTime.TIME_WITH_SECONDS));
		}
		else if (counter < 10) {
			element.text(counter + ' MISSISSIPI');
			image.attr('src', 'images/' + counter + '.jpg');
			let top = Math.random() < 0.5 ? "2%" : "63%";
			image.css('top', top);
			image.css('left', (Math.floor(Math.random() * (60 - 5)) + 5) + "%");
			image.show();
		}
		else {
			clearInterval(countdown);
		}
	}, 1000);
}
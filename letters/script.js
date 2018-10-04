$(document).ready(function() {
	$('.quote-wrapper').show();
	$('.stage-wrapper').hide();
	$('.bazinga-wrapper').hide();

	$('.quote-button').click(function() {
		$('.quote-wrapper').show();
		$('.stage-wrapper').hide();
		$('.bazinga-wrapper').hide();
	});

	$('.alphabet-button').click(function() {
		$('.quote-wrapper').hide();
		$('.stage-wrapper').show();
		$('.bazinga-wrapper').hide();
	});

	$('.bazinga-button').click(function() {
		$('.quote-wrapper').hide();
		$('.stage-wrapper').hide();
		$('.bazinga-wrapper').show();
	});
});


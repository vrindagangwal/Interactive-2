interact('.piece')
	.draggable({
		inertia: true,
    	// keep the element within the area of it's parent
	    restrict: {
	      restriction: "parent",
	      endOnly: true,
	      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
	    },
	    // enable autoScroll
	    autoScroll: true,

	    // call this function on every dragmove event
    	onmove: dragMoveListener
	});

// enable draggables to be dropped into this
interact('.puzzle').dropzone({
	// only accept elements matching this CSS selector
	accept: '.piece',
	// Require a 75% element overlap for a drop to be possible
	overlap: 'pointer',

	// listen for drop related events:

	ondropactivate: function (event) {
	// add active dropzone feedback
		event.target.classList.add('puzzle-active');
	},
	ondragenter: function (event) {
		var draggableElement = event.relatedTarget,
		    dropzoneElement = event.target;

		// feedback the possibility of a drop
		dropzoneElement.classList.add('puzzle-target');
		draggableElement.classList.add('can-drop');
		// draggableElement.textContent = 'Dragged in';
	},
	ondragleave: function (event) {
	// remove the drop feedback style
		event.target.classList.remove('puzzle-target');
		event.relatedTarget.classList.remove('can-drop');
	},
	ondrop: function (event) {
		// event.relatedTarget.textContent = 'Dropped';
		var piece = event.relatedTarget,
		    puzzle = event.target;

		// console.log(puzzle.offsetLeft, puzzle.offsetTop);
		// console.log(document.querySelector('.dashed').offsetLeft, document.querySelector('.container').offsetTop);
		if (setPiece($(piece), $(puzzle))) {
			if (Object.values(puzzle_solved).every(function(v) { return v;})) {
				onPuzzleSolved();
			}
		}
	},

	ondropdeactivate: function (event) {
		// remove active dropzone feedback
		event.target.classList.remove('puzzle-active');
		event.target.classList.remove('puzzle-target');
	}
});

function setPiece(piece, puzzle) {
	var puzzleOffset = $(puzzle).offset();
	// var dashedOffset = $('.dashed').offset();
	// var contOffset = $('.container').offset();
	//var x = puzzleOffset.left + dashedOffset.left + contOffset.left + offsets[puzzle.attr('id')].left;
	//var y = puzzleOffset.top + dashedOffset.top + contOffset.top + offsets[puzzle.attr('id')].top;

	var x = puzzleOffset.left + offsets[puzzle.attr('id')].left;
	var y = puzzleOffset.top + offsets[puzzle.attr('id')].top;

	piece.attr('data-x', x);
	piece.attr('data-y', y);
	piece.css('left', x + 'px');
	piece.css('top', y + 'px');

	if (puzzle.attr('id') === piece.attr('id').substring(6, 7)) {
		puzzle_solved[puzzle.attr('id')] = true;
		return true;
	}

	return false;
}

function setRandomPiece(piece) {
	var offset = $('.dashed').offset();
	var x = offset.left + randomPlace[piece.attr('id').substring(6, 7)].left;
	var y = offset.top + randomPlace[piece.attr('id').substring(6, 7)].top;

	piece.attr('data-x', x);
	piece.attr('data-y', y);
	piece.css('left', x + 'px');
	piece.css('top', y + 'px');
}

function onPuzzleSolved() {
	$('.piece').fadeOut();
	$('.painting').fadeIn();
	$('.puzzle').hide();
	$('.next').show();
	$('.content').text($('.hidden-content').text());
}

function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.top = y + 'px';
    target.style.left = x + 'px';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}
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

const puzzle_solved = {
	a: false,
	b: false,
	c: false,
	d: false,
	e: false,
	f: false,
	g: false
}

// const puzzle_solved = {
// 	a: true,
// 	b: true,
// 	c: true,
// 	d: true,
// 	e: true,
// 	f: true,
// 	g: true
// }

const offsets = {
	a: {
		top: -5,
		left: 0
	},
	b: {
		top: -53,
		left: 0
	},
	c: {
		top: -23,
		left: -26
	},
	d: {
		top: -43,
		left: -4
	},
	e: {
		top: -35,
		left: -4
	},
	f: {
		top: 1,
		left: -66
	},
	g: {
		top: -21,
		left: 0
	}
}

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
		// event.relatedTarget.textContent = 'Dragged out';
	},
	ondrop: function (event) {
		// event.relatedTarget.textContent = 'Dropped';
		console.log(event.target.id);
		var piece = event.relatedTarget,
		    puzzle = event.target;

		// console.log(puzzle.offsetLeft, puzzle.offsetTop);
		// console.log(document.querySelector('.dashed').offsetLeft, document.querySelector('.container').offsetTop);

		console.log((puzzle.offsetLeft 
			+ document.querySelector('.dashed').offsetLeft 
			+ document.querySelector('.container').offsetLeft), 
		(puzzle.offsetTop 
			+ document.querySelector('.dashed').offsetTop 
			+ document.querySelector('.container').offsetTop));

		var x = (puzzle.offsetLeft 
			+ document.querySelector('.dashed').offsetLeft 
			+ document.querySelector('.container').offsetLeft)
			+ offsets[puzzle.id].left;
		var y = (puzzle.offsetTop 
			+ document.querySelector('.dashed').offsetTop 
			+ document.querySelector('.container').offsetTop)
			+ offsets[puzzle.id].top;

		piece.setAttribute('data-x', x);
		piece.setAttribute('data-y', y);
		piece.style.left = x + 'px';
		piece.style.top = y + 'px';

		if (puzzle.id === piece.id.substring(6, 7)) {
			puzzle_solved[puzzle.id] = true;
			console.log(puzzle_solved);
			window.puzzle_solved = puzzle_solved;
			if (Object.values(puzzle_solved).every(function(v) { return v;})) {
				$('.piece').fadeOut();
				$('.painting').fadeIn();
			}
		}

	},
	ondropdeactivate: function (event) {
		// remove active dropzone feedback
		event.target.classList.remove('puzzle-active');
		event.target.classList.remove('puzzle-target');
	}
});
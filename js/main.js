"strict mode";
(function() {

	/* ------- Start Menu ------- */
	// Hide Everything but the start menu
	$('.board').hide();
	$('#finish').hide();
	// Start New Game
	$('.button').on('click', function() {
		$('#start').hide();
		$('#finish').hide();
		$('.board').show();
		// When game resets
		turn = 1;
		player = 'url(img/o.svg)';
		$('.box').removeClass('box-filled-1');
		$('.box').removeClass('box-filled-2');
		$('.box').css('background-image', 'url()');
		oMoves = [];
		xMoves = [];
		// O starts first
		$('#player1').addClass('active');
		$('#player2').removeClass('active');
	})
	/* ---- Turn Taking between Player 1 and Player 2----- */
	// First turn
	var turn = 1;
	var player = 'url(img/o.svg)';
	// Click Function on boxes
	function calculateTurn() {
		// if box has already been clicked then end function
		if ($(this).hasClass('box-filled-1') || $(this).hasClass('box-filled-2')) {
			return;
		} else {
			// Odd turns are O's and Even turns are X's
			// if box is empty add a background image to box and end turn
			if (turn % 2 === 0) {
				// O is active
				$('#player1').addClass('active');
				player = 'url(img/o.svg)';
				$('#player2').removeClass('active');
				// Set background image to x
				$(this).addClass('box-filled-2');
				// Records Player 2 move
				recordMove(this, xMoves);
				// Next Turn
				turn += 1;
				// Determine Winner
				determineWinner(xMoves);
			} else {
				// X is active
				$('#player2').addClass('active');
				player = 'url(img/x.svg)';
				$('#player1').removeClass('active');
				// set background image to o
				$(this).addClass('box-filled-1');
				// Records Player 1 move
				recordMove(this, oMoves);
				// Next Turn
				turn += 1;
				// Determine Winner
				determineWinner(oMoves);
			}
		}
	}
	// Click on box
	$('.box').on('click', calculateTurn);
	/* ---------------- Hover -------------- */
	// Hover In
	function hoverIn() {
		// if box is occupied this function does not run
		if ($(this).hasClass('box-filled-1') || $(this).hasClass('box-filled-2')) {
			return;
		} else {
			// Add background hover image
			$(this).css('background-image', player);
		}
	}
	// Hover Out
	function hoverOut() {
		// If box is already occupied function does not run
		if ($(this).hasClass('box-filled-1') || $(this).hasClass('box-filled-2')) {
			return;
		} else {
			// Remove hover over image
			$(this).css('background-image', 'url()');
		}
	}
	$('.box').hover(hoverIn, hoverOut);

	/* ---------------- Winning Combinations ------------- */
	var winningCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	/* ---------------- Recording Player moves --------- */
	var oMoves = [];
	var xMoves = [];
	function recordMove(element, moves) {
		moves.push($(element).index());
	}

	/* -------------- Determining Winner ------------ */
	function determineWinner(array) {
		array.sort();
		for (var i = 0; i < winningCombinations.length; i++) {
			// All boxes are filled and there is no winner
			if (turn === 10 && array.indexOf(winningCombinations[i][0]) === -1 && array.indexOf(winningCombinations[i][1]) === -1 && array.indexOf(winningCombinations[i][2]) === -1) {
				// It's a tie
				$('.board').hide();
				$('#finish').show();
				$('#finish').addClass('screen-win-tie');
				$('#finish').removeClass('screen-win-one');
				$('#finish').removeClass('screen-win-two')
				$('.message').html("It's a Tie!");
			}
			// when you get a winning combination
			if (array.indexOf(winningCombinations[i][0]) > -1 && array.indexOf(winningCombinations[i][1]) > -1 && array.indexOf(winningCombinations[i][2]) > -1) {
				$('.board').hide();
				// Show finish menu
				$('#finish').show();
				$('.message').html('Winner');
				if (array === oMoves) {
					$('#finish').addClass('screen-win-one');
					$('#finish').removeClass('screen-win-two');
					$('#finish').removeClass('screen-win-tie');
				} else if (array === xMoves) {
					$('#finish').addClass('screen-win-two');
					$('#finish').removeClass('screen-win-one');
					$('#finish').removeClass('screen-win-tie')
				}
			}
		}
	}

})();
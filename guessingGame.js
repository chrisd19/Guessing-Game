(function() {

	var playersGuess,
	    winningNumber = generateWinningNumber(),
	    previousGuesses = [],
	    guessesRemaining = 5,
	    hintUsed = false; 

	/* **** Guessing Game Functions **** */

	// Generate the Winning Number

	function generateWinningNumber(){
		return Math.floor(Math.random() * 100) +1;
	};

	// Fetch the Players Guess

	function playersGuessSubmission(){
		playersGuess = +(document.getElementById('guess').value);
		if (typeof playersGuess === 'number' && 
			playersGuess >= 1 && playersGuess <= 100) {
			$('#guess').val("");
			checkGuess();

			$('#remaining').text(function() {
				return "Guesses Remaining: " + guessesRemaining;
			});
		}
	}

	// Determine if the next guess should be a lower or higher number

	function lowerOrHigher(){
		var diff = winningNumber - playersGuess;
		var side = diff < 0 ? "Lower" : "Higher";
		var absDiff = Math.abs(diff);
		var dist;

		if (absDiff < 5) { dist = "SCALDING"; }
		else if (absDiff < 10) { dist = "HOT"; }
		else if (absDiff < 25) { dist = "TEPID"; }
		else if (absDiff < 50) { dist = "COLD"; }
		else { dist = "FREEZING"; }

		return dist + ": Think " + side; 
	}

	// Check if the Player's Guess is the winning number 

	function checkGuess(){
		var message, guidance;

		if (playersGuess === winningNumber) {
			guessesRemaining --;
			winner();
		} else if (previousGuesses.indexOf(playersGuess) > -1) {
			message = "Already Guessed";
			guidance = lowerOrHigher();
		} else if (guessesRemaining === 1) {
			guessesRemaining --;
			loser();
		} else {
			guessesRemaining --;
			message = "Try Again";
			guidance = lowerOrHigher();
		}

		previousGuesses.push(playersGuess);

		if (message !== undefined) {
			$('#message').text(function() {
				return message;
			}).slideDown();
			if (previousGuesses.length > 0) {
				$('#guidance').css('display', 'none');
			}
			$('#guidance').text(function() {
				return guidance;
			}).slideDown();
		}
	}

	// Create a provide hint button that provides additional clues to the "Player"

	function provideHint(){
		if (hintUsed) {
			$('#not-allowed').slideDown().delay(1500).slideUp();
		} else {
			hintUsed = true;
			var num;
			var hintMessage = "The answer is one of these numbers: ";
			var hintNums = [];
			var index = Math.floor(Math.random() * (guessesRemaining + 1));

			for (var i = 0; i < guessesRemaining + 1; i++) {
				num = generateWinningNumber();
				while (num === winningNumber) {
					num = generateWinningNumber(); 
				}
				hintNums.push(num);
			}

			hintNums[index] = winningNumber;
			hintMessage += hintNums.join(", ");

			$('#hint').text(function() {
				return hintMessage;
			}).slideDown();
		}
	}

	// Allow the "Player" to Play Again

	function playAgain(){
		playersGuess = undefined;
		winningNumber = generateWinningNumber(),
	    previousGuesses = [],
	    guessesRemaining = 5,
	    hintUsed = false;

	    $('#play-again').fadeOut(200);
	    $('#win-or-lose').delay(200).fadeOut().delay(1000).animate({'font-size': '10em'});
	    $('.well').delay(800).fadeIn();
	    $('#message').slideUp();
	    $('#guidance').slideUp();
	    $('#hint').slideUp();
	    $('#remaining').text(function() {
	    	return "Guesses Remaining: 5";
	    });
	}

	// acknowledgment of winner

	function winner() {
		$('.well').fadeOut();
		$('#win-or-lose').text(function() {
			return "You Win!";
		}).css('color', 'hsla(115, 100%, 60%, 1)').delay(600).fadeIn(2000).animate({
			"font-size": "15em"
		}, 1000);
		$('#play-again').delay(4000).fadeIn();
	}

	// acknowledgment of loser

	function loser() {
		$('.well').fadeOut();
		$('#win-or-lose').text(function() {
			return "You Lose!";
		}).css('color', 'hsla(0, 100%, 52%, 1)').delay(600).fadeIn(2000).animate({
			"font-size": "15em"
		}, 1000);
		$('#play-again').delay(4000).fadeIn();
	}

	/* **** Event Listeners/Handlers ****  */

	$(document).ready(function() {
		$('#guess').on('keyup', function(key) {
			if (key.which === 13) {
				playersGuessSubmission();
			}
		});
		$('#submit-button').on('click', function() {
			playersGuessSubmission();
		});
		$('#hint-button').on('click', function() {
			provideHint();
		});
		$('#reset-button').on('click', function() {
			playAgain();
		});
		$('#play-again').on('click', function() {
			playAgain();
		})
	});

}());

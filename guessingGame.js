/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

// wrap entire module as a function...can still use variables
// before doing so, need to add event listeners in place of onclick
// attributes in the html

var playersGuess,
    winningNumber = generateWinningNumber(),
    previousGuesses = [],
    guessesRemaining = 5,
    hintUsed = false; 

$(document).ready(function() {
	$('#guess').on('keyup', function(key) {
		if (key.which === 13) {
			playersGuessSubmission();
		}
	});
});

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

		var remainingUpdate = "Guesses Remaining: " + guessesRemaining;
		$('#remaining').text(remainingUpdate);
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
		$('.feedback').children('#message').text(function() {
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
		var hintMessage = "The answer is one of these numbers: ";
		var hintNums = [];
		var index = Math.floor(Math.random() * (guessesRemaining + 1));

		for (var i = 0; i < guessesRemaining + 1; i++) {
			hintNums.push(generateWinningNumber());
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
    $('#win-or-lose').delay(200).fadeOut();
    $('.well').delay(800).fadeIn();
    $('#message').slideUp();
    $('#guidance').slideUp();
    $('#hint').slideUp();
    $('#remaining').text(function() {
    	return "Guesses Remaining: 5";
    });
}

function winner() {
	$('.well').fadeOut();
	$('#win-or-lose').text(function() {
		return "You Win!";
	}).css('color', 'hsla(115, 100%, 60%, 1)').delay(600).fadeIn(2000);
	$('#play-again').delay(2000).fadeIn();
}

function loser() {
	$('.well').fadeOut();
	$('#win-or-lose').text(function() {
		return "You Lose!";
	}).css('color', 'hsla(0, 100%, 52%, 1)').delay(600).fadeIn(2000);
	$('#play-again').delay(2000).fadeIn();
}


/* **** Event Listeners/Handlers ****  */


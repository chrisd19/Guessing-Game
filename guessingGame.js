/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

// wrap entire module as a function...can still use variables

var playersGuess,
    winningNumber = generateWinningNumber(),
    previousGuesses = [],
    guessesTaken = 0; 


/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor(Math.random() * 100) +1;
};

// Fetch the Players Guess

function playersGuessSubmission(){
	playersGuess = +(document.getElementById('guess').value);
	$('#guess').val("");
	checkGuess();
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// add code here
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	var message;

	if (playersGuess === winningNumber) {
		guessesTaken ++;
		message = "You Win!";
	} else if (previousGuesses.indexOf(playersGuess) > -1) {
		message = "Already Guessed";
	} else {
		guessesTaken ++;
		message = "Try Again";
	}

	previousGuesses.push(playersGuess);

	$('#feedback').text(function() {
		return message;
	});
	$('#feedback').slideDown();
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
}


/* **** Event Listeners/Handlers ****  */


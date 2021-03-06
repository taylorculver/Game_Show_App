// 1) Get the elements you’ll need from your HTML
const querty = $('#querty');
const phrase = $('#phrase');
let missed = 0;
let guesses = [];

// 2) event listener to the “Start Game” button to hide the start screen overlay
function startGame() {
	$("#overlay").click(function(){
	  $("#overlay").hide();
	  addPhraseToDisplay(getRandomPhraseArray(phrases));
	});
};

// 3) phrases array that contains at least 5 different phrases as strings
const phrases = [
	'Dollhouse Purgatory',
	'Lawn Carnivore',
	'Shame Parades',
	'Damned Flyovers',
	'Tonight Shrimp Hell with Mister Favre'];

// 4) randomly choose a phrase from the phrases array
function getRandomPhraseArray(arr){
    let random_phrase = arr[Math.floor(Math.random() * arr.length)].toLowerCase();
    // split that phrase into a new array of characters
    let phraseArray = random_phrase.split('')
    // return the new character array
    return phraseArray
}; 

// 5) Set the game display.
function addPhraseToDisplay(arr){
    // loops through an array of characters
    $.each(arr, function(index, character) {
    	// for each character in the array, 
    	let li = $('<li/>').text(character);
    	// you’ll create a list item and add to `#phrase ul`.
    	li.appendTo('#phrase ul');
    	// If the character in the array is a letter and not a space, 
    	if (character !== ' ') {
    		// the function should add the class “letter” to the list item.
    		li.attr({class: 'letter', value: character});
    	}
    	else {
    		li.attr({class: 'space'})
    	}
    });
};

// 6) Collect guesses and validate if they match against the phraseArray
function checkLetter (guessedLetter) {
	let matchedLetter = [];
	// get all of the elements with a class of “letter” 
	$.each($('.letter'), function() {
		// loop over the letters and 
		let letter = $(this).attr('value');
		// check if they match the letter in the button the player has chosen
		if (letter === guessedLetter) {	
			// If there’s a match, the function should add the “show” class to the list item containing that letter
			$(this).attr({class: 'letter show'}).text(letter)
			// store the matching letter inside of a variable, 
			matchedLetter.push(letter);
			guesses.push(letter);
		}
	})
	// and return that letter.
	if (matchedLetter.length > 0) {
		return matchedLetter[0];
	// If a match wasn’t found,
	} else {
		// the function should return null.
		return null;
	}
};

// 9) Each time the player guesses a letter, check whether the game has been won or lost. 
function checkWin() {
	// check if the number of letters with class “show” is equal to the number of letters with class “letters”. 
	let test = $('.letter').length === $('.show').length;
	// If they’re equal, 
	if (test === true) {
		// show the overlay screen with the “win” class and appropriate text. 
		$("#overlay").attr({class: 'win'}).append($('<a/>'), 'You win!');
		$("#overlay").show();
		restartGame();
	// Otherwise, if the number of misses is equal to or greater than 5,
	} else if (missed >= 5) {
		// show the overlay screen with the “lose” class and appropriate text
		$("#overlay").attr({class: 'lose'}).append($('<a/>'), 'You lose!');
		$("#overlay").show()
		restartGame();
	} 
}

startGame()

// 7) Event delegation to listen only to button events from the keyboard
$("#qwerty button").click(function(){
  // add the “chosen” class to that button so the same letter can’t be chosen twice
  $(this).attr({class: 'chosen', "disabled": true});
  // Pass the button to the checkLetter function, and store the letter returned inside of a variable called letterFound.
  let letterFound = checkLetter($(this).text());
  // console.log(letterFound)
  // 8) Count the missed guesses in the game
	// If the checkLetter function returns a null value
	if (letterFound === null) {
		missed++;
		// remove one of the tries from the scoreboard
		$('#scoreboard .tries').first().remove();
	}
	checkWin();
});

// 11) event listener to the Restart Game” button to hide the start screen overlay
function restartGame() {
	$("#overlay").click(function(){
	  location.reload();
	  $("#overlay").hide();
	  addPhraseToDisplay(getRandomPhraseArray(phrases));
	});
};
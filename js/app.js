// 1) Get the elements you’ll need from your HTML
const querty = $('#querty');
const phrase = $('#phrase');
let missed = 0;

// 2) event listener to the “Start Game” button to hide the start screen overlay
$("#overlay").click(function(){
  $("#overlay").hide();
  addPhraseToDisplay(getRandomPhraseArray(phrases))
});

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
			matchedLetter.push(letter)
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

// 7) Event delegation to listen only to button events from the keyboard
$("#qwerty button").click(function(){
  // add the “chosen” class to that button so the same letter can’t be chosen twice
  $(this).attr({class: 'chosen'});
  // Pass the button to the checkLetter function, and store the letter returned inside of a variable called letterFound.
  let letterFound = checkLetter($(this).text());
  // console.log(letterFound)
  // 8) Count the missed guesses in the game
	// If the checkLetter function returns a null value
	if (letterFound === null) {
		// remove one of the tries from the scoreboard
		missed++
	}
});


// 9) Create a checkWin function.






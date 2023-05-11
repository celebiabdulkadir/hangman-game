let word = '';
let lives = 10;
let wordDisplay = document.getElementById('word-display');
let livesCounter = document.getElementById('lives-counter');
let letterButtons = document.getElementById('letter-buttons');
let playAgainButton = document.getElementById('play-again');

function newGame() {
	fetch('https://random-word-api.herokuapp.com/word?number=1')
		.then((response) => response.json())
		.then((json) => {
			word = json[0];
			lives = 10;
			gameMessage.innerText = '';
			wordDisplay.innerText = '_'.repeat(word.length);
			livesCounter.innerText = `Lives: ${lives}`;
		});

	// Clear out the old letter buttons
	letterButtons.innerHTML = '';

	// Add new letter buttons
	for (let i = 0; i < 26; i++) {
		let button = document.createElement('button');
		button.innerText = String.fromCharCode(97 + i); // 97 is the ASCII value for 'a'
		button.addEventListener('click', function () {
			checkLetter(button.innerText);
			button.disabled = true;
		});
		letterButtons.appendChild(button);
	}
}
let gameMessage = document.getElementById('game-message');

function checkLetter(letter) {
	if (lives === 0) {
		return;
	}

	if (word.includes(letter)) {
		for (let i = 0; i < word.length; i++) {
			if (word[i] === letter) {
				wordDisplay.innerText =
					wordDisplay.innerText.slice(0, i) +
					letter +
					wordDisplay.innerText.slice(i + 1);
			}
		}
	} else {
		lives--;
		livesCounter.innerText = `Lives: ${lives}`;
		if (lives === 0) {
			gameMessage.innerText = 'Game over! The hangman has been hanged!';
			Array.from(letterButtons.children).forEach(
				(button) => (button.disabled = true)
			);
		}
	}
}

playAgainButton.addEventListener('click', newGame);

// Start a new game when the page loads
newGame();

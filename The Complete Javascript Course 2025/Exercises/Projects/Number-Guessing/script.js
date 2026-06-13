'use strict';

// Global variables
let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highScore = Number(document.querySelector('.highscore').textContent);

// Function to reset the game
function resetGame() {
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.check').disabled = false;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  console.log(secretNumber);
}

// Function to update the score after each guess
function updateScore() {
  score--;
  document.querySelector('.score').textContent = score;
}

// Function to check if the score is greater than 0
function checkScore() {
  if (score > 0) {
    return true;
  } else {
    return false;
  }
}

// Function to update the high score if the current score is greater than the existing high score
function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    document.querySelector('.highscore').textContent = highScore;
  }
}

// Reset the game when the "Again" button is clicked
document.querySelector('.btn.again').addEventListener('click', resetGame);

// check the number guessed by the user
document.querySelector('.check').addEventListener('click', function () {
  let guessedNumber = Number(document.querySelector('.guess').value);

  if (!guessedNumber) {
    document.querySelector('.message').textContent = '❌ Please guess a number';
  } else if (guessedNumber < 1 || guessedNumber > 20) {
    document.querySelector('.message').textContent =
      '❌ Please guess a number between 1 and 20';
  } else if (checkScore()) {
    if (guessedNumber > secretNumber) {
      document.querySelector('.message').textContent =
        '👆 Nice try! Your guess is too high. Please try again.';
      updateScore();
    } else if (guessedNumber < secretNumber) {
      document.querySelector('.message').textContent =
        '👇 Nice try! Your guess is too low. Please try again.';
      updateScore();
    } else {
      document.querySelector('.message').textContent =
        "🎯 Bull's eye! You guessed correctly.";
      updateHighScore();
      document.querySelector('.number').textContent = secretNumber;
      document.querySelector('body').style.backgroundColor = 'green';
      document.querySelector('.check').disabled = true;
      document.querySelector('.number').style.width = '30rem';
    }

    if (score === 0) {
      document.querySelector('.message').textContent =
        '🥵 Game Over! Please try again.';
      document.querySelector('.number').textContent = secretNumber;
      document.querySelector('body').style.backgroundColor = 'red';
      document.querySelector('.check').disabled = true;
      document.querySelector('.number').style.width = '30rem';
    }
  }
});

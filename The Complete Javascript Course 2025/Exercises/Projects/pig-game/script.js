'use strict';

// Selecting elements and declaring global variables
const score0 = document.getElementById('score--0'); //Score element for Playr 1
const score1 = document.querySelector('#score--1'); //Score element for Player 2
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const dice = document.querySelector('.dice'); //Dice element;
const btnNew = document.querySelector('.btn--new'); //New Game button
const btnRoll = document.querySelector('.btn--roll'); //Roll Dice button
const btnHold = document.querySelector('.btn--hold'); //Hold button

let activePlayer; //Variable to keep track of the current active player
let currentActivePlayer; //Variable to keep track of the current active player element
let currentActivePlayerScore; //Variable to keep track of the current active player's score
let totalScore; //Variable to keep track of the total score of the active player

// Function to reset the game to initial state
function resetGame() {
  score0.textContent = 0; //Initial score for Player 1
  score1.textContent = 0; //Initial score for Player 2
  current0.textContent = 0; //Initial current score for Player 1
  current1.textContent = 0; //Initial current score for Player 2

  dice.classList.add('hidden'); //Hide the dice at the start of the game
  document.querySelector('.player--0').classList.add('player--active'); //Set Player 1 as the active player
  document.querySelector('.player--1').classList.remove('player--active'); //Ensure Player 2 is not active on reset
  document.querySelector('.player--0').classList.remove('player--winner'); //Remove winner class from Player 1
  document.querySelector('.player--1').classList.remove('player--winner'); //Remove winner class from Player 2
}

// Function to swithch the active player
function switchPlayer() {
  //Toggle the active class to switch between players
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
}

// Function to identify the current active player
function getActivePlayer() {
  let activePlayer = document.querySelector('.player--active'); //Select the element whose class is "player--active"
  return activePlayer; //Return the element of the active player
}

// Function to roll the dice and update the score
function rollDice() {
  currentActivePlayer = getActivePlayer();

  const diceValue = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice-${diceValue}.png`;
  dice.classList.remove('hidden');

  currentActivePlayerScore = Number(
    currentActivePlayer.querySelector('.current-score').textContent,
  );

  // Check if the dice value is 1, if so swithc the player and reset the current score
  if (diceValue === 1) {
    currentActivePlayer.querySelector('.current-score').textContent = 0;
    switchPlayer();
    currentActivePlayer = getActivePlayer();
  } else {
    currentActivePlayerScore += diceValue;
    currentActivePlayer.querySelector('.current-score').textContent =
      currentActivePlayerScore;
  }
}

// Function to hold the current score and update the total score
function holdScore() {
  currentActivePlayer = getActivePlayer();

  currentActivePlayerScore = Number(
    currentActivePlayer.querySelector('.current-score').textContent,
  );

  totalScore = Number(currentActivePlayer.querySelector('.score').textContent);

  totalScore += currentActivePlayerScore;
  currentActivePlayer.querySelector('.score').textContent = totalScore;

  if (totalScore >= 100) {
    currentActivePlayer.classList.add('player--winner');
    return;
}

  currentActivePlayer.querySelector('.current-score').textContent = 0;
  switchPlayer();
}

// Play the Game

btnNew.addEventListener('click', resetGame);
btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, lastRoll, diceDOM, gamePlaying, targetScore; 

scoreCards = ['score-0', 'score-1', 'current-0', 'current-1'];
diceDOM = document.querySelector('.dice'); 

init(); 

//document.querySelector('#current-' + activePlayer).textContent = dice; 
//document.querySelector('#current-' + activePlayer).innerHTML = '<strong>' + dice + '</strong>';
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (!gamePlaying) { return; }

    lastRoll = dice; 
    dice = 1 + Math.floor(Math.random() * 6);
    diceDOM.style.display = 'block'; 
    diceDOM.src = 'dice-' + dice + '.png'; 
    
    if (lastRoll === 6 && lastRoll === dice) {
      scores[activePlayer] = 0;
      document.getElementById('score-' + activePlayer).textContent = scores[activePlayer]; 
      togglePlayer();
      return; 
    } 
    
    if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        roundScore = 0; 
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        togglePlayer(); 
    }
}); 

document.querySelector('.btn-hold').addEventListener('click', function() {
     if (!gamePlaying) { return; }
     scores[activePlayer] += roundScore; 
     document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];   
     
     if (scores[activePlayer] >= targetScore) {
         document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
         diceDOM.style.display = 'none'; 
         document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
         gamePlaying = false; 
     } else {
         togglePlayer();
     }
}); 

document.querySelector('.btn-new').addEventListener('click', function() {
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
    init();
}); 

document.getElementById('set-score').addEventListener('keydown', function(event) {
   var target = parseInt(document.getElementById('set-score').value);  
   if (event.key === 'Enter') {
    targetScore = target; 
    init();
    }
}); 


function togglePlayer() { 
    roundScore = 0; 
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    activePlayer = activePlayer === 1 ? 0 : 1; 
    document.querySelector('.player-' + (activePlayer + 1) % 2 + '-panel').classList.remove('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

function init() { 
    gamePlaying = true; 
    diceDOM.style.display = 'none'; 
    roundScore = 0; 
    scores = [0, 0];
    activePlayer = Math.floor(Math.random() * 2);
    //zero the score cards
    for (var i = 0; i < scoreCards.length; i++) {
        document.getElementById(scoreCards[i]).textContent = '0'; 
    }
}
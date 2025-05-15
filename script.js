const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const timeDisplay = document.getElementById('time');
const restartButton = document.getElementById('restart');

const emojis = ['🎮', '🎲', '🎯', '🎨', '🎭', '🎪', '🎫', '🎬'];
const cards = [...emojis, ...emojis];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let gameTime = 0;
let timer = null;
let canFlip = true;

// Shuffle cards using Fisher-Yates algorithm
function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create the game board
function createBoard() {
    const shuffledCards = shuffleCards(cards);
    gameBoard.innerHTML = '';
    
    shuffledCards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.cardIndex = index;
        card.dataset.emoji = emoji;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Handle card flip
function flipCard() {
    if (!canFlip || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
    }

    this.classList.add('flipped');
    this.textContent = this.dataset.emoji;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        canFlip = false;
        checkMatch();
        moves++;
        movesDisplay.textContent = moves;
    }
}

// Check if flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.emoji === card2.dataset.emoji;

    if (match) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === emojis.length) {
            endGame();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
        }, 1000);
    }

    setTimeout(() => {
        flippedCards = [];
        canFlip = true;
    }, 1000);
}

// Start game timer
function startTimer() {
    timer = setInterval(() => {
        gameTime++;
        timeDisplay.textContent = gameTime;
    }, 1000);
}

// End game
function endGame() {
    clearInterval(timer);
    setTimeout(() => {
        alert(`Congratulations! You won in ${moves} moves and ${gameTime} seconds!`);
    }, 500);
}

// Restart game
function restartGame() {
    clearInterval(timer);
    gameTime = 0;
    moves = 0;
    matchedPairs = 0;
    flippedCards = [];
    canFlip = true;
    
    timeDisplay.textContent = '0';
    movesDisplay.textContent = '0';
    
    createBoard();
    startTimer();
}

// Initialize game
restartButton.addEventListener('click', restartGame);
restartGame(); 
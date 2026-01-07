// Select DOM elements
const guessInput = document.getElementById('user-guess');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const messageEl = document.getElementById('message');
const countEl = document.getElementById('attempt-count');
const historyEl = document.getElementById('guess-history');
const container = document.querySelector('.game-container');

// Game State Variables
let targetNumber;
let attempts = 0;
let guesses = [];

// Initialize Game
function initGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    guesses = [];
    
    // Reset UI
    countEl.textContent = attempts;
    historyEl.innerHTML = '';
    messageEl.textContent = "Start guessing!";
    messageEl.className = ''; 
    guessInput.value = '';
    guessInput.disabled = false;
    submitBtn.disabled = false;
    restartBtn.classList.add('hidden');
    container.classList.remove('shake');
}

// Function to handle the guess logic
function checkGuess() {
    const userValue = Number(guessInput.value);

    // Validation
    if (!userValue || userValue < 1 || userValue > 100) {
        setMessage("Please enter a valid number (1-100)", "text-error");
        triggerShake();
        return;
    }

    if (guesses.includes(userValue)) {
        setMessage("You already guessed that number!", "text-error");
        triggerShake();
        return;
    }

    // Update State
    attempts++;
    guesses.push(userValue);
    countEl.textContent = attempts;
    addToHistory(userValue);

    // Check Win/Loss
    if (userValue === targetNumber) {
        handleWin();
    } else if (userValue < targetNumber) {
        setMessage("Too Low! Try higher.", "text-error");
    } else {
        setMessage("Too High! Try lower.", "text-error");
    }
    
    guessInput.value = '';
    guessInput.focus();
}

// Helper: Update Message
function setMessage(msg, colorClass) {
    messageEl.textContent = msg;
    messageEl.className = colorClass;
}

// Helper: Add visual shake effect on error
function triggerShake() {
    container.classList.add('shake');
    setTimeout(() => {
        container.classList.remove('shake');
    }, 500);
}

// Helper: Add number to history list
function addToHistory(num) {
    const badge = document.createElement('span');
    badge.classList.add('badge');
    badge.textContent = num;
    historyEl.appendChild(badge);
}

// Handle Win State
function handleWin() {
    setMessage(`Correct! The number was ${targetNumber}`, "text-success");
    guessInput.disabled = true;
    submitBtn.disabled = true;
    restartBtn.classList.remove('hidden');
    // Optional: Add a confetti effect here if you want to get fancy
}

// Event Listeners
submitBtn.addEventListener('click', checkGuess);

// Allow "Enter" key to submit
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkGuess();
});

restartBtn.addEventListener('click', initGame);

// Start the game on load
initGame();


// will improve the js file soon 
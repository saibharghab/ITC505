const boardSize = 5; // 5x5 grid
let lights = [];
let moveCount = 0;
let timerInterval;
let secondsElapsed = 0;

// Create the board
function createBoard() {
    const board = document.getElementById("game-board");
    board.innerHTML = ""; // Clear previous board
    lights = Array.from({ length: boardSize }, () =>
        Array(boardSize).fill(true)
    ); // Reset lights array

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.dataset.row = row;
            square.dataset.col = col;
            if (!lights[row][col]) {
                square.classList.add("is-off");
            }
            board.appendChild(square);
        }
    }
    startTimer();
    moveCount = 0;
    updateMoveCount();
}

// Toggle a square and its neighbors
function toggleSquare(row, col) {
    if (row >= 0 && row < boardSize && col >= 0 && col < boardSize) {
        lights[row][col] = !lights[row][col];
        const square = document.querySelector(
            `[data-row="${row}"][data-col="${col}"]`
        );
        square.classList.toggle("is-off");
    }
}

function toggleNeighbors(row, col) {
    toggleSquare(row, col); // Center square
    toggleSquare(row - 1, col); // Top
    toggleSquare(row + 1, col); // Bottom
    toggleSquare(row, col - 1); // Left
    toggleSquare(row, col + 1); // Right
}

// Check victory condition
function checkVictory() {
    const allOff = lights.flat().every(light => !light);
    if (allOff) {
        clearInterval(timerInterval); // Stop the timer
        alert("You win!");
    }
}

// Update move counter
function updateMoveCount() {
    document.getElementById("moveCounter").textContent = moveCount;
}

// Start timer
function startTimer() {
    secondsElapsed = 0;
    clearInterval(timerInterval); // Reset previous timer
    timerInterval = setInterval(() => {
        secondsElapsed++;
        document.getElementById("timer").textContent = secondsElapsed;
    }, 1000);
}

// Stop timer
function stopTimer() {
    clearInterval(timerInterval);
}

// Randomize the board for a new game
function randomizeBoard() {
    const randomClicks = Math.floor(Math.random() * (boardSize * boardSize)) + 5;
    for (let i = 0; i < randomClicks; i++) {
        const randomRow = Math.floor(Math.random() * boardSize);
        const randomCol = Math.floor(Math.random() * boardSize);
        toggleNeighbors(randomRow, randomCol);
    }
}

// Initialize game
document.getElementById("game-board").addEventListener("click", (event) => {
    if (event.target.classList.contains("square")) {
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        toggleNeighbors(row, col);
        moveCount++;
        updateMoveCount();
        checkVictory();
    }
});

// Restart game
document.getElementById("restart").addEventListener("click", () => {
    createBoard();
    randomizeBoard();
});

// Start the game
createBoard();
randomizeBoard();

let currentPlayer = "";
let userSymbol = "";
let botSymbol = "";
let startTime = 0;
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const statusDisplay = document.querySelector('.game--status');
const cells = document.querySelectorAll('.cell');
const restartButton = document.querySelector('.game--restart');
const scoreList = document.getElementById('scoreList');

function initializeGame() {
    userSymbol = prompt("Elige tu símbolo: X o O").toUpperCase();
    while (userSymbol !== 'X' && userSymbol !== 'O') {
        userSymbol = prompt("Símbolo inválido. Elige X o O:").toUpperCase();
    }
    botSymbol = userSymbol === "X" ? "O" : "X";
    currentPlayer = userSymbol;
    startTime = Date.now();
    gameBoard.fill("");
    gameActive = true;
    statusDisplay.innerHTML = `Turno de: ${currentPlayer}`;
    cells.forEach(cell => (cell.innerHTML = ""));
    updateBestTimesDisplay();
}

function handleCellClick(event) {
    const cellIndex = parseInt(event.target.getAttribute("data-cell-index"));
    if (gameBoard[cellIndex] !== "" || !gameActive) return;

    gameBoard[cellIndex] = currentPlayer;
    event.target.innerHTML = currentPlayer;

    handleResultValidation();

    if (gameActive) {
        currentPlayer = currentPlayer === userSymbol ? botSymbol : userSymbol;
        statusDisplay.innerHTML = `Turno de: ${currentPlayer}`;
        if (currentPlayer === botSymbol) botMove();
    }
}

function handleResultValidation() {
    let roundWon = false;
    for (const condition of winningCombinations) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        if (currentPlayer === userSymbol) {
            statusDisplay.innerHTML = `¡Ganaste! 🎉`;
            registerBestTime();
        } else {
            statusDisplay.innerHTML = `¡El bot ganó! 🤖`;
        }
    } else if (!gameBoard.includes("")) {
        gameActive = false;
        statusDisplay.innerHTML = `¡Empate!`;
    }
}

function botMove() {
    let emptyCells = gameBoard.map((value, index) => (value === "" ? index : null)).filter(val => val !== null);

    // Selecciona un índice aleatorio entre las celdas vacías
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    cells.forEach(cell => {
        cell.style.pointerEvents = 'none'; 
    });

    setTimeout(() => {
        gameBoard[randomIndex] = botSymbol; 
        cells[randomIndex].innerHTML = botSymbol; 
        handleResultValidation(); 

        cells.forEach(cell => {
            cell.style.pointerEvents = 'auto';
        });

        if (gameActive) {
            currentPlayer = userSymbol; 
            statusDisplay.innerHTML = `Turno de: ${currentPlayer}`; 
        }
    }, 1000); 
}

// Lista de top 10
function registerBestTime() {
    const playerName = prompt("¡Ganaste! Ingresa tu nombre:");
    if (!playerName) return;
    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);

    let bestTimes = JSON.parse(localStorage.getItem('bestTimes')) || [];
    bestTimes.push({ name: playerName, time: timeTaken, date: new Date().toISOString() });

    bestTimes.sort((a, b) => a.time - b.time);
    bestTimes = bestTimes.slice(0, 10);

    localStorage.setItem('bestTimes', JSON.stringify(bestTimes));
    updateBestTimesDisplay();
}


function updateBestTimesDisplay() {
    scoreList.innerHTML = "";
    const bestTimes = JSON.parse(localStorage.getItem('bestTimes')) || [];

    bestTimes.forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${index + 1}. ${score.name} - ${score.time} segundos - ${new Date(score.date).toLocaleString()}`;
        scoreList.appendChild(listItem);
    });
}

// Botón para reiniciar juego
restartButton.addEventListener("click", initializeGame);
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
initializeGame();
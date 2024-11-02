let board = [];
let rows = 8;
let columns = 8;
let minesCount = 10;
let minesLocation = [];
let tilesClicked = 0;
let flagEnabled = false;
let gameOver = false;

window.onload = function() {
    document.getElementById("start-custom").addEventListener("click", startCustomGame);
    document.getElementById("easy-button").addEventListener("click", () => startGame(8, 8, 10));
    document.getElementById("normal-button").addEventListener("click", () => startGame(10, 10, 20));
    document.getElementById("hard-button").addEventListener("click", () => startGame(12, 12, 30));
    document.getElementById("veryHard-button").addEventListener("click", () => startGame(15, 15, 40));
    document.getElementById("hardCore-button").addEventListener("click", () => startGame(20, 20, 50));
    document.getElementById("leyend-button").addEventListener("click", () => startGame(25, 25, 100));

    startGame(rows, columns, minesCount);
}


function setMines() {
    minesLocation = [];
    let minesLeft = minesCount;
    while (minesLeft > 0) { 
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft -= 1;
        }
    }
}


function startGame(newRows, newColumns, newMines) {
    rows = newRows;
    columns = newColumns;
    minesCount = newMines;
    minesLocation = [];
    tilesClicked = 0;
    flagEnabled = false;
    gameOver = false;

    document.getElementById("mines-count").innerText = minesCount;
    document.getElementById("flag-button").addEventListener("click", setFlag);
    setMines();

    board = [];
    document.getElementById("board").innerHTML = ""; 

    document.getElementById("board").style.gridTemplateColumns = `repeat(${newColumns}, 50px)`;
    document.getElementById("board").style.gridTemplateRows = `repeat(${newRows}, 50px)`;

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.className = "tile";
            tile.addEventListener("click", clickTile);
            document.getElementById("board").appendChild(tile);
            row.push(tile);
        }
        board.push(row);
    }
}


function startCustomGame() {
    let customRows = parseInt(document.getElementById("rows").value);
    let customColumns = parseInt(document.getElementById("cols").value);
    let customMines = parseInt(document.getElementById("mines").value);

    if (customRows < 5 || customColumns < 5 || customMines < 1 || customMines >= customRows * customColumns) {
        alert("Por favor, ingresa valores válidos.");
        return;
    }

    startGame(customRows, customColumns, customMines);
}


function clickTile() {
    if (gameOver || this.classList.contains("tile-clicked")) return;

    if (flagEnabled) {
        this.innerText = this.innerText === "" ? "🚩" : "";
        return;
    }

    if (minesLocation.includes(this.id)) {
        gameOver = true;
        revealMines();
        alert("Game Over!");
        return;
    }

    let [r, c] = this.id.split("-").map(Number);
    checkMine(r, c);
}

function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "💣";
                tile.style.backgroundColor = "red";                
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns || board[r][c].classList.contains("tile-clicked")) return;

    board[r][c].classList.add("tile-clicked");
    tilesClicked += 1;

    let minesFound = countAdjacentMines(r, c);

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound);
    } else {
        board[r][c].innerText = "";
        [-1, 0, 1].forEach(i => {
            [-1, 0, 1].forEach(j => checkMine(r + i, c + j));
        });
    }

    if (tilesClicked === rows * columns - minesCount) {
        document.getElementById("mines-count").innerText = "Cleared";
        gameOver = true;
    }
}

function countAdjacentMines(r, c) {
    return [-1, 0, 1].reduce((count, i) => count + [-1, 0, 1].reduce((subCount, j) => {
        let adjR = r + i, adjC = c + j;
        return subCount + (adjR >= 0 && adjR < rows && adjC >= 0 && adjC < columns && minesLocation.includes(adjR + "-" + adjC) ? 1 : 0);
    }, 0), 0);
}

function setFlag() {
    flagEnabled = !flagEnabled;
    document.getElementById("flag-button").style.backgroundColor = flagEnabled ? "darkgray" : "lightgray";
}

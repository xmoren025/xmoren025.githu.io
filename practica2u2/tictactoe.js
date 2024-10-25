const selectBox = document.querySelector(".team-selector"); 
const selectBtnM = selectBox.querySelector(".player1");
const selectBtnN = selectBox.querySelector(".player2");
const playBoard = document.querySelector(".table");
const players = document.querySelector(".players");
const allBox = document.querySelectorAll("section span");
const resultBox = document.querySelector(".result-box");
const wonText = resultBox.querySelector(".won-text");
const replayBtn = resultBox.querySelector("button");

window.onload = () => {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectBtnM.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
}

selectBtnN.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
}

let player1Icon = "./img/maki.png";
let player2Icon = "./img/nigiri.png";
let playerSign = "M";
let runBot = true;

function clickedBox(element) {
    if (players.classList.contains("player")) {
        playerSign = "N";
        element.innerHTML = `<img src="${player2Icon}" alt="Nigiri" style="width: 100%;">`;
        players.classList.remove("active");
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `<img src="${player1Icon}" alt="Maki" style="width: 100%;">`;
        element.setAttribute("id", playerSign);
        players.classList.add("active");
    }
    selectWinner();
    element.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";

    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(() => {
        bot(runBot);
    }, randomTimeDelay);
}

function bot() {
    let array = [];
    if (runBot) {
        playerSign = "N";
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {
                array.push(i);
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if (array.length > 0) {
            if (players.classList.contains("player")) {
                playerSign = "M";
                allBox[randomBox].innerHTML = `<img src="${player1Icon}" alt="Maki" style="width: 100%;">`;
                allBox[randomBox].setAttribute("id", playerSign);
                players.classList.add("active");
            } else {
                allBox[randomBox].innerHTML = `<img src="${player2Icon}" alt="Nigiri" style="width: 100%;">`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSign = "M";
    }
}

function getIdVal(classname) {
    return document.querySelector(".box" + classname).id;
}

function checkIdSign(val1, val2, val3, sign) {
    if (getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign) {
        return true;
    }
}

function selectWinner() {
    if (checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) || checkIdSign(7, 8, 9, playerSign) || checkIdSign(1, 4, 7, playerSign) || checkIdSign(2, 5, 8, playerSign) || checkIdSign(3, 6, 9, playerSign) || checkIdSign(1, 5, 9, playerSign) || checkIdSign(3, 5, 7, playerSign)) {
        runBot = false;
        bot(runBot);
        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700);
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    } else {
        if (getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != "") {
            runBot = false;
            bot(runBot);
            setTimeout(() => {
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700);
            wonText.textContent = "Match has been drawn!";
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload();
}

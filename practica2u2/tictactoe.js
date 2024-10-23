const selectBox = document.querySelector(".select-box");
const selectBtnM = selectBox.querySelector(".options.player1");
const selectBtnS = selectBox.querySelector(".options.player2");
const playBoard = document.querySelector(".table");
const players = document.querySelector(".players");
const allBox = document.querySelectorAll("section span");
const resultBox = document.querySelector(".result-box");
const wonText = resultBox.querySelector(".won-text");
const replayBtn = resultBox.querySelector("button");

window.onload = ()=>{
    for (let i = 0; i < allBox-length; i++){
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectBtnM.onclick = ()=>{
    selectBox.classList.add
}
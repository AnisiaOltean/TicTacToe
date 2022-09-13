const cells = Array.from(document.querySelectorAll(".cell"));
const infoText = document.querySelector(".info");
const resetBtn = document.querySelector("#resetBtn"); //or document.getElementById

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let selectedCells = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

function startGame() {
  infoText.textContent = `Player ${currentPlayer}'s turn!`;
  initializeGame();
}

function initializeGame() {
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => updateCell(cell, index));
  });
  resetBtn.addEventListener("click", resetBoard);
  running = true;
}

function updateCell(cell, index) {
  if (cells[index].textContent != "" || !running) return;

  cell.innerText = currentPlayer;
  selectedCells[index] = currentPlayer;
  checkWinner();
}

function checkWinner() {
  let gameOver = false;
  var i1, i2, i3; //hold indices of board cells in case of win situation
  for (let i = 0; i < winConditions.length; i++) {
    const currArr = winConditions[i];
    const posA = selectedCells[currArr[0]];
    const posB = selectedCells[currArr[1]];
    const posC = selectedCells[currArr[2]];

    if (posA == "" || posB == "" || posC == "") continue;

    if (posA == posB && posB == posC) {
      gameOver = true;
      //indices of the 3 cells on board
      i1 = currArr[0];
      i2 = currArr[1];
      i3 = currArr[2];

      break;
    }
  }
  if (gameOver) {
    infoText.textContent = `Player ${currentPlayer} won!`;
    //add background color to winning cells
    addClass(i1);
    addClass(i2);
    addClass(i3);

    running = false;
  } else if (!selectedCells.includes("")) {
    infoText.textContent = `It's a tie!`;
    running = false;
  } else {
    updatePlayer();
  }
}

function addClass(index) {
  cells[index].classList.add("wonClass");
}

function updatePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  infoText.textContent = `Player ${currentPlayer}'s turn!`;
}

function resetBoard() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("wonClass");
  });
  selectedCells = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  infoText.textContent = `Player ${currentPlayer}'s turn!`;
  running = true;
}

//start game
startGame();
//arrow functions are not hoisted!!
//var declarations are globally scoped or function scoped while let and const are block scoped!!

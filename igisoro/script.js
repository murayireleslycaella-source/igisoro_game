let board = [];
let currentPlayer = 1;

const boardDiv = document.getElementById("board");
const turnText = document.getElementById("turn");
const message = document.getElementById("message");

function createBoard() {
  board = new Array(32).fill(0);

  for (let i = 0; i < 8; i++) {
    board[i] = 4;
  }

  for (let i = 24; i < 32; i++) {
    board[i] = 4;
  }

  renderBoard();
}

function renderBoard() {
  boardDiv.innerHTML = "";

  for (let i = 0; i < 32; i++) {
    const pit = document.createElement("div");
    pit.classList.add("pit");
    pit.innerText = board[i];

    if (i < 16) pit.classList.add("player1");
    else pit.classList.add("player2");

    pit.onclick = () => handleMove(i);

    boardDiv.appendChild(pit);
  }
}

function isPlayerPit(index) {
  if (currentPlayer === 1) return index < 16;
  return index >= 16;
}

function handleMove(index) {
  if (!isPlayerPit(index)) {
    message.innerText = "Invalid pit";
    return;
  }

  if (board[index] <= 1) {
    message.innerText = "Cannot play this pit";
    return;
  }

  sow(index);
  renderBoard();
}

function sow(index) {
  let seeds = board[index];
  board[index] = 0;

  let pos = index;

  while (true) {
    while (seeds > 0) {
      pos = nextPit(pos);
      board[pos]++;
      seeds--;
    }

    if (board[pos] > 1) {
      seeds = board[pos];
      board[pos] = 0;
    } else {
      break;
    }
  }

  switchTurn();
}

function nextPit(pos) {
  let next = (pos + 1) % 32;

  if (currentPlayer === 1 && next >= 16) next = 0;
  if (currentPlayer === 2 && next < 16) next = 16;

  return next;
}

function switchTurn() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  turnText.innerText = "Player " + currentPlayer + " Turn";
  message.innerText = "";
}

createBoard();
var boards = [
    [
      "---32-",
      "6-----",
      "41--62",
      "------",
      "2---35",
      "----4-"
    ],
    [
      "-25--1",
      "------",
      "2--4--",
      "---3-6",
      "----3-",
      "--1---"
    ],
    [
      "4---6-",
      "--51--",
      "1--5--",
      "-----4",
      "---3--",
      "6-----"
    ],
    [
        "---5--",
        "5-----",
        "-2-3--",
        "-----6",
        "--2-4-",
        "--1-63"
      ],
      [
        "6-4-52",
        "-5-43-",
        "34-5-1",
        "5-1-43",
        "-13-6-",
        "26-3-4"
      ]
];

var solutions = [
    [
      "154326",
      "632154",
      "413562",
      "526413",
      "241635",
      "365241"
    ],
    [
      "325641",
      "146253",
      "263415",
      "514326",
      "652134",
      "431562"
    ],
    [
      "431265",
      "265143",
      "146532",
      "352614",
      "514326",
      "623451"
    ],
    [
      "216534",
      "543612",
      "624351",
      "135426",
      "362145",
      "451263"
    ],
    [
        "634152",
        "152436",
        "346521",
        "521643",
        "413265",
        "265314"
      ]
];

  

var currentBoard = [];
var currentSolution = [];

window.onload = function() {
    setGame();
};

function setGame() {
      // Randomly select a board configuration
    let randomIndex = Math.floor(Math.random() * boards.length);
    currentBoard = boards[randomIndex];
    currentSolution = solutions[randomIndex];
      // Clear the board before setting up the new game
      document.getElementById("board").innerHTML = "";
      document.getElementById("digits").innerHTML = "";
    // Digits 1-6
    for (let i = 1; i <= 6; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.classList.add("number");
        number.setAttribute("draggable", "true");
        number.addEventListener("dragstart", dragStart);
        number.addEventListener("dragend", dragEnd);
        document.getElementById("digits").appendChild(number);
    }

    // Board 6x6
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 6; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");

            // Set initial values for fixed tiles
            if (currentBoard[r][c] !== "-") {
                tile.innerText = currentBoard[r][c];
                tile.classList.add("tile-start");
                tile.classList.add("tile-fixed"); // Mark this tile as fixed
            }

          // Add lines for visual separation of 3x2 blocks
          if (r ===1|| r===3) {
            tile.classList.add("bold-horizontal-line");
        }
        if (c===2 ) {
            tile.classList.add("bold-vertical-line");
        }

            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("drop", drop);
            document.getElementById("board").appendChild(tile);
        }
    }
}

function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
    e.target.classList.add("number-dragging");
}

function dragEnd(e) {
    e.target.classList.remove("number-dragging");
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    let numberId = e.dataTransfer.getData("text/plain");
    let number = document.getElementById(numberId);
    let tile = e.target;

    if (tile.classList.contains("tile") && number && !tile.classList.contains("tile-fixed")) {
        let r = parseInt(tile.id.split("-")[0]);
        let c = parseInt(tile.id.split("-")[1]);

        // Update tile content with the dragged number
        tile.innerText = number.innerText;

          // Check for repeated numbers in the same row or column
        //   if (isNumberRepeated(r, c, number.innerText)) {
        //     tile.style.color = "red"; // Repeated number
        // } else {
        //     tile.style.color = "blue"; // Unique number
        // }
        // updateTileColors(r, c);
        // Check if the game is won after the move
        checkWin();
    }
}

function isNumberRepeated(row, col, number) {
     // Check the row for repeated numbers
     for (let c = 0; c < 6; c++) {
        let currentTile = document.getElementById(row + "-" + c);
        if (c !== col && currentTile.innerText === number && !currentTile.classList.contains("tile-fixed")) {
            return true;
        }
    }
    // Check the column for repeated numbers
    for (let r = 0; r < 6; r++) {
        let currentTile = document.getElementById(r + "-" + col);
        if (r !== row && currentTile.innerText === number && !currentTile.classList.contains("tile-fixed")) {
            return true;
        }
    }
    return false;
}
function updateTileColors(row, col) {
    // Check the row for validity and update colors
    for (let c = 0; c < 6; c++) {
        let tile = document.getElementById(row + "-" + c);
        if (tile.innerText !== "") {
            if (isNumberRepeated(row, c, tile.innerText)) {
                tile.style.color = "red"; // Repeated number
            } else {
                tile.style.color = "blue"; // Unique number
            }
        }
    }

    // Check the column for validity and update colors
    for (let r = 0; r < 6; r++) {
        let tile = document.getElementById(r + "-" + col);
        if (tile.innerText !== "") {
            if (isNumberRepeated(r, col, tile.innerText)) {
                tile.style.color = "red"; // Repeated number
            } else {
                tile.style.color = "blue"; // Unique number
            }
        }
    }
}



function checkWin() {
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 6; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            if (tile.innerText !==currentSolution[r][c]) {
                return; // If any tile is incorrect, the game is not won
            }
        }
    }
    showWinner();
}

function showWinner() {
    let winnerOverlay = document.createElement('div');
    winnerOverlay.classList.add('winner-overlay');
    winnerOverlay.innerHTML = `
        <h1>Congratulations!</h1>
        <p>You have completed the Sudoku puzzle!</p>
        <button onclick="resetGame()">Play Again</button>
    `;
    document.body.appendChild(winnerOverlay);
}

function resetGame() {
    // Hide the winner overlay
    const winnerOverlay = document.querySelector('.winner-overlay');
    if (winnerOverlay) {
        winnerOverlay.remove();
    }

    // Clear the board
    const boardElement = document.getElementById("board");
    while (boardElement.firstChild) {
        boardElement.removeChild(boardElement.firstChild);
    }

    // Clear the digits
    const digitsElement = document.getElementById("digits");
    while (digitsElement.firstChild) {
        digitsElement.removeChild(digitsElement.firstChild);
    }

    // Reinitialize the game
    setGame();
}


var numSelected = null;
var tileSelected = null;
var errors = 0;

var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
];

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
];

window.onload = function() {
    setGame();
};

function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.classList.add("number");
        number.setAttribute("draggable", "true");
        number.addEventListener("dragstart", dragStart);
        number.addEventListener("dragend", dragEnd);
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (board[r][c] !== "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
                tile.classList.add("tile-fixed"); // Mark this tile as fixed
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("drop", drop);
            document.getElementById("board").appendChild(tile);
        }
    }
    // Ensure the board scales well on mobile devices
    document.getElementById("board").style.width = "100%";
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

        // Check if the number is correct and update errors if not
        if (solution[r][c] !== number.innerText) {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }

        // Check if the game is won after the move
        checkWin();
    }
}

function checkWin() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            if (tile.innerText !== solution[r][c]) {
                return; // If any tile is incorrect, the game is not won
            }
        }
    }
    showWinner();
}

function showWinner() {
    document.getElementById('winner-overlay').style.display = 'flex';
}

function resetGame() {
    // Hide the winner overlay and reset the game
    document.getElementById('winner-overlay').style.display = 'none';
    // Clear the board and reset the errors
    errors = 0;
    document.getElementById("errors").innerText = errors;
    document.querySelectorAll('.tile').forEach(tile => {
        tile.innerText = "";
        tile.classList.remove("tile-start");
        tile.classList.remove("tile-fixed"); // Remove the fixed class
    });
    // Optionally, you can reset the board state and reinitialize the game
    setGame();
}

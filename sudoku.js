var numSelected = null;
var tileSelected = null;
var errors = 0;

var boards = [
  [  "659-1-28-",
    "1---5--3-",
    "2--8---1-",
    "---135-7-",
    "8--9----2",
    "--3-7864-",
    "3-2--9--4",
    "-----18--",
    "--876----"
],
[
    "-6--72--1",
    "8--1365--",
    "--34-----",
    "2--65--3-",
    "--6--7-1-",
    "---2--864",
    "9-7-84---",
    "--8--9-7-",
    "---721-83"
],
[
    "------92-",
    "54--3-1--",
    "--8-57--4",
    "-5--8---3",
    "9-3-468--",
    "1--3---4-",
    "-7-4-----",
    "361-79-8-",
    "----6--37"
],
[
    "7--84-2-5",
    "-3-15-4--",
    "--5-6--7-",
    "-9--3458-",
    "-287--9-3",
    "5-39--6--",
    "--452--9-",
    "--94-8---",
    "8----17--"
],
[
    "------7--",
    "39-7-854-",
    "86--54---",
    "9-6-47---",
    "1342---9-",
    "-581-9--4",
    "54-923--8",
    "----7-9-5",
    "-----1-3-"
]
];

var solutions = [
    ["659314287",
    "187652439",
    "234897516",
    "426135978",
    "871946352",
    "593278641",
    "312589764",
    "765421893",
    "948763125"],
    [
    "465872391",
    "892136547",
    "713495628",
    "241658739",
    "386947215",
    "579213864",
    "927384156",
    "138569472",
    "654721983" 
    ],
    [
        "736814925",
        "549632178",
        "218957364",
        "654281793",
        "923746851",
        "187395246",
        "875423619",
        "361579482",
        "492168537" 
    ],
    [
        "761849235",
        "932157468",
        "485263179",
        "197634582",
        "628715943",
        "543982617",
        "374526891",
        "219478356",
        "856391724"
    ],
    [
        "415692783",
        "392718546",
        "867354129",
        "926847351",
        "134265897",
        "758139264",
        "541923678",
        "283476915",
        "679581432"
    ]
];

var board, solution;

window.onload = function() {
     // Select a random board and its corresponding solution
     const randomIndex = Math.floor(Math.random() * boards.length);
     board = boards[randomIndex];
     solution = solutions[randomIndex];

    setGame();
};

function setGame() {
    // Clear existing board
    document.getElementById("board").innerHTML = '';
    document.getElementById("digits").innerHTML = '';

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
            if (r === 2 || r===5) {
                tile.classList.add("horizontal-line");
            }
            if (c  === 2|| c===5) {
                tile.classList.add("vertical-line");
            }
            if (r === 3 || r===6) {
                tile.classList.add("horizontal-linep");
            }
            if (c  === 3|| c===6) {
                tile.classList.add("vertical-linep");
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
     // Select a new random board and solution
     const randomIndex = Math.floor(Math.random() * boards.length);
     board = boards[randomIndex];
     solution = solutions[randomIndex];
    // Optionally, you can reset the board state and reinitialize the game
    setGame();
}

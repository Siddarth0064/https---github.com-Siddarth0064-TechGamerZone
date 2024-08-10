var board = [
    "1--4--",
    "--61--",
    "2---6-",
    "5-1---",
    "--2--6",
    "-4--1-",
];

var solution = [
    "123456",
    "456123",
    "234561",
    "561234",
    "312456",
    "645312"
];

// let touchStartX, touchStartY, draggedNumber = null;

window.onload = function() {
    setGame();
};

function setGame() {
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
            if (board[r][c] !== "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
                tile.classList.add("tile-fixed"); // Mark this tile as fixed
            }

            // Add lines for visual separation of 2x2 blocks
            if (r % 2 === 1) {
                tile.classList.add("horizontal-line");
            }
            if (c % 2 === 1) {
                tile.classList.add("vertical-line");
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

        // Check if the game is won after the move
        checkWin();
    }
}

// function touchMove(e) {
//     e.preventDefault();
//     if (draggedNumber) {
//         let touch = e.touches[0];
//         let x = touch.clientX;
//         let y = touch.clientY;

//         let board = document.getElementById("board");
//         let tile = document.elementFromPoint(x, y);

//         if (tile && tile.classList.contains("tile") && !tile.classList.contains("tile-fixed")) {
//             tile.innerText = draggedNumber.innerText;
//             // if (solution[parseInt(tile.id.split("-")[0])][parseInt(tile.id.split("-")[1])] !== draggedNumber.innerText) {
//             //     alert("Incorrect!");
//             // }
//             checkWin();
//         }
//     }
// }

// function touchEnd(e) {
//     e.preventDefault();
//     draggedNumber = null;
// }

// function tileTouchStart(e) {
//     e.preventDefault();
//     let tile = e.target;
//     if (tile.classList.contains("tile") && !tile.classList.contains("tile-fixed")) {
//         draggedNumber = tile;
//     }
// }

// function tileTouchMove(e) {
//     e.preventDefault();
//     if (draggedNumber) {
//         let touch = e.touches[0];
//         let x = touch.clientX;
//         let y = touch.clientY;

//         let board = document.getElementById("board");
//         let tile = document.elementFromPoint(x, y);

//         if (tile && tile.classList.contains("tile") && !tile.classList.contains("tile-fixed")) {
//             tile.innerText = draggedNumber.innerText;
//             // if (solution[parseInt(tile.id.split("-")[0])][parseInt(tile.id.split("-")[1])] !== draggedNumber.innerText) {
//             //     alert("Incorrect!");
//             // }
//             checkWin();
//         }
//     }
// }

// function tileTouchEnd(e) {
//     e.preventDefault();
//     draggedNumber = null;
// }

function checkWin() {
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 6; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            if (tile.innerText !== solution[r][c]) {
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
// var board = [
//     "1--4--",
//     "--61--",
//     "2---6-",
//     "5-1---",
//     "--2--6",
//     "-4--1-",
// ];

// var solution = [
//     "123456",
//     "456123",
//     "234561",
//     "561234",
//     "312456",
//     "645312"
// ];

// let touchStartX, touchStartY, draggedNumber = null;

// window.onload = function() {
//     setGame();
// };

// function setGame() {
//     // Digits 1-6
//     for (let i = 1; i <= 6; i++) {
//         let number = document.createElement("div");
//         number.id = i;
//         number.innerText = i;
//         number.classList.add("number");
//         number.setAttribute("draggable", "true");
//         number.addEventListener("dragstart", dragStart);
//         number.addEventListener("dragend", dragEnd);
//         number.addEventListener("touchstart", touchStart);
//         number.addEventListener("touchend", touchEnd);
//         number.addEventListener("touchmove", touchMove);
//         document.getElementById("digits").appendChild(number);
//     }

//     // Board 6x6
//     for (let r = 0; r < 6; r++) {
//         for (let c = 0; c < 6; c++) {
//             let tile = document.createElement("div");
//             tile.id = r.toString() + "-" + c.toString();
//             tile.classList.add("tile");

//             // Set initial values for fixed tiles
//             if (board[r][c] !== "-") {
//                 tile.innerText = board[r][c];
//                 tile.classList.add("tile-start");
//                 tile.classList.add("tile-fixed"); // Mark this tile as fixed
//             }

//             // Add lines for visual separation of 2x2 blocks
//             if (r % 2 === 1) {
//                 tile.classList.add("horizontal-line");
//             }
//             if (c % 2 === 1) {
//                 tile.classList.add("vertical-line");
//             }

//             tile.addEventListener("dragover", dragOver);
//             tile.addEventListener("drop", drop);
//             tile.addEventListener("touchstart", tileTouchStart);
//             tile.addEventListener("touchend", tileTouchEnd);
//             tile.addEventListener("touchmove", tileTouchMove);
//             document.getElementById("board").appendChild(tile);
//         }
//     }
// }

// function dragStart(e) {
//     e.dataTransfer.setData("text/plain", e.target.id);
//     e.target.classList.add("number-dragging");
// }

// function dragEnd(e) {
//     e.target.classList.remove("number-dragging");
// }

// function dragOver(e) {
//     e.preventDefault();
// }

// function drop(e) {
//     e.preventDefault();
//     let numberId = e.dataTransfer.getData("text/plain");
//     let number = document.getElementById(numberId);
//     let tile = e.target;

//     if (tile.classList.contains("tile") && number && !tile.classList.contains("tile-fixed")) {
//         let r = parseInt(tile.id.split("-")[0]);
//         let c = parseInt(tile.id.split("-")[1]);

//         // Update tile content with the dragged number
//         tile.innerText = number.innerText;
//         checkWin();
//     }
// }

// function touchStart(e) {
//     e.preventDefault();
//     let touch = e.touches[0];
//     touchStartX = touch.clientX;
//     touchStartY = touch.clientY;
//     draggedNumber = e.target;

//     previouslyTouchedTile = document.elementFromPoint(touchStartX, touchStartY);
// }

// function touchMove(e) {
//     e.preventDefault();
//     if (draggedNumber) {
//         let touch = e.touches[0];
//         let x = touch.clientX;
//         let y = touch.clientY;

//         let tile = document.elementFromPoint(x, y);
//         if (tile && tile.classList.contains("tile") && !tile.classList.contains("tile-fixed")) {
//             // Remove the number from the previously touched tile
//             removeNumberFromPreviouslyTouchedTile();

//             // Update the current tile with the dragged number
//             tile.innerText = draggedNumber.innerText;
//             checkWin();
//         }
//     }
// }

// function touchEnd(e) {
//     e.preventDefault();
//     draggedNumber = null;
//     previouslyTouchedTile = null;
// }
// function tileTouchStart(e) {
//     e.preventDefault();
//     let tile = e.target;
//     if (tile.classList.contains("tile") && !tile.classList.contains("tile-fixed")) {
//         draggedNumber = tile;
//     }
// }

// function tileTouchMove(e) {
//     e.preventDefault();
//     if (draggedNumber) {
//         let touch = e.touches[0];
//         let x = touch.clientX;
//         let y = touch.clientY;

//         let tile = document.elementFromPoint(x, y);
//         if (tile && tile.classList.contains("tile") && !tile.classList.contains("tile-fixed")) {
//             // Remove the number from the previously touched tile
//             removeNumberFromPreviouslyTouchedTile();

//             // Update the current tile with the dragged number
//             tile.innerText = draggedNumber.innerText;
//             checkWin();
//         }
//     }
// }

// function tileTouchEnd(e) {
//     e.preventDefault();
//     draggedNumber = null;
// }

// function checkWin() {
//     for (let r = 0; r < 6; r++) {
//         for (let c = 0; c < 6; c++) {
//             let tile = document.getElementById(r.toString() + "-" + c.toString());
//             if (tile.innerText !== solution[r][c]) {
//                 return; // If any tile is incorrect, the game is not won
//             }
//         }
//     }
//     showWinner();
// }

// function showWinner() {
//     let winnerOverlay = document.createElement('div');
//     winnerOverlay.classList.add('winner-overlay');
//     winnerOverlay.innerHTML = `
//         <h1>Congratulations!</h1>
//         <p>You have completed the Sudoku puzzle!</p>
//         <button onclick="resetGame()">Play Again</button>
//     `;
//     document.body.appendChild(winnerOverlay);
// }

// function resetGame() {
//     // Hide the winner overlay
//     const winnerOverlay = document.querySelector('.winner-overlay');
//     if (winnerOverlay) {
//         winnerOverlay.remove();
//     }

//     // Clear the board
//     const boardElement = document.getElementById("board");
//     while (boardElement.firstChild) {
//         boardElement.removeChild(boardElement.firstChild);
//     }

//     // Clear the digits
//     const digitsElement = document.getElementById("digits");
//     while (digitsElement.firstChild) {
//         digitsElement.removeChild(digitsElement.firstChild);
//     }

//     // Reinitialize the game
//     setGame();
// }

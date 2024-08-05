// let currentPlayer = 'X';
// let board = ['', '', '', '', '', '', '', '', ''];
// let gameActive = true;
// let gameMode = 'ai'; // Assuming we're in AI mode by default

// function makeMove(index) {
//     // Check if the game is active and the cell is empty
//     if (!gameActive || board[index] !== '') return;

//     // Update the board and cell
//     board[index] = currentPlayer;
//     const cell = document.querySelectorAll('.cell')[index];
//     cell.textContent = currentPlayer;
//     cell.classList.add(currentPlayer); // Add class based on current player

//     // Check for a win or draw
//     if (checkWinner()) {
//         setTimeout(() => {
//             document.getElementById('statusMessage').textContent = `Player ${currentPlayer} Wins!`;
//             document.getElementById('overlay').classList.remove('hidden');
//             document.getElementById('winMessage').classList.remove('hidden');
//             document.getElementById('winnerText').textContent = `Player ${currentPlayer} won`;
//             gameActive = false;
//             setTimeout(() => {
//                 resetGame();
//             }, 2000);
//         }, 500);
//     } else if (board.every(cell => cell !== '')) {
//         setTimeout(() => {
//             document.getElementById('statusMessage').textContent = "It's a Draw!";
//             document.getElementById('overlay').classList.remove('hidden');
//             document.getElementById('drawMessage').classList.remove('hidden');
//             gameActive = false;
//             setTimeout(() => {
//                 resetGame();
//             }, 2000);
//         }, 500);
//     } else {
//         // Switch player
//         currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//         document.getElementById('statusMessage').textContent = `Player ${currentPlayer}'s Turn`;

//         // If it's AI's turn, make the AI move
//         if (gameMode === 'ai' && currentPlayer === 'O') {
//             setTimeout(aiMove, 500); // Slight delay to mimic thinking time
//         }
//     }
// }

// function checkWinner() {
//     const winningCombinations = [
//         [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
//         [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
//         [0, 4, 8], [2, 4, 6] // Diagonals
//     ];

//     for (const combination of winningCombinations) {
//         const [a, b, c] = combination;
//         if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//             return board[a];
//         }
//     }

//     if (board.every(cell => cell !== '')) {
//         return 'tie';
//     }

//     return null;
// }

// function resetGame() {
//     // Clear the board
//     board = ['', '', '', '', '', '', '', '', ''];
//     document.querySelectorAll('.cell').forEach(cell => {
//         cell.textContent = '';
//         cell.classList.remove('X', 'O'); // Remove player classes
//     });

//     // Hide win message and overlay
//     document.getElementById('overlay').classList.add('hidden');
//     document.getElementById('winMessage').classList.add('hidden');
//     document.getElementById('drawMessage').classList.add('hidden');

//     // Reset status message
//     currentPlayer = 'X';
//     document.getElementById('statusMessage').textContent = `Player ${currentPlayer}'s Turn`;
//     gameActive = true;
// }

// function aiMove() {
//     if (!gameActive) return;

//     let bestMove = null;
//     let bestScore = -Infinity;

//     for (let i = 0; i < board.length; i++) {
//         if (board[i] === '') {
//             board[i] = 'O';
//             let score = minimax(board, 0, false, -Infinity, Infinity);
//             board[i] = '';
//             if (score > bestScore) {
//                 bestScore = score;
//                 bestMove = i;
//             }
//         }
//     }

//     if (bestMove !== null) {
//         makeMove(bestMove);
//     }
// }

// function minimax(board, depth, isMaximizing, alpha, beta) {
//     let scores = {
//         'X': -1,
//         'O': 1,
//         'tie': 0
//     };

//     let result = checkWinner();
//     if (result !== null) {
//         return scores[result];
//     }

//     if (isMaximizing) {
//         let bestScore = -Infinity;
//         for (let i = 0; i < board.length; i++) {
//             if (board[i] === '') {
//                 board[i] = 'O';
//                 let score = minimax(board, depth + 1, false, alpha, beta);
//                 board[i] = '';
//                 bestScore = Math.max(score, bestScore);
//                 alpha = Math.max(alpha, score);
//                 if (beta <= alpha) {
//                     break;
//                 }
//             }
//         }
//         return bestScore;
//     } else {
//         let bestScore = Infinity;
//         for (let i = 0; i < board.length; i++) {
//             if (board[i] === '') {
//                 board[i] = 'X';
//                 let score = minimax(board, depth + 1, true, alpha, beta);
//                 board[i] = '';
//                 bestScore = Math.min(score, bestScore);
//                 beta = Math.min(beta, score);
//                 if (beta <= alpha) {
//                     break;
//                 }
//             }
//         }
//         return bestScore;
//     }
// }

// function goBack() {
//     window.history.back();
// }

// // Initialize the game
// document.querySelectorAll('.cell').forEach((cell, index) => {
//     cell.addEventListener('click', () => makeMove(index));
// });

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let gameMode = 'ai'; // Assuming we're in AI mode by default

function makeMove(index) {
    // Check if the game is active and the cell is empty
    if (!gameActive || board[index] !== '') return;

    // Update the board and cell
    board[index] = currentPlayer;
    const cell = document.querySelectorAll('.cell')[index];
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer); // Add class based on current player

    // Check for a win or draw
    const result = checkWinner();
    if (result) {
        if (result === 'tie') {
            setTimeout(() => {
                document.getElementById('statusMessage').textContent = "It's a Draw!";
                document.getElementById('overlay').classList.remove('hidden');
                document.getElementById('drawMessage').classList.remove('hidden');
                gameActive = false;
                setTimeout(() => {
                    resetGame();
                }, 2000);
            }, 500);
        } else {
            setTimeout(() => {
                document.getElementById('statusMessage').textContent = `Player ${result} Wins!`;
                document.getElementById('overlay').classList.remove('hidden');
                document.getElementById('winMessage').classList.remove('hidden');
                document.getElementById('winnerText').textContent = `Player ${result} won`;
                gameActive = false;
                setTimeout(() => {
                    resetGame();
                }, 2000);
            }, 500);
        }
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('statusMessage').textContent = `Player ${currentPlayer}'s Turn`;

        // If it's AI's turn, make the AI move
        if (gameMode === 'ai' && currentPlayer === 'O') {
            setTimeout(aiMove, 500); // Slight delay to mimic thinking time
        }
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    if (board.every(cell => cell !== '')) {
        return 'tie';
    }

    return null;
}

function resetGame() {
    // Clear the board
    board = ['', '', '', '', '', '', '', '', ''];
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O'); // Remove player classes
    });

    // Hide win message and overlay
    document.getElementById('overlay').classList.add('hidden');
    document.getElementById('winMessage').classList.add('hidden');
    document.getElementById('drawMessage').classList.add('hidden');

    // Reset status message
    currentPlayer = 'X';
    document.getElementById('statusMessage').textContent = `Player ${currentPlayer}'s Turn`;
    gameActive = true;
}

function aiMove() {
    if (!gameActive) return;

    let bestMove = null;
    let bestScore = -Infinity;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false, -Infinity, Infinity);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    if (bestMove !== null) {
        makeMove(bestMove);
    }
}

function minimax(board, depth, isMaximizing, alpha, beta) {
    let scores = {
        'X': -1,
        'O': 1,
        'tie': 0
    };

    let result = checkWinner();
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false, alpha, beta);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
                alpha = Math.max(alpha, score);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true, alpha, beta);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
                beta = Math.min(beta, score);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return bestScore;
    }
}

function goBack() {
    window.history.back();
}

// Initialize the game
document.querySelectorAll('.cell').forEach((cell, index) => {
    cell.addEventListener('click', () => makeMove(index));
});

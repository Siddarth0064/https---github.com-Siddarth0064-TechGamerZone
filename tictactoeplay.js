// // Initialize game variables
// let currentPlayer = 'X';
// let board = ['', '', '', '', '', '', '', '', ''];
// let gameActive = true;

// function makeMove(index) {
//     const cell = document.querySelectorAll('.cell')[index];
//     if (!cell.textContent) {
//         cell.textContent = currentPlayer;
//         cell.classList.add(currentPlayer); // Add class based on current player

//         // Example: Check for a win or switch player
//         currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//         document.getElementById('statusMessage').textContent = `Player ${currentPlayer}'s Turn`;
//     }

//     if (!gameActive || board[index] !== '') return;

//     board[index] = currentPlayer;
//     document.querySelectorAll('.cell')[index].textContent = currentPlayer;

//     if (checkWinner()) {
//         document.getElementById('statusMessage').textContent = `Player ${currentPlayer} Wins!`;
//         gameActive = false;
//     } else if (board.every(cell => cell !== '')) {
//         document.getElementById('statusMessage').textContent = "It's a Draw!";
//         gameActive = false;
//     } else {
//         currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//         document.getElementById('statusMessage').textContent = `Player ${currentPlayer}'s Turn`;
//     }
// }

// function checkWinner() {
//     const winningCombinations = [
//         [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
//         [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
//         [0, 4, 8], [2, 4, 6] // Diagonals
//     ];

//     return winningCombinations.some(combination => {
//         const [a, b, c] = combination;
//         return board[a] && board[a] === board[b] && board[a] === board[c];
//     });
// }

// function goBack() {
//     window.location.href = 'tictactoe.html'; // Adjust the path if necessary
// }



let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let gameMode = null; // Added to keep track of game mode


function makeMove(index) {
    // Check if the game is active and the cell is empty
    if (!gameActive || board[index] !== '') return;

    // Update the board and cell
    board[index] = currentPlayer;
    const cell = document.querySelectorAll('.cell')[index];
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer); // Add class based on current player

    // Check for a win or draw
    if (checkWinner()) {
        setTimeout(() => {
        document.getElementById('statusMessage').textContent = `Player ${currentPlayer} Wins!`;
        document.getElementById('overlay').classList.remove('hidden');
        document.getElementById('winMessage').classList.remove('hidden');
        document.getElementById('winnerText').textContent = `Player ${currentPlayer} won`;
        gameActive = false;
        setTimeout(() => {
            resetGame();
        }, 2000);
    }, 500); 
    } else if (board.every(cell => cell !== '')) {
         // Delay showing the draw message to ensure the last symbol is marked
         setTimeout(() => {
            document.getElementById('statusMessage').textContent = "It's a Draw!";
            document.getElementById('overlay').classList.remove('hidden');
            document.getElementById('drawMessage').classList.remove('hidden');
    
            // Disable further moves and clear game after 2 seconds
            gameActive = false;
            setTimeout(() => {
                resetGame();
            }, 2000);
        }, 500); // Adjust delay as needed
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('statusMessage').textContent = `Player ${currentPlayer}'s Turn`;
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
            return true;
        }
    }

    return false;
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

function goBack() {
    window.history.back();
}

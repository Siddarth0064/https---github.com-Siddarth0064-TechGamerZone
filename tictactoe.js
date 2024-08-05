
// let gameMode = null;
// let playerSymbol = null;

// function startGame(mode) {
//     gameMode = mode;
//     console.log('Game mode selected:', gameMode);
// }

// function selectSymbol(symbol) {
//     playerSymbol = symbol;
//     console.log('Symbol selected:', playerSymbol);
// }

// function startPlay() {
//     console.log("Starting the game");
//     // Add functionality to start the game
//     if (gameMode && playerSymbol) {
//         // Redirect to the Tic-Tac-Toe play page
//         window.location.href = 'tictactoeplay.html';
//     } else {
//         // Handle the case where game mode or symbol is not selected
//         alert('Please select game mode and symbol before starting the game.');
//     }
// }
// // Function to handle symbol selection
// function selectSymbol(symbol) {
//     // Get all symbol buttons
//     const symbolButtons = document.querySelectorAll('.symbol-selection .btn');
    
//     // Remove the 'selected' class from all buttons
//     symbolButtons.forEach(button => button.classList.remove('selected'));
    
//     // Add the 'selected' class to the clicked button
//     event.target.classList.add('selected');
    
//     // Save the selected symbol
//     currentSymbol = symbol;
// }
// function startGame(event, mode) {
//     // Get all mode buttons
//     const modeButtons = document.querySelectorAll('.game-options .btn');
    
//     // Remove the 'selected' class from all buttons
//     modeButtons.forEach(button => button.classList.remove('selected'));
    
//     // Add the 'selected' class to the clicked button
//     event.target.classList.add('selected');
    
//     // Save the selected mode (you might want to use this variable elsewhere in your code)
//     selectedMode = mode; // Make sure 'selectedMode' is defined elsewhere in your script
// }

// // Example usage with event listener
// document.querySelectorAll('.game-options .btn').forEach(button => {
//     button.addEventListener('click', function(event) {
//         startGame(event, this.dataset.mode); // Assuming buttons have data-mode attribute
//     });
// });


let gameMode = null;
let playerSymbol = null;

// Function to handle game mode selection
function startGame(event, mode) {
    // Get all mode buttons
    const modeButtons = document.querySelectorAll('.game-options .btn');
    
    // Remove the 'selected' class from all buttons
    modeButtons.forEach(button => button.classList.remove('selected'));
    
    // Add the 'selected' class to the clicked button
    event.target.classList.add('selected');
    
    // Save the selected mode
    gameMode = mode;
    localStorage.setItem('gameMode', gameMode); // Save to local storage
    console.log('Game mode selected:', gameMode);
}

// Function to handle symbol selection
function selectSymbol(symbol) {
    // Get all symbol buttons
    const symbolButtons = document.querySelectorAll('.symbol-selection .btn');
    
    // Remove the 'selected' class from all buttons
    symbolButtons.forEach(button => button.classList.remove('selected'));
    
    // Add the 'selected' class to the clicked button
    const selectedButton = [...symbolButtons].find(button => button.textContent === symbol);
    if (selectedButton) {
        selectedButton.classList.add('selected');
    }
    
    // Save the selected symbol
    playerSymbol = symbol;
    console.log('Symbol selected:', playerSymbol);
    localStorage.setItem('playerSymbol', playerSymbol); // Save to local storage
    console.log('Symbol selected:', playerSymbol);
}

// Function to start the game
function startPlay() {
    console.log("Starting the game");
    if (gameMode && playerSymbol) {
        if (gameMode === 'player') {
            window.location.href = 'tictactoeplay.html';
        } else if (gameMode === 'ai') {
            window.location.href = 'tictactoeai.html';
        }
    } else {
        // Handle the case where game mode or symbol is not selected
        alert('Please select game mode and symbol before starting the game.');
    }
}

// Add event listeners for game mode buttons
document.querySelectorAll('.game-options .btn').forEach(button => {
    button.addEventListener('click', function(event) {
        startGame(event, this.dataset.mode); // Pass event and mode
    });
});

// Add event listeners for symbol buttons
document.querySelectorAll('.symbol-selection .btn').forEach(button => {
    button.addEventListener('click', function() {
        selectSymbol(this.textContent); // Pass symbol based on button text
    });
});

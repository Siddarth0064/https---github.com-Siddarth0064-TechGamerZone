
document.addEventListener('DOMContentLoaded', () => {
    const timerElement = document.getElementById('timer');
    const containers = document.querySelectorAll('.container');
    const spinnerContainer = document.querySelector('.container.loading');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close');
    const resultPopup = document.getElementById('result-popup');
    const popupClose = document.getElementById('popup-close');
    const playerSelectionDiv = document.getElementById('player-selection');
    const techAiSelectionDiv = document.getElementById('tech-ai-selection');
    const winnerMessageDiv = document.getElementById('winner-message');

    let countdown; // Variable to store the countdown interval
    let timeLeft = 5; // Initial time (in seconds)
    let userSelection = ''; // To store the user's selection
    const techAiOptions = ['hand-back-fist', 'hand', 'hand-scissors']; // Tech Ai options


const initialColor = '#ff9800'; // Initial color
const endColor = '#f44336'; // Color when time reaches 0

    // Function to start or restart the countdown timer
    function startCountdown() {
        clearInterval(countdown); // Clear any existing countdown
        timerElement.textContent = ` ${timeLeft}`;
        timerElement.style.background = initialColor; // Set initial color
        timerElement.classList.remove('timer-transition'); // Ensure class is removed
        countdown = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timerElement.textContent = ` ${timeLeft}`;
            } else {
                clearInterval(countdown); // Stop the timer
                timerElement.classList.add('timer-transition'); // Start color transition
                spinnerContainer.style.display = 'none'; // Hide the spinner after countdown
                if (!userSelection) { // Only show the modal if no selection is made
                    modal.style.display = 'block'; // Show the modal
                } else {
                    determineWinner(); // If user selected a symbol, determine the winner
                }
            }
        }, 1000); // Countdown every 1 second
    }

    // Function to reset and start the spinner animation
    function resetSpinnerAnimation() {
        spinnerContainer.style.display = 'block'; // Ensure the spinner is visible
        // Re-trigger the spinner animation
        spinnerContainer.classList.remove('loading');
        void spinnerContainer.offsetWidth; // Trigger a reflow to restart animation
        spinnerContainer.classList.add('loading');
    }

    // Function to determine the winner based on user and Tech Ai selection
    // Function to determine the winner based on user and Tech Ai selection
function determineWinner() {
    // Check if the user has selected a symbol
    if (!userSelection) {
        return; // If no selection is made, exit the function without showing the result
    }

    const techAiSelection = techAiOptions[Math.floor(Math.random() * techAiOptions.length)];

    // Display Tech Ai and player selection
    playerSelectionDiv.innerHTML = `<i class="fa-solid fa-${userSelection}"></i><br>Me`;
    techAiSelectionDiv.innerHTML = `<i class="fa-solid fa-${techAiSelection}"></i><br>Tech Ai`;

    // Determine the winner
    let resultIcon, resultText;
    if (userSelection === techAiSelection) {
        resultIcon = `<i class="fa-solid fa-handshake"></i>`; // Handshake icon for tie
        resultText = 'It\'s a tie!';
    } else if (
        (userSelection === 'hand-back-fist' && techAiSelection === 'hand-scissors') ||
        (userSelection === 'hand' && techAiSelection === 'hand-back-fist') ||
        (userSelection === 'hand-scissors' && techAiSelection === 'hand')
    ) {
        resultIcon = `<i class="fa-solid fa-trophy"></i>`; // Trophy icon for win
        resultText = 'You..!';
        showCelebration(); // Call the function to show celebration animation
    } else {
        resultIcon = `<i class="fa-solid fa-skull"></i>`; // Skull icon for loss
        resultText = 'Tech Ai...!';
        showCelebration();
    }

    // Apply the blur effect to the background
    document.getElementById('background-container').classList.add('blurred');

    if(resultText=='It\'s a tie!'){
        winnerMessageDiv.innerHTML = ` ${resultText}`;

    }else{

        winnerMessageDiv.innerHTML = `Winner is: ${resultText}`;
    }
    // Display the result with icons and text
    resultPopup.classList.add('show'); // Show the popup with animation

    // Hide the result popup and reset the game after 4 seconds
    setTimeout(() => {
        resultPopup.classList.remove('show'); // Hide the popup
        document.getElementById('background-container').classList.remove('blurred'); // Remove blur effect
        resetGame(); // Reset the game after the popup is hidden
    }, 3500); // 4-second delay before restarting the game
}

// Celebration animation (confetti)
function showCelebration() {
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

    
    // Function to reset the game
function resetGame() {
    userSelection = ''; // Reset user selection
    containers.forEach(container => container.classList.remove('selected')); // Remove 'selected' class from icons
    timeLeft = 5; // Reset timer
    resetSpinnerAnimation(); // Reset spinner animation
    startCountdown(); // Restart the countdown
}

    // Start the countdown timer initially
    startCountdown();

    // Add click event listeners to each icon
    containers.forEach(container => {
        container.addEventListener('click', () => {
            clearInterval(countdown); // Stop the timer if a selection is made
            // Remove 'selected' class from any other selected icons
            containers.forEach(container => container.classList.remove('selected'));
            // Add 'selected' class to the clicked icon
            container.classList.add('selected');
            // Store the user's selection
            userSelection = container.dataset.value;
            console.log("User Selection:", userSelection); // Debugging to ensure correct value
            // Hide the modal if an icon is selected
            modal.style.display = 'none';
            // Restart the countdown timer
            timeLeft = 5;
            resetSpinnerAnimation(); // Reset and start spinner animation
            startCountdown(); // Restart the countdown timer
        });
    });

    // Close the modal when the user clicks on <span> (x)
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        timeLeft = 5; // Reset the timeLeft to the initial value
        resetSpinnerAnimation(); // Reset and start spinner animation
        startCountdown(); // Restart the countdown timer
    });

    // Close the modal if the user clicks anywhere outside of the modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            timeLeft = 5; // Reset the timeLeft to the initial value
            resetSpinnerAnimation(); // Reset and start spinner animation
            startCountdown(); // Restart the countdown timer
        }
    });

    // Close the popup when the user clicks on <span> (x)
    popupClose.addEventListener('click', () => {
        resultPopup.style.display = 'none';
    });

    // Close the popup if the user clicks anywhere outside of the popup
    window.addEventListener('click', (event) => {
        if (event.target === resultPopup) {
            resultPopup.style.display = 'none';
        }
    });
});


// function startCountdown() {
//     clearInterval(countdown); // Clear any existing countdown
//     timerElement.textContent = `TIME: ${timeLeft}`;
//     timerElement.style.background = initialColor; // Set initial color

//     countdown = setInterval(() => {
//         if (timeLeft > 0) {
//             timeLeft--;
//             timerElement.textContent = `TIME: ${timeLeft}`;
//         } else {
//             clearInterval(countdown); // Stop the timer
//             timerElement.style.background = endColor; // Change color when time is up
//             spinnerContainer.style.display = 'none'; // Hide the spinner after countdown
//             if (!userSelection) { // Only show the modal if no selection is made
//                 modal.style.display = 'block'; // Show the modal
//             } else {
//                 determineWinner(); // If user selected a symbol, determine the winner
//             }
//         }
//     }, 1000); // Countdown every 1 second
// }

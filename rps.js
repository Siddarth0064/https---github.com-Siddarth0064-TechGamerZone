document.addEventListener('DOMContentLoaded', () => {
    // Function to show the options after animations
    function showOptions() {
        const options = document.querySelector('.options');
        options.style.display = 'flex';
    }

    // Function to animate the Rock, Paper, Scissors containers
    function animateContainers() {
        const containers = document.querySelectorAll('.container');
        containers.forEach((container, index) => {
            container.style.animation = `appear-disappear 3s ease-in-out ${index * 3}s forwards`;
        });

        // Call showOptions after the last animation
        setTimeout(showOptions, 9 * 1000); // 9 seconds delay (last animation starts at 6s, lasts 3s)
    }

    animateContainers();

    // Option selection logic
    const optionButtons = document.querySelectorAll('.option-btn:not(.play-btn)');
    const playButton = document.querySelector('.play-btn');

    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'selected' class from all buttons
            optionButtons.forEach(btn => btn.classList.remove('selected'));

            // Add 'selected' class to the clicked button
            button.classList.add('selected');

              // Store the selected mode
              selectedMode = button.getAttribute('data-mode');

            // Enable the play button
            playButton.disabled = false;
            playButton.classList.add('enabled');
        
               
        });
    });


    // Play button click event listener
    playButton.addEventListener('click', () => {
        if (selectedMode) {
            // Redirect based on the selected mode
            if (selectedMode === 'ai') {
                window.location.href = 'rpspvp.html'; // Redirect to Player vs Tech AI page
            }
            // Add additional conditions for other modes if needed
        }
    });
});
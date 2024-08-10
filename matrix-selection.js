const matrixOptions = document.querySelectorAll('.matrix-option');
const playButton = document.getElementById('play-button');
let selectedMatrix = null;

matrixOptions.forEach(option => {
    option.addEventListener('click', () => {
        matrixOptions.forEach(option => option.classList.remove('selected'));
        option.classList.add('selected');
        selectedMatrix = option.getAttribute('data-matrix');
        playButton.disabled = false;
    });
});

playButton.addEventListener('click', () => {
    if (selectedMatrix) {
        if (selectedMatrix === '3x3') {
            window.location.href = 'sudoku.html';
        } else if (selectedMatrix === '2x2'){
            window.location.href = 'sudaku1.html';
        }
        else{
            alert(`You selected ${selectedMatrix}, but the page is not set.`);
            // You can add additional redirects for other matrix sizes here
        }
    }
});

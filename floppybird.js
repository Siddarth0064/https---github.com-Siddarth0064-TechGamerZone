let gameOverOpacity = 0;
let scoreOpacity = 0;
const fadeDuration = 1000; // duration in milliseconds
let startTime = 0;
//board
let board;
let boardWidth = 460;
let boardHeight = 640;
let context;

// Physics and dimensions for mobile and desktop
let velocityX, velocityY, pipeWidth, pipeHeight, birdWidth, birdHeight;



//bird
// let birdWidth = 34; //width/height ratio = 408/228 = 17/12
// let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

//pipes
let pipeArray = [];
// let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
// let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
// let velocityX = -2; //pipes moving left speed
// let velocityY = 0; //bird jump speed
// let gravity = 0.2;

const mobileSettings = {
    velocityX: -1.5, // Slower pipe speed for mobile
    velocityY: -2.7,   // Slightly less jump force for mobile
    pipeWidth: 48,   // Smaller pipe width for mobile
    pipeHeight: 384, // Smaller pipe height for mobile
    birdWidth: 25,   // Smaller bird for mobile
    birdHeight: 18   // Smaller bird height for mobile
};

const desktopSettings = {
    velocityX: -2,
    velocityY: -4.5,
    pipeWidth: 64,
    pipeHeight: 512,
    birdWidth: 34,
    birdHeight: 24
};
function setGameSettings() {
    if (isMobileDevice()) {
        gravity = mobileGravity;
        velocityX = mobileSettings.velocityX;
        velocityY = mobileSettings.velocityY;
        pipeWidth = mobileSettings.pipeWidth;
        pipeHeight = mobileSettings.pipeHeight;
        bird.width = mobileSettings.birdWidth;
        bird.height = mobileSettings.birdHeight;
    } else {
        gravity = desktopGravity;
        velocityX = desktopSettings.velocityX;
        velocityY = desktopSettings.velocityY;
        pipeWidth = desktopSettings.pipeWidth;
        pipeHeight = desktopSettings.pipeHeight;
        bird.width = desktopSettings.birdWidth;
        bird.height = desktopSettings.birdHeight;
    }
}
let gravity;
const mobileGravity = 0.1; // Gravity value for mobile devices
const desktopGravity = 0.2; // Gravity value for desktop devices

function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}
// Set gravity based on device type
function setGravity() {
    if (isMobileDevice()) {
        gravity = mobileGravity;
    } else {
        gravity = desktopGravity;
    }
}




let gameOver = false;
let score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // used for drawing on the board

    birdImg = new Image();
    birdImg.src = "./flappybird.png";

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";
    


    // Set gravity based on the device
    setGameSettings();
    bird.x = birdX;
    bird.y = birdY;

    // Attach event listeners for controls
    document.addEventListener("keydown", moveBird); // Desktop control
    document.getElementById("flyButton").addEventListener("click", moveBird); // Mobile control
    document.getElementById("playButton").addEventListener("click", startGame); // Play button

    requestAnimationFrame(update);
    setInterval(placePipes, 1500); // Generate pipes every 1.5 seconds
};

function startGame() {
    if (gameOver) {
        restartGame();
    } else {
        // Ensure the game starts when not in gameOver state
        gameOver = false;
        velocityY = -6; // Initial jump to start the game
    }
}

function restartGame() {
    bird.y = birdY;
    pipeArray = [];
    score = 0;
    gameOver = false;
    // Apply the settings again
    setGameSettings();
    velocityY = 0;
       // Hide the restart button
       let restartButton = document.getElementById("restartButton");
       restartButton.style.display = "none";
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX" || e.type === "click" ) {
        if (gameOver) {
            restartGame();
        } else {
            velocityY = isMobileDevice() ? -2.5 : -4.5;
        }
    }
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        displayGameOver();
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //bird
    velocityY += gravity;
    // bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY, 0); //apply gravity to current bird.y, limit the bird.y to top of the canvas
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) {
        gameOver = true;
    }

    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5; //0.5 because there are 2 pipes! so 0.5*2 = 1, 1 for each set of pipes
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true;
        }
    }

    //clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift(); //removes first element from the array
    }


    
    function displayGameOver() {
          // Initialize startTime if it's not set
    if (startTime === 0) {
        startTime = Date.now();
    } 
        // Apply a blur effect to the background
        context.filter = "blur(5px)";
        context.clearRect(0, 0, board.width, board.height);
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    
        for (let i = 0; i < pipeArray.length; i++) {
            let pipe = pipeArray[i];
            context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
        }
    
         // Transition effect for "GAME OVER" and score
    const elapsedTime = Date.now() - startTime;
    const progress = Math.min(elapsedTime / fadeDuration, 1); // progress ranges from 0 to 1

    gameOverOpacity = progress;
    scoreOpacity = Math.max(0, (progress - 0.5) * 2); // score fades in after 0.5 seconds


        // Overlay Game Over and score
        context.filter = "none"; // Remove the blur effect for the text
        context.fillStyle = "blue";
        context.font = "45px sans-serif";
        context.globalAlpha = gameOverOpacity;
        context.fillText("GAME OVER", board.width / 2 - 130, board.height / 2 - 50); // Centered
       context.globalAlpha = scoreOpacity;
        context.fillText("Score: " + score, board.width / 2 - 90, board.height / 2 + 20);
    

         // Show the restart button
    let restartButton = document.getElementById("restartButton");
    restartButton.style.display = "block";  // Make the button visible

    // Position the button in the center of the canvas
    restartButton.style.position = "absolute";
    restartButton.style.left = board.offsetLeft + board.width / 2 - restartButton.offsetWidth / 2 + "px";
    restartButton.style.top = board.offsetTop + board.height / 2 + 50 + "px";
  // Request next animation frame if the transition is not complete
  if (progress < 1) {
    requestAnimationFrame(displayGameOver);
}
    }


    //score
    context.fillStyle = "blue";
    context.font="45px sans-serif";
    context.fillText(score, 5, 45);

    if (gameOver) {
        displayGameOver();
    }
}

function placePipes() {
    if (gameOver) {
        return;
    }

    //(0-1) * pipeHeight/2.
    // 0 -> -128 (pipeHeight/4)
    // 1 -> -128 - 256 (pipeHeight/4 - pipeHeight/2) = -3/4 pipeHeight
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/3;

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(topPipe);

    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);
}

// function moveBird(e) {
//     if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX" ||e.type === "click" ) {
//         //jump
//         velocityY = -6;

//         //reset game
//         if (gameOver) {
//             bird.y = birdY;
//             pipeArray = [];
//             score = 0;
//             gameOver = false;
//         }
//     }
// }

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}



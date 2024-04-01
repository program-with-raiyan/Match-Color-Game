const changeColorBtn = document.getElementById('changeColorBtn');
const red = document.getElementById('red');
const blue = document.getElementById('blue');
const black = document.getElementById('black');
const green = document.getElementById('green');
const challengeBox = document.getElementById('challangeColorBox');
let challengeBoxTop = -7; //Initial top position of challenge box
let speed = 0.5; //Speed at which challenge box moves down
let score = 0;
const colors = ['rgb(255, 0, 0)', 'rgb(0, 0, 255)', 'rgb(0, 255, 0)', 'rgb(0, 0, 0)'];
let randomColor = colors[Math.floor(Math.random() * colors.length)];
challengeBox.style.backgroundColor = randomColor;
let gameStart = true;
const playBtn = document.getElementById('playBtn');
const home = document.getElementById('home');
const gamePage = document.getElementById('gamePage');
const resultPage = document.getElementById('resultPage');
const backToHomeBtn = document.getElementById('backToHomeBtn');
const btnClickSFX = new Audio('tap-notification-180637.mp3')
const bgmOfGame = new Audio('on-the-road-to-the-eighties_59sec-177566.mp3');
bgmOfGame.volume = 0.1
const game = document.getElementById('game')
const gameStaryBtn = document.getElementById('gameStaryBtn');
let speedL = [0.2, 0.7, 0.9, 1, 1.1, 1.2]
const resultPageSFX = new Audio('resultSound.mp3')
const rightMatchSFX = new Audio('correct.mp3')
let currentMove = 0; // 0 for first move, 1 for second move, and so on


gameStaryBtn.addEventListener('click', () => {
    if (home.style.display === 'none' || home.style.display === '') {
        home.style.display = 'flex'
        game.style.display = 'none'
        bgmOfGame.loop = true
        bgmOfGame.play()
    } else {
        game.style.display = 'flex'
    }
})
playBtn.addEventListener('click', () => {
    if (gamePage.style.display === 'none' || gamePage.style.display === '') {
        gamePage.style.display = 'block'
        home.style.display = 'none'
        startGame();
        btnClickSFX.play()
    }
    else {
        home.style.display = 'flex'
    }
})
backToHomeBtn.addEventListener('dblclick', () => {
    window.location.href = 'index.html'

})


function startGame() {
    if (gameStart) {
        function moveChallengeBox() {
            // Update the top position of the challenge box
            challengeBoxTop += speed;
            challengeBox.style.top = challengeBoxTop + 'vh';
            challengeBox.style.left = '50vw';

            // Check if challenge box has reached the collision position
            if (challengeBoxTop >= 61) {
                // Stop the challenge box at the collision position
                challengeBox.style.top = '51vh';
                const challengeBoxComputedStyle = window.getComputedStyle(challengeBox);
                let challengeBoxColor = challengeBoxComputedStyle.getPropertyValue('background-color');
                // Check the color of the box at 319px
                const colorAt319px = getTopColorBox();
                if (colorAt319px === challengeBoxColor) {
                    score += 10;
                    rightMatchSFX.play()
                    document.getElementById('score').innerText = 'Score = ' + score;
                    challengeBoxTop = -7
                    gameStart = true
                    moveChallengeBox()
                    let randomColor = colors[Math.floor(Math.random() * colors.length)];
                    challengeBox.style.backgroundColor = randomColor;
                    if (score > 90) {
                        const randomSpeed = speedL[Math.floor(Math.random() * speedL.length)];
                        speed = randomSpeed
                        console.log(speed)
                    }
                } else {
                    gameStart = false;
                    if (gamePage.style.display === 'block' || gamePage.style.display === '') {
                        resultPage.style.display = 'flex';
                        resultPageSFX.play()
                        gamePage.style.display = 'none'

                    } else {
                        resultPage.style.display = 'none'
                    }
                    document.getElementById('yourScore').innerText = score

                }
            } else {
                // Continue moving the challenge box
                requestAnimationFrame(moveChallengeBox);
            }
        }

        function getTopColorBox() {
            const boxes = document.getElementsByClassName('colorBox color');
            for (let i = 0; i < boxes.length; i++) {
                const box = boxes[i];
                const topBoxComputedStyle = window.getComputedStyle(box);
                const bottom = topBoxComputedStyle.getPropertyValue('bottom');
                const bottomInt = parseInt((parseInt(bottom) / innerHeight) * 100); // Parse only the number part
                console.log(bottomInt)
                if (bottomInt === 19) { // Check if it's a valid number and equals
                    return topBoxComputedStyle.getPropertyValue('background-color');
                }
            }
            return null;
        }


        changeColorBtn.addEventListener('click', () => {
            if (currentMove === 0) {
                red.style.bottom = '10vh'
                red.style.left = '35vw'

                green.style.bottom = '20vh'
                green.style.left = '50vw'

                black.style.bottom = '10vh'
                black.style.left = '65vw'

                blue.style.bottom = '0'
                blue.style.right = '50vw'
                // Move colors as per first move
                currentMove = 1; //Set currentMove to 1 for the next move
            } else if (currentMove === 1) {
                red.style.bottom = '20vh'
                red.style.left = '50vw'

                green.style.bottom = '10vh'
                green.style.left = '65vw'

                black.style.bottom = '0'
                black.style.left = '50vw'

                blue.style.bottom = '10vh'
                blue.style.right = '65vw'

                // Move colors as per second move
                currentMove = 2; //Set currentMove to 2 for the next move
            } else if (currentMove === 2) {
                red.style.bottom = '10vh'
                red.style.left = '65vw'

                green.style.bottom = '0'
                green.style.left = '50vw'

                black.style.bottom = '10vh'
                black.style.left = '35vw'

                blue.style.bottom = '20vh'
                blue.style.right = '50vw'
                // Move colors as per third move
                currentMove = 3; //Set currentMove to 0 for 3 
            } else if (currentMove === 3) {
                red.style.bottom = '0'
                red.style.left = '50vw'

                green.style.bottom = '10vh'
                green.style.left = '35vw'

                black.style.bottom = '20vh'
                black.style.left = '50vw'

                blue.style.bottom = '10vh'
                blue.style.right = '35vw'
                //Move colors as per third move
                currentMove = 0; //Set currentMove to 0 for restart
            }
        });

        moveChallengeBox();
    } else {}
}

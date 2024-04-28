let inputdir = { x: 0, y: 0 }  // in which direction it is moving
const foodSound = new Audio('../../snakegame/musicAndImages/music_food.mp3')
const gameOverSound = new Audio('../../snakegame/musicAndImages/music_gameover.mp3')
const moveSound = new Audio('../../snakegame/musicAndImage/music_move.mp3')
const backgroundMusic = new Audio('../../snakegame/musicAndImages/music.mp3')
let speed = 3;
let lastPaintTime = 0;
let score = 0;
let snakeArray = [
    { x: Math.round(2 + (14) * Math.random()), y: Math.round(13 + (3) * Math.random()) }
]
let food = { x: Math.round(2 + (14) * Math.random()), y: Math.round(2 + (10) * Math.random()) }
let reversefood = { x: Math.round(2 + (14) * Math.random()), y: Math.round(2 + (10) * Math.random()) }

let board = document.querySelector('#board')
let scoreId = document.querySelector("#score")
let highscoreId = document.querySelector('#highscore')
let changeImage = document.querySelector('#changeImage')
let soundon = true;
let pause = false;



let snakeLastpointer = null;  // to use reverse functionality
let snakeHeadPointer = null;
// game functions

// functions ----------------------------
// getting highscore from localStorage---------------
let highscore = localStorage.getItem('highscore');
if (highscore === null) {
    let highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval))
}
else {
    let highscoreval = JSON.parse(localStorage.getItem("highscore"));
    // console.log(highscoreval);
    highscoreval = Math.max(highscoreval, score)
    highscoreId.innerHTML = "HighScore:" + highscoreval
    localStorage.setItem("highscore", JSON.stringify(highscoreval))

}



function main(ctime) {
    if (soundon) {
        backgroundMusic.play();
    }
    window.requestAnimationFrame(main); //---- to design the gameloop
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}

function isCollide(arr) {
    // if you collide with yourself
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].x === arr[0].x && arr[i].y === arr[0].y) {
            return true;
        }
    }
    if (arr[0].x >= 18 || arr[0].x <= 0 || arr[0].y >= 18 || arr[0].y <= 0) {
        return true;
    }
    return false;

}
async function gameEngine() {
    // part1 = updating the snake array and food

    if (isCollide(snakeArray)) {
        if (soundon) gameOverSound.play()
        backgroundMusic.pause();
        inputdir = { x: 0, y: 0 };
        alert("Game Over. Press any key to Restart!!")
        snakeArray = [
            { x: Math.round(2 + (14) * Math.random()), y: Math.round(13 + (3) * Math.random()) }
        ]
        food = { x: Math.round(2 + (14) * Math.random()), y: Math.round(2 + (10) * Math.random()) }
        score = 0;
        speed = 3;
        scoreId.innerHTML = "Score:" + 0
        if (soundon) backgroundMusic.play();
    }

    // if snake eaten the food 
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        if (soundon) foodSound.play();
        snakeArray.unshift({ x: snakeArray[0].x + inputdir.x, y: snakeArray[0].y + inputdir.y });

        food = { x: Math.round(2 + (14) * Math.random()), y: Math.round(2 + (14) * Math.random()) }; // --to generate random food
        let collideWithSnake = true;
        let maxcheck = 0;
        while (collideWithSnake && maxcheck <= 5) {
            let myvalue = false;
            snakeArray.forEach((points) => {
                if (points.x === food.x && points.y === food.y) {
                    food = { x: Math.round(2 + (14) * Math.random()), y: Math.round(2 + (14) * Math.random()) };
                    myvalue = true;
                }
            })
            if (myvalue === false) {
                collideWithSnake = false;
            }
            maxcheck += 1;
        }
        score += 1;
        scoreId.innerHTML = "Score:" + score

        let highscore = localStorage.getItem('highscore');
        if (highscore === null) {
            let highscoreval = 0;
            localStorage.setItem("highscore", JSON.stringify(highscoreval))
        }
        else {
            let highscoreval = JSON.parse(localStorage.getItem("highscore"));
            console.log(highscoreval);
            highscoreval = Math.max(highscoreval, score)
            highscoreId.innerHTML = "HighScore:" + highscoreval
            localStorage.setItem("highscore", JSON.stringify(highscoreval))

        }
        speed += 0.25; // to increase speed
    }





    // reverse snake addon


    if (score >= 9 && score % 3 == 0) {
        if (snakeArray[0].y === reversefood.y && snakeArray[0].x === reversefood.x) {
            if (soundon) foodSound.play();

            snakeArray.reverse();
            if (snakeLastpointer === "U") {
                inputdir.x = 0;
                inputdir.y = -1;
            }
            else if (snakeLastpointer === "D") {
                inputdir.x = 0;
                inputdir.y = 1;
            }
            else if (snakeLastpointer === "L") {
                inputdir.x = -1;
                inputdir.y = 0;
            }
            else if (snakeLastpointer === "R") {
                inputdir.x = 1;
                inputdir.y = 0;
            }


            // snakeArray.unshift({x:snakeArray[0].x + inputdir.x,y:snakeArray[0].y + inputdir.y});

            reversefood = { x: Math.round(2 + (14) * Math.random()), y: Math.round(2 + (14) * Math.random()) }; // --to generate random food
            // -------------------addon for not colliding with snake to food
            let collideWithSnake = true;
            let maxcheck = 0;
            while (collideWithSnake && maxcheck <= 5) {
                let myvalue = false;
                snakeArray.forEach((points) => {
                    if (points.x === reversefood.x && points.y === reversefood.y) {
                        reversefood = { x: Math.round(2 + (14) * Math.random()), y: Math.round(2 + (14) * Math.random()) };
                        myvalue = true;
                        return;
                    }
                })
                if (myvalue === false) {
                    collideWithSnake = false;
                    break;
                }
                maxcheck += 1;
            }
            //-------------------------------------------
            score += 1;
            scoreId.innerHTML = "Score:" + score

            let highscore = localStorage.getItem('highscore');
            if (highscore === null) {
                let highscoreval = 0;
                localStorage.setItem("highscore", JSON.stringify(highscoreval))
            }
            else {
                let highscoreval = JSON.parse(localStorage.getItem("highscore"));
                console.log(highscoreval);
                highscoreval = Math.max(highscoreval, score)
                highscoreId.innerHTML = "HighScore:" + highscoreval
                localStorage.setItem("highscore", JSON.stringify(highscoreval))

            }
            speed -= 0.25; // to increase speed
        }
    }




    // pointer of last point to reverse
    if (snakeArray.length >= 2) {
        let lastvaluex = snakeArray[snakeArray.length - 1].x;
        let lastvaluey = snakeArray[snakeArray.length - 1].y;
        let lastSecondValueX = snakeArray[snakeArray.length - 2].x;
        let lastSecondValueY = snakeArray[snakeArray.length - 2].y;
        if (lastvaluex === lastSecondValueX && lastvaluey - 1 === lastSecondValueY) {
            snakeLastpointer = "D"
        }
        else if (lastvaluex === lastSecondValueX && lastvaluey === lastSecondValueY - 1) {
            snakeLastpointer = "U"
        }
        else if (lastvaluex - 1 === lastSecondValueX && lastvaluey === lastSecondValueY) {
            snakeLastpointer = "R"
        }
        else if (lastvaluex === lastSecondValueX - 1 && lastvaluey === lastSecondValueY) {
            snakeLastpointer = "L"
        }
    }



    // moving the snake
    if (pause === false) {
        for (let i = snakeArray.length - 2; i >= 0; i--) {
            snakeArray[i + 1] = { ...snakeArray[i] };
        }
        snakeArray[0].x += inputdir.x;
        snakeArray[0].y += inputdir.y;
    }





    //part2 =  display the snake array and Food

    board.innerHTML = ""; // to empty previous frame
    // to get all point and make it into frame


    // Display THe snake
    snakeArray.forEach((points, index) => {
        snakeElementDiv = document.createElement('div');
        snakeElementDiv.style.gridRowStart = points.y;
        snakeElementDiv.style.gridColumnStart = points.x;
        if (index === 0) {
            snakeElementDiv.classList.add('head');
        }
        else {
            snakeElementDiv.classList.add('snakebody');
        }
        board.appendChild(snakeElementDiv);
    })

    // Display the food
    foodElementDiv = document.createElement('div');
    foodElementDiv.style.gridRowStart = food.y;
    foodElementDiv.style.gridColumnStart = food.x;
    foodElementDiv.classList.add('food');
    board.appendChild(foodElementDiv);
    // add on of reverse food Display
    if (score >= 9 && score % 3 == 0) {
        reversefoodElementDiv = document.createElement('div');
        reversefoodElementDiv.style.gridRowStart = reversefood.y;
        reversefoodElementDiv.style.gridColumnStart = reversefood.x;
        reversefoodElementDiv.classList.add('reversefood');
        board.appendChild(reversefoodElementDiv);
    }
}


// logics ---------------------------------

// gameLoop used as a painting the screen so that it shows how to snake is moving

// so We are using requestAnimation that is used in games to show animation. It is exicuted before every paint.
// it takes argument as input and which is known as a timestamp which indicates that when request of repaint is made.
window.requestAnimationFrame(main); // to eliminate the flickration in setinterval , high quality animation

window.addEventListener('keydown', (e) => {


    if (soundon) moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            if (pause === true) {
                pause = false;
            }
            if(snakeArray.length === 2 && snakeHeadPointer === "D"){
                break;
            }
            console.log("ArrowUp");
            inputdir.x = 0;
            inputdir.y = -1;
            snakeHeadPointer = "U";
            break;

        case "ArrowDown":
            if (pause === true) {
                pause = false;
            }
            if(snakeArray.length === 2 && snakeHeadPointer === "U"){
                break;
            }
            console.log("ArrowDown");
            inputdir.x = 0;
            inputdir.y = 1;
            snakeHeadPointer = "D";
            break;

        case "ArrowLeft":
            if (pause === true) {
                pause = false;
            }
            if(snakeArray.length === 2 && snakeHeadPointer === "R"){
                break;
            }
            console.log("ArrowLeft");
            inputdir.x = -1;
            inputdir.y = 0;
            snakeHeadPointer = "L";
            break;

        case "ArrowRight":
            if (pause === true) {
                pause = false;
            }
            if(snakeArray.length === 2 && snakeHeadPointer === "L"){
                break;
            }
            console.log("ArrowRight");
            inputdir.x = 1;
            inputdir.y = 0;
            snakeHeadPointer = "R";
            break;


        case " ":
            if (pause === false) {
                pause = true;
                backgroundMusic.pause();
            }
            else {
                pause = false;
                backgroundMusic.play();
                inputdir.x = inputdir.x;
                inputdir.y = inputdir.y;
            }
            break;
        // case "q":
        //     inputdir.x = -1;
        //     inputdir.y = -1;
        //     break;    

        default:
            break;
    }
})




//add on - soundOn
let toggleSound = document.querySelector('#buttonForToggleSound');
toggleSound.addEventListener('click', () => {
    if (soundon) {
        soundon = false;
        changeImage.src = "../../snakegame/musicAndImages/volume-mute.png";
        backgroundMusic.pause();
    }
    else {
        backgroundMusic.play();
        changeImage.src = "../../snakegame/musicAndImages/volume.png";
        soundon = true;
    }
});






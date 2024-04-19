let inputdir = { x: 0, y: 0 }  // in which direction it is moving
const foodSound = new Audio('/snakegame/music_food.mp3')
const gameOverSound = new Audio('/snakegame/music_gameover.mp3')
const moveSound = new Audio('/snakegame/music_move.mp3')
const backgroundMusic = new Audio('/snakegame/music.mp3')
let speed = 2;
let lastPaintTime = 0;
let score = 0;
let snakeArray = [
    { x: 13, y: 15 }
]
let food = { x: 6, y: 7 }
let reversefood = {x:3,y:9}

let board = document.querySelector('#board')
let scoreId = document.querySelector("#score")
let highscoreId = document.querySelector('#highscore')
// game functions

// functions ----------------------------
// getting highscore from localStorage---------------
let highscore = localStorage.getItem('highscore');
        if(highscore === null){
            let highscoreval = 0;
            localStorage.setItem("highscore",JSON.stringify(highscoreval))
        }
        else{
            let highscoreval = JSON.parse(localStorage.getItem("highscore"));
            console.log(highscoreval);
            highscoreval = Math.max(highscoreval,score)
            highscoreId.innerHTML = "HighScore:" + highscoreval
            localStorage.setItem("highscore",JSON.stringify(highscoreval))
            
        }



function main(ctime) {
    window.requestAnimationFrame(main); //---- to design the gameloop
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}

function isCollide(arr){
    // if you collide with yourself
    for(let i=1;i<arr.length;i++){
        if(arr[i].x === arr[0].x && arr[i].y === arr[0].y){
            return true;
        }
    }
    if(arr[0].x >= 18 || arr[0].x <=0 || arr[0].y >= 18 || arr[0].y <= 0){
        return true;
    }
    return false;

}
async function gameEngine() {
    // part1 = updating the snake array and food

    if(isCollide(snakeArray)){
        gameOverSound.play();
        backgroundMusic.pause();
        inputdir = {x:0,y:0};
        alert("Game Over. Press any key to Restart!!")
        snakeArray = [
            {x:13,y:15}
        ]
        score = 0;
        scoreId.innerHTML = "Score:"+0
        backgroundMusic.play();
    }

    // if snake eaten the food 
    if(snakeArray[0].y === food.y && snakeArray[0].x === food.x){
        foodSound.play();
        snakeArray.unshift({x:snakeArray[0].x + inputdir.x,y:snakeArray[0].y + inputdir.y});
        food = {x:Math.round(2+(14)*Math.random()),y:Math.round(2+(14)*Math.random())}; // --to generate random food
        score += 1;
        scoreId.innerHTML = "Score:" + score
        
        let highscore = localStorage.getItem('highscore');
        if(highscore === null){
            let highscoreval = 0;
            localStorage.setItem("highscore",JSON.stringify(highscoreval))
        }
        else{
            let highscoreval = JSON.parse(localStorage.getItem("highscore"));
            console.log(highscoreval);
            highscoreval = Math.max(highscoreval,score)
            highscoreId.innerHTML = "HighScore:" + highscoreval
            localStorage.setItem("highscore",JSON.stringify(highscoreval))
            
        }
        speed += 0.25; // to increase speed
    }
    // reverse snake addon
    if(snakeArray[0].y === reversefood.y && snakeArray[0].x === reversefood.x){
        foodSound.play();
        snakeArray.unshift({x:snakeArray[0].x + inputdir.x,y:snakeArray[0].y + inputdir.y});
        let i = 0;
        let j = snakeArray.length-1;
        // while(i<j){
            //     let temp = snakeArray[i];
            //     snakeArray[i] = {...snakeArray[j]};
            //     snakeArray[j] = {...temp};
            //     i++;
            //     j--;
            // }
        snakeArray.reverse()
        if(inputdir.x === 0 && inputdir.y === 1){
            inputdir.x = 0;
            inputdir.y = -1;
        }
        else if(inputdir.x === 0 && inputdir.y === -1){
            inputdir.x = 0;
            inputdir.y = 1;
        }
        else if(inputdir.x === 1 && inputdir.y === 0){
            inputdir.x = -1;
            inputdir.y = 0;
        }
        else if(inputdir.x === -1 && inputdir.y === 0){
            inputdir.x = 1;
            inputdir.y = 0;
        }
        
        reversefood = {x:Math.round(2+(14)*Math.random()),y:Math.round(2+(14)*Math.random())}; // --to generate random food
        score += 1;
        scoreId.innerHTML = "Score:" + score
        
        let highscore = localStorage.getItem('highscore');
        if(highscore === null){
            let highscoreval = 0;
            localStorage.setItem("highscore",JSON.stringify(highscoreval))
        }
        else{
            let highscoreval = JSON.parse(localStorage.getItem("highscore"));
            console.log(highscoreval);
            highscoreval = Math.max(highscoreval,score)
            highscoreId.innerHTML = "HighScore:" + highscoreval
            localStorage.setItem("highscore",JSON.stringify(highscoreval))
            
        }
        speed += 0.25; // to increase speed
    }

    // moving the snake
    for (let i = snakeArray.length-2; i >= 0; i--) {
        snakeArray[i+1] = {...snakeArray[i]};
    }
    snakeArray[0].x += inputdir.x;
    snakeArray[0].y += inputdir.y;

    //part2 =  display the snake array and Food
    
    board.innerHTML = ""; // to empty previous frame
    // to get all point and make it into frame


    // DIsplay THe snake
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
    reversefoodElementDiv = document.createElement('div');
    reversefoodElementDiv.style.gridRowStart = reversefood.y;
    reversefoodElementDiv.style.gridColumnStart = reversefood.x;
    reversefoodElementDiv.classList.add('reversefood');
    board.appendChild(reversefoodElementDiv);

}


// logics ---------------------------------

// gameLoop used as a painting the screen so that it shows how to snake is moving

// so We are using requestAnimation that is used in games to show animation. It is exicuted before every paint.
// it takes argument as input and which is known as a timestamp which indicates that when request of repaint is made.
window.requestAnimationFrame(main); // to eliminate the flickration in setinterval , high quality animation

window.addEventListener('keydown', (e) => {
    inputdir = { x: 0, y: 1 }
    moveSound.play();
    console.log(e);
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x = 0;
            inputdir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputdir.x = 0;
            inputdir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir.x = -1;
            inputdir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputdir.x = 1;
            inputdir.y = 0;
            break;
         
        // case "q":
        //     inputdir.x = -1;
        //     inputdir.y = -1;
        //     break;    

        default:
            break;
    }
})


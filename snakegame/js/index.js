let direction = { x: 0, y: 0 }  // in which direction it is moving
const foodSound = new Audio('/snakegame/music_food.mp3')
const gameOverSound = new Audio('/snakegame/music_gameover.mp3')
const moveSound = new Audio('/snakegame/music_move.mp3')
const backgroundMusic = new Audio('/snakegame/music.mp3')   
let speed = 2;
let lastPaintTime = 0;

let snakeArray = [
    {x:13,y:15}
]

let board = document.querySelector('#board')
// game functions

// functions ----------------------------

function main(ctime){
    window.requestAnimationFrame(main); //---- to design the gameloop
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}


function gameEngine(){
    // part1 = updating the snake array and food

    //part2 =  display the snake array and Food
    console.log(board);
    board.innerHTML = ""; // to empty previous frame
    // to get all point and make it into frame
    snakeArray.forEach((points,index)=>{
        snakeElementDiv = document.createElement('div');
        snakeElementDiv.style.gridRowStart = points.y;
        snakeElementDiv.style.gridColumnStart = points.x;
        snakeElementDiv.classList.add('food');
        board.appendChild(snakeElementDiv);
    })

}


// logics ---------------------------------

// gameLoop used as a painting the screen so that it shows how to snake is moving

// so We are using requestAnimation that is used in games to show animation. It is exicuted before every paint.
//it takes argument as input and which is known as a timestamp which indicates that when request of repaint is made.
window.requestAnimationFrame(main); // to eliminate the flickration in setinterval , high quality animation


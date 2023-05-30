const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const foodImg = new Image()
foodImg.src = 'img/apple.png'

let box = 26


let food = {
    x: Math.floor(Math.random() * 26) * box,
    y: Math.floor(Math.random() * 26) * box
}

let snake = []
snake[0] = {
    x: 13 * box,
    y: 13 * box
}

document.addEventListener('keydown', direction)

let dir

function direction(event) {
    if(event.keyCode == 37 && dir != 'right'){
        dir = 'left'
    } else if(event.keyCode == 38 && dir != 'down'){
        dir = 'up'
    } else if(event.keyCode == 39 && dir != 'left'){
        dir = 'right'
    } else if(event.keyCode == 40 && dir != 'up'){
        dir = 'down'
    }
}

function eatTail(head, arr){
    for (let i = 0; i < arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y){
            clearInterval(game)
        }
    }
}

function drawGame() {
    ctx.clearRect(0,0,676,676)
    canvas.style.background = 'linear-gradient(#bbb, transparent 2px), linear-gradient( 90deg, #bbb, transparent 2px)'
    canvas.style.backgroundSize= '26px 26px'
    canvas.style.display = 'block'
    canvas.style.margin = '0 auto'

    ctx.drawImage(foodImg, food.x, food.y)

    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = i == 0 ? "green":"darkgreen"
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
    }

        let snakeX = snake [0].x
        let snakeY = snake [0].y

        if(snakeX == food.x && snakeY == food.y){
            food = {
                x: Math.floor((Math.random() * 26)) * box,
                y: Math.floor((Math.random() * 26)) * box
            }
        } else {
            snake.pop()
        }
        
        if(snakeX < box || snakeX > (box * box)-52
            || snakeY < box || snakeY > (box * box)-52){
            clearInterval(game)
        }

        if(dir == 'left') snakeX  -= box
        if(dir == 'right') snakeX  += box
        if(dir == 'up') snakeY  -= box
        if(dir == 'down') snakeY  += box

        let newHead = {
            x: snakeX,
            y: snakeY
        }

        console.log(newHead)

        eatTail(newHead, snake);

        snake.unshift(newHead)
    }



let game = setInterval(drawGame, 100)
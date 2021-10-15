// Variabler

var gameCanvas = document.getElementById('game_canvas')
var backgroundCanvas = document.getElementById('background_canvas')
var gameContext = gameCanvas.getContext('2d')
var backgroundContext = backgroundCanvas.getContext('2d')
const pointsHTML = document.getElementById('points_html')
const highScoreHTML = document.getElementById('high_score_html')
const timeHTML = document.getElementById('time_html')
const headerHTML = document.getElementById('main_header')
var nrOfCircles = 4
var nrOfRectangles = 4
var maxSpeedInOneAxis = 3
var intervalCounter = 0
var gameWidth = 600
var gameHeight = 480
var gameRunning = false
var obstacleList = []
var points = 0
var time = 60
var stepX = 0
var stepY = 0
var playerRadius = 10
var highScore = localStorage.getItem('highScore')
if (highScore == null) {highScore = 0}
highScoreHTML.innerHTML = `HIGH SCORE: ${highScore}`
const gameColorList = [
    'lightcoral',
    'lightgreen',
    'lightpink',
    'lightsalmon',
    'lightseagreen',
    'darkblue',
    'darkcyan',
    'darkgoldenrod',
    'darkgreen',
    'darkkhaki',
    'darkolivegreen',
    'darkorange',
    'darkorchid'
]


// Lyssnare

document.addEventListener('keydown', keyEvent => keyListener(keyEvent))
document.addEventListener('click', clickEvent => main(clickEvent))

// Funktioner

function keyListener(keyEvent) {
    switch(keyEvent.key) {
        case "ArrowUp":
            stepY -= 1
            break
        case "ArrowDown":
            stepY += 1
            break
        case "ArrowRight":
            stepX += 1
            break
        case "ArrowLeft":
            stepX -= 1
            break
        case "Enter":
            if (gameRunning == false) {prepareGame()}
        default:
            break
    }
}

function createObstacle(type) {
    switch(type) {
        case "r":
            var width = 40 + Math.floor(Math.random() * (gameWidth * 0.5))
            var height = 40 + Math.floor(Math.random() * (gameHeight * 0.5))

            var x_upperLeft = 20 + Math.floor(Math.random() * (gameWidth - width -2*20))
            var y_upperLeft = 20 + Math.floor(Math.random() * (gameHeight - height - 2*20))
            
            var randomColor = gameColorList[Math.floor(Math.random() * gameColorList.length)]
            if(Math.floor(Math.random() * 2) == 0) {var firstXDirection = Math.floor(Math.random() * (1 + maxSpeedInOneAxis))}
            else {var firstXDirection = - Math.floor(Math.random() * (1 + maxSpeedInOneAxis))}
            if(Math.floor(Math.random() * 2) == 0) {var firstYDirection = Math.floor(Math.random() * (1 + maxSpeedInOneAxis))}
            else {var firstYDirection = - Math.floor(Math.random() * (1 + maxSpeedInOneAxis))}
            obstacleList.push(["r", x_upperLeft, y_upperLeft, null, width, height, randomColor, firstXDirection, firstYDirection])
            break
        case "c":
            var radius = 20 + Math.floor(Math.random() * gameWidth/10)
            var x_center = 20 + radius + Math.floor(Math.random() * (gameWidth - 40 - 2*radius))
            var y_center = 20 + radius + Math.floor(Math.random() * (gameHeight - 40 - 2*radius))

            var randomColor = gameColorList[Math.floor(Math.random() * gameColorList.length)]

            if(Math.floor(Math.random() * 2) == 0) {var firstXDirection = Math.floor(radius/20)}
            else {var firstXDirection = - Math.floor(Math.random() * (1 + maxSpeedInOneAxis))}
            if(Math.floor(Math.random() * 2) == 0) {var firstYDirection = Math.floor(radius/20)}
            else {var firstYDirection = - Math.floor(Math.random() * (1 + maxSpeedInOneAxis))}

            obstacleList.push(["c", x_center, y_center, radius, null, null, randomColor, firstXDirection, firstYDirection])
            break    
    }
}

function drawObstacle(type, x_arg, y_arg, r_arg, w_arg, h_arg, color) {
    switch(type) {
        case "c":
            backgroundContext.beginPath()
            backgroundContext.arc(x_arg, y_arg, r_arg, 0, 2*Math.PI)
            break
        case "r":
            backgroundContext.beginPath()
            backgroundContext.rect(x_arg, y_arg, w_arg, h_arg)
            break
    }
    backgroundContext.fillStyle = color
    backgroundContext.strokeStyle = 'black'
    backgroundContext.fill()
    backgroundContext.stroke()
}

function generatePlayerPixelList(playerX, playerY, playerRadius) {
    var playerPixelList = []
    for (let angle = 0; angle <= 2*Math.PI; angle += (2*Math.PI)/90) {
        playerPixelList.push([
            Math.floor(playerX + playerRadius * Math.cos(angle)),
            Math.floor(playerY + playerRadius * Math.sin(angle))
        ])
    }
    return playerPixelList
}

function backgroundNotAllWhite(playerPixelList) {
    for (let i = 0; i < playerPixelList.length; i++) {
        var pixelImageData = backgroundContext.getImageData(playerPixelList[i][0], playerPixelList[i][1], 1, 1).data
        if (pixelImageData[0] != 0 || pixelImageData[1] != 0 || pixelImageData[2] != 0) {
            return true
        }
    }
    return false
}

function clearBackground() {
    backgroundContext.clearRect(0, 0, gameWidth, gameHeight)
}

function clearPlayerArea() {
    gameContext.clearRect(0, 0, gameWidth, gameHeight)
}

function moveAllObstacles() {
    for (let i = 0; i < obstacleList.length; i++) {
        switch(obstacleList[i][0]) {
            case "c":
                if (obstacleList[i][1] + obstacleList[i][3] >= gameWidth
                    ||
                    obstacleList[i][1] - obstacleList[i][3] <= 0
                    ) {
                    obstacleList[i][7] *= -1  
                              
                }
                if (
                    obstacleList[i][2] + obstacleList[i][3] >= gameHeight
                    ||
                    obstacleList[i][2] - obstacleList[i][3] <= 0
                    ) {
                    obstacleList[i][8] *= -1       
                }
                
               
                break
            case "r":
                if (
                    obstacleList[i][1] + obstacleList[i][4] >= gameWidth
                    ||
                    obstacleList[i][1] <= 0
                    ) {
                    obstacleList[i][7] *= -1            
                }
                if (
                    obstacleList[i][2] + obstacleList[i][5] >= gameHeight
                    ||
                    obstacleList[i][2] <= 0
                    ) {
                    obstacleList[i][8] *= -1            
                }
                break
            }
        obstacleList[i][1] += obstacleList[i][7]
        obstacleList[i][2] += obstacleList[i][8]
        }   
    }

function prepareGame() {
    obstacleList = []
    stepX = 0
    stepY = 0
    time = 60
    timeHTML.innerHTML = `TIME: ${time}`
    clearPlayerArea()
    clearBackground()
    headerHTML.innerHTML = 'CHOOSE STARTING POINT'
    headerHTML.style.color = 'black'
    
    
    for (let i = 1; i <= nrOfCircles; i++) {
        createObstacle("c")
    }

    for (let i = 1; i <= nrOfRectangles; i++) {
        createObstacle("r")
    }

    drawBackground()


}

function drawBackground() {
    backgroundContext.beginPath()
    backgroundContext.strokeStyle = 'rgba(255, 255, 255, 1)'
    backgroundContext.rect(0, 0, gameWidth, gameHeight)
    backgroundContext.stroke()
    moveAllObstacles()
    for (let i = 0; i < obstacleList.length; i++) {
        drawObstacle(obstacleList[i][0], obstacleList[i][1], obstacleList[i][2], obstacleList[i][3], obstacleList[i][4], obstacleList[i][5], obstacleList[i][6])
    }
}

function main(clickEvent) {

    gameRunning = true

    headerHTML.innerHTML = 'RACE!'

    headerHTML.style.color = 'lightgreen'

    var playerX = clickEvent.clientX - backgroundCanvas.getBoundingClientRect().x
    var playerY = clickEvent.clientY - backgroundCanvas.getBoundingClientRect().y

    const gameInterval = setInterval(() => {

        clearBackground()

        drawBackground()

        clearPlayerArea()

        gameContext.beginPath()
        gameContext.arc(playerX, playerY, playerRadius, 0, 2 * Math.PI)
        gameContext.fillStyle = 'black'
        gameContext.strokeStyle = 'green'
        gameContext.stroke()
        gameContext.fill()

        var playerPixelList = generatePlayerPixelList(playerX, playerY, playerRadius)

        playerX = playerX + stepX
        playerY = playerY + stepY

        intervalCounter += 1

        if (intervalCounter % 10 == 0) {
            time -= 1
            timeHTML.innerHTML = `TIME: ${time}`
        }

        points += (Math.abs(stepX) + Math.abs(stepY))
        pointsHTML.innerHTML = `POINTS: ${points}`

        if (time <= 0) {
            clearInterval(gameInterval)
            timeHTML.innerHTML = 'Time up, Game over'
            headerHTML.innerHTML = 'ENTER: Play again'
            if (points > highScore) {
                highScore = points
                highScoreHTML.innerHTML = `HIGH SCORE: ${highScore}`
                localStorage.setItem('highScore', highScore)
            }
            headerHTML.style.color = 'black'
            clearPlayerArea()
            gameContext.beginPath()
            gameContext.arc(playerX, playerY, playerRadius, 0, 2 * Math.PI)
            gameContext.fillStyle = 'red'
            gameContext.strokeStyle = 'green'
            gameContext.stroke()
            gameContext.fill()
            gameRunning = false
        }

        if (backgroundNotAllWhite(playerPixelList)) {
            clearInterval(gameInterval)
            timeHTML.innerHTML = 'Collision, Game Over'
            headerHTML.innerHTML = 'ENTER: Play again'
            if (points > highScore) {
                highScore = points
                highScoreHTML.innerHTML = `HIGH SCORE: ${highScore}`
                localStorage.setItem('highScore', highScore)
            }
            headerHTML.style.color = 'black'
            clearPlayerArea()
            gameContext.beginPath()
            gameContext.arc(playerX, playerY, playerRadius, 0, 2 * Math.PI)
            gameContext.fillStyle = 'red'
            gameContext.strokeStyle = 'green'
            gameContext.stroke()
            gameContext.fill()
            gameRunning = false
        }
    }, 100)
}

prepareGame()
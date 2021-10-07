// Variabler

var gameCanvas = document.getElementById('game_canvas')
var backgroundCanvas = document.getElementById('background_canvas')
var gameContext = gameCanvas.getContext('2d')
var backgroundContext = backgroundCanvas.getContext('2d')
const pointsHTML = document.getElementById('points_html')
const timeHTML = document.getElementById('time_html')
const headerHTML = document.getElementById('main_header')
var intervalCounter = 0
var points = 0
var time = 60
var stepX = 0
var stepY = 0
var playerRadius = 10
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
var obstacleList = []

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
        default:
            break
    }
}

function createObstacleCircle(x_center, y_center, radius) {
    backgroundContext.beginPath()
    backgroundContext.arc(x_center, y_center, radius, 0, 2*Math.PI)
    var randomColor = gameColorList[Math.floor(Math.random() * gameColorList.length)]
    backgroundContext.strokeStyle = 'black'
    backgroundContext.fillStyle = randomColor
    backgroundContext.stroke()
    backgroundContext.fill()
    obstacleList.push(["c", x_center, y_center, radius])
}

function createObstacleRectangle(x_upperLeft, y_upperLeft, width, height) {
    backgroundContext.beginPath()
    backgroundContext.rect(x_upperLeft, y_upperLeft, width, height)
    var randomColor = gameColorList[Math.floor(Math.random() * gameColorList.length)]
    backgroundContext.strokeStyle = 'black'
    backgroundContext.fillStyle = randomColor
    backgroundContext.stroke()
    backgroundContext.fill()
    obstacleList.push(["r", x_upperLeft, y_upperLeft, width, height])
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

function main(clickEvent) {

    headerHTML.innerHTML = 'RACE!'

    headerHTML.style.color = 'lightgreen'

    var playerX = clickEvent.clientX - backgroundCanvas.getBoundingClientRect().x
    var playerY = clickEvent.clientY - backgroundCanvas.getBoundingClientRect().y

    const gameInterval = setInterval(() => {

        gameContext.clearRect(0, 0, 800, 600)

        gameContext.beginPath()
        gameContext.arc(playerX, playerY, playerRadius, 0, 2 * Math.PI)
        gameContext.fillStyle = 'black'
        gameContext.strokeStyle = 'green'
        gameContext.stroke()
        gameContext.fill()

        var playerPixelList = generatePlayerPixelList(playerX, playerY, playerRadius)

        if (backgroundNotAllWhite(playerPixelList)) {
            clearInterval(gameInterval)
            timeHTML.innerHTML = 'Collision, Game Over'
            headerHTML.innerHTML = 'Browser refresh to play again'
            headerHTML.style.color = 'black'
            gameContext.clearRect(0, 0, 800, 600)
            gameContext.beginPath()
            gameContext.arc(playerX, playerY, playerRadius, 0, 2 * Math.PI)
            gameContext.fillStyle = 'red'
            gameContext.strokeStyle = 'green'
            gameContext.stroke()
            gameContext.fill()
        }

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
            headerHTML.innerHTML = 'Browser refresh to play again'
            headerHTML.style.color = 'black'
            gameContext.clearRect(0, 0, 800, 600)
            gameContext.beginPath()
            gameContext.arc(playerX, playerY, playerRadius, 0, 2 * Math.PI)
            gameContext.fillStyle = 'red'
            gameContext.strokeStyle = 'green'
            gameContext.stroke()
            gameContext.fill()
        }
    }, 100)
}

// Setup (skapa spelplan)
backgroundContext.beginPath()
backgroundContext.strokeStyle = 'rgba(255, 255, 255, 1)'
backgroundContext.rect(0, 0, 800, 600)
backgroundContext.stroke()
createObstacleRectangle(Math.floor(Math.random() * 400), Math.floor(Math.random() * 300), 40 + Math.floor(Math.random() * 400), 40 + Math.floor(Math.random() * 300))
createObstacleRectangle(Math.floor(Math.random() * 400), Math.floor(Math.random() * 300), 40 + Math.floor(Math.random() * 400), 40 + Math.floor(Math.random() * 300))
createObstacleRectangle(Math.floor(Math.random() * 400), Math.floor(Math.random() * 300), 40 + Math.floor(Math.random() * 400), 40 + Math.floor(Math.random() * 300))
createObstacleRectangle(Math.floor(Math.random() * 400), Math.floor(Math.random() * 300), 40 + Math.floor(Math.random() * 400), 40 + Math.floor(Math.random() * 300))
createObstacleCircle(Math.floor(Math.random() * 800), Math.floor(Math.random() * 600), 20 + Math.floor(Math.random() * 60))
createObstacleCircle(Math.floor(Math.random() * 800), Math.floor(Math.random() * 600), 20 + Math.floor(Math.random() * 60))
createObstacleCircle(Math.floor(Math.random() * 800), Math.floor(Math.random() * 600), 20 + Math.floor(Math.random() * 60))
createObstacleCircle(Math.floor(Math.random() * 800), Math.floor(Math.random() * 600), 20 + Math.floor(Math.random() * 60))

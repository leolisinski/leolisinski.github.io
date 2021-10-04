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

function distanceFromObstacle(obstacleType, indexOfObstacle, playerX, playerY) {
    gameContext.lineWidth = 0.2
    gameContext.strokeStyle = 'grey'
    gameContext.beginPath()
    gameContext.moveTo(playerX, playerY)

    switch(obstacleType) {
        case "c":
            var obstacleX = obstacleList[indexOfObstacle][1]
            var obstacleY = obstacleList[indexOfObstacle][2]
            var obstacleR = obstacleList[indexOfObstacle][3]
            gameContext.lineTo(obstacleX, obstacleY)
            gameContext.stroke()
            var distance = Math.sqrt((obstacleX - playerX)**2 + (obstacleY - playerY)**2) - obstacleR - playerRadius
            return distance
        case "r":
            var obstacleLeftBorder = obstacleList[indexOfObstacle][1]
            var obstacleRightBorder = obstacleList[indexOfObstacle][1] + obstacleList[indexOfObstacle][3]
            var obstacleTopBorder = obstacleList[indexOfObstacle][2]
            var obstacleBottomBorder = obstacleList[indexOfObstacle][2] + obstacleList[indexOfObstacle][4]

            // Rakt till vänster
            if ((playerX + playerRadius <= obstacleLeftBorder) && (playerY >= obstacleTopBorder) && (playerY <= obstacleBottomBorder)) {
                gameContext.lineTo(obstacleLeftBorder, playerY)
                gameContext.stroke()
                return (obstacleLeftBorder - playerX - playerRadius)
            }

            // Rakt till höger
            if ((playerX - playerRadius >= obstacleRightBorder) && (playerY >= obstacleTopBorder) && (playerY <= obstacleBottomBorder)) {
                gameContext.lineTo(obstacleRightBorder, playerY)
                gameContext.stroke()
                return (playerX - obstacleLeftBorder - playerRadius)
            }

            // Rakt ovanför
            if ((playerX >= obstacleLeftBorder) && (playerX <= obstacleRightBorder) && (playerY + playerRadius <= obstacleTopBorder)) {
                gameContext.lineTo(playerX, obstacleTopBorder)
                gameContext.stroke()
                return (obstacleTopBorder - playerY - playerRadius)
            }

            // Rakt nedanför
            if ((playerX >= obstacleLeftBorder) && (playerX <= obstacleRightBorder) && (playerY - playerRadius >= obstacleBottomBorder)) {
                gameContext.lineTo(playerX, obstacleBottomBorder)
                gameContext.stroke()
                return (playerY - obstacleBottomBorder - playerRadius)
            }

            // Snett nere till vänster
            if ((playerX <= obstacleLeftBorder) && (playerY >= obstacleBottomBorder)) {
                gameContext.lineTo(obstacleLeftBorder, obstacleBottomBorder)
                gameContext.stroke()
                return (
                    Math.sqrt((obstacleLeftBorder - playerX)**2 + (obstacleBottomBorder - playerY)**2) - playerRadius
                )
            }

            // Snett uppe till vänster
            if ((playerX <= obstacleLeftBorder) && (playerY <= obstacleTopBorder)) {
                gameContext.lineTo(obstacleLeftBorder, obstacleTopBorder)
                gameContext.stroke()
                return (
                    Math.sqrt((obstacleLeftBorder - playerX)**2 + (obstacleTopBorder - playerY)**2) - playerRadius
                )
            }

            // Snett uppe till höger
            if ((playerX >= obstacleRightBorder) && (playerY <= obstacleTopBorder)) {
                gameContext.lineTo(obstacleRightBorder, obstacleTopBorder)
                gameContext.stroke()
                return (
                    Math.sqrt((obstacleRightBorder - playerX)**2 + (obstacleTopBorder - playerY)**2) - playerRadius
                )
            }

            // Snett nere till höger
            if ((playerX >= obstacleRightBorder) && (playerY >= obstacleBottomBorder)) {
                gameContext.lineTo(obstacleRightBorder, obstacleBottomBorder)
                gameContext.stroke()
                return (
                    Math.sqrt((obstacleRightBorder - playerX)**2 + (obstacleBottomBorder - playerY)**2) - playerRadius
                )
            }

            // Inne i figuren (gått för långt)
            if ((playerX + playerRadius >= obstacleLeftBorder) && (playerX - playerRadius <= obstacleRightBorder) && (playerY + playerRadius >= obstacleTopBorder) && (playerY - playerRadius <= obstacleBottomBorder)) {
                return -1
            }
    }
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

        if (
            distanceFromObstacle("r", 0, playerX, playerY) < 0
            ||
            distanceFromObstacle("r", 1, playerX, playerY) < 0
            ||
            distanceFromObstacle("r", 2, playerX, playerY) < 0
            ||
            distanceFromObstacle("r", 3, playerX, playerY) < 0
            ||
            distanceFromObstacle("c", 4, playerX, playerY) < 0
            ||
            distanceFromObstacle("c", 5, playerX, playerY) < 0
            ||
            distanceFromObstacle("c", 6, playerX, playerY) < 0
            ||
            distanceFromObstacle("c", 7, playerX, playerY) < 0
        ) {
            clearInterval(gameInterval)
            timeHTML.innerHTML = 'Collision, Game Over'
            headerHTML.innerHTML = 'Browser refresh to play again'
            headerHTML.style.color = 'black'
        }

        playerX = playerX + stepX
        playerY = playerY + stepY

        intervalCounter += 1

        if (intervalCounter % 10 == 0) {
            time -= 1
            timeHTML.innerHTML = `TIME: ${time}`
        }

        points += (Math.abs(stepX) + Math.abs(stepY))
        pointsHTML.innerHTML = points

        if (time <= 0) {
            clearInterval(gameInterval)
            timeHTML.innerHTML = 'Time is up, Game over'
            headerHTML.innerHTML = 'Browser refresh to play again'
            headerHTML.style.color = 'black'
        }
    }, 100)
}

// Setup (skapa spelplan)
createObstacleRectangle(Math.floor(Math.random() * 400), Math.floor(Math.random() * 300), 40 + Math.floor(Math.random() * 400), 40 + Math.floor(Math.random() * 300))
createObstacleRectangle(Math.floor(Math.random() * 400), Math.floor(Math.random() * 300), 40 + Math.floor(Math.random() * 400), 40 + Math.floor(Math.random() * 300))
createObstacleRectangle(Math.floor(Math.random() * 400), Math.floor(Math.random() * 300), 40 + Math.floor(Math.random() * 400), 40 + Math.floor(Math.random() * 300))
createObstacleRectangle(Math.floor(Math.random() * 400), Math.floor(Math.random() * 300), 40 + Math.floor(Math.random() * 400), 40 + Math.floor(Math.random() * 300))
createObstacleCircle(Math.floor(Math.random() * 800), Math.floor(Math.random() * 600), 20 + Math.floor(Math.random() * 60))
createObstacleCircle(Math.floor(Math.random() * 800), Math.floor(Math.random() * 600), 20 + Math.floor(Math.random() * 60))
createObstacleCircle(Math.floor(Math.random() * 800), Math.floor(Math.random() * 600), 20 + Math.floor(Math.random() * 60))
createObstacleCircle(Math.floor(Math.random() * 800), Math.floor(Math.random() * 600), 20 + Math.floor(Math.random() * 60))

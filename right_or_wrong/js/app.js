const timeCharacters = document.getElementById('time')
const scoreCharacters = document.getElementById('score')
var time = 0
var timeInSeconds = 0
var timeCounter = 0

function startTime() {
    time = 0
    timeInSeconds = 0
    timeCounter = 0
    timer = setInterval(incrementTime,10)
}

function incrementTime() {
    time += 0.01
    timeCounter += 1
    if (timeCounter % 100 == 0) {
        timeInSeconds += 1  
    }
    timeCharacters.innerHTML = timeInSeconds
}

function stopTime() {
    clearInterval(timer)
    return time
}
const key = "MVIsIDJXLCAzVywgNFcsIDVSLCA2VywgN1IsIDhSLCA5VywgMTBSLCAxMVcsIDEyVywgMTNSLCAxNFc="
const timeCharacters = document.getElementById('time')
const scoreCharacters = document.getElementById('score')
const playButton = document.getElementById('play_button')
const wrongButton = document.getElementById('wrong_button')
const rightButton = document.getElementById('right_button')
const gamePicture = document.getElementById('game_picture')
var time = 0
var timeInSeconds = 0
var timeCounter = 0
var timerRunning = false

function pictureTrue(pictureNr) {
    var pictureNrString = pictureNr.toString()
    var keystring = atob(key)
    if (pictureNr < 10) {
        for (let i = 0; i < keystring.length; i+=4) {
            if (keystring[i] == pictureNrString) {
                if (keystring[i+1] == "R") {return true}
                else if (keystring[i+1] == "W") {return false}
            }
    }}
    else {
        for (let i = 36; i < keystring.length; i+=5) {
            if (keystring[i] + keystring[i+1] == pictureNrString) {
                if (keystring[i+2] == "R") {return true}
                else if (keystring[i+2] == "W") {return false}
            }
        }}
}


playButton.addEventListener('click', () => play())

wrongButton.addEventListener('click', () => {
    if (timerRunning) {
        timeCharacters.innerHTML = Number(time).toFixed(2)
        stopTime()
    }
} )

rightButton.addEventListener('click', () => {
    if (timerRunning) {
        timeCharacters.innerHTML = Number(time).toFixed(2)
        stopTime()
    }
} )

function startTime() {
    if (timerRunning) {stopTime(); timerRunning = false}
    time = 0
    timeInSeconds = 0
    timeCounter = 0
    timer = setInterval(incrementTime,10)
    timerRunning = true
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
    timerRunning = false
}

function play() {
    var number = Math.floor(Math.random()*2 + 1)
    gamePicture.src = `img/game_pictures/${number}.png`
    startTime()
}
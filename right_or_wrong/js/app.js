const key = "MVIsIDJXLCAzVywgNFcsIDVSLCA2VywgN1IsIDhSLCA5VywgMTBSLCAxMVcsIDEyVywgMTNSLCAxNFc="
const timeCharacters = document.getElementById('time')
const scoreCharacters = document.getElementById('score')
const playButton = document.getElementById('play_button')
const wrongButton = document.getElementById('wrong_button')
const rightButton = document.getElementById('right_button')
const gamePicture = document.getElementById('game_picture')
const countDownCharacter = document.getElementById('count_down')
var time = 0
var timeInSeconds = 0
var timeCounter = 0
var timerRunning = false
var pictureNumbers = [1,2,3,4,5,6,7,8,9,10]
var points = 0
var picture

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


playButton.addEventListener('click', () => countDown())

wrongButton.addEventListener('click', () => {
    if (timerRunning) {
        timeCharacters.innerHTML = Number(time).toFixed(2)
        stopTime()
        if (pictureTrue(picture) == false) {
            points += 500
            console.log(points)
        }
        else if (pictureTrue(picture)) {
            points -= 200
            console.log(points)
        }
    }
} )

rightButton.addEventListener('click', () => {
    if (timerRunning) {
        timeCharacters.innerHTML = Number(time).toFixed(2)
        stopTime()
        if (pictureTrue(picture)) {
            points += 500
            console.log(points)
        }
        else if (pictureTrue(picture) == false) {
            points -= 200
            console.log(points)
        }
    }
} )

function chosePicture() {
    var randomIndex = Math.floor(Math.random() * pictureNumbers.length)
    var newPictureNumbers = []
    for (let i = 0; i < pictureNumbers.length; i++) {
        if (i != randomIndex) {
            newPictureNumbers.push(pictureNumbers[i])
        }
    }
    output = pictureNumbers[randomIndex]
    pictureNumbers = newPictureNumbers
    return output
}

function startGame() {
    points = 0
    pictureNumbers = [1,2,3,4,5,6,7,8,9,10]
    picture = chosePicture() 
    startTime()
    gamePicture.style.background = `url('../img/game_pictures/${picture}.png')`
}

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

function countDown() {
    toggleCountDownVisibility()
    var counter = 4
    var stopCountDown = false
    var countDownTimer = setInterval(() => {
        if (counter == 0) {stopCountDown = true}
        if (stopCountDown) {
            clearInterval(countDownTimer)
            toggleCountDownVisibility()
            startGame()
        }
        countDownCharacter.innerHTML = counter.toString()
        counter -= 1
    },1000)
}

function toggleCountDownVisibility() {
    if (countDownCharacter.style.visibility == "visible") {
        countDownCharacter.style.visibility = "hidden"
    }
    else {
        countDownCharacter.style.visibility = "visible"
    }
}
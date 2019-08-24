const bgMusic = new Audio('audio/338371__hmmm101__pixel-song-21.wav')
const tickSound = new Audio('audio/422642__trullilulli__sfx-ambiance-clock-tick.wav')
const startSound = new Audio('audio/458416__tolerabledruid6__game-start-nes-style-2.wav')
const correctSound = new Audio('audio/431329__someguy22__8-bit-powerup.wav')

startSound.volume = .2
bgMusic.volume = .6
correctSound.volume = .6

bgMusic.loop=false

var SoundOn = true


function checkAnswers() {
    var numberOfCorrectAnswers = 20
    for (let k = 1; k <= 20; k++) {
        var faktor1 = eval(document.getElementById(`ch${k}_f1`).innerHTML)
        var faktor2 = eval(document.getElementById(`ch${k}_f2`).innerHTML)
        var answer = eval(document.getElementById(`ans${k}`).value)
        if(faktor1 * faktor2 != answer) {numberOfCorrectAnswers += -1}
    }
    if (numberOfCorrectAnswers == 20) {document.getElementById('responseText').innerHTML='Alla rätt!'}
    else {document.getElementById('responseText').innerHTML=`Du fick ${numberOfCorrectAnswers} rätt.`}
    document.getElementById('responseText').style.visibility='visible'
}

function generateFactors() {
    if (window.matchMedia('(max-width: 900px').matches) {
        var k = 1
        var generator = setInterval(() => {
            document.getElementById(`ch${k}_f1`).innerHTML = `${(Math.floor(Math.random() * 15) + 1)}`
            document.getElementById(`ch${k}_f2`).innerHTML = `${(Math.floor(Math.random() * 15) + 1)}`
            k++
            if (k==21) {clearInterval(generator)}
            },60)
        }
    else {
    var k = 1
    var generator = setInterval(() => {
        document.getElementById(`ch${k}_f1`).innerHTML = `${(Math.floor(Math.random() * 15) + 1)}`
        document.getElementById(`ch${k}_f2`).innerHTML = `${(Math.floor(Math.random() * 15) + 1)}`
        k+=2
        if (k==21) {k=2}
        if (k==22) {clearInterval(generator)}
        },60)
    }
    }

const button = document.getElementById('checkButton')

button.addEventListener('click', () => startTimer())

function startTimer() {
startSound.play()
bgMusic.play()
generateFactors()
setTimeout(() => {countdownFunction();bgColorShifter()},2000)
}

function countdownFunction() {
    var moment = Math.round(new Date().getTime() / 1000)
    var endMoment = moment + 60
    var remaining = endMoment - moment
    var countdown = setInterval(() => {
        tickSound.play()
        moment = Math.round(new Date().getTime() / 1000)
        remaining = endMoment - moment
        document.getElementById('timeRemaining').innerHTML=`${remaining}`
        if (eval(document.getElementById('timeRemaining').innerHTML) == 0) {
            clearInterval(countdown)
            checkAnswers()
            }
        }, 1000)
}


function bgColorShifter() {
    
    var colors=[111,0,255]
    var sign_red = 1
    var sign_green = -1
    var sign_blue = 1
    var colorShifter = setInterval(() => {
        
        if (eval(document.getElementById('timeRemaining').innerHTML) == 0) {colors=[111,0,255]; document.getElementById('game').style.backgroundColor = `rgb(${colors[0]},${colors[1]},${colors[2]})`; clearInterval(colorShifter)}

        if (colors[0] == 255 || colors[0] == 0) {sign_red*=-1}
        if (colors[1] == 255 || colors[1] == 0) {sign_green*=-1}
        if (colors[2] == 255 || colors[2] == 0) {sign_blue*=-1}

        colors[0] += 1*sign_red
        colors[1] += 1*sign_green
        colors[2] += 1*sign_blue

        document.getElementById('game').style.backgroundColor = `rgb(${colors[0]},${colors[1]},${colors[2]})`
        
    },10)
    }

for (let k = 1; k <= 20; k++) {

    document.getElementById(`ans${k}`).addEventListener('keyup', () => playSoundIfRight(k))

}

function playSoundIfRight(k) {
    var faktor1 = eval(document.getElementById(`ch${k}_f1`).innerHTML)
    var faktor2 = eval(document.getElementById(`ch${k}_f2`).innerHTML)
    var answer = eval(document.getElementById(`ans${k}`).value)
    if (faktor1*faktor2 == answer) {correctSound.play()}
}
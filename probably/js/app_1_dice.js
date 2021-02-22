const dice = document.getElementById('dice_1')
const oneCounter = document.getElementById('counterOne')
const twoCounter = document.getElementById('counterTwo')
const threeCounter = document.getElementById('counterThree')
const fourCounter = document.getElementById('counterFour')
const fiveCounter = document.getElementById('counterFive')
const sixCounter = document.getElementById('counterSix')
const button = document.getElementById('button')
const inputField = document.getElementById('input_box_one_dice')
const counter = document.getElementById('counterRolls')

inputField.addEventListener('click', () => {
    if (inputField.value == "Antal slag + ENTER")
    inputField.value = ""
    inputField.style.fontSize = "30px"
})

document.addEventListener('keypress', (event) => {
    if ((event.code == "Enter" || event.code == "NumpadEnter") && inputField.value != "Antal slag + ENTER" && inputField.value != "") {
        if (eval(inputField.value) >= 10) {rollDiceAnimated(eval(inputField.value), 1)}
        else {rollDiceAnimated(eval(inputField.value), 500)}
        
    }
})

document.addEventListener('click', (event) => {
    if (inputField.value == "" && event.target.id != 'input_box_one_dice') {
        inputField.style.fontSize = "15px"
        inputField.value = "Antal slag + ENTER"
    }
    if (event.target.id[0] == "b") {
        rollAllFastManyTimesUntilNrOfSame(event.target.id.slice(1,event.target.id.length))        
    }
})


var oneValue = 0
var twoValue = 0
var threeValue = 0
var fourValue = 0
var fiveValue = 0
var sixValue = 0
var rollValue = 0

function updateValueAndHTML(value) {
    rollValue += 1
    counter.innerHTML = `${rollValue}`
    switch (value) {
        case 1:
            oneValue += 1
            break
        case 2:
            twoValue += 1
            break
        case 3:
            threeValue += 1
            break
        case 4:
            fourValue += 1
            break
        case 5:
            fiveValue += 1
            break
        case 6:
            sixValue += 1
            break        
    }
    oneCounter.innerHTML = `${(oneValue*100/rollValue).toFixed(3)}`
    twoCounter.innerHTML = `${(twoValue*100/rollValue).toFixed(3)}`
    threeCounter.innerHTML = `${(threeValue*100/rollValue).toFixed(3)}`
    fourCounter.innerHTML = `${(fourValue*100/rollValue).toFixed(3)}`
    fiveCounter.innerHTML = `${(fiveValue*100/rollValue).toFixed(3)}`
    sixCounter.innerHTML = `${(sixValue*100/rollValue).toFixed(3)}`  
}


function changeDiceFace(diceIndex, newFace) {
    var dice = dices[diceIndex]
    dice.src = dice.src.slice(0, dice.src.length - 5) + `${newFace}` + ".png"
}

function rollDiceAnimated(times, speed) {
    var i = 1
    while (i <= times) { 
            setTimeout(() => {
                var diceFace = Math.floor(Math.random() * 6) + 1
                dice.src = dice.src.slice(0, dice.src.length - 5) + `${diceFace}` + ".png"
                updateValueAndHTML(diceFace)
            }, speed*i)
            i += 1
        }
    }

function rollAllOneTime() {
    var result = []
    for (let i = 0; i < dices.length; i ++) {
        var roll = Math.floor(Math.random() * 6) + 1
        result.push(roll)
        changeDiceFace(i, roll)
    }
    return result
}   



function initialize() {
    var firstDiceFace = Math.floor(Math.random() * 6) + 1
    dice.src = dice.src.slice(0, dice.src.length - 5) + `${firstDiceFace}` + ".png"
}

function rollDice() { 
    return Math.floor(Math.random() * 6) + 1
}

initialize()
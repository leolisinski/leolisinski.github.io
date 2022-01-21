const dices = document.getElementsByClassName('dice')
const rollCounter = document.getElementById('counterRolls')
const twoCounter = document.getElementById('counterTwo')
const threeCounter = document.getElementById('counterThree')
const fourCounter = document.getElementById('counterFour')
const fiveCounter = document.getElementById('counterFive')
const button = document.getElementById('button')
const inputField = document.getElementById('input_box')

inputField.addEventListener('click', () => {
    if (inputField.value == "Antal slag + ENTER")
    inputField.value = ""
    inputField.style.fontSize = "30px"
})

document.addEventListener('keypress', (event) => {
    if ((event.code == "Enter" || event.code == "NumpadEnter") && inputField.value != "Antal slag + ENTER" && inputField.value != "") {
        rollAllFastNrOfTimes(eval(inputField.value))
    }
})

document.addEventListener('click', (event) => {
    if (inputField.value == "" && event.target.id != 'input_box') {
        inputField.style.fontSize = "15px"
        inputField.value = "Antal slag + ENTER"
    }
    if (event.target.id[0] == "b") {
        rollAllFastManyTimesUntilNrOfSame(event.target.id.slice(1,event.target.id.length))        
    }
})


var rollValue = 0
var twoValue = 0
var threeValue = 0
var fourValue = 0
var fiveValue = 0

function updateValueAndHTML(identifier, value) {
    switch (identifier) {
        case 1:
            rollValue = value
            rollCounter.innerHTML = `${value}`
            break
        case 2:
            twoValue = value
            twoCounter.innerHTML = `${value}`
            break
        case 3:
            threeValue = value
            threeCounter.innerHTML = `${value}`
            break
        case 4:
            fourValue = value
            fourCounter.innerHTML = `${value}`
            break
        case 5:
            fiveValue = value
            fiveCounter.innerHTML = `${value}`
            break
    }
}

function clearValuesAndHTML() {
    for (let i = 1; i <= 5; i++) {
        updateValueAndHTML(i, 0)
    }
}

function updateHTMLfromValues() {
    updateValueAndHTML(1, rollValue)
    updateValueAndHTML(2, twoValue)
    updateValueAndHTML(3, threeValue)
    updateValueAndHTML(4, fourValue)
    updateValueAndHTML(5, fiveValue)
}


function changeDiceFace(diceIndex, newFace) {
    var dice = dices[diceIndex]
    dice.src = dice.src.slice(0, dice.src.length - 5) + `${newFace}` + ".png"
}

function rollDiceAnimated(diceIndex, time) {
    clearValuesAndHTML()
    var dice = dices[diceIndex] 
    var i = 0
    var direction = Math.floor(Math.random() * 4)
    var diceFace = Math.floor(Math.random() * 6) + 1
    while (i <= time) { 
            setTimeout(() => {
                let tempDir = Math.floor(Math.random() * 4)
                while (tempDir == direction) {tempDir = Math.floor(Math.random() * 4)}
                direction = tempDir
                let tempFace = Math.floor(Math.random() * 6) + 1 
                while (tempFace == diceFace) {tempFace = Math.floor(Math.random() * 6) + 1}
                diceFace = tempFace
                dice.src = dice.src.slice(0, dice.src.length - 5) + `${diceFace}` + ".png"
                switch (direction) {
                    case 0: 
                        dice.style.top = "5px"
                    break
                    case 1: 
                    dice.style.left = "5px"
                    break
                    case 2: 
                    dice.style.left = "-5px"
                    break
                    case 3: 
                    dice.style.top = "-5px"
                    break
                }
            }, 100 + 200*i)

            setTimeout(() => {
                dice.style.top = "0px"
                dice.style.left = "0px"
            }, 200 + 200*i)

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

function rollAllFastNrOfTimes(number) {
    singleRoll = false
    var i = 1
    clearValuesAndHTML()
    var interval = setInterval(() => {
        rollValue += 1
        result = rollAllOneTime()
        switch(nrOfSame(result)) {
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
        } 
        updateHTMLfromValues()
        if (i == number) {clearInterval(interval)}
        i += 1
},1)
}

function rollAllFastManyTimesUntilNrOfSame(number) {
    singleRoll = false
    clearValuesAndHTML()
    var interval = setInterval(() => {
        result = rollAllOneTime()
        switch(nrOfSame(result)) {
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
        } 
        if (nrOfSame(result) == number) {
            clearInterval(interval)
        }
        rollValue += 1
        updateHTMLfromValues()
    },1) 
}

function allSame(result) {
    for (let i = 1; i < result.length; i++) {
        if (result[i] != result[0]) {return false}
    }
    return true
}

function nrOfSame(result) {
    var equalCounter = []
    var tempCounter
    for (let i = 1; i <= 6; i++) {
        tempCounter = 0
        for (let j = 0; j < result.length; j++) {
            if (result[j] == i) {tempCounter += 1}
        }
        equalCounter.push(tempCounter)
    }
    return highestInArray(equalCounter)
}

function highestInArray(array) {
    output = array[0]
    if (array.length == 1) {return output}
    for (let i = 1; i < array.length; i++) {
        if (array[i] > output) {output = array[i]} 
    }
    return output
}

function rollAllDicesAnimated(time) {
    for (let i = 0; i < dices.length; i++) {
    rollDiceAnimated(i, time)
}}

function initialize() {
for (let i = 0; i < dices.length; i++) {
    let firstDiceFace = Math.floor(Math.random() * 6) + 1
    let dice = dices[i]
    dice.src = dice.src.slice(0, dice.src.length - 5) + `${firstDiceFace}` + ".png"
    dice.addEventListener('click', (event) => rollDiceAnimated(event.target.id,5)
    )
    dice.addEventListener('dblclick', () => rollAllDicesAnimated(5))
}}

function rollDice() { 
    return Math.floor(Math.random() * 6) + 1
}

initialize()
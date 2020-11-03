const dices = document.getElementsByClassName('dice')
const rollCounter = document.getElementById('counterRolls')
const twoCounter = document.getElementById('counterTwo')
const threeCounter = document.getElementById('counterThree')
const fourCounter = document.getElementById('counterFour')
const fiveCounter = document.getElementById('counterFive')
const sixCounter = document.getElementById('counterSix')
const sevenCounter = document.getElementById('counterSeven')
const eightCounter = document.getElementById('counterEight')
const nineCounter = document.getElementById('counterNine')
const tenCounter = document.getElementById('counterTen')
const button = document.getElementById('button')
const inputField = document.getElementById('input_box')

button.addEventListener('click', ()=> {
    rollAllFastNrOfTimes(eval(inputField.value))
})

var rollValue = 0
var twoValue = 0
var threeValue = 0
var fourValue = 0
var fiveValue = 0
var sixValue = 0
var sevenValue = 0
var eightValue = 0
var nineValue = 0
var tenValue = 0

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
        case 6:
            sixValue = value
            sixCounter.innerHTML = `${value}`
            break
        case 7:
            sevenValue = value
            sevenCounter.innerHTML = `${value}`
            break
        case 8:
            eightValue = value
            eightCounter.innerHTML = `${value}`
            break
        case 9:
            nineValue = value
            nineCounter.innerHTML = `${value}`
            break
        case 10:
            tenValue = value
            tenCounter.innerHTML = `${value}`
            break
    }
}

function clearValuesAndHTML() {
    for (let i = 1; i <= 10; i++) {
        updateValueAndHTML(i, 0)
    }
}

function updateHTMLfromValues() {
    updateValueAndHTML(1, rollValue)
    updateValueAndHTML(2, twoValue)
    updateValueAndHTML(3, threeValue)
    updateValueAndHTML(4, fourValue)
    updateValueAndHTML(5, fiveValue)
    updateValueAndHTML(6, sixValue)
    updateValueAndHTML(7, sevenValue)
    updateValueAndHTML(8, eightValue)
    updateValueAndHTML(9, nineValue)
    updateValueAndHTML(10, tenValue)
}


function changeDiceFace(diceIndex, newFace) {
    var dice = dices[diceIndex]
    dice.src = dice.src.slice(0, dice.src.length - 5) + `${newFace}` + ".png"
}

function rollDiceAnimated(diceIndex, time) {
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

function rollAllManyTimes(times, milliSecondsPerRoll) {
    for (let i = 0; i < times; i++) {
        setTimeout(() => rollAllOneTime(), milliSecondsPerRoll*i)
    }
}

function rollAllFastManyTimesUntilAllSame() {
    counterValue = 0
    counter.innerHTML = `${counterValue}`
    var interval = setInterval(() => {
        result = rollAllOneTime()
        if (allSame(result)) {
            clearInterval(interval)
        }
        counterValue += 1
        counter.innerHTML = `${counterValue}`
    },1) 
}

function rollAllFastNrOfTimes(number) {
    var i = 1
    clearValuesAndHTML()
    var interval = setInterval(() => {
        rollValue += 1
        result = rollAllOneTime()
        switch(nrOfSame(result)) {
            case 0:
                zeroValue += 1
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
            case 7:
                sevenValue += 1
                break
            case 8:
                eightValue += 1
                break
            case 9:
                nineValue += 1
                break
            case 10:
                tenValue += 1
                break
        } 
        updateHTMLfromValues()
        if (i == number) {clearInterval(interval)}
        i += 1
},1)
}

function rollAllFastManyTimesUntilFiveSame() {
    counterValue = 0
    counter.innerHTML = `${counterValue}`
    var interval = setInterval(() => {
        result = rollAllOneTime()
        if (nrOfSame(result) == 5) {
            clearInterval(interval)
        }
        counterValue += 1
        counter.innerHTML = `${counterValue}`
    },1) 
}

function rollAllFastManyTimesUntilNrOfSame(number) {
    counterValue = 0
    counter.innerHTML = `${counterValue}`
    var interval = setInterval(() => {
        result = rollAllOneTime()
        if (nrOfSame(result) == number) {
            clearInterval(interval)
        }
        counterValue += 1
        counter.innerHTML = `${counterValue}`
    },1) 
}

function rollAllFastNumberOfTimesUntilNrOfSame(numberOfTimes, nrToGet) {
    counterValue = 0
    counter.innerHTML = `${counterValue}`
    var i = 1
    var interval = setInterval(() => {
        result = rollAllOneTime()
        if (nrOfSame(result) == nrToGet) {
            counterValue += 1
        }
        counter.innerHTML = `${counterValue}`
        if (i == numberOfTimes) {clearInterval(interval)}
        i += 1
    },1) 
}

function allSame(result) {
    for (let i = 1; i < result.length; i++) {
        if (result[i] != result[0]) {return false}
    }
    return true
}

function fiveSame(result) {
    var equalCounter = []
    var tempCounter
    for (let i = 1; i <= 6; i++) {
        tempCounter = 0
        for (let j = 0; j < result.length; j++) {
            if (result[j] == i) {tempCounter += 1}
        }
        equalCounter.push(tempCounter)
    }
    return highestInArray(equalCounter) == 5
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
    dice.addEventListener('click', (event) => rollDiceAnimated(event.target.id,10)
    )
    dice.addEventListener('dblclick', () => rollAllDicesAnimated(10))
}}

function rollDice() { 
    return Math.floor(Math.random() * 6) + 1
}

function rollAndTryToGetAllSame(iterations) {
    var numberOfAllSame = 0
    for (let i = 1; i <= iterations; i++) {
        var diceFace = rollDice()
        var allSame = true
        for (let i = 1; i < dices.length; i++) {
            if (rollDice() != diceFace) {allSame = false}
        }
        if (allSame) {numberOfAllSame += 1}
    }
    return numberOfAllSame
}

function rollUntilAllSame() {
    allNotSame = true
    iteration = 0
    while (allNotSame) {
        iteration += 1
        var diceFace = rollDice()
        var allSame = true
        for (let i = 1; i < dices.length; i++) {
            if (rollDice() != diceFace) {allSame = false}
        }
        if (allSame) {allNotSame = false}
    }
    return iteration
}

initialize()
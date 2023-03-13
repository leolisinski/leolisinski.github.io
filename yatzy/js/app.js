const dices = document.getElementsByClassName('dice')
const rollCounter = document.getElementById('counterRolls')
const twoCounter = document.getElementById('counterTwo')
const twoPairCounter = document.getElementById('counterTwoPair')
const threeCounter = document.getElementById('counterThree')
const fourCounter = document.getElementById('counterFour')
const fullHouseCounter = document.getElementById('counterFullHouse')
const smallStraightCounter = document.getElementById('counterSmallStraight')
const largeStraightCounter = document.getElementById('counterLargeStraight')
const fiveCounter = document.getElementById('counterFive')
const noneCounter = document.getElementById('counterNone')
const inputField = document.getElementById('input_box')

const relativeTwoSpan = document.getElementById('relativeTwo')
const relativeTwoPairSpan = document.getElementById('relativeTwoPair')
const relativeThreeSpan = document.getElementById('relativeThree')
const relativeFourSpan = document.getElementById('relativeFour')
const relativeFullHouseSpan = document.getElementById('relativeFullHouse')
const relativeSmallStraightSpan = document.getElementById('relativeSmallStraight')
const relativeLargeStraightSpan = document.getElementById('relativeLargeStraight')
const relativeFiveSpan = document.getElementById('relativeFive')
const relativeNoneSpan = document.getElementById('relativeNone')

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
})


var rollValue = 0
var twoValue = 0
var twoPairValue = 0
var threeValue = 0
var fourValue = 0
var fullHouseValue = 0
var smallStraightValue = 0
var largeStraightValue = 0
var fiveValue = 0
var noneValue = 0

var relativeTwoValue = 0
var relativeTwoPairValue = 0
var relativeThreeValue = 0
var relativeFourValue = 0
var relativeFullHouseValue = 0
var relativeSmallStraightValue = 0
var relativeLargeStraightValue = 0
var relativeFiveValue = 0
var relativeNoneValue = 0


function updateValueAndHTML(identifier, value) {
    switch (identifier) {
        case "r":
            rollValue = value
            rollCounter.innerHTML = `${value}`
            break
        case "2":
            twoValue = value
            if (rollValue != 0) {
                relativeTwoValue = Math.round(((twoValue / rollValue) * 100) * 100) / 100
            }
            else {
                relativeTwoValue = 0
            }
            relativeTwoSpan.innerHTML = `${relativeTwoValue}`
            twoCounter.innerHTML = `${value}`
            
            break
        case "2p":
            twoPairValue = value
            if (rollValue != 0) {
                relativeTwoPairValue = Math.round(((twoPairValue / rollValue) * 100) * 100) / 100
            }
            else {
                relativeTwoPairValue = 0
            }
            twoPairCounter.innerHTML = `${value}`
            relativeTwoPairSpan.innerHTML = `${relativeTwoPairValue}`
            break
        case "3":
            threeValue = value
            if (rollValue != 0) {
                relativeThreeValue = Math.round(((threeValue / rollValue) * 100) * 100) / 100
            }
            else {
                relativeThreeValue = 0
            }
            threeCounter.innerHTML = `${value}`
            relativeThreeSpan.innerHTML = `${relativeThreeValue}`
            break
        case "4":
            fourValue = value
            if (rollValue != 0) {
                relativeFourValue = Math.round(((fourValue / rollValue) * 100) * 100) / 100
            }
            else {
                relativeFourValue = 0
            }
            fourCounter.innerHTML = `${value}`
            relativeFourSpan.innerHTML = `${relativeFourValue}`
            break
        case "fh":
            fullHouseValue = value
            if (rollValue != 0) {
                relativeFullHouseValue = Math.round(((fullHouseValue / rollValue) * 100) * 100000) / 100000
            }
            else {
                relativeFullHouseValue = 0
            }
            fullHouseCounter.innerHTML = `${value}`
            relativeFullHouseSpan.innerHTML = `${relativeFullHouseValue}`
            break
        case "ss":
            smallStraightValue = value
            if (rollValue != 0) {
                relativeSmallStraightValue = Math.round(((smallStraightValue / rollValue) * 100) * 100) / 100
            }
            else {
                relativeSmallStraightValue = 0
            }
            smallStraightCounter.innerHTML = `${value}`
            relativeSmallStraightSpan.innerHTML = `${relativeSmallStraightValue}`
            break
        case "ls":
            largeStraightValue = value
            if (rollValue != 0) {
                relativeLargeStraightValue = Math.round(((largeStraightValue / rollValue) * 100) * 100) / 100
            }
            else {
                relativeLargeStraightValue = 0
            }
            largeStraightCounter.innerHTML = `${value}`
            relativeLargeStraightSpan.innerHTML = `${relativeLargeStraightValue}`
            break
        case "5":
            fiveValue = value
            if (rollValue != 0) {
                relativeFiveValue = Math.round(((fiveValue / rollValue) * 100) * 100) / 100
            }
            else {
                relativeFiveValue = 0
            }
            fiveCounter.innerHTML = `${value}`
            relativeFiveSpan.innerHTML = `${relativeFiveValue}`
            break
        case "n":
            noneValue = value
            if (rollValue != 0) {
                relativeNoneValue = Math.round(((noneValue / rollValue) * 100) * 100) / 100
            }
            else {
                relativeNoneValue = 0
            }
            noneCounter.innerHTML = `${value}`
            relativeNoneSpan.innerHTML = `${relativeNoneValue}`
            break
    }
}

function clearValuesAndHTML() {
    var identifiers = ["r", "2", "2p", "3", "4", "fh", "ss", "ls", "5", "n"]
    for (let i = 0; i < identifiers.length; i++) {
        updateValueAndHTML(identifiers[i], 0)
    }
}

function updateHTMLfromValues() {
    updateValueAndHTML("r", rollValue)
    updateValueAndHTML("2", twoValue)
    updateValueAndHTML("2p", twoPairValue)
    updateValueAndHTML("3", threeValue)
    updateValueAndHTML("4", fourValue)
    updateValueAndHTML("fh", fullHouseValue)
    updateValueAndHTML("ss", smallStraightValue)
    updateValueAndHTML("ls", largeStraightValue)
    updateValueAndHTML("5", fiveValue)
    updateValueAndHTML("n", noneValue)
}


function changeDiceFace(diceIndex, newFace) {
    var dice = dices[diceIndex]
    dice.src = dice.src.slice(0, dice.src.length - 5) + `${newFace}` + ".png"
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
        switch(outcome(result)) {
            case "2":
                twoValue += 1
                break
            case "2p":
                twoPairValue += 1
                break
            case "3": 
                threeValue += 1
                break
            case "4":
                fourValue += 1
                break
            case "fh":
                fullHouseValue += 1
                break
            case "ss":
                smallStraightValue += 1
                break
            case "ls":
                largeStraightValue += 1
                break
            case "5":
                fiveValue += 1
                break
            case "n":
                noneValue += 1
            break
        } 
        updateHTMLfromValues()
        if (i == number) {clearInterval(interval)}
        i += 1
},1)
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

function initialize() {
for (let i = 0; i < dices.length; i++) {
    let firstDiceFace = Math.floor(Math.random() * 6) + 1
    let dice = dices[i]
    dice.src = dice.src.slice(0, dice.src.length - 5) + `${firstDiceFace}` + ".png"
}}

function outcome(result) {
    if (isYatzy(result)) {return "5"}
    else if (isSmallStraight(result)) {return "ss"}
    else if (isLargeStraight(result)) {return "ls"}
    else if (isFullHouse(result)) {return "fh"}
    else if (isFour(result)) {return "4"}
    else if (isThree(result)) {return "3"}
    else if (isTwoPair(result)) {return "2p"}
    else if (isTwo(result)) {return "2"}
    else {return "n"}
}

function equalArrays(array1, array2) {
    for (let i = 0; i < array1.length; i ++) {
        if (array1[i] != array2[i]) {return false}
    }
    return true
}

function isSmallStraight(result) {
    return (equalArrays(result.sort(), [1,2,3,4,5]))
}

function isLargeStraight(result) {
    return (equalArrays(result.sort(), [2,3,4,5,6]))
}

function nrOfValues(result) {
    var values = [result[0]]
    for (let i = 1; i < result.length; i++) {
        if (!values.includes(result[i])) {
            values.push(result[i])
        }
    }
    return values.length
}

function isFullHouse(result) {
    return ((nrOfSame(result) == 3) && (nrOfValues(result) == 2))
}

function isTwoPair(result) {
    return ( (nrOfSame(result) == 2) && (nrOfValues(result) == 3))
}

function isTwo(result) {
    return ( (nrOfSame(result) == 2) && (nrOfValues(result) == 4))
}

function isFour(result) {
    return (nrOfSame(result) == 4)
}

function isThree(result) {
    return (nrOfSame(result) == 3)
}

function isYatzy(result) {
    return (nrOfSame(result) == 5)
}

function rollDice() { 
    return Math.floor(Math.random() * 6) + 1
}

initialize()
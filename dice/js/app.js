const dices = document.getElementsByClassName('dice')
const counter = document.getElementById('counter')
var counterValue = 0

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

function rollAllFastManyTimesUntilAllSame(times) {
    var notReachedAllSame = true
    for (let i = 0; i < times; i++) {
        if (notReachedAllSame) {
        setTimeout(() => {
            result = rollAllOneTime()
            if (allSame(result)) {notReachedAllSame = false}
            counterValue += 1
            counter.innerHTML = `${counterValue}`
        }, 1*times)
    }
    }
}

function rollAllFastManyTimesUntilFiveSame(times) {
    counterValue = 0
    counter.innerHTML = `${counterValue}`
    var i = 0
    var notReachedFiveSame = true
    while (i <= times && notReachedFiveSame == true) {
        setTimeout(() => {
            result = rollAllOneTime()
            if (fiveSame(result)) {
                console.log("FIVE SAME!")
                notReachedFiveSame = false
                console.log(notReachedFiveSame == true)
                }
            counterValue += 1
            counter.innerHTML = `${counterValue}`
        }, 1*i)
        i += 1
    }
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

initialize()

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
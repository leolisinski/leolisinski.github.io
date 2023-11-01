var lever = document.getElementById('lever')
var leverPressed = false
var movingLever = false
var xPos = 0
var phoneNumber = 0
var phoneNumberHTML = document.getElementById('phone_number')


lever.addEventListener('mousedown', (event) => {leverMouseDown(event)})

function generateNumber(number) {
    var numberArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    var magnitude = 1
    while ((number / (10**magnitude)) >= 10) {
        magnitude = magnitude + 1
    }
    var i = 9
    while (i >= 0) {
        
        numberArray[i] = (number % 10)
        number = Math.floor(number / 10)
        i = i - 1
    }
    return numberArray.join("")
}

function leverMouseDown(event) {
    leverPressed = true
}

function removePx(string) {
    var output = ""
    for (let i = 0; i < string.length; i++) {
        if (string[i] != "p") {
            output = output + string[i]
        }
        else {
            return Number(output)
        }
    }
}

document.addEventListener('mousedown', (event) => {
    xPos = event.screenX
    movingLever = true
})

document.addEventListener('mousemove', (event) => {
    if (movingLever) {
        var xDiff = (event.screenX - xPos)
        if ((xDiff <= 360) && (xDiff >= 0) ) {
            lever.style.left = `${xDiff}px`
            var lowestNumber = 700000000
            var highestNumber = 799999999
            phoneNumber = lowestNumber + Math.floor((highestNumber - lowestNumber) * (xDiff/360))
            phoneNumberHTML.value = generateNumber(phoneNumber)
        }
        else if (xDiff > 360) {
            lever.style.left = "360px"
        }
        else {
            lever.style.left = "0px"
        }

    }
})

document.addEventListener('mouseup', ()=> {
    if (movingLever) {
        movingLever = false
        leverPressed = false
    }
})
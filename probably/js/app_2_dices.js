const dice1 = document.getElementById('dice_1')
const dice2 = document.getElementById('dice_2')

const inputField = document.getElementById('input_box_one_dice')
const counter = document.getElementById('counterRolls')

const sum11Counter = document.getElementById('counterSum11')
const product12Counter = document.getElementById('counterProduct12')
const mixedCounter = document.getElementById('counterMixed')


// Klick i inputfältet
inputField.addEventListener('click', () => {
    if (inputField.value == "Antal slag + ENTER") {
        inputField.value = ""
        inputField.style.fontSize = "30px"
    }
})


// ENTER startar simuleringen
document.addEventListener('keypress', (event) => {
    if (
        (event.code == "Enter" || event.code == "NumpadEnter") &&
        inputField.value != "Antal slag + ENTER" &&
        inputField.value != ""
    ) {
        const numberOfRolls = eval(inputField.value)

        if (numberOfRolls >= 10) {
            rollDiceAnimated(numberOfRolls, 1)
        }
        else {
            rollDiceAnimated(numberOfRolls, 500)
        }
    }
})


// Återställ texten i inputfältet
document.addEventListener('click', (event) => {
    if (
        inputField.value == "" &&
        event.target.id != 'input_box_one_dice'
    ) {
        inputField.style.fontSize = "15px"
        inputField.value = "Antal slag + ENTER"
    }
})


// Räknare
var rollValue = 0
var sum11Value = 0
var product12Value = 0
var mixedValue = 0


// Uppdatera statistik
function updateValueAndHTML(roll1, roll2) {

    rollValue += 1

    counter.innerHTML = `${rollValue}`


    // Händelse 1:
    // Summan är 11
    if (roll1 + roll2 === 11) {
        sum11Value += 1
    }


    // Händelse 2:
    // Produkten är större än eller lika med 12
    if (roll1 * roll2 >= 12) {
        product12Value += 1
    }


    // Händelse 3:
    // En är större än 3 och den andra mindre än 5
    if (
        (roll1 > 3 && roll2 < 5) ||
        (roll2 > 3 && roll1 < 5)
    ) {
        mixedValue += 1
    }


    // Uppdatera relativa frekvenser
    sum11Counter.innerHTML =
        `${(sum11Value * 100 / rollValue).toFixed(3)}`

    product12Counter.innerHTML =
        `${(product12Value * 100 / rollValue).toFixed(3)}`

    mixedCounter.innerHTML =
        `${(mixedValue * 100 / rollValue).toFixed(3)}`
}


// Ändra tärningsbild
function changeDiceFace(dice, newFace) {
    dice.src = `img/dice_${newFace}.png`
}


// Animerad simulering
function rollDiceAnimated(times, speed) {

    var i = 1

    while (i <= times) {

        setTimeout(() => {

            // Slå båda tärningarna
            var roll1 = Math.floor(Math.random() * 6) + 1
            var roll2 = Math.floor(Math.random() * 6) + 1

            // Visa resultaten
            changeDiceFace(dice1, roll1)
            changeDiceFace(dice2, roll2)

            // Uppdatera statistiken
            updateValueAndHTML(roll1, roll2)

        }, speed * i)

        i += 1
    }
}


// Klick på en tärning = ett nytt slag
dice1.addEventListener('click', () => {
    rollDiceAnimated(1, 1)
})

dice2.addEventListener('click', () => {
    rollDiceAnimated(1, 1)
})


// Slumpmässiga tärningar när sidan öppnas
function initialize() {

    var firstDiceFace =
        Math.floor(Math.random() * 6) + 1

    var secondDiceFace =
        Math.floor(Math.random() * 6) + 1

    changeDiceFace(dice1, firstDiceFace)
    changeDiceFace(dice2, secondDiceFace)
}


initialize()

const dice1 = document.getElementById('dice_1')
const dice2 = document.getElementById('dice_2')

const inputField = document.getElementById('input_box_one_dice')
const counter = document.getElementById('counterRolls')

const sum11Counter = document.getElementById('counterSum11')
const product12Counter = document.getElementById('counterProduct12')
const mixedCounter = document.getElementById('counterMixed')


// ------------------------------
// Räknare
// ------------------------------

let rollValue = 0
let sum11Value = 0
let product12Value = 0
let mixedValue = 0

let simulationRunning = false


// ------------------------------
// Inputfält
// ------------------------------

inputField.addEventListener('focus', () => {

    if (inputField.value === "Antal slag + ENTER") {
        inputField.value = ""
        inputField.style.fontSize = "30px"
    }

})


// ENTER startar simuleringen
inputField.addEventListener('keydown', (event) => {

    if (event.key !== "Enter") {
        return
    }

    event.preventDefault()

    const numberOfRolls = parseInt(inputField.value, 10)

    // Kontrollera att ett positivt heltal har skrivits in
    if (
        isNaN(numberOfRolls) ||
        numberOfRolls <= 0
    ) {
        return
    }

    // Starta inte en ny simulering
    // medan en annan fortfarande körs
    if (simulationRunning) {
        return
    }

    // 100 ms mellan varje kast = 10 kast per sekund
    const speed = 100

    rollDiceAnimated(numberOfRolls, speed)

})


// Återställ inputfältet när fokus lämnas
inputField.addEventListener('blur', () => {

    if (inputField.value === "") {
        inputField.style.fontSize = "15px"
        inputField.value = "Antal slag + ENTER"
    }

})


// ------------------------------
// Uppdatera statistik
// ------------------------------

function updateValueAndHTML(roll1, roll2) {

    rollValue++

    counter.textContent = rollValue


    // Händelse 1:
    // Summan är 11
    if (roll1 + roll2 === 11) {
        sum11Value++
    }


    // Händelse 2:
    // Produkten är större än eller lika med 12
    if (roll1 * roll2 >= 12) {
        product12Value++
    }


    // Händelse 3:
    // En tärning är större än 3
    // och den andra är mindre än 5
    if (
        (roll1 > 3 && roll2 < 5) ||
        (roll2 > 3 && roll1 < 5)
    ) {
        mixedValue++
    }


    // Uppdatera relativa frekvenser
    sum11Counter.textContent =
        (sum11Value * 100 / rollValue).toFixed(3)

    product12Counter.textContent =
        (product12Value * 100 / rollValue).toFixed(3)

    mixedCounter.textContent =
        (mixedValue * 100 / rollValue).toFixed(3)

}


// ------------------------------
// Ändra tärningsbilder
// ------------------------------

function changeDiceFace(dice, newFace) {

    dice.src = `img/dice_${newFace}.png`

}


// ------------------------------
// Ett kast med två tärningar
// ------------------------------

function makeOneRoll() {

    const roll1 =
        Math.floor(Math.random() * 6) + 1

    const roll2 =
        Math.floor(Math.random() * 6) + 1


    // Visa de nya tärningssidorna
    changeDiceFace(dice1, roll1)
    changeDiceFace(dice2, roll2)


    // Uppdatera statistik
    updateValueAndHTML(roll1, roll2)

}


// ------------------------------
// Animerad simulering
// ------------------------------

function rollDiceAnimated(times, speed) {

    simulationRunning = true

    let rollsCompleted = 0


    function nextRoll() {

        makeOneRoll()

        rollsCompleted++


        if (rollsCompleted < times) {

            setTimeout(nextRoll, speed)

        }
        else {

            simulationRunning = false

        }

    }


    nextRoll()

}


// ------------------------------
// Klick på tärning = ett kast
// ------------------------------

dice1.addEventListener('click', () => {

    if (!simulationRunning) {
        makeOneRoll()
    }

})


dice2.addEventListener('click', () => {

    if (!simulationRunning) {
        makeOneRoll()
    }

})


// ------------------------------
// Startläge
// ------------------------------

function initialize() {

    const firstDiceFace =
        Math.floor(Math.random() * 6) + 1

    const secondDiceFace =
        Math.floor(Math.random() * 6) + 1


    changeDiceFace(dice1, firstDiceFace)
    changeDiceFace(dice2, secondDiceFace)

}


initialize()

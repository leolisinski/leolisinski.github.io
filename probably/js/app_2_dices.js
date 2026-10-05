const dice1 = document.getElementById('dice_1')
const dice2 = document.getElementById('dice_2')

const inputField = document.getElementById('input_box_one_dice')
const speedSelect = document.getElementById('speedSelect')
const startButton = document.getElementById('startButton')

const counter = document.getElementById('counterRolls')

const sum11Counter = document.getElementById('counterSum11')
const product12Counter = document.getElementById('counterProduct12')
const mixedCounter = document.getElementById('counterMixed')


// ========================================
// RÄKNARE
// ========================================

let rollValue = 0
let sum11Value = 0
let product12Value = 0
let mixedValue = 0

let simulationRunning = false


// ========================================
// STARTA SIMULERING
// ========================================

function startSimulation() {

    // Om en simulering redan körs händer inget
    if (simulationRunning) {
        return
    }


    const numberOfRolls = parseInt(inputField.value, 10)
    const rollsPerSecond = parseInt(speedSelect.value, 10)


    // Kontrollera antal kast
    if (
        isNaN(numberOfRolls) ||
        numberOfRolls <= 0
    ) {
        inputField.focus()
        return
    }


    // Beräkna tid mellan varje kast
    const speed = 1000 / rollsPerSecond


    rollDiceAnimated(numberOfRolls, speed)

}


// ========================================
// KÖR-KNAPP
// ========================================

startButton.addEventListener('click', () => {

    startSimulation()

})


// ========================================
// ENTER PÅ DATOR
// ========================================

inputField.addEventListener('keydown', (event) => {

    if (event.key === "Enter") {

        event.preventDefault()

        startSimulation()

    }

})


// ========================================
// UPPDATERA STATISTIK
// ========================================

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


    // Relativa frekvenser
    sum11Counter.textContent =
        (sum11Value * 100 / rollValue).toFixed(3)

    product12Counter.textContent =
        (product12Value * 100 / rollValue).toFixed(3)

    mixedCounter.textContent =
        (mixedValue * 100 / rollValue).toFixed(3)

}


// ========================================
// ÄNDRA TÄRNINGSBILD
// ========================================

function changeDiceFace(dice, newFace) {

    dice.src = `img/dice_${newFace}.png`

}


// ========================================
// ETT KAST MED TVÅ TÄRNINGAR
// ========================================

function makeOneRoll() {

    const roll1 =
        Math.floor(Math.random() * 6) + 1

    const roll2 =
        Math.floor(Math.random() * 6) + 1


    changeDiceFace(dice1, roll1)
    changeDiceFace(dice2, roll2)


    updateValueAndHTML(roll1, roll2)

}


// ========================================
// ANIMERAD SIMULERING
// ========================================

function rollDiceAnimated(times, speed) {

    simulationRunning = true

    let rollsCompleted = 0


    // Visa att simuleringen körs
    startButton.disabled = true
    startButton.textContent = "KÖR..."


    function nextRoll() {

        makeOneRoll()

        rollsCompleted++


        if (rollsCompleted < times) {

            setTimeout(nextRoll, speed)

        }

        else {

            simulationRunning = false

            startButton.disabled = false
            startButton.textContent = "KÖR"

        }

    }


    // Första kastet direkt
    nextRoll()

}


// ========================================
// KLICKA PÅ TÄRNING = ETT KAST
// ========================================

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


// ========================================
// STARTLÄGE
// ========================================

function initialize() {

    const firstDiceFace =
        Math.floor(Math.random() * 6) + 1

    const secondDiceFace =
        Math.floor(Math.random() * 6) + 1


    changeDiceFace(dice1, firstDiceFace)
    changeDiceFace(dice2, secondDiceFace)

}


initialize()

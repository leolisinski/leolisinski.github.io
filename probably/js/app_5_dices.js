const dice1 = document.getElementById('dice_1')
const dice2 = document.getElementById('dice_2')
const dice3 = document.getElementById('dice_3')
const dice4 = document.getElementById('dice_4')
const dice5 = document.getElementById('dice_5')

const dices = [
    dice1,
    dice2,
    dice3,
    dice4,
    dice5
]

const inputField =
    document.getElementById('input_box_five_dice')

const speedSelect =
    document.getElementById('speedSelect')

const startButton =
    document.getElementById('startButton')

const counter =
    document.getElementById('counterRolls')

const atLeastOneThreeCounter =
    document.getElementById('counterAtLeastOneThree')

const yatzyCounter =
    document.getElementById('counterYatzy')

const atLeastTwoThreesCounter =
    document.getElementById('counterAtLeastTwoThrees')


// ========================================
// RÄKNARE
// ========================================

let rollValue = 0

let atLeastOneThreeValue = 0
let yatzyValue = 0
let atLeastTwoThreesValue = 0

let simulationRunning = false


// ========================================
// STARTA SIMULERING
// ========================================

function startSimulation() {

    // Starta inte en ny simulering
    // om en redan körs
    if (simulationRunning) {
        return
    }


    const numberOfRolls =
        parseInt(inputField.value, 10)

    const rollsPerSecond =
        parseInt(speedSelect.value, 10)


    // Kontrollera inmatningen
    if (
        isNaN(numberOfRolls) ||
        numberOfRolls <= 0
    ) {
        inputField.focus()
        return
    }


    // Tid mellan varje kast
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

function updateValueAndHTML(rolls) {

    rollValue++

    counter.textContent = rollValue


    // Räkna hur många treor kastet innehåller
    const numberOfThrees =
        rolls.filter(value => value === 3).length


    // Händelse 1:
    // Minst en av de fem tärningarna är en trea
    if (numberOfThrees >= 1) {

        atLeastOneThreeValue++

    }


    // Händelse 2:
    // YATZY - alla fem tärningarna visar samma tal
    if (
        rolls.every(value => value === rolls[0])
    ) {

        yatzyValue++

    }


    // Händelse 3:
    // Minst två av de fem tärningarna är treor
    if (numberOfThrees >= 2) {

        atLeastTwoThreesValue++

    }


    // Uppdatera relativa frekvenser

    atLeastOneThreeCounter.textContent =
        (
            atLeastOneThreeValue *
            100 /
            rollValue
        ).toFixed(3)


    yatzyCounter.textContent =
        (
            yatzyValue *
            100 /
            rollValue
        ).toFixed(3)


    atLeastTwoThreesCounter.textContent =
        (
            atLeastTwoThreesValue *
            100 /
            rollValue
        ).toFixed(3)

}


// ========================================
// ÄNDRA TÄRNINGSBILD
// ========================================

function changeDiceFace(dice, newFace) {

    dice.src = `img/dice_${newFace}.png`

}


// ========================================
// ETT KAST MED FEM TÄRNINGAR
// ========================================

function makeOneRoll() {

    const rolls = []


    for (let i = 0; i < dices.length; i++) {

        const roll =
            Math.floor(Math.random() * 6) + 1

        rolls.push(roll)

        changeDiceFace(dices[i], roll)

    }


    updateValueAndHTML(rolls)

}


// ========================================
// ANIMERAD SIMULERING
// ========================================

function rollDiceAnimated(times, speed) {

    simulationRunning = true

    let rollsCompleted = 0


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


    // Första kastet sker direkt
    nextRoll()

}


// ========================================
// KLICKA PÅ EN TÄRNING
// = ETT KAST MED ALLA FEM
// ========================================

dices.forEach(dice => {

    dice.addEventListener('click', () => {

        if (!simulationRunning) {

            makeOneRoll()

        }

    })

})


// ========================================
// STARTLÄGE
// ========================================

function initialize() {

    for (let i = 0; i < dices.length; i++) {

        const randomFace =
            Math.floor(Math.random() * 6) + 1

        changeDiceFace(
            dices[i],
            randomFace
        )

    }

}


initialize()

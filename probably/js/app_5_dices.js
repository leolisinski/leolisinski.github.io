const dices = [
    document.getElementById('dice_1'),
    document.getElementById('dice_2'),
    document.getElementById('dice_3'),
    document.getElementById('dice_4'),
    document.getElementById('dice_5')
]

const inputField = document.getElementById('input_box_five_dice')
const speedSelect = document.getElementById('speedSelect')
const startButton = document.getElementById('startButton')

const counter = document.getElementById('counterRolls')
const atLeastOneThreeCounter = document.getElementById('counterAtLeastOneThree')
const yatzyCounter = document.getElementById('counterYatzy')
const atLeastTwoThreesCounter = document.getElementById('counterAtLeastTwoThrees')

let rollValue = 0
let atLeastOneThreeValue = 0
let yatzyValue = 0
let atLeastTwoThreesValue = 0
let simulationRunning = false


// ========================================
// FYRVERKERI VID YATZY
// ========================================

function showYatzyFireworks() {

    // Skapa ett lager ovanpå sidan
    const overlay = document.createElement('div')
    overlay.className = 'yatzy-fireworks'

    // Text i mitten
    const message = document.createElement('div')
    message.className = 'yatzy-message'
    message.textContent = 'YATZY!'

    overlay.appendChild(message)

    // Skapa färgglada gnistor
    const colors = [
        '#ff595e',
        '#ffca3a',
        '#8ac926',
        '#1982c4',
        '#6a4c93',
        '#ff66c4'
    ]

    for (let i = 0; i < 70; i++) {

        const particle = document.createElement('span')
        particle.className = 'yatzy-particle'

        const angle = Math.random() * Math.PI * 2
        const distance = 90 + Math.random() * 220

        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance

        particle.style.setProperty('--x', `${x}px`)
        particle.style.setProperty('--y', `${y}px`)

        particle.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)]

        particle.style.animationDelay =
            `${Math.random() * 0.2}s`

        overlay.appendChild(particle)
    }

    document.body.appendChild(overlay)

    // Ta bort animationen automatiskt
    setTimeout(() => {
        overlay.remove()
    }, 1800)
}


// ========================================
// STARTA SIMULERING
// ========================================

function startSimulation() {

    if (simulationRunning) return

    const numberOfRolls = Number(inputField.value)
    const rollsPerSecond = Number(speedSelect.value)

    if (
        !Number.isSafeInteger(numberOfRolls) ||
        numberOfRolls <= 0
    ) {
        inputField.focus()
        return
    }

    const speed = 1000 / rollsPerSecond

    rollDiceAnimated(numberOfRolls, speed)
}


// ========================================
// KÖR-KNAPP OCH ENTER
// ========================================

startButton.addEventListener('click', startSimulation)

inputField.addEventListener('keydown', (event) => {

    if (event.key === 'Enter') {
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

    const numberOfThrees =
        rolls.filter(value => value === 3).length

    // Minst en trea
    if (numberOfThrees >= 1) {
        atLeastOneThreeValue++
    }

    // Minst två treor
    if (numberOfThrees >= 2) {
        atLeastTwoThreesValue++
    }

    // YATZY – alla fem lika
    if (rolls.every(value => value === rolls[0])) {

        yatzyValue++

        // Visa fyrverkeriet!
        showYatzyFireworks()
    }

    atLeastOneThreeCounter.textContent =
        (atLeastOneThreeValue * 100 / rollValue).toFixed(3)

    atLeastTwoThreesCounter.textContent =
        (atLeastTwoThreesValue * 100 / rollValue).toFixed(3)

    yatzyCounter.textContent =
        (yatzyValue * 100 / rollValue).toFixed(3)
}


// ========================================
// ETT KAST MED FEM TÄRNINGAR
// ========================================

function makeOneRoll() {

    const rolls = []

    for (let i = 0; i < dices.length; i++) {

        const roll = Math.floor(Math.random() * 6) + 1

        rolls.push(roll)

        dices[i].src = `img/dice_${roll}.png`
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
    startButton.textContent = 'KÖR...'

    function nextRoll() {

        makeOneRoll()
        rollsCompleted++

        if (rollsCompleted < times) {
            setTimeout(nextRoll, speed)
        } else {
            simulationRunning = false
            startButton.disabled = false
            startButton.textContent = 'KÖR'
        }
    }

    nextRoll()
}


// ========================================
// KLICKA PÅ EN TÄRNING = ETT KAST
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

    dices.forEach(dice => {

        const randomFace = Math.floor(Math.random() * 6) + 1
        dice.src = `img/dice_${randomFace}.png`

    })
}

initialize()

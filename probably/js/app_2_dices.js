const dice1 = document.getElementById('dice_1')
const dice2 = document.getElementById('dice_2')

const inputField = document.getElementById('input_box_one_dice')
const counter = document.getElementById('counterRolls')

const sum11Counter = document.getElementById('counterSum11')
const product12Counter = document.getElementById('counterProduct12')
const mixedCounter = document.getElementById('counterMixed')


// Klick i inputfältet
inputField.addEventListener('click', () => {
    if (inputField.value === "Antal slag + ENTER") {
        inputField.value = ""
        inputField.style.fontSize = "30px"
    }
})


// ENTER startar simuleringen
document.addEventListener('keydown', (event) => {

    if (
        event.key === "Enter" &&
        inputField.value !== "Antal slag + ENTER" &&
        inputField.value !== ""
    ) {
        event.preventDefault()

        const numberOfRolls = Number(inputField.value)

        // Kontrollera att ett positivt heltal har skrivits in
        if (!Number.isInteger(numberOfRolls) || numberOfRolls <= 0) {
            return
        }

        let speed

        // Anpassa hastigheten efter antal slag
        if (numberOfRolls <= 10) {
            speed = 300
        }
        else if (numberOfRolls <= 100) {
            speed = 50
        }
        else if (numberOfRolls <= 1000) {
            speed = 10
        }
        else {
            speed = 2
        }

        rollDiceAnimated(numberOfRolls, speed)
    }
})


// Återställ texten i inputfältet
document.addEventListener('click', (event) => {

    if (
        inputField.value === "" &&
        event.target.id !== 'input_box_one_dice'
    ) {
        inputField.style.fontSize = "15px"
        inputField.value = "Antal slag + ENTER"
    }
})


// Räknare
let rollValue = 0
let sum11Value = 0
let product12Value = 0
let mixedValue = 0


// Uppdatera statistik efter ett tärningskast
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
    // En tärning är större än 3
    // och den andra är mindre än 5
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

    let i = 1

    while (i <= times) {

        setTimeout(() => {

            // Slå båda tärningarna
            const roll1 = Math.floor(Math.random() * 6) + 1
            const roll2 = Math.floor(Math.random() * 6) + 1


            // Visa resultaten
            changeDiceFace(dice1, roll1)
            changeDiceFace(dice2, roll2)


            // Uppdatera statistiken
            updateValueAndHTML(roll1, roll2)

        }, speed * i)

        i += 1
    }
}


// Klick på någon av tärningarna = ett nytt slag
dice1.addEventListener('click', () => {
    rollDiceAnimated(1, 1)
})

dice2.addEventListener('click', () => {
    rollDiceAnimated(1, 1)
})


// Slumpmässiga tärningssidor när sidan öppnas
function initialize() {

    const firstDiceFace =
        Math.floor(Math.random() * 6) + 1

    const secondDiceFace =
        Math.floor(Math.random() * 6) + 1

    changeDiceFace(dice1, firstDiceFace)
    changeDiceFace(dice2, secondDiceFace)
}


initialize()

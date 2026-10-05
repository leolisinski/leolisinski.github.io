document.addEventListener('keypress', (event) => {
    if (
        (event.code == "Enter" || event.code == "NumpadEnter") &&
        inputField.value != "Antal slag + ENTER" &&
        inputField.value != ""
    ) {
        const numberOfRolls = Number(inputField.value)

        if (!Number.isInteger(numberOfRolls) || numberOfRolls <= 0) {
            return
        }

        let speed

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

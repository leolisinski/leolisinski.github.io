const dice = document.getElementById('dice')

function rollDice() {
    var i = 0
    var direction = Math.floor(Math.random() * 4)
    var diceFace = Math.floor(Math.random() * 6) + 1
    while (i <= 10) { 

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
                        dice.style.top = "10px"
                    break
                    case 1: 
                    dice.style.left = "10px"
                    break
                    case 2: 
                    dice.style.right = "10px"
                    break
                    case 3: 
                    dice.style.bottom = "10px"
                    break
                }
            }, 100 + 200*i)

            setTimeout(() => {
                dice.style.top = "0px"
                dice.style.left = "0px"
                dice.style.right = "0px"
                dice.style.bottom = "0px"
            }, 200 + 200*i)

            i += 1

        }
    }

dice.addEventListener('click', () => {rollDice()})


const brick1_1 = document.getElementById('1_1')
const brick1_2 = document.getElementById('1_2')
const brick1_3 = document.getElementById('1_3')
const brick1_4 = document.getElementById('1_4')
const brick2_1 = document.getElementById('2_1')
const brick2_2 = document.getElementById('2_2')
const brick2_3 = document.getElementById('2_3')
const brick2_4 = document.getElementById('2_4')
const brick3_1 = document.getElementById('3_1')
const brick3_2 = document.getElementById('3_2')
const brick3_3 = document.getElementById('3_3')
const brick3_4 = document.getElementById('3_4')
const brick4_1 = document.getElementById('4_1')
const brick4_2 = document.getElementById('4_2')
const brick4_3 = document.getElementById('4_3')
const brick4_4 = document.getElementById('4_4')

const brickArray = [[brick1_1, brick1_2, brick1_3, brick1_4], [brick2_1, brick2_2, brick2_3, brick2_4], [brick3_1, brick3_2, brick3_3, brick3_4], [brick4_1, brick4_2, brick4_3, brick4_4]]

function randomEmptyBrickLocation() {
    var arrayWithAllEmptyLocations = []
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (brickArray[i][j].innerHTML == "") {arrayWithAllEmptyLocations.push([i, j])}
        }
    }
    if (arrayWithAllEmptyLocations.length != 0) {
    var randomIndex = Math.floor(Math.random() * arrayWithAllEmptyLocations.length)
    return arrayWithAllEmptyLocations[randomIndex]
    }
    return null
}

function startNumber() {
    var randomOutcome = Math.random()
    if (randomOutcome > 0.7) {
        return 4
    }
        return 2
}

function generateNumber(positionX, positionY, value) {
    brickArray[positionY][positionX].innerHTML = value
}

class Brick {

    constructor() {
        this.value = startNumber()
        this.position = randomEmptyBrickLocation()
        this.positionX = this.position[1]
        this.positionY = this.position[0]
        this.canMerge = true
        generateNumber(this.positionX, this.positionY, this.value)
    }

    canMove(direction) {
        switch(direction) {
            case "l":
                if (this.positionX == 0) {return false}
                else if (brickArray[this.positionX - 1][this.positionY].innerHTML == "") {return true}
                else {return false}
            break

            case "r":
                if (this.positionX == 3) {return false}
                else if (brickArray[this.positionX + 1][this.positionY].innerHTML == "") {return true}
                else {return false}
            break

            case "u":
                if (this.positionY == 0) {return false}
                else if (brickArray[this.positionX][this.positionY - 1].innerHTML == "") {return true}
                else {return false}
            break

            
            case "d":
                if (this.positionY == 3) {return false}
                else if (brickArray[this.positionX][this.positionY + 1].innerHTML == "") {return true}
                else {return false}
            break
        }
    }
}
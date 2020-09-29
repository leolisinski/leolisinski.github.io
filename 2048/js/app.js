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

const brickArray = [brick1_1, brick1_2, brick1_3, brick1_4, brick2_1, brick2_2, brick2_3, brick2_4, brick3_1, brick3_2, brick3_3, brick3_4, brick4_1, brick4_2, brick4_3, brick4_4]


function placeNumber() {
    if (anyEmptyBricksLeft()) {
        var brickIndex = randomEmptyBrickIndex()
        var brick = brickArray[brickIndex]
        var randomOutcome = Math.random()
        var number
        if (randomOutcome > 0.9) {
            number = 4
            brick.style.background = 'rgb(202, 191, 182)'
        }
        else {
            number = 2
            brick.style.background = 'lightgrey'
        }
        brick.innerHTML = `${number}`
    }
    else
    console.log("no empty bricks left, game over")
}

function randomEmptyBrickIndex() {
    var arrayWithAllEmptyBrickIndex = []
    for (let i = 0; i < 16; i++) {
        if (brickArray[i].innerHTML == "") {arrayWithAllEmptyBrickIndex.push(i)}
    }
    var randomIndex = Math.floor(Math.random() * arrayWithAllEmptyBrickIndex.length)
    return arrayWithAllEmptyBrickIndex[randomIndex]
}

function anyEmptyBricksLeft() {
    var outcome = false
    for (let i = 0; i < 16 ; i++) {
        if (brickArray[i].innerHTML == "") {outcome = true; return outcome}
    }
    return outcome
}
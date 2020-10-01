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

var mergedMarkingArray = [[0,0,0,0,],[0,0,0,0,],[0,0,0,0,],[0,0,0,0,]]

const upButton = document.getElementById('up_button')
const downButton = document.getElementById('down_button')
const leftButton = document.getElementById('left_button')
const rightButton = document.getElementById('right_button')

upButton.addEventListener('click', () => placeNumber())
leftButton.addEventListener('click', () => moveAll("l"))
rightButton.addEventListener('click', () => moveAll("r"))

function colorPicker(number) {
    if (number == 2) {return "rgb(211,211,211"}
    else if (number == 0) {return "rgba(211, 211, 211, 0.479)"}
    else {
    var rgbValue_1 = Math.floor(105.5*number % 255)
    var rgbValue_2 = Math.floor(number**2 % 255)
    var rgbValue_3 = Math.floor(rgbValue_1+rgbValue_2 % 255)
    return `rgb(${rgbValue_1}, ${rgbValue_2}, ${rgbValue_3})`
    }
}

function placeNumber() {
    if (anyEmptyBricksLeft()) {
        var brickIndex = randomEmptyBrickIndex()
        var brick = brickArray[brickIndex]
        var randomOutcome = Math.random()
        var number
        if (randomOutcome > 0.7) {
            number = 4
        }
        else {
            number = 2
        }
        brick.style.background = colorPicker(number)
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

function generateNumber(brick) {
    if (brick.innerHTML == "") {return 0}
    else {return parseInt(brick.innerHTML)}
}

function drawNumber(number) {
    if (number == 0) {return ""}
    else {return number}
}

function extractBoard() {
    var row_1 = [generateNumber(brick1_1), generateNumber(brick1_2), generateNumber(brick1_3), generateNumber(brick1_4)]
    var row_2 = [generateNumber(brick2_1), generateNumber(brick2_2), generateNumber(brick2_3), generateNumber(brick2_4)]
    var row_3 = [generateNumber(brick3_1), generateNumber(brick3_2), generateNumber(brick3_3), generateNumber(brick3_4)]
    var row_4 = [generateNumber(brick4_1), generateNumber(brick4_2), generateNumber(brick4_3), generateNumber(brick4_4)]
    return [row_1, row_2, row_3, row_4]
}

function drawBoard(boardArray) {
    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 4; j++) {
            let brick = eval(`brick${i}_${j}`)
            let number = boardArray[i-1][j-1]
            brick.innerHTML = drawNumber(number)
            brick.style.background = colorPicker(number)
        }
    }
}

function brickOver(i,j) {
    if (i == 0) {return null}
    else {return [i-1, j]}  
} 

function brickUnder(i,j) {
    if (i == 3) {return null}
    else {return [i+1, j]}  
}

function brickRight(i,j) {
    if (j == 3) {return null}
    else {return [i, j+1]}  
}

function brickLeft(i,j) {
    if (j == 0) {return null}
    else {return [i, j-1]}  
}

function moveBrick(direction, i, j) {
    switch(direction) {
        case "l":
            if (brickLeft(i,j) == null || extractBoard()[i][j-1] != 0) {return}
            else {
                let board = extractBoard()
                board[i][j-1] = board[i][j] 
                board[i][j] = 0 
                drawBoard(board)
            }
        break

        case "r":
            if (brickRight(i,j) == null || extractBoard()[i][j+1] != 0) {return}
            else {
                let board = extractBoard()
                board[i][j+1] = board[i][j] 
                board[i][j] = 0 
                drawBoard(board)
            }
        break

        case "d":
            if (brickUnder(i,j) == null || extractBoard()[i+1][j] != 0) {return}
            else {
                let board = extractBoard()
                board[i+1][j] = board[i][j] 
                board[i][j] = 0 
                drawBoard(board)
            }
        break

        case "u":
            if (brickOver(i,j) == null || extractBoard()[i-1][j] != 0) {return}
            else {
                let board = extractBoard()
                board[i-1][j] = board[i][j] 
                board[i][j] = 0 
                drawBoard(board)
            }
        break
    }
}

function valueNextTo(direction, i, j) {
    switch(direction) {
        case "l":
            if (brickLeft(i, j) != null) {
                return extractBoard()[i][j-1]
            }
        break

        case "r":
            if (brickRight(i, j) != null) {
                return extractBoard()[i][j+1]
            }
        break

        case "d":
            if (brickUnder(i, j) != null) {
                return extractBoard()[i+1][j]
            }
        break

        case "u":
            if (brickOver(i, j) != null) {
                return extractBoard()[i-1][j]
            }
        break
    }
}

function moveAll(direction) {
    
    switch(direction) {

        case "l":
            while (canMove("l")) {
            for (let j = 1; j <= 3; j++) {
                for (let i = 0; i <= 3; i++) {
                    if (valueNextTo("l", i, j) == 0) {
                        moveBrick("l", i, j)  
                    }
                    else if (valueNextTo("l", i, j) == extractBoard()[i][j]) {
                        let board = extractBoard()
                        let value = board[i][j]
                        board[i][j-1] = value*2
                        board[i][j] = 0
                        mergedMarkingArray[i][j-1] = 1
                        drawBoard(board)
                    }

                }
            }
        }
        break

        case "r":
            while (canMove("r")) {
            for (let j = 0; j <= 2; j++) {
                for (let i = 0; i <= 3; i++) {
                    if (valueNextTo("r", i, j) == 0) {
                        moveBrick("r", i, j)  
                    }
                    else if (valueNextTo("r", i, j) == extractBoard()[i][j]) {
                        let board = extractBoard()
                        let value = board[i][j]
                        board[i][j+1] = value*2
                        board[i][j] = 0
                        mergedMarkingArray[i][j+1] = 1
                        drawBoard(board)
                    }

                }
            }
            console.log(mergedMarkingArray)
        }
        break



    }
    clearMergeMarkings()
}

function canMove(direction) {
    switch(direction) {
        case "l":
            for (let j = 1; j <= 3; j++) {
                for (let i = 0; i <= 3; i++) {
                    let board = extractBoard()
                    let value = board[i][j]
                    if (
                        ((valueNextTo("l", i, j) == 0 && value != 0) && mergedMarkingArray[i][j] == 0)
                        ||
                        ((valueNextTo("l", i, j) == value) && (mergedMarkingArray[i][j] == 0 && mergedMarkingArray[i][j-1] == 0))
                    )
                    {
                        return true
                    }
                }
            }

        break
    }
    return false
}

function clearMergeMarkings() {
    mergedMarkingArray = [[0,0,0,0,],[0,0,0,0,],[0,0,0,0,],[0,0,0,0,]]
}

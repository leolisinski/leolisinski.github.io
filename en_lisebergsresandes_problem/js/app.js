//    Du  Lh  Af  Lb  Hs  Ae  Lo  Ka  Va  Sl  Fl
// Du 0   177 91  77  126 173 234 269 286 241 337
// Lh 177 0   99  252 301 302 422 450 460 388 469
// Af 91  99  0   146 219 209 327 355 384 299 378
// Lb 77  252 146 0   113 106 175 204 241 166 262
// Hs 126 301 219 113 0   100 174 195 235 239 332
// Ae 173 302 209 106 100 0   191 244 171 86  167
// Lo 234 422 327 175 174 191 0   70  68  132 219
// Ka 269 450 355 204 195 244 70  0   93  184 250
// Va 286 460 384 241 235 171 68  93  0   117 152
// Sl 241 388 299 166 239 86  132 184 117 0   92
// Fl 337 469 378 262 332 167 219 250 152 92  0


const duCord = [275, 195]
const lhCord = [60, 83]
const afCord = [153, 180]
const lbCord = [321, 292]
const hsCord = [442, 200]
const aeCord = [288, 420]
const sgCord = [362, 505]
const feCord = [362, 630]
const vyCord = [502, 495]
const loCord = [480, 395]
const kaCord = [573, 382]

const spanDistances = document.getElementsByClassName('d')

const tabell = document.getElementById('tabell')

const coordinates = [duCord, lhCord, afCord, lbCord, hsCord, aeCord, sgCord, feCord, vyCord, loCord, kaCord]
const strings = ["du", "lh", "af", "lb", "hs", "ae", "sg", "fe", "vy", "lo", "ka"]

const button = document.getElementById('knapp')
var clickPassive = true
var storedClick = null
var storedDistance = 0

const places = document.getElementsByClassName('place')

function spanDistancesFrom(from) {
    var spanDistancesList = []
    for (let i=0; i<spanDistances.length; i++) {
        spanDistances[i].innerHTML = distance(from, spanDistances[i].id.slice(2,4))
        spanDistancesList.push([distance(from, spanDistances[i].id.slice(2,4)), i])
    }
}

function markVisitedAndClosest() {
    if (stepCounter == 12) {
        for (let i = 0; i < spanDistances.length; i++) {
            spanDistances[i].style.color = "black"
            tabell.style.visibility = "hidden"
            stepCounter = 0
            clickPassive = true
        }
    } 
    else if (stepCounter > 10) {
        spanDistances[0].style.color = "green"
        for (let i = 1; i < spanDistances.length; i++) {
            spanDistances[i].style.color = "red"
        }
    }
    else {
    for (let i = 0; i < spanDistances.length; i++) {
        if (eval(spanDistances[i].innerHTML) == 0) {
            spanDistances[i].style.color = "red"
        }
    }
    var shortestValue = 1000
    for (let i = 0; i < spanDistances.length; i++) {
        if (eval(spanDistances[i].innerHTML) < shortestValue && spanDistances[i].style.color != "red") {
            shortest = spanDistances[i]
            shortestValue = eval(shortest.innerHTML)
        }
    }
    shortest.style.color = "green"
}
}

var stepCounter = 0

for (let i = 0; i < places.length; i++) {
    places[i].addEventListener('click', (event) => {
        stepCounter += 1
        if (clickPassive) {
            tabell.style.visibility = "visible"
            hideAllLines()
            clickPassive = false; 
            storedClick = event.target.id
            button.innerHTML = 'distans: '
            spanDistancesFrom(event.target.id)
        }
        else {
            storedDistance += distance(storedClick, event.target.id)
            button.innerHTML = `distans: ${storedDistance} m`
            drawLine(storedClick, event.target.id)
            storedClick = event.target.id
            spanDistancesFrom(event.target.id)
        }
        markVisitedAndClosest()
    })
}

button.addEventListener('click', () => {
    button.innerHTML = "letar..."
    setTimeout(() => {findShortestTravel()}, 500)
})

var lines = document.getElementsByClassName('line')
var line_index = 0

for (let i = 1; i <= 10; i++) {
    lines[line_index].setAttribute("x1",275)
    lines[line_index].setAttribute("y1",195)
    lines[line_index].setAttribute("x2",coordinates[i][0])
    lines[line_index].setAttribute("y2",coordinates[i][1])
    lines[line_index].setAttribute("id", `${strings[0]}_${strings[i]}`)
    line_index += 1
}

for (let i = 2; i <= 10; i++) {
    lines[line_index].setAttribute("x1",60)
    lines[line_index].setAttribute("y1",83)
    lines[line_index].setAttribute("x2",coordinates[i][0])
    lines[line_index].setAttribute("y2",coordinates[i][1])
    lines[line_index].setAttribute("id", `${strings[1]}_${strings[i]}`)
    line_index += 1
}

for (let i = 3; i <= 10; i++) {
    lines[line_index].setAttribute("x1",153)
    lines[line_index].setAttribute("y1",180)
    lines[line_index].setAttribute("x2",coordinates[i][0])
    lines[line_index].setAttribute("y2",coordinates[i][1])
    lines[line_index].setAttribute("id", `${strings[2]}_${strings[i]}`)
    line_index += 1
}

for (let i = 4; i <= 10; i++) {
    lines[line_index].setAttribute("x1",321)
    lines[line_index].setAttribute("y1",292)
    lines[line_index].setAttribute("x2",coordinates[i][0])
    lines[line_index].setAttribute("y2",coordinates[i][1])
    lines[line_index].setAttribute("id", `${strings[3]}_${strings[i]}`)
    line_index += 1
}

for (let i = 5; i <= 10; i++) {
    lines[line_index].setAttribute("x1",442)
    lines[line_index].setAttribute("y1",200)
    lines[line_index].setAttribute("x2",coordinates[i][0])
    lines[line_index].setAttribute("y2",coordinates[i][1])
    lines[line_index].setAttribute("id", `${strings[4]}_${strings[i]}`)
    line_index += 1
}

for (let i = 6; i <= 10; i++) {
    lines[line_index].setAttribute("x1",288)
    lines[line_index].setAttribute("y1",420)
    lines[line_index].setAttribute("x2",coordinates[i][0])
    lines[line_index].setAttribute("y2",coordinates[i][1])
    lines[line_index].setAttribute("id", `${strings[5]}_${strings[i]}`)
    line_index += 1
}

for (let i = 7; i <= 10; i++) {
    lines[line_index].setAttribute("x1",362)
    lines[line_index].setAttribute("y1",505)
    lines[line_index].setAttribute("x2",coordinates[i][0])
    lines[line_index].setAttribute("y2",coordinates[i][1])
    lines[line_index].setAttribute("id", `${strings[6]}_${strings[i]}`)
    line_index += 1
}

for (let i = 8; i <= 10; i++) {
    lines[line_index].setAttribute("x1",362)
    lines[line_index].setAttribute("y1",630)
    lines[line_index].setAttribute("x2",coordinates[i][0])
    lines[line_index].setAttribute("y2",coordinates[i][1])
    lines[line_index].setAttribute("id", `${strings[7]}_${strings[i]}`)
    line_index += 1
}

for (let i = 9; i <= 10; i++) {
    lines[line_index].setAttribute("x1",502)
    lines[line_index].setAttribute("y1",495)
    lines[line_index].setAttribute("x2",coordinates[i][0])
    lines[line_index].setAttribute("y2",coordinates[i][1])
    lines[line_index].setAttribute("id", `${strings[8]}_${strings[i]}`)
    line_index += 1
}

    lines[line_index].setAttribute("x1",480)
    lines[line_index].setAttribute("y1",395)
    lines[line_index].setAttribute("x2",coordinates[10][0])
    lines[line_index].setAttribute("y2",coordinates[10][1])
    lines[line_index].setAttribute("id", `${strings[9]}_${strings[10]}`)


function showLine(lineString) {
    if (document.getElementById(lineString) == null) {
        lineString = lineString[3] + lineString[4] + lineString[2] + lineString[0] + lineString[1]
    }
    document.getElementById(lineString).style.strokeWidth = 3
    document.getElementById(lineString).style.stroke = "green"
}

function drawLine(from, to) {
    showLine(`${from}_${to}`)
}

function hideLine(lineString) {
    if (document.getElementById(lineString) == null) {
        lineString = lineString[3] + lineString[4] + lineString[2] + lineString[0] + lineString[1]
    }
    document.getElementById(lineString).style.strokeWidth = 0.3
    document.getElementById(lineString).style.stroke = "grey"
}

function hideAllLines() {
    for (let i = 0; i < lines.length; i++) {
        lines[i].style.strokeWidth = 0.3
        lines[i].style.stroke = "grey"
    }
}


const partTravels = [
    [null, "du_lh", "du_af", "du_lb", "du_hs", "du_ae", "du_lo", "du_ka", "du_vy", "du_sg", "du_fe"], 
    ["lh_du", null, "lh_af", "lh_lb", "lh_hs", "lh_ae", "lh_lo", "lh_ka", "lh_vy", "lh_sg", "lh_fe"],
    ["af_du", "af_lh", null, "af_lb", "af_hs", "af_ae", "af_lo", "af_ka", "af_vy", "af_sg", "af_fe"],
    ["lb_du", "lb_lh", "lb_af", null, "lb_hs", "lb_ae", "lb_lo", "lb_ka", "lb_vy", "lb_sg", "lb_fe"],
    ["hs_du", "hs_lh", "hs_af", "hs_lb", null, "hs_ae", "hs_lo", "hs_ka", "hs_vy", "hs_sg", "hs_fe"],
    ["ae_du", "ae_lh", "ae_af", "ae_lb", "ae_hs", null, "ae_lo", "ae_ka", "ae_vy", "ae_sg", "ae_fe"],
    ["lo_du", "lo_lh", "lo_af", "lo_lb", "lo_hs", "lo_ae", null, "lo_ka", "lo_vy", "lo_sg", "lo_fe"],
    ["ka_du", "ka_lh", "ka_af", "ka_lb", "ka_hs", "ka_ae", "ka_lo", null, "ka_vy", "ka_sg", "ka_fe"],
    ["vy_du", "vy_lh", "vy_af", "vy_lb", "vy_hs", "vy_ae", "vy_lo", "vy_ka", null, "vy_sg", "vy_fe"],
    ["sg_du", "sg_lh", "sg_af", "sg_lb", "sg_hs", "sg_ae", "sg_lo", "sg_ka", "sg_vy", null, "sg_fe"],
    ["fe_du", "fe_lh", "fe_af", "fe_lb", "fe_hs", "fe_ae", "fe_lo", "fe_ka", "fe_vy", "fe_sg", null]
]

function distance(from, to) {
    var i = null
    var j = null
    switch (from) {
        case "du":
            i = 0
            break;
        case "lh":
            i = 1
            break;
        case "af":
            i = 2
            break;
        case "lb":
            i = 3
            break;
        case "hs":
            i = 4
            break;
        case "ae":
            i = 5
            break;
        case "lo":
            i = 6
            break;
        case "ka":
            i = 7
            break;
        case "vy":
            i = 8
            break;
        case "sg":
            i = 9
            break;
        case "fe":
            i = 10
            break;
    }
    switch (to) {
        case "du":
            j = 0
            break;
        case "lh":
            j = 1
            break;
        case "af":
            j = 2
            break;
        case "lb":
            j = 3
            break;
        case "hs":
            j = 4
            break;
        case "ae":
            j = 5
            break;
        case "lo":
            j = 6
            break;
        case "ka":
            j = 7
            break;
        case "vy":
            j = 8
            break;
        case "sg":
            j = 9
            break;
        case "fe":
            j = 10
            break;
    }
    return distances[i][j]
}

const closestNeighborTravel = [
    [0, 3],
    [3, 5],
    [5, 9],
    [9, 10],
    [10, 8],
    [8, 6],
    [6, 7],
    [7, 4],
    [4, 2],
    [2, 1],
    [1, 0],
]

const distances = [
    [0, 177, 91, 77, 126, 173, 234, 269, 286, 241, 337],
    [177, 0, 99, 252, 301, 302, 422, 450, 460, 388, 469],
    [91, 99, 0, 146, 219, 209, 327, 355, 384, 299, 378],
    [77, 252, 146, 0, 113, 106, 175, 204, 241, 166, 262],
    [126, 301, 219, 113, 0, 100, 174, 195, 235, 239, 332],
    [173, 302, 209, 106, 100, 0, 191, 244, 171, 86, 167],
    [234, 422, 327, 175, 174, 191, 0, 70, 68, 132, 219],
    [269, 450, 355, 204, 195, 244, 70, 0, 93, 184, 250],
    [286, 460, 384, 241, 235, 171, 68, 93, 0, 117, 152],
    [241, 388, 299, 166, 239, 86, 132, 184, 117, 0, 92],
    [337, 469, 378, 262, 332, 167, 219, 250, 152, 92, 0],
]
 

function travel(travelInput) {
    var travelArray = []
    for (let i = 0; i < travelInput.length; i++) {
        let j = travelInput[i][0]
        let k = travelInput[i][1]
        travelArray.push(partTravels[j][k])
        travelArray.push(distances[j][k])
        showLine(partTravels[j][k])        
    }
    return travelArray
}

function hideTravel(travelInput) {
    for (let i = 0; i < travelInput.length; i++) {
        let j = travelInput[i][0]
        let k = travelInput[i][1]
        hideLine(partTravels[j][k])        
    }
}

function showTravel(travelInput) {
    for (let i = 0; i < travelInput.length; i++) {
        let j = travelInput[i][0]
        let k = travelInput[i][1]
        showLine(partTravels[j][k])        
    }
}

function travelHided(travelInput) {
    var travelArray = []
    for (let i = 0; i < travelInput.length; i++) {
        let j = travelInput[i][0]
        let k = travelInput[i][1]
        travelArray.push(partTravels[j][k])
        travelArray.push(distances[j][k])    
    }
    return travelArray
}

function lengthOfTravel(travelArray) {
    var totalDistance = 0
    for (let i = 1; i < travelArray.length; i += 2) {
        totalDistance += travelArray[i]
    }
    return totalDistance
}

function deleteAndReturn(array, index) {
    var outputArray = []
    var i = 0
    while (i < array.length) {
        if (i != index) {
            outputArray.push(array[i])
        }
        i += 1
    }
    var item = array[index]
    return [outputArray, item]
}

function notInArray(array, element) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == element) {
            return false
        }
    }
    return true
}

function allPossibleTravelsGenerated() {
var allPossibleTravels = []
var tempTravel = []
for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 11; j++) {
        if (notInArray([i], j)) {
            for (let k = 1; k < 11; k++) {
                if (notInArray([i, j], k)) {
                    for (let l = 1; l < 11; l++) {
                        if (notInArray([i, j, k], l)) {
                            for (let m = 1; m < 11; m++) {
                                if (notInArray([i, j, k, l], m)) {
                                    for (let n = 1; n < 11; n++) {
                                        if (notInArray([i, j, k, l, m], n)) {
                                            for (let o = 1; o < 11; o++) {
                                                if (notInArray([i, j, k, l, m, n], o)) {
                                                    for (let p = 1; p < 11; p++) {
                                                        if (notInArray([i, j, k, l, m, n, o], p)) {
                                                            for (let q = 1; q < 11; q++) {
                                                                if (notInArray([i, j, k, l, m, n, o, p], q)) {
                                                                    for (let r = 1; r < 11; r++) {
                                                                        if (notInArray([i, j, k, l, m, n, o, p, q], r)) {
                                                                            tempTravel = [
                                                                                [0, i],
                                                                                [i, j],
                                                                                [j, k],
                                                                                [k, l],
                                                                                [l, m],
                                                                                [m, n],
                                                                                [n, o],
                                                                                [o, p],
                                                                                [p, q],
                                                                                [q, r],
                                                                                [r, 0]
                                                                            ]
                                                                            allPossibleTravels.push(tempTravel)
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
return allPossibleTravels
}

function findShortestTravel() {
    hideAllLines()
    var allTravels = allPossibleTravelsGenerated()
    var shortestTravel = allTravels[0]
    var shortestDistance = lengthOfTravel(travelHided(shortestTravel))
    var counter = 0
    for (let i = 0; i < allTravels.length; i++) {
        if (lengthOfTravel(travelHided(allTravels[i])) < shortestDistance) {
            shortestTravel = allTravels[i]
            shortestDistance = lengthOfTravel(travelHided(shortestTravel))
        }
    }
    button.innerHTML = `Distans: ${shortestDistance} m`
    showTravel(shortestTravel)
}

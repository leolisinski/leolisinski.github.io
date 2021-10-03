var game_canvas = document.getElementById('game_canvas')
var background_canvas = document.getElementById('background_canvas')
var context = game_canvas.getContext("2d")
var background = background_canvas.getContext("2d")
const timeHTML = document.getElementById('time_section')
const pointsHTML = document.getElementById('points_span')
const instructionHTML = document.getElementById('main_instruction')
document.addEventListener('keydown', event => keyListener(event))
document.addEventListener('click', clickEvent => main(clickEvent))

var x = 320
var y = 240
var counter = 0
var points = 0
var stepX = 0
var stepY = 0
var time = 30
var radius = 10
const colors = [
    'lightcoral',
    'lightgreen',
    'lightpink',
    'lightsalmon',
    'lightseagreen',
    'darkblue',
    'darkcyan',
    'darkgoldenrod',
    'darkgreen',
    'darkkhaki',
    'darkolivegreen',
    'darkorange',
    'darkorchid'
]

var obstacles = []

function smallestFromList(array) {
    smallest = 1000
    for (let i = 0; i < array.length; i++) {
        if (array[i] > -10 && array[i] < smallest) {smallest = array[i]}
    }
    console.log(smallest)
    return smallest
}

function sameCoordinates(coordinate1, coordinate2) {
    return (coordinate1[0] == coordinate2[0] && coordinate1[1] == coordinate2[1])
}

function drawDistanceToObstacle(type, pl_x, pl_y, index_of_obstacle) {
    // context.lineWidth = 0.2
    // context.strokeStyle = 'grey'
    switch(type) {
        case "c":
            // context.beginPath()
            // context.moveTo(pl_x, pl_y)
            var obst_x = obstacles[index_of_obstacle][1]
            var obst_y = obstacles[index_of_obstacle][2]
            var obst_r = obstacles[index_of_obstacle][3]
            // context.lineTo(obst_x, obst_y)
            // context.stroke()
            var distance = Math.sqrt(((obst_x - pl_x)**2) + ((obst_y - pl_y)**2)) - obst_r - radius 
            return distance 
        case "r":
            var obst_left_border = obstacles[index_of_obstacle][1]
            var obst_right_border = obstacles[index_of_obstacle][1] + obstacles[index_of_obstacle][3] 
            var obst_top_border = obstacles[index_of_obstacle][2]
            var obst_bottom_border = obstacles[index_of_obstacle][2] + obstacles[index_of_obstacle][4]
            
            // context.moveTo(pl_x, pl_y)
            // Rakt till vänster
            if (pl_x <= obst_left_border && pl_y >= obst_top_border && pl_y <= obst_bottom_border) {
                // context.lineTo(obst_left_border, pl_y)
                // context.stroke()
                return obst_left_border - pl_x
                
            }
            // Rakt ovanför
            else if (pl_x >= obst_left_border && pl_x <= obst_right_border && pl_y <= obst_top_border) {
                // context.lineTo(pl_x, obst_top_border)
                // context.stroke()
                return obst_top_border - pl_y
            }
            // Rakt till höger
            else if (pl_x >= obst_right_border && pl_y >= obst_top_border && pl_y <= obst_bottom_border) {
                // context.lineTo(obst_right_border, pl_y)
                // context.stroke()
                return pl_x - obst_right_border
                
            }
            // Rakt nedanför
            else if (pl_x >= obst_left_border && pl_x <= obst_right_border && pl_y >= obst_bottom_border) {
                // context.lineTo(pl_x, obst_bottom_border)
                // context.stroke()
                return pl_y - obst_bottom_border
                
            }
            // Snett nere till vänster
            else if (pl_x <= obst_left_border && pl_y >= obst_bottom_border) {
                // context.lineTo(obst_left_border, obst_bottom_border)
                // context.stroke()
                return Math.sqrt((obst_left_border - pl_x)**2 + (obst_bottom_border - pl_y)**2)
                
            }
            // Snett uppe till vänster
            else if (pl_x <= obst_left_border && pl_y <= obst_top_border) {
                // context.lineTo(obst_left_border, obst_top_border)
                // context.stroke()
                return Math.sqrt((obst_left_border - pl_x)**2 + (obst_top_border - pl_y)**2)
                
            }
            // Snett upp till höger
            else if (pl_x >= obst_right_border && pl_y <= obst_top_border) {
                // context.lineTo(obst_right_border, obst_top_border)
                // context.stroke()
                return Math.sqrt((obst_right_border - pl_x)**2 + (obst_top_border - pl_y)**2)
                
            }
            // Snett nere till höger
            else if (pl_x >= obst_right_border && pl_y >= obst_bottom_border) {
                // context.lineTo(obst_right_border, obst_bottom_border)
                // context.stroke()
                return Math.sqrt((obst_right_border - pl_x)**2 + (obst_bottom_border - pl_y)**2)
                
            }
            
            // Inne i figuren (gått för långt)
            if (pl_x >= obst_left_border && pl_x <= obst_right_border && pl_y >= obst_top_border && pl_y <= obst_bottom_border) {
                return -1
            }

    }
}

function createForbiddenArea(shape, arg1, arg2, arg3, arg4) {
    switch(shape) {
        case "rect":
            background.beginPath()
            background.rect(arg1, arg2, arg3, arg4)
            background.fillStyle = colors[Math.floor(Math.random() * colors.length)]
            background.fill()
            obstacles.push(["r", arg1, arg2, arg3, arg4])
            break
        case "circ":
            background.beginPath()
            background.arc(arg1, arg2, arg3, 0, 2*Math.PI)
            background.fillStyle = colors[Math.floor(Math.random() * colors.length)]
            background.fill()
            obstacles.push(["c", arg1, arg2, arg3])
            break
    }
}

createForbiddenArea("rect", Math.floor(Math.random() * 310), Math.floor(Math.random() * 240), 40 + Math.floor(Math.random() * 310), 40 + Math.floor(Math.random() * 240))

createForbiddenArea("rect", Math.floor(Math.random() * 310), Math.floor(Math.random() * 240), 40 + Math.floor(Math.random() * 310), 40 + Math.floor(Math.random() * 240))

createForbiddenArea("rect", Math.floor(Math.random() * 310), Math.floor(Math.random() * 240), 40 + Math.floor(Math.random() * 310), 40 + Math.floor(Math.random() * 240))

createForbiddenArea("rect", Math.floor(Math.random() * 310), Math.floor(Math.random() * 240), 40 + Math.floor(Math.random() * 310), 40 + Math.floor(Math.random() * 240))

createForbiddenArea("circ", Math.floor(Math.random() * 560), Math.floor(Math.random() * 400), 20 + Math.floor(Math.random() * 40))

createForbiddenArea("circ", Math.floor(Math.random() * 560), Math.floor(Math.random() * 400), 20 + Math.floor(Math.random() * 40))

createForbiddenArea("circ", Math.floor(Math.random() * 560), Math.floor(Math.random() * 400), 20 + Math.floor(Math.random() * 40))

createForbiddenArea("circ", Math.floor(Math.random() * 560), Math.floor(Math.random() * 400), 20 + Math.floor(Math.random() * 40))

function keyListener(event) {
    switch(event.key) {
        case "ArrowUp":
            stepY -= 1
            break
        case "ArrowDown":
            stepY += 1
            break
        case "ArrowLeft":
            stepX -= 1
            break
        case "ArrowRight":
            stepX += 1
            break
        case "Enter":
            main()
            break
        default:
            break
    }
}

function incrementX(oldValue, stepX) {
    return oldValue + stepX
}

function incrementY(oldValue, stepY) {
    return oldValue + stepY
}

function main(clickEvent) {
    instructionHTML.innerHTML = 'RACE!'
    instructionHTML.style.color = 'lightgreen'
    var x = clickEvent.clientX - background_canvas.getBoundingClientRect().x
    var y = clickEvent.clientY - background_canvas.getBoundingClientRect().y

    const gameInterval = setInterval(() => {
    
    context.clearRect(0, 0, 640, 480)

    x_new = incrementX(x, stepX)
    y_new = incrementY(y, stepY)

    x = x_new
    y = y_new

    context.beginPath()
    context.arc(x, y , radius, 0, 2 * Math.PI)
    context.fillStyle = `black` 
    context.fill()

    if (
        drawDistanceToObstacle("r", x, y, 0) < 0 
        ||
        drawDistanceToObstacle("r", x, y, 1) < 0
        ||
        drawDistanceToObstacle("r", x, y, 2) < 0 
        ||
        drawDistanceToObstacle("r", x, y, 3) < 0
        ||
        drawDistanceToObstacle("c", x, y, 4) < 0
        ||
        drawDistanceToObstacle("c", x, y, 5) < 0
        ||
        drawDistanceToObstacle("c", x, y, 6) < 0
        ||
        drawDistanceToObstacle("c", x, y, 7) < 0
        ||
        y < 0
        ||
        480 - y < 0
        || 
        x < 0
        ||
        640 - x < 0
    ) {
        clearInterval(gameInterval)
        timeHTML.innerHTML = "Collision, Game Over"
        instructionHTML.innerHTML = 'Refresh: play again'
        instructionHTML.style.color = 'black'
    }
    
    counter += 1
    if (counter % 10 == 0) {
        time -= 1
        timeHTML.innerHTML = `TIME: ${time}`
    }
    console.log(Math.abs(stepX) + Math.abs(stepY))
    points += (Math.abs(stepX) + Math.abs(stepY))
    pointsHTML.innerHTML = points

    if (time <= 0) {
        clearInterval(gameInterval)
        timeHTML.innerHTML = "Time is up, Game over"
        instructionHTML.innerHTML = 'Refresh to start over'
        instructionHTML.style.color = 'black'
    }

},100)}


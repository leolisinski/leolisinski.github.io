var xNumber_html = document.getElementById('x_number')
var yNumber_html = document.getElementById('y_number')
var repetitions_html = document.getElementById('repetitions')
var trueRepetitions_html = document.getElementById('true_repetitions')
var ratio_html = document.getElementById('ratio')
var canvas = document.getElementById('canvas')
var context = canvas.getContext("2d")
var canvas_points = document.getElementById('canvas_points')
var context_points = canvas_points.getContext("2d")

var xNumber = 0
var yNumber = 0
var repetitions = 0
var trueRepetitions = 0
var ratio = 0


context.strokeStyle = "grey"
context.font = "12px Courier";
context_points.fillStyle = "red"

context.moveTo(0, 250)
context.lineTo(5,250)
context.stroke()
context.fillText("0.5", 15, 253)

context.moveTo(0, 200)
context.lineTo(10,200)
context.stroke()
context.fillText("1.0", 15, 203)

context.moveTo(0, 150)
context.lineTo(5,150)
context.stroke()
context.fillText("1.5", 15, 153)

context.moveTo(0, 100)
context.lineTo(10,100)
context.stroke()
context.fillText("2.0", 15, 103)

context.moveTo(0, 50)
context.lineTo(5,50)
context.stroke()
context.fillText("2.5", 15, 53)

context.moveTo(50, 300)
context.lineTo(50, 295)
context.stroke()
context.fillText("0.5", 40, 285)

context.moveTo(100, 300)
context.lineTo(100, 290)
context.stroke()
context.fillText("1.0", 90, 285)

context.moveTo(150, 300)
context.lineTo(150, 295)
context.stroke()
context.fillText("1.5", 140, 285)

context.moveTo(200, 300)
context.lineTo(200, 290)
context.stroke()
context.fillText("2.0", 190, 285)

context.moveTo(250, 300)
context.lineTo(250, 295)
context.stroke()
context.fillText("2.5", 240, 285)

context.moveTo(300, 300)
context.lineTo(300, 290)
context.stroke()
context.fillText("3.0", 290, 285)

context.moveTo(350, 300)
context.lineTo(350, 295)
context.stroke()
context.fillText("3.5", 340, 285)

context.moveTo(400, 300)
context.lineTo(400, 290)
context.stroke()
context.fillText("4.0", 390, 285)

context.moveTo(450, 300)
context.lineTo(450, 295)
context.stroke()
context.fillText("4.5", 440, 285)

context.moveTo(500, 300)
context.lineTo(500, 290)
context.stroke()
context.fillText("5.0", 490, 285)

context.moveTo(550, 300)
context.lineTo(550, 295)
context.stroke()
context.fillText("5.5", 540, 285)

context.moveTo(600, 300)
context.lineTo(600, 290)
context.stroke()
context.fillText("6.0", 590, 285)

context.moveTo(650, 300)
context.lineTo(650, 295)
context.stroke()
context.fillText("6.5", 640, 285)

context.moveTo(700, 300)
context.lineTo(700, 290)
context.stroke()
context.fillText("7.0", 690, 285)

context.moveTo(750, 300)
context.lineTo(750, 295)
context.stroke()
context.fillText("7.5", 740, 285)

for (let i = 0; i <= 10000; i++) {
    var x = (0 + (i/10000)*8)
    var y = Math.sqrt(x)
    var x_coord = x * 100
    var y_coord = 300 - (y * 100)
    context.beginPath()
    context.arc(x_coord, y_coord, 0.1, 0, 2 * Math.PI)
    context.fill()
}

function start() {
    document.getElementById('instructions').style.visibility = 'hidden'
    var interval = setInterval(() => {
    xNumber = Math.random() * 8
    yNumber = Math.random() * 3
    repetitions = repetitions + 1
    if (yNumber < Math.sqrt(xNumber)) {
        trueRepetitions = trueRepetitions + 1
        context_points.fillStyle = "green"
    }
    else {
        context_points.fillStyle = "red"
    }
    ratio = trueRepetitions / repetitions
    xNumber_html.innerHTML = xNumber
    yNumber_html.innerHTML = yNumber
    repetitions_html.innerHTML = repetitions
    trueRepetitions_html.innerHTML = trueRepetitions
    ratio_html.innerHTML = ratio
    var x_coord = xNumber * 100
    var y_coord = 300 - (yNumber * 100)
    context_points.beginPath()
    context_points.arc(x_coord, y_coord, 1, 0, 2 * Math.PI)
    context_points.fill()
    
    if (repetitions >= 10000) {clearInterval(interval)}
    },1)
}

document.addEventListener('keypress', (event) => {
    if(event.code == 'Enter') {
        start()
    }
})
var population = 0
var gift = 0
var heights = []
var persons
var daysHtml = document.getElementById('nr_of_days')
var days = 0

document.addEventListener('keydown', (event) => {
    if(event.code == 'Enter') {
        start()
    }
})

function sortHeights(heights_array) {
    var counter = 0
    while(counter < heights_array.length) {
        var i = 0
        while (i < (heights_array.length - 1 - counter)) {
            if (heights_array[i][0] > heights_array[i + 1][0]) {
                var temp = heights_array[i]
                heights_array[i] = heights_array[i + 1]
                heights_array[i + 1] = temp
            }
            i = i + 1
        }
        counter = counter + 1
    }
    return heights_array
}

function updateHeights() {
    heights = sortHeights(heights)
    for (let i = 0; i < heights.length; i++) {
        if (heights[i][0] >= 0) {
            persons[i].style.height = `${heights[i][0]}px`
        }
        else {
            persons[i].style.height = '0px'
        }
        persons[i].style.background = heights[i][1]
    }
}

function giveToRandom(giverIndex) {
    var possibleIndexes = []
    for (let i = 0; i < heights.length; i++) {
        if (i != giverIndex) {possibleIndexes.push(i)}
    }
    var indexForPickedIndex = Math.floor(Math.random() * possibleIndexes.length)
    var pickedIndex = possibleIndexes[indexForPickedIndex]
    heights[pickedIndex][0] = heights[pickedIndex][0] + gift
    heights[giverIndex][0] = heights[giverIndex][0] - gift
}


function start() {
    pop = eval(document.getElementById('html_pop').value)
    gift = eval(document.getElementById('html_gift').value)
    document.getElementById('html_pop').style.display = 'none'
    document.getElementById('html_gift').style.display = 'none'

    for(let i = 0; i < pop; i++) {
        var element = document.createElement(`div`)
        element.classList.add('person')
        document.getElementById('main_page').appendChild(element)
        var rand_R = Math.floor(Math.random() * 256)
        var rand_G = Math.floor(Math.random() * 256)
        var rand_B = Math.floor(Math.random() * 256)
        var color = `rgb(${rand_R},${rand_G},${rand_B})`
        heights.push([100, color])
        element.style.background = color
    }
    persons = document.getElementsByClassName('person')

    setInterval(() => {
    for(let i = 0; i < heights.length; i++) {
        if ((heights[i][0] - gift) >= 0) {giveToRandom(i)}
    }
    updateHeights()
    days = days + 1
    daysHtml.innerHTML = days
    },100)
}


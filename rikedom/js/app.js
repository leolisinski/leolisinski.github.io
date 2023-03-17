var population = 0
var gift = 0
var heights = []
var persons

document.addEventListener('keydown', (event) => {
    if(event.code == 'Enter') {
        start()
    }
})

function updateHeights() {
    heights.sort(function (a, b) {  return a - b;  });
    for (let i = 0; i < heights.length; i++) {
        if (heights[i] >= 0) {
            persons[i].style.height = `${heights[i]}px`
        }
        else {
            persons[i].style.height = '0px'
        }
    }
}

function giveToRandom(giverIndex) {
    var possibleIndexes = []
    for (let i = 0; i < heights.length; i++) {
        if (i != giverIndex) {possibleIndexes.push(i)}
    }
    var indexForPickedIndex = Math.floor(Math.random() * possibleIndexes.length)
    var pickedIndex = possibleIndexes[indexForPickedIndex]
    heights[pickedIndex] = heights[pickedIndex] + gift
    heights[giverIndex] = heights[giverIndex] - gift
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
        heights.push(100)
    }
    persons = document.getElementsByClassName('person')

    setInterval(() => {
    for(let i = 0; i < heights.length; i++) {
        if ((heights[i] - gift) >= 0) {giveToRandom(i)}
    }
    updateHeights()
    },10)
}


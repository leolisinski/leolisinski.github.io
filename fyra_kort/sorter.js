kortlek = new Deck()
var p1 = []; var p2 = []; var p3 = []; var p4 = []; var p5 = []
var clickedCards = []
var stopListen = false
var listen = false
var heartCounter = 0
var oneHeartCounter = 0
var counter = 0
kortlek.clear_deck()
kortlek.generate_deck()
kortlek.shuffle()

function updatePileImages() {
    for (let k = 1; k <= 4; k++) {
        if (p(k)[0].frontside) {p(k)[0].imgSrc = p(k)[0].f_imgSrc}
        else {p(k)[0].imgSrc = p(k)[0].b_imgSrc}
        document.getElementById(`p${k}`).src = `${p(k)[0].imgSrc}`
    }
}

function p(pileNr) {
    return eval(`p${pileNr}`)
}


function dealCards() {
    kortlek.clear_deck()
    kortlek.generate_deck()
    kortlek.shuffle()
for (let k = 1; k<=4; k++) {
    kortlek.deck[0].frontside = true
    p(k).unshift(kortlek.deal())
    }
    updatePileImages()
    var heart = false
    var heartCounterLocal = 0
    for (let i = 1; i <= 4; i++) {
        if (p(i)[0].suit == "hjärter") {heart = true; heartCounterLocal++}
    }
    if (heart) {
        heartCounter++
        document.getElementById('nrOfHearts').innerHTML = heartCounter
    }
    if (heartCounterLocal == 1) {
        oneHeartCounter++
        document.getElementById('nrOfOneHeart').innerHTML = oneHeartCounter
    }
        counter++
        document.getElementById('nrOfTimes').innerHTML = counter
    if (counter > 0) {
        document.getElementById('relFreq').innerHTML = `${(heartCounter/counter).toFixed(5)}`
    }
    if (counter > 0) {
        document.getElementById('relFreqOneHeart').innerHTML = `${(oneHeartCounter/counter).toFixed(5)}`
    }
    heartCounterLocal = 0
}

function dealNrOfTimes(number) {
    var i = 1
    while (i <= number) {
        dealCards()
        i++
    }
}

document.getElementById('knapp').addEventListener('click', () => dealCards())

document.addEventListener('keydown', event => {
    if (event.keyCode === 13) {
        number = eval(document.getElementById('text').value)
        dealNrOfTimes(number)
        document.getElementById('text').value = ""
    }})
kortlek = new Deck()
var p1 = []; var p2 = []; var p3 = []; var p4 = []; var p5 = []
var clickedCards = []
var stopListen = false
var listen = false
var heartCounter = 0
var oneHeartCounter = 0
var counter = 0
var pairCounter = 0
var twoPairCounter = 0
kortlek.clear_deck()
kortlek.generate_deck()
kortlek.shuffle()

function updatePileImages() {
    for (let k = 1; k <= 5; k++) {
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
for (let k = 1; k<=5; k++) {
    kortlek.deck[0].frontside = true
    p(k).unshift(kortlek.deal())
    }
    updatePileImages()
    counter++
    document.getElementById('nrOfTimes').innerHTML = counter
    heartChecker()
    pairChecker()
}

function heartChecker() {
    var heart = false
    var heartCounterLocal = 0
    for (let i = 1; i <= 5; i++) {
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
    if (counter > 0) {
        document.getElementById('relFreq').innerHTML = `${(heartCounter/counter).toFixed(7)}`
    }
    if (counter > 0) {
        document.getElementById('relFreqOneHeart').innerHTML = `${(oneHeartCounter/counter).toFixed(7)}`
    }
    heartCounterLocal = 0
}

function pairChecker() {
    var twoPair = false
    var pair = false
    var nrOfPairs = 0
    var tempCounter = 0
    for (let i = 1; i <= 5; i++) {
        tempCounter = 0
        for (let j = 1; j <= 5; j++) {
            if (p(i)[0].value == p(j)[0].value) {
                tempCounter += 1}
        }
        if (tempCounter == 2) {
            nrOfPairs ++
            pair = true
            if (nrOfPairs == 4) {pair = false; twoPair = true}}
        if (tempCounter > 2) {pair = false}
    }
    if (pair) {
        pairCounter += 1
        document.getElementById('nrOfPair').innerHTML = `${pairCounter}`
        document.getElementById('relFreqPair').innerHTML = `${(pairCounter/counter).toFixed(7)}`
        }
    if (twoPair) {
        twoPairCounter += 1
        document.getElementById('nrOfOneTwoPairs').innerHTML = `${twoPairCounter}`
        document.getElementById('relFreqTwoPairs').innerHTML = `${(twoPairCounter/counter).toFixed(7)}`
        }
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
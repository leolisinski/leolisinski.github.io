kortlek = new Deck()
var p1 = []; var p2 = []; var p3 = []; var p4 = []; var p5 = []
var clickedCards = []
var stopListen = false
var listen = false

kortlek.clear_deck()
kortlek.generate_deck()
kortlek.shuffle()

function switchCards() {
    var temp = p(clickedCards[1])[0]
    p(clickedCards[1])[0] = p(clickedCards[0])[0]
    p(clickedCards[0])[0] = temp
    document.getElementById(`p${clickedCards[0]}`).classList.remove('selected')
    document.getElementById(`p${clickedCards[1]}`).classList.remove('selected')
    updatePileImages()

    setTimeout(function(){
        p(clickedCards[0])[0].frontside = false
        p(clickedCards[1])[0].frontside = false
        clickedCards = []
        updatePileImages()
    }, 2000)
    listen = false
    stopListen = false
}

function p(pileNr) {
    return eval(`p${pileNr}`)
}

function updatePileImages() {
    for (let k = 1; k <= 5; k++) {
        if (p(k)[0].frontside) {p(k)[0].imgSrc = p(k)[0].f_imgSrc}
        else {p(k)[0].imgSrc = p(k)[0].b_imgSrc}
        document.getElementById(`p${k}`).src = `${p(k)[0].imgSrc}`
    }
}

function listenFunction(event) {
    if (event.keyCode === 74) {
        switchCards();
    }
    if (event.keyCode === 78) {

        document.getElementById(`p${clickedCards[0]}`).classList.remove('selected')
        document.getElementById(`p${clickedCards[1]}`).classList.remove('selected')
        updatePileImages()
        setTimeout(function(){
            p(clickedCards[0])[0].frontside = false
            p(clickedCards[1])[0].frontside = false
            clickedCards = []
            updatePileImages()
        }, 2000)
        listen = false
        stopListen = false
    
    }
    if (event.keyCode === 77) {
        switchCards();
    }
    if (event.keyCode === 65) {

        for (let k = 1; k <= 5; k++) {
            p(k)[0].frontside = true
        }
        updatePileImages()
        listen = false
        stopListen = false

        setTimeout(function(){
            for (let k = 1; k <= 5; k++) {
            p(k)[0].frontside = false
            document.getElementById(`p${k}`).classList.remove('selected')
            }
            clickedCards = []
            updatePileImages()
        }, 3000)
    return
    }
}

function question(clickedCards) {
    console.log("byta?")
    document.addEventListener('keydown', event => {if (listen) {listenFunction(event)}})
}

//Delar ut kort//
for (let k = 1; k<=5; k++) {
    kortlek.deck[0].frontside = false
    p(k).unshift(kortlek.deal())
    }
//

//Initierar rätt startbild
updatePileImages()
//

function clicker(k) {
        if (stopListen) {return}
        else if (p(k)[0].frontside == false) {p(k)[0].frontside = true; updatePileImages()}
        clickedCards.push(k)
        switch(clickedCards.length) {
            case 1:
                return
            case 2:
                stopListen = true
                document.getElementById(`p${clickedCards[0]}`).classList.add('selected')
                document.getElementById(`p${clickedCards[1]}`).classList.add('selected')
                listen = true
                question(clickedCards)
        }
    }

//Börjar lyssna efter klick//

document.getElementById('p1').addEventListener('click', () => clicker(1))
document.getElementById('p2').addEventListener('click', () => clicker(2))
document.getElementById('p3').addEventListener('click', () => clicker(3))
document.getElementById('p4').addEventListener('click', () => clicker(4))
document.getElementById('p5').addEventListener('click', () => clicker(5))

document.addEventListener('keydown', event => listenFunction(event))

//
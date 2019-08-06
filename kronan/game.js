"use strict";

var c1 = []; var c2 = []; var c3 = []; var c4 = []; var c5 = []; var c6 = []; var c7 = []; var c8 = []; var c9 = []; var c10 = []; var c11 = []; var c12 = []; var c13 = []; var c14 = [];

function c(pileNr) {
    return eval(`c${pileNr}`)
}

function clickListener() {
    var stopListen = false
    var clickedCards = []
    for (let k = 1; k <= 14; k++) {
        document.getElementById(`c${k}`).addEventListener('click', () => {
            if (stopListen) {return}
            else if (c(k)[0].frontside == false) {c(k)[0].frontside = true; updatePileImages()}
            clickedCards.push(k)
            document.getElementById(`c${k}`).classList.add('selected')
            switch(clickedCards.length) {
                case 1:
                    return
                case 2:
                    stopListen = true
                    document.getElementById(`c${clickedCards[0]}`).classList.remove('selected')
                    document.getElementById(`c${clickedCards[1]}`).classList.remove('selected')
                    moveCard(clickedCards)
            }
        })
    }
    if (stopListen) {return}
}

function moveCard(clickedCards) {
    var fromPileNr = clickedCards[0]
    var toPileNr = clickedCards[1]
    c(toPileNr).push(c(fromPileNr).shift())
    c(toPileNr)[0].frontside = true
    updatePileImages()
    clickListener()
}

function Reset() {
    var kortlek = new Deck()
    kortlek.clear_deck()
    kortlek.generate_deck()
    kortlek.shuffle()
    for (let k = 0; k<3; k++) {
            for (let m = 1; m<=13; m++) {
                kortlek.deck[0].frontside = false
                c(m).unshift(kortlek.deal())
            }
        }
    for (let k = 0; k<13; k++) {
        c14.unshift(kortlek.deal())
        }
        c14[0].frontside = true
    updatePileImages()
    clickListener()
}

function hideBackCards(pileNr) {
    if (c(pileNr).length == 0) {
        document.getElementById(`c${pileNr}`).style.visibility='hidden'
    }
    else {
    for (let k = c(pileNr).length+1; k <= 13; k++) {
        document.getElementById(`c${pileNr}_${k}`).style.visibility='hidden'
    }
    for (let k = 2; k <= c(pileNr).length; k++) {
        document.getElementById(`c${pileNr}_${k}`).style.visibility='visible'
    }
}
}

function updatePileImages() {
    for (let k = 1; k <= 14; k++) {
        hideBackCards(k)
        updateTopImage(k)
    }
}

function updateTopImage(pileNr) {
    if (c(pileNr).length != 0) {
    if (c(pileNr)[0].frontside) {c(pileNr)[0].imgSrc = c(pileNr)[0].f_imgSrc}
    else {c(pileNr)[0].imgSrc = c(pileNr)[0].b_imgSrc}
    document.getElementById(`c${pileNr}`).src = `${c(pileNr)[0].imgSrc}`
    document.getElementById(`c${pileNr}`).style.visibility = `visible`
    }
    else {document.getElementById(`c${pileNr}`).style.visibility = `hidden`}
}

Reset()

document.getElementById("button").addEventListener("click", () => {
    Reset()
})
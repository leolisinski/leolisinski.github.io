"use strict";

class Ljud {
    constructor() {
        this.bgMusic = new Audio('audio/346454__airwolf89__calm-game-music-1.mp3');
        this.cardSound = new Audio('audio/240776__f4ngy__card-flip.wav');
        this.completedSound = new Audio('audio/242501__gabrielaraujo__powerup-success.wav')
        this.victorySound = new Audio('audio/320653__rhodesmas__success-01.wav')
        this.bgMusic.volume = 0.5; 
        this.bgMusic.loop = true;
    }
    startMusic() {
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
    playCardSound() {
        this.cardSound.play();
    }
    playCompletedSound() {
        this.completedSound.play()
    }
    playVictorySound() {
        this.victorySound.play()
    }

}

const audiocontroller = new Ljud()

var kortlek = new Deck()
var c1 = []; var c2 = []; var c3 = []; var c4 = []; var c5 = []; var c6 = []; var c7 = []; var c8 = []; var c9 = []; var c10 = []; var c11 = []; var c12 = []; var c13 = []; var c14 = [];
var clickedCards = []
var audioOn = false
var stopListen = false
var numberOfMoves = null

function c(pileNr) {
    return eval(`c${pileNr}`)
}

function checkIfCompletedPile(pileNr) {
    var CompletedPile = true
    for (let k = 0; k < c(pileNr).length; k++) {
        if (c(pileNr)[k].frontside == false || c(pileNr)[k].value != pileNr || c(pileNr).length != 4) {CompletedPile = false}
    }
    return CompletedPile
}

function clicker(k) {
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
                if (audioOn) {audiocontroller.playCardSound()}
                moveCard(clickedCards)
        }
    
}

function markCompletedPiles (clickedCards) {
    for (let k = 0; k < 2; k++) {
        if (checkIfCompletedPile(clickedCards[k])) {
            audiocontroller.playCompletedSound()
            document.getElementById(`c${clickedCards[k]}`).classList.add('completed')
        }
    }
}

function checkIfWon () {
    var allCompleted = true
    for (let k = 1; k <= 14; k++) {
        if (checkIfCompletedPile(k) == false) {allCompleted = false}
    }
    if (allCompleted) {
        for (let k = 1; k <= 14; k++) {
            document.getElementById(`c${k}`).classList.add('selected')
        }
        audiocontroller.playVictorySound()
        document.getElementById('moveNumbers').innerHTML=`Antal drag: ${numberOfMoves}`
        document.getElementById('victory').style.visibility='visible'
    }
}

function moveCard(clickedCards) {
    var fromPileNr = clickedCards[0]
    var toPileNr = clickedCards[1]
    c(toPileNr).push(c(fromPileNr).shift())
    c(toPileNr)[0].frontside = true
    updatePileImages()
    markCompletedPiles(clickedCards)
    numberOfMoves++
    checkIfWon()
    window.clickedCards = []
    stopListen = false
}


function Reset() {
    window.numberOfMoves = null
    window.c1 = []; window.c2 = []; window.c3 = []; window.c4 = []; window.c5 = []; window.c6 = []; window.c7 = []; window.c8 = []; window.c9 = []; window.c10 = []; window.c11 = []; window.c12 = []; window.c13 = []; window.c14 = [];
    window.clickedCards = []
    window.stopListen = false
    document.getElementById('victory').style.visibility='hidden'
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
    for (let k = 1; k <= 14; k++) {
        document.getElementById(`c${k}`).classList.remove('selected', 'completed')
        }
    updatePileImages()
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

document.getElementById("button_restart").addEventListener("click", () => {
    Reset()
})

document.getElementById("button_music").addEventListener("click", () => {
    if (audioOn) {
        audiocontroller.stopMusic()
        document.getElementById('button_music').innerHTML='Ljud: av'
        document.getElementById('button_music').style.background='white'
        audioOn = false
    }
    else {
    audiocontroller.startMusic()
    document.getElementById('button_music').innerHTML='Ljud: på'
    document.getElementById('button_music').style.background='lightgreen'
    audioOn = true}
    
})

for (let k = 1; k <= 14; k++) {
    document.getElementById(`c${k}`).addEventListener('click', () => clicker(k))
}

Reset()
"use strict";

class Ljud {
    constructor() {
        this.bgMusic = new Audio('audio/346454__airwolf89__calm-game-music-1.mp3');
        this.cardSound = new Audio('audio/240776__f4ngy__card-flip.wav');
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
}

const audiocontroller = new Ljud()

var audioOn = false

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
                    if (audioOn) {audiocontroller.playCardSound()}
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
    window.c1 = []; window.c2 = []; window.c3 = []; window.c4 = []; window.c5 = []; window.c6 = []; window.c7 = []; window.c8 = []; window.c9 = []; window.c10 = []; window.c11 = []; window.c12 = []; window.c13 = []; window.c14 = [];
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
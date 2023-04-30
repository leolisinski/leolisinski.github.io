var text = "En tvättmaskin har en liggande eller stående trumma där man lägger in kläderna. Tvättmedel tillsätts i moderna maskiner i ett sidofack. Sedan roteras trumman fram och tillbaka och fylls med vatten som värms upp till den valda temperaturen."

var wordArray = text.split(" ")

var wordsAdjusted = []

var repeatButton = document.getElementById('button_repetera')
var spellButton = document.getElementById('button_stava')
repeatButton.style.visibility = 'hidden'
spellButton.style.visibility = 'hidden'

const klickaAudio = new Audio('audio/klicka.mp3')
const maskinerAudio = new Audio('audio/maskiner.mp3')
const sommarAudio = new Audio('audio/sommar.mp3')
const tvättmaskinTextAudio = new Audio('audio/tvättmaskinText.mp3')
const denAudio = new Audio('audio/den.mp3')
const därAudio = new Audio('audio/där.mp3')
const ellerAudio = new Audio('audio/eller.mp3')
const enAudio = new Audio('audio/en.mp3')
const ettAudio = new Audio('audio/ett.mp3')
const framAudio = new Audio('audio/fram.mp3')
const fyllsAudio = new Audio('audio/fylls.mp3')
const harAudio = new Audio('audio/har.mp3')
const iAudio = new Audio('audio/i.mp3')
const inAudio = new Audio('audio/in.mp3')
const klädernaAudio = new Audio('audio/kläderna.mp3')
const liggandeAudio = new Audio('audio/liggande.mp3')
const läggerAudio = new Audio('audio/lägger.mp3')
const manAudio = new Audio('audio/man.mp3')
const medAudio = new Audio('audio/med.mp3')
const ochAudio = new Audio('audio/och.mp3')
const roterasAudio = new Audio('audio/roteras.mp3')
const sedanAudio = new Audio('audio/sedan.mp3')
const sidofackAudio = new Audio('audio/sidofack.mp3')
const somAudio = new Audio('audio/som.mp3')
const ståendeAudio = new Audio('audio/stående.mp3')
const temperaturenAudio = new Audio('audio/temperaturen.mp3')
const tillAudio = new Audio('audio/till.mp3')
const tillbakaAudio = new Audio('audio/tillbaka.mp3')
const tillsättsAudio = new Audio('audio/tillsätts.mp3')
const trummaAudio = new Audio('audio/trumma.mp3')
const trummanAudio = new Audio('audio/trumman.mp3')
const tvättmaskinAudio = new Audio('audio/tvättmaskin.mp3')
const tvättmedelAudio = new Audio('audio/tvättmedel.mp3')
const uppAudio = new Audio('audio/upp.mp3')
const modernaAudio = new Audio('audio/moderna.mp3')
const valdaAudio = new Audio('audio/valda.mp3')
const vattenAudio = new Audio('audio/vatten.mp3')
const värmsAudio = new Audio('audio/värms.mp3')
const rättGissatAudio = new Audio('audio/rätt_gissat.mp3')
const detHärÄrOrdetAudio = new Audio('audio/det_här_är_ordet.mp3')




var textSection = document.getElementById('text')
var gameRunning = false
var secretWord = ""
var guessedWrongOnce = false

var i = -1
notFinished = false
function spellWord(word) {
    i += 1
    if (notFinished) {
        var letterAudio = new Audio(`audio/letters/${word[i].toLowerCase()}.mp3`) 
        letterAudio.play()
        letterAudio.onended = () => {
            if (i == word.length - 1) {
                notFinished = false
            }
            setTimeout(() => {
                spellWord(word)
            },400)
            
        }
    }
}


function adjustedWord(wordString) {
    var output = ""
    for (let i = 0; i < wordString.length; i++) {
        if (wordString[i] != " " && wordString[i] != "," && wordString[i] != "." && wordString[i] != "!" && wordString[i] != "?") {
            output += wordString[i]
        }
    }
    return output.toLowerCase()
}

function isLetter(char) {
    return (char != " " && char != "." && char != "!" && char != "?" && char != ",")
}

function getWord(wordElement) {
    output = ""
    for (i = 0; i < wordElement.children.length; i++) {
        if (isLetter(wordElement.children[i].innerHTML)) {
            output += wordElement.children[i].innerHTML.toLowerCase()
        }
    }
    return output
}

for(let i = 0; i < wordArray.length; i++) {
    if(!wordsAdjusted.includes(adjustedWord(wordArray[i])))
        {
            wordsAdjusted.push(adjustedWord(wordArray[i]))
        }
    var tempElement = document.createElement('span')
    tempElement.classList.add('word')
    textSection.insertAdjacentElement('beforeend', tempElement)
    for (let j = 0; j < wordArray[i].length; j++) {
            var tempInnerElement = document.createElement('span')
            tempInnerElement.classList.add('inner_character')
            var tempInnerContent = document.createTextNode(wordArray[i][j])
            tempInnerElement.appendChild(tempInnerContent)
            tempElement.insertAdjacentElement('beforeend', tempInnerElement)
        }
    
}

var words = document.getElementsByClassName('word')

for (let i = 0; i < words.length; i++) {
    words[i].addEventListener('click', (event) => {
       if (gameRunning) {
        notFinished = false
        tvättmaskinTextAudio.pause()
        tvättmaskinTextAudio.currentTime = 0
        if (getWord(words[i]) == secretWord) {
            repeatButton.style.visibility = 'hidden'
            spellButton.style.visibility = 'hidden'
            rättGissatAudio.play()
            rättGissatAudio.onended = () => {
                if (!document.getElementById('checkbox').checked) {
                    gameRunning = false
                }
                else {
                    setTimeout(() => {
                        playGame()
                    },1000)
                }
            }
        }
        else {
            if (!guessedWrongOnce) {
                guessedWrongOnce = true
                detHärÄrOrdetAudio.play()
                detHärÄrOrdetAudio.onended = () => {
                eval(`${getWord(words[i])}Audio`).play()
            }
            }
            else {
                eval(`${getWord(words[i])}Audio`).play()
            }
            
        }
       }
    })
    words[i].addEventListener('mouseover', () => {
        for (let j = 0; j < words[i].children.length; j++) {
            if (isLetter(words[i].children[j].innerHTML)) {
                words[i].children[j].style.color = 'lightgreen'
            }
        }
    })
    words[i].addEventListener('mouseleave', () => {
        for (let j = 0; j < words[i].children.length; j++) {
            words[i].children[j].style.color = 'black'
        }
        
    })
    words[i].addEventListener("mouseup", () => {
        for (let j = 0; j < words[i].children.length; j++) {
            words[i].children[j].style.color = 'black'
        }
        
    })
}

function playGame() {
    guessedWrongOnce = false
    var wordIndex = Math.floor(Math.random() * wordsAdjusted.length)
    secretWord = wordsAdjusted[wordIndex]
    tvättmaskinTextAudio.pause()
    tvättmaskinTextAudio.currentTime = 0
    klickaAudio.play()
    klickaAudio.onended = () => {
        eval(`${secretWord}Audio`).play()
    }
    eval(`${secretWord}Audio`).onended = () => {
        repeatButton.style.visibility = 'visible' 
        spellButton.style.visibility = 'visible'    
    }
    gameRunning = true
}

document.getElementById('button_ord').addEventListener('click', () => 
{
    playGame()
})

document.getElementById('button_read_text').addEventListener('click', () => 
{
    notFinished = false
    tvättmaskinTextAudio.play()
})

repeatButton.addEventListener('click', () => {
    if (gameRunning) {
        notFinished = false
        tvättmaskinTextAudio.pause()
        tvättmaskinTextAudio.currentTime = 0
        eval(`${secretWord}Audio`).play()
    }
})

spellButton.addEventListener('click', () => {
    if (gameRunning && !notFinished) {
        notFinished = true
        tvättmaskinTextAudio.pause()
        tvättmaskinTextAudio.currentTime = 0
        i = -1
        spellWord(secretWord)
    }
})

const audio = new AudioController

const images_array = [
    `
    &nbsp;&nbsp;&nbsp;|-----<br>
    &nbsp;&nbsp;&nbsp;|<br>                                                      
    &nbsp;&nbsp;&nbsp;|<br>    
    &nbsp;&nbsp;&nbsp;|<br>    
    &nbsp;&nbsp;&nbsp;|<br>    
    &nbsp;&nbsp;&nbsp;|<br>
    &nbsp;&nbsp;/-\\<br>
    ==========================================================================
    `,
    `
    &nbsp;&nbsp;&nbsp;|-----<br>
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|<br>                                                      
    &nbsp;&nbsp;&nbsp;|<br>    
    &nbsp;&nbsp;&nbsp;|<br>    
    &nbsp;&nbsp;&nbsp;|<br>    
    &nbsp;&nbsp;&nbsp;|<br>
    &nbsp;&nbsp;/-\\<br>
    ==========================================================================
    `,
    `
    &nbsp;&nbsp;&nbsp;|-----<br>
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|<br>                                                      
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;O<br>    
    &nbsp;&nbsp;&nbsp;|<br>    
    &nbsp;&nbsp;&nbsp;|<br>    
    &nbsp;&nbsp;&nbsp;|<br>
    &nbsp;&nbsp;/-\\<br>
    ==========================================================================
    `,
    `
    &nbsp;&nbsp;&nbsp;|-----<br>
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|<br>                                                      
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;O<br>    
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|<br>    
    &nbsp;&nbsp;&nbsp;|<br>    
    &nbsp;&nbsp;&nbsp;|<br>
    &nbsp;&nbsp;/-\\<br>
    ==========================================================================
    `,
    `
    &nbsp;&nbsp;&nbsp;|-----<br>
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|<br>                                                      
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;O<br>    
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;/|<br>    
    &nbsp;&nbsp;&nbsp;|<br>    
    &nbsp;&nbsp;&nbsp;|<br>
    &nbsp;&nbsp;/-\\<br>
    ==========================================================================
    `,
    `
    &nbsp;&nbsp;&nbsp;|-----<br>
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|<br>                                                      
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;O<br>    
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;/|\\<br>    
    &nbsp;&nbsp;&nbsp;|<br>    
    &nbsp;&nbsp;&nbsp;|<br>
    &nbsp;&nbsp;/-\\<br>
    ==========================================================================
    `,
    `
    &nbsp;&nbsp;&nbsp;|-----<br>
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|<br>                                                      
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;O<br>    
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;/|\\<br>    
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;/<br>    
    &nbsp;&nbsp;&nbsp;|<br>
    &nbsp;&nbsp;/-\\<br>
    ==========================================================================
    `,
    `
    &nbsp;&nbsp;&nbsp;|-----<br>
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|<br>                                                      
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;O<br>    
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;/|\\<br>    
    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;/ \\<br>    
    &nbsp;&nbsp;&nbsp;|<br>
    &nbsp;&nbsp;/-\\<br>
    ==========================================================================
    `
]

const sentences = [
    "SOLEN SKINER PÅ MIN DATORSKÄRM",
    "GOOGLE MEET VS DISCORD",
    "SNABBNUDLAR TILL LUNCH",
    "KAFFEKOKAREN GÅR VARM MELLAN LEKTIONERNA",
    "EN VARM HÄLSNING MED ARMBÅGEN",
    "DET EKAR TOMT PÅ JOHANNEBERG",
    "TILL HÖSTEN SYNS VI PÅ SKOLAN IGEN",
    "TORSDAGSFOTBOLLEN ÖVERLEVER ALLT",
]

const local_high_score_html = document.getElementById('your_high_score') 
const guess = document.getElementById('guess')
const points = document.getElementById('points')
const respons = document.getElementById('respons')
const word_process = document.getElementById('word_process')
const graphics = document.getElementById('graphics')
const guessed_characters_html = document.getElementById('guessed_characters')
const listener = document.addEventListener('keydown', event => {
    addChar(event)
})
const audio_listener = document.getElementById('music_logo').addEventListener('click', () => musicSwitch())

const mouse_enter_listener = local_high_score_html.addEventListener('mouseenter', () => {
    local_high_score_html.innerHTML = 'NOLLSTÄLL?'
})

const mouse_leave_listener = local_high_score_html.addEventListener('mouseleave', () => {
    if (notWaiting) {
    local_high_score_html.innerHTML = `${local_high_score}`
    }
})

const mouse_click_listener = local_high_score_html.addEventListener('click', () => {
    localStorage.clear()
    local_high_score = 0
    local_high_score_html.innerHTML = 'NOLLSTÄLLD!'
    notWaiting = false
    setTimeout(() => {
        local_high_score_html.innerHTML = `${local_high_score}`
        notWaiting = true
    },1500)
})

var guessed_characters
var gameSentences = randomizeArray(sentences)
var gameSentence
var notWaiting = true
var charPresent = false
var currentImageId
var current_points
var firstGame = true
var local_high_score = 0
var musicPlaying = false
var running
var blinker = setInterval(()=> {
    document.getElementById('input').classList.toggle('hidden')
}, 1000)


function addChar(event) {
    if ((event.which >= 65 && event.which <= 90) || (event.which >= 221 && event.which <= 222) || event.which == 192 || (event.which == 32 && charPresent != false)) {
        if (event.which == 32) {guess.innerHTML += '&nbsp;'}
        else {
        guess.innerHTML += `${event.key.toUpperCase()}`}
        if (charPresent == false) {charPresent = true;}
    }

    if (event.which == 8 && charPresent) {
    
        if (guess.innerHTML.slice(guess.innerHTML.length - 6, guess.innerHTML.length) == "&nbsp;") {guess.innerHTML = guess.innerHTML.slice(0,guess.innerHTML.length-6)}
        else {
        guess.innerHTML = guess.innerHTML.slice(0,-1); if (guess.innerHTML.length == 0) {charPresent = false}
        }
    }

    if (firstGame == false && event.which == 13 && charPresent && running) {
        playCharacter(convertGuessString(guess.innerHTML))}

    if (firstGame == false && event.which == 13 && running == false) {
        if (guess.innerHTML == "IGEN") {
        startGame(0)}
        else {
            guess.innerHTML = ''
        }
    }

    if (firstGame && event.which == 13) {
        if (guess.innerHTML == 'SPELA') {
            document.getElementById('firstGameInstructions').style.visibility = 'hidden'
            document.getElementById('description_wrapper').style.visibility = 'visible'
            firstGame = false
            if (musicPlaying == false) {musicSwitch()}
            startGame(0)
        }
        else {
            guess.innerHTML = ''
        }
        
    }
}

function contains(array,character) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == character) {return true}
    }
    return false
}

function convertGuessString(guessString) {
    let output = ""
    let i = 0
    while (i < guessString.length) {
        if (guessString.slice(i,i+5) == "&nbsp") {output += " "; i += 6}
        else {output += guessString[i]; i += 1}  
    }
    return output
}

function generateSecretSentence(sentence) {
    var output = ""
    for (let i = 0; i < sentence.length; i++) {
        if (sentence[i] != " ") {output += "*"}
        else {output += " "}
    }
    return output
}

function letterCounter(sentence) {
    var counter = 0
    for (let i = 0; i < sentence.length; i++) {
        if (sentence[i] != " ") {counter += 1}
    }
    return counter
}

function matchCharacter(playerGuess) {
    for (let i = 0; i < gameSentence.length; i++) {
        if (gameSentence[i] == playerGuess) {return true}
    }
    return false
}

function musicSwitch() {
    document.getElementById('music_logo').classList.toggle('faded')
    toggleMusic()
    if (musicPlaying) {audio.startMusic()}
    else {audio.stopMusic()}
}

function playCharacter(playerGuess) {

    if (contains(guessed_characters, playerGuess) == false) {

        if (playerGuess.length == 1) {
            if (guessed_characters.length == 0) {guessed_characters += `${playerGuess}`}
            else {guessed_characters += `, ${playerGuess}`}
            guessed_characters_html.innerHTML = guessed_characters;}

    guess.innerHTML = ''

    switch (playerGuess.length > 1) {
        case true:
            if (playerGuess == gameSentence && guessed_characters.length <= gameSentence.length / 2) {
                respons.innerHTML=`Grattis, rätt gissat på hela meningen! Bonuspoäng!<br>Nu kommer nästa mening.`
                word_process.innerHTML = `${playerGuess}`
                updatePointSection(1000)
                setTimeout(() => startGame(current_points), 2000)
            }
            else if (playerGuess == gameSentence) {
                respons.innerHTML=`Rätt gissat på hela meningen!<br>Nu kommer nästa mening.`
                word_process.innerHTML = `${playerGuess}`
                updatePointSection(200)
                setTimeout(() => startGame(current_points), 2000)
            }
            else if (playerGuess.length > 1) {
                if (currentImageId <= 4) {
                respons.innerHTML=`Fel gissat, och du gissade på mer än en bokstav.<br>Bilden går två steg framåt tyvärr...`
                currentImageId += 2
                graphics.innerHTML = images_array[currentImageId]
                audio.playWrong
            }
            else {
                respons.innerHTML = 'Fel gissat, du hittade tyvärr inte den hemliga meningen.<br>Skriv IGEN om du vill spela igen.'
                currentImageId += 1
                graphics.innerHTML = images_array[currentImageId]
                running = false
                if (current_points > local_high_score) {
                    local_high_score = current_points
                    localStorage.setItem("high_score", local_high_score)
                    local_high_score_html.innerHTML = local_high_score
                    document.getElementById('your_high_score_text').style.fontWeight = 'bold'
                    document.getElementById('your_high_score_text').style.color = 'red'
                    local_high_score_html.style.fontWeight = 'bold'
                    local_high_score_html.style.color = 'red'
                    setTimeout(() => {
                        local_high_score_html.style.fontWeight = 'normal'
                        local_high_score_html.style.color = 'black'
                        document.getElementById('your_high_score_text').style.fontWeight = 'normal'
                        document.getElementById('your_high_score_text').style.color = 'black'
                    }, 2000)
                    
                }
            }
            }
            else {
                if (currentImageId <= 5) {
                respons.innerHTML='Fel gissat.'
                currentImageId += 1
                graphics.innerHTML = images_array[currentImageId]
                audio.playWrong()
                }
                else {
                    respons.innerHTML = 'Fel gissat, du hittade tyvärr inte den hemliga meningen.<br>Skriv IGEN om du vill spela igen.'
                    currentImageId += 1
                    graphics.innerHTML = images_array[currentImageId]
                    running = false
                    if (current_points > local_high_score) {
                        local_high_score = current_points
                        localStorage.setItem("high_score", local_high_score)
                        local_high_score_html.innerHTML = local_high_score
                        document.getElementById('your_high_score_text').style.fontWeight = 'bold'
                        document.getElementById('your_high_score_text').style.color = 'red'
                        local_high_score_html.style.fontWeight = 'bold'
                        local_high_score_html.style.color = 'red'
                        setTimeout(() => {
                            local_high_score_html.style.fontWeight = 'normal'
                            local_high_score_html.style.color = 'black'
                            document.getElementById('your_high_score_text').style.fontWeight = 'normal'
                            document.getElementById('your_high_score_text').style.color = 'black'
                        }, 2000)
                        
                    }
                }
            }
        break
        case false:
            if (matchCharacter(playerGuess)) {
                updateWordProgress(playerGuess)
                if (word_process.innerHTML == gameSentence) {
                    respons.innerHTML = 'Rätt gissat på hela meningen!<br>Nu kommer nästa mening.'
                    updatePointSection(200)
                    setTimeout(() => startGame(current_points), 2000)
                }
                else {respons.innerHTML = `Rätt gissat, bokstaven ${playerGuess} finns med.` 
                audio.playCorrect()
                updatePointSection(100)
            }
            }
            else {
                if (currentImageId <= 5) {
                respons.innerHTML = `Fel gissat, bokstaven ${playerGuess} finns inte med.`
                currentImageId += 1
                graphics.innerHTML = images_array[currentImageId]
                audio.playWrong()
                if (current_points >= 50) {updatePointSection(-50)}
                }
                else {
                    respons.innerHTML = 'Fel gissat, du hittade tyvärr inte den hemliga meningen.<br>Skriv IGEN om du vill spela igen.'
                    currentImageId += 1
                    graphics.innerHTML = images_array[currentImageId]
                    running = false
                    if (current_points > local_high_score) {
                        local_high_score = current_points
                        localStorage.setItem("high_score", local_high_score)
                        local_high_score_html.innerHTML = local_high_score
                        document.getElementById('your_high_score_text').style.fontWeight = 'bold'
                        document.getElementById('your_high_score_text').style.color = 'red'
                        local_high_score_html.style.fontWeight = 'bold'
                        local_high_score_html.style.color = 'red'
                        setTimeout(() => {
                            local_high_score_html.style.fontWeight = 'normal'
                            local_high_score_html.style.color = 'black'
                            document.getElementById('your_high_score_text').style.fontWeight = 'normal'
                            document.getElementById('your_high_score_text').style.color = 'black'
                        }, 2000)
                        
                    }
                }
            }
        break 
    }
}
else {
guess.innerHTML = ''
respons.innerHTML = `Du har redan gissat på bokstaven ${playerGuess}.`
setTimeout(() => {respons.innerHTML = ''},2000)
}
}

function prepareLocalHighScore() {
    if (localStorage.getItem("high_score") == null) {
        localStorage.setItem("high_score", 0)
    }
    else {
        local_high_score = Number(localStorage.getItem("high_score"))
        local_high_score_html.innerHTML = `${local_high_score}`
    }
    }

function randomizeArray(array) {
    var notRandomizedArray = array.slice()
    var output = []
    while (notRandomizedArray.length > 0) {
        var i = Math.floor(Math.random() * notRandomizedArray.length)
        output.push(notRandomizedArray.splice(i,1)[0])
    }
    return output
}

function replaceAt(string,index,newChar) {
    output = ""
    for (let i = 0; i < string.length; i++) {
        if (i == index) {output += newChar}
        else {output += string[i]} 
    }
    return output
}

function toggleMusic() {
    if (musicPlaying) {musicPlaying = false}
    else {musicPlaying = true}
}

function updatePointSection(point) {
    current_points += point
    points.innerHTML = current_points
}

function updateWordProgress(playerGuess) {
    for (let i = 0; i < gameSentence.length; i++) {
        if (gameSentence[i] == playerGuess) {word_process.innerHTML = replaceAt(word_process.innerHTML, i, playerGuess)}
    }
}

function startGame(starting_points) {
    if (gameSentences.length == 0) {
        gameSentences = randomizeArray(sentences)
    }
    running = true
    guessed_characters = ""
    guessed_characters_html.innerHTML = guessed_characters
    currentImageId = 0
    current_points = starting_points
    graphics.innerHTML = images_array[currentImageId]
    points.innerHTML = current_points
    charPresent = false
    gameSentence = gameSentences.splice(0,1)[0]
    respons.innerHTML = ''
    guess.innerHTML = ''
    document.getElementById('sentence_length').innerHTML = `${letterCounter(gameSentence)}`
    word_process.innerHTML = `${generateSecretSentence(gameSentence)}`
}

prepareLocalHighScore()

currentImageId = 0
graphics.innerHTML = images_array[currentImageId]
const progressSection = document.getElementById('progress_section')
const word = document.getElementById('word')
const header = document.getElementById('header')

const wordsArray = [
    "MANFRED",
    "MAMMA",
    "PAPPA",
    "MORMOR",
    "MORFAR",
    "FARFAR",
    "FARMOR",
    "HUND",
    "KATT",
    "CYKEL",
    "ÄGG",
]

const letters = document.getElementsByClassName('letter')

function newGame() {
    header.innerHTML = "Ska vi skriva?"
    var notGuessedWords = wordsArray.slice()
    if (notGuessedWords.length > 0) {
        let randomIndex = Math.floor(Math.random() * notGuessedWords.length)
        pickedWord = notGuessedWords[randomIndex]
        notGuessedWords.splice(randomIndex, 1)
        correctCharacters = ""
        word.innerHTML = `${pickedWord}`
        progressSection.innerHTML = progressGenerator(correctCharacters, pickedWord)
        progressSection.style.visibility = 'visible'
    }
}

function progressGenerator(correctCharacters, pickedWord) {
    var i = 0
    var progressString = ""
    while (i < correctCharacters.length) {
        progressString += correctCharacters[i]
        i += 1
    }
    while (i < pickedWord.length) {
        progressString += "&#x25AE;"
        i += 1
    }
    return progressString
}

function playCharacter(character) {
    var i = correctCharacters.length
    if (character == pickedWord[i]) {
        correctCharacters += character
        progressSection.innerHTML = progressGenerator(correctCharacters, pickedWord)
        if (correctCharacters == pickedWord) {
            header.innerHTML = "BRA JOBBAT!"
            setTimeout(() => {newGame()}, 2000)
        }
    }
}

for (let i = 0; i < letters.length; i++) {
    letters[i].addEventListener('click', (press) => {
        press.stopPropagation();
        press.preventDefault();
        let character = press.path[0].innerHTML
        playCharacter(character)
    })
}

newGame()
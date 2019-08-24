for (let k = 1; k <= 20; k++) {
    document.getElementById(`ch${k}_f1`).innerHTML = `${(Math.floor(Math.random() * 10) + 1)}`
    document.getElementById(`ch${k}_f2`).innerHTML = `${(Math.floor(Math.random() * 10) + 1)}`
}

function checkAnswers() {
    var allCorrect = true
    for (let k = 1; k <= 20; k++) {
        var faktor1 = eval(document.getElementById(`ch${k}_f1`).innerHTML)
        var faktor2 = eval(document.getElementById(`ch${k}_f2`).innerHTML)
        var answer = eval(document.getElementById(`ans${k}`).value)
        if(faktor1 * faktor2 != answer) {allCorrect = false}
    }
    if (allCorrect) {document.getElementById('responseText').innerHTML='Alla rätt!'}
    else {document.getElementById('responseText').innerHTML='Minst ett fel...'}
}

const button = document.getElementById('checkButton')

button.addEventListener('click', () => checkAnswers())


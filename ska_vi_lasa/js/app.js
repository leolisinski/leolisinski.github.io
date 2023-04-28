var text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae vel voluptates nemo excepturi natus tempora, porro maxime in pariatur ratione odio officia cupiditate a dignissimos, architecto beatae dolore. Suscipit ab tempora quam velit labore veniam, omnis maiores dolores dignissimos molestias explicabo quod vel eum porro esse rerum quos fuga quae?"

var wordArray = text.split(" ")

var wordsAdjusted = []

const buttonsSection = document.getElementById('buttons')

var textSection = document.getElementById('text')

function adjustedWord(wordString) {
    var output = ""
    for (let i = 0; i < wordString.length; i++) {
        if (wordString[i] != " " && wordString[i] != "." && wordString[i] != "!" && wordString[i] != "?") {
            output += wordString[i]
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
        console.log(words[i].innerHTML)
    })
    words[i].addEventListener('mouseover', () => {
        words[i].style.color = 'lightgreen'
    })
    words[i].addEventListener('mouseleave', () => {
        words[i].style.color = 'black'
        
    })
}
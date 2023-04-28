var text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae vel voluptates nemo excepturi natus tempora, porro maxime in pariatur ratione odio officia cupiditate a dignissimos, architecto beatae dolore. Suscipit ab tempora quam velit labore veniam, omnis maiores dolores dignissimos molestias explicabo quod vel eum porro esse rerum quos fuga quae?"

var wordArray = text.split(" ")

const buttonsSection = document.getElementById('buttons')

var textSection = document.getElementById('text')

for(let i = 0; i < wordArray.length; i++) {
    var tempElement = document.createElement('span')
    tempElement.classList.add('word')
    var tempContent = document.createTextNode(wordArray[i])
    tempElement.appendChild(tempContent)
    textSection.insertAdjacentElement('beforeend', tempElement)
}

var words = document.getElementsByClassName('word')

for (let i = 0; i < words.length; i++) {
    words[i].addEventListener('click', (event) => {
        console.log(event.target.outerText)
    })
}
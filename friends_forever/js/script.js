const persons = document.getElementsByClassName('person')
const inputField = document.getElementById('input_box')
const tryButton = document.getElementById('try_button')
const tryUntilAllButton = document.getElementById('try_until_all_button')
const triesCounterHTML = document.getElementById('counterTries')
const allInSameCounterHTML = document.getElementById('counterAllInSame')
const relativeAllInSameHTML = document.getElementById('relativeAllInSame')
const threeInSameCounterHTML = document.getElementById('counterThreeInSame')
const relativeThreeInSameHTML = document.getElementById('relativeThreeInSame')
const twoInSameCounterHTML = document.getElementById('counterTwoInSame')
const relativeTwoInSameHTML = document.getElementById('relativeTwoInSame')

var allInSameCounter = 0
var threeInSameCounter = 0
var twoInSameCounter = 0
var triesCounter = 0


function updateValuesAndHTML() {
    triesCounterHTML.innerHTML = triesCounter
    allInSameCounterHTML.innerHTML = allInSameCounter
    relativeAllInSameHTML.innerHTML = Math.round(((allInSameCounter / triesCounter) * 1000) * 100) / 1000
    threeInSameCounterHTML.innerHTML = threeInSameCounter
    relativeThreeInSameHTML.innerHTML = Math.round(((threeInSameCounter / triesCounter) * 1000) * 100) / 1000
    twoInSameCounterHTML.innerHTML = twoInSameCounter
    relativeTwoInSameHTML.innerHTML = Math.round(((twoInSameCounter / triesCounter) * 1000) * 100) / 1000
}

inputField.addEventListener('click', () => {
    if (inputField.value == "Nr of tries + ENTER")
    inputField.value = ""
    inputField.style.fontSize = "30px"
})

tryButton.addEventListener('click', () => {
    createGroupsNrOfTimes(1)
})

tryUntilAllButton.addEventListener('click', () => {
    createGroupsUntilAll()
})

document.addEventListener('click', (event) => {
    if (inputField.value == "" && event.target.id != 'input_box') {
        inputField.style.fontSize = "15px"
        inputField.value = "Nr of tries + ENTER"
    }
})

document.addEventListener('keypress', (event) => {
    if ((event.code == "Enter" || event.code == "NumpadEnter") && inputField.value != "Nr of tries + ENTER" && inputField.value != "") {
        createGroupsNrOfTimes(eval(inputField.value))
    }
})

function createGroupsNrOfTimes(number) {
    var i = 1
    var interval = setInterval(() => {
        var groups = createGroups()
        if (nrOfFriendsInSameGroup(groups) == 4) {allInSameCounter += 1}
        else if (nrOfFriendsInSameGroup(groups) == 3) {threeInSameCounter += 1}
        else if (nrOfFriendsInSameGroup(groups) == 2) {twoInSameCounter += 1}
        triesCounter += 1
        updateValuesAndHTML()    
        if (i == number) {clearInterval(interval)}
        i += 1
        },1)
}

function createGroupsUntilAll() {
    var run = true
    var interval = setInterval(() => {
        var groups = createGroups()
        if (nrOfFriendsInSameGroup(groups) == 4) {
            allInSameCounter += 1
            run = false
        }
        else if (nrOfFriendsInSameGroup(groups) == 3) {threeInSameCounter += 1}
        else if (nrOfFriendsInSameGroup(groups) == 2) {twoInSameCounter += 1}
        triesCounter += 1
        updateValuesAndHTML()    
        if (!run) {clearInterval(interval)}
        },1)
}

function fourFriends() {
    var friends = []
    var indexes = []
    for (let i = 0; i < 32; i++) {
        indexes.push(i)
    }
    for (let i = 0; i < 4; i++) {
        let randIndex = Math.floor(Math.random() * indexes.length)
        friends.push(indexes[randIndex])
        indexes.splice(randIndex, 1)
    }
    return friends
}



function markHeart(person_id) {
    document.getElementById(`h${person_id}`).style.display = 'inline'
}

function nrOfFriendsInSameGroup(groups) {
    var highestCounter = 0
    for (let i = 0; i < 8; i++) {
        var tempCounter = 0
        for (let j = 0; j < 4; j++) {
            if (groups[i].includes(friends[j])) {tempCounter += 1}
        }
        if (tempCounter > highestCounter) {highestCounter = tempCounter}
    }
    return highestCounter
}

function createGroups() {
    var temp_group
    var rndI
    var indexes = []
    for (let i = 0; i < 32; i++) {
        indexes.push(i)
    }
    var groups = []
    for (let i = 0; i < 8; i++) {
        temp_group = []
        for (let j = 0; j < 4; j++) {
            rndI = Math.floor(Math.random() * indexes.length)
            temp_group.push(indexes[rndI])
            indexes.splice(rndI, 1)
        }
        groups.push(temp_group)
    }
    for (let i = 0; i < 4; i++) {
        document.getElementById(`p${groups[0][i]}`).style.color = 'DeepPink'
        document.getElementById(`p${groups[1][i]}`).style.color = 'DarkViolet'
        document.getElementById(`p${groups[2][i]}`).style.color = 'DeepSkyBlue'
        document.getElementById(`p${groups[3][i]}`).style.color = 'DarkSalmon'
        document.getElementById(`p${groups[4][i]}`).style.color = 'DarkGreen'
        document.getElementById(`p${groups[5][i]}`).style.color = 'Maroon'
        document.getElementById(`p${groups[6][i]}`).style.color = 'Gold'
        document.getElementById(`p${groups[7][i]}`).style.color = 'MediumAquaMarine'
    }
    return groups
}

function initialize() {
    friends = fourFriends().sort()
    for (let i = 0; i < friends.length; i++) {
    markHeart(friends[i])
    }
}

initialize()




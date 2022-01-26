const persons = document.getElementsByClassName('person')

function fourPersons() {
    var persons = []
    var indexes = []
    for (let i = 0; i < 32; i++) {
        indexes.push(i)
    }
    for (let i = 0; i < 4; i++) {
        let randIndex = Math.floor(Math.random() * indexes.length)
        persons.push(indexes[randIndex])
        indexes.splice(randIndex, 1)
    }
    return persons
}

function turnGreen(person_id) {
    document.getElementById(`p${person_id}`).style.color = 'green'
}

var friends = fourPersons()

for (let i = 0; i < friends.length; i++) {
    turnGreen(friends[i])
}
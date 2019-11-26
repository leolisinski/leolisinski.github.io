document.getElementById('knapp_start').addEventListener('click', () => 
nameConstructor())

function nameConstructor() {
    var column = document.getElementById('kolumn_val').value
    var names_txt = document.getElementById('text_area').value
    var names_array = []
    var names_array_final = []
    temp_name =""
    while (names_txt.length > 10) {
        var length = 0
        while (names_txt[length] != "\n" && length <= names_txt.length) {
            length += 1
        }
        names_array.push(names_txt.slice(0,length))
        names_txt = names_txt.slice(length+1,names_txt.length)
        
    }
    
    for (let i = 0; i < names_array.length; i++) {
        let name = names_array[i].slice(0, idOfBlank(names_array[i]))
        names_array_final.push(name)
    }
    
    for (let i = 0; i < names_array_final.length; i++) {
        var check_id = i+1
        while (check_id < names_array_final.length) {
        while (names_array_final[i] == names_array_final[check_id] && i != check_id) {
        names_array_final[i] += names_array[i][names_array_final[i].length]
        names_array_final[check_id] += names_array[check_id][names_array_final[check_id].length]
        }
        check_id += 1
        }
    }
    document.getElementById('kolumn_val').style.visibility = 'hidden'
    document.getElementById('text_area').style.visibility = 'hidden'
    document.getElementById('val').style.visibility = 'hidden'
    document.getElementById('knapp_start').style.visibility = 'hidden'
    document.getElementById('rubrik').style.visibility = 'hidden'
    createStudents(names_array_final, column)
}

function idOfBlank(string) {
    var length = string.length
    var i = 0
    while (string[i] != " " && i <= length) {
        i += 1
    }
    if (string[i] == " ") {return i}
    else {return null}
}

function firstNotSameId(name, names_array, array_id) {
    var last_id = name.length - 1
    for (let i = 0; i <= last_id; i++) {
        if (name[i] != names_array[array_id][i]) {return i}
    }
}


function createRow(number, emptyColumn) {
for (let i = -5 + 6*number; i < emptyColumn - 6 + 6*number; i++) {
    nameIndex = Math.floor(Math.random()*remainingNames.length)
    createPlaceNr(i, remainingNames[nameIndex])
    remainingNames.splice(nameIndex,1)
}
createEmptyPlace()
for (let i = emptyColumn - 5 + 6*number; i < emptyColumn - 5 + 7 - emptyColumn + 6*number; i++) {
    nameIndex = Math.floor(Math.random()*remainingNames.length)
    createPlaceNr(i-1, remainingNames[nameIndex])
    remainingNames.splice(nameIndex,1)
}
}

function createEmptyPlace() {
    document.getElementById("classRoom").innerHTML += `<div class="place">
    </div>`
}

function createPlaceNr(number,name) {
    document.getElementById("classRoom").innerHTML += `<div class="place">
    <div id="t${number}" class="table" draggable="true">
        <div id="s${number}" class="student" draggable="true">
            ${name}
        </div>
    </div>
    </div>`
}

function createEmptyTable(number) {
    document.getElementById("classRoom").innerHTML += `<div class="place">
    <div id="t${number}" class="table" draggable="true">
    </div>
    </div>`
}


function createStudents(names, emptyColumn) {
    remainingNames = names
    var number = names.length
    var rowCounter = 0
    var wholeRows = Math.floor(number/6)
    var studentsInLastRow = number - wholeRows * 6
    var remainingStudents
    var emptySeats = 0
    
    for (let i = 1; i <= wholeRows; i++) {
        createRow(i, emptyColumn)
        rowCounter += 1
    }

    if (studentsInLastRow >= emptyColumn) {
        remainingStudents = studentsInLastRow
        emptySeats = 7 - remainingStudents - 1
        for (let i = number + 1 - studentsInLastRow; i < number - studentsInLastRow + emptyColumn; i++) {
            nameIndex = Math.floor(Math.random()*remainingNames.length)
            createPlaceNr(i, remainingNames[nameIndex])
            remainingNames.splice(nameIndex,1)
            remainingStudents -= 1
        }
        createEmptyPlace()
        while (remainingStudents > 0) {
            nameIndex = Math.floor(Math.random()*remainingNames.length)
            createPlaceNr(number-remainingStudents + 1,remainingNames[nameIndex])
            remainingNames.splice(nameIndex,1)
            remainingStudents -= 1
        }
        rowCounter += 1
    }

    else if (studentsInLastRow > 0) {
        remainingStudents = studentsInLastRow
        emptySeats = 7 - remainingStudents
        for (let i = number + 1 - studentsInLastRow; i <= number; i++) {
            nameIndex = Math.floor(Math.random()*remainingNames.length)
            createPlaceNr(i, remainingNames[nameIndex])
            remainingNames.splice(nameIndex,1)
        }
        rowCounter += 1
    }

    while (emptySeats > 0) {
        createEmptyPlace()
        emptySeats -= 1 
    }
    while (rowCounter < 6) {
        for (let i = 1; i <= 7; i++) {
            createEmptyPlace()
        }
        rowCounter += 1
    }
}
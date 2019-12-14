const start_button = document.getElementById('start')
const text_field = document.getElementById('text_field')
const column_choise = document.getElementById('column_choise')
var name_choise = document.getElementById('name_format').value
const headline = document.getElementById('headline')
const column_segment = document.getElementById('column_segment')
const name_segment = document.getElementById('name_segment')

var names = []


function build_name_array(text_field) {
    names = []
    var index = 0
    var temp_name = ""
    while (text_field[index] != undefined) {
        while (text_field[index] != "\n" && index < text_field.length) {
            temp_name += text_field[index]
            index++
        }
        names.push(temp_name)
        temp_name = ""
        index++
        }
        console.log(names)
}

function arrange_name_array(names, name_choise) {
    switch (name_choise) {

        case "name_familyname":
            break
        case "familyname_name":
            for (let i = 0; i < names.length; i++) {
                names[i] = swith_familyname(names[i])
            }
            break
        case "name":
            break
    }
    return names
}

function swith_familyname(string) {
    var last_name_placeholder = ""
    var first_name_placeholder = ""
    var switched_name = ""
    for (let i = indexOfBlank(string) + 1; i < string.length; i++) {
        last_name_placeholder += string[i]
    }
    for (let i = 0; i < indexOfBlank(string); i++) {
        first_name_placeholder += string[i]
    }
    switched_name = last_name_placeholder + " " + first_name_placeholder
    return switched_name
}

function indexOfBlank(string) {
    var index = 0
    for (let i = 0; i < string.length; i++) {
        if (string[i] == " ") {index = i}
    }
    return index
}

function buildFinalArray(names) {

}


function getFamilyNames(array_with_equal_names) {
    var temp = ""
    output = []
    var blank = indexOfBlank(array_with_equal_names[0])
    for (var i = 0; i < array_with_equal_names.length; i++) {
        for (let j = blank+1; j < array_with_equal_names[i].length; j++) {
            temp += array_with_equal_names[i][j]
        }
        output.push(temp)
        temp = ""
    }
    return output
}

function longestLength(array_with_names) {
    var longestLength = 0
    var comparePlaceHolder
    for (let i = 0; i < array_with_names.length ; i++) {
        comparePlaceHolder = array_with_names[i].length 
        if (comparePlaceHolder > longestLength) {longestLength = comparePlaceHolder}
    }
    return longestLength
}

function minimizeTwoNames(name1,name2) {
    output_name1 = ""
    output_name2 = ""
    var limit    
    if (name1.length > name2.length) {limit = name1.length}
    else {limit = name2.length}
    for (let i = 0 ; i < limit ; i++) {
        if (output_name1 == output_name2) {
            if (name1[i] != undefined) {output_name1 += name1[i]}
            if (name2[i] != undefined) {output_name2 += name2[i]}
        }
    }
    return [output_name1, output_name2]
}

function minimizeNames(names) {
    var addedIndex = 0
    output_names = []
    var limit = 0
    // fixar limit length samt första bokstaven //
    for (let i = 0 ; i < names.length ; i++) {
        output_names.push(names[i][addedIndex])
        if (names[i].length > limit) {
            limit = names[i].longestLength
        }
    }

    var excistsEqual = false
    for (let i = 1 ; i < output_names.length ; i++) {
        for (let j = 0 ; j < i ; j++) {
            if (output_names[j][output_names.length - 1] == output_names[i][output_names.length - 1]) {
                excistsEqual = true
            }
        }
    }
    if (excistsEqual) {
        addedIndex++ 
        for (let i = 0 ; i < output_names.length ; i++) {
            output_names.push(names[i][addedIndex])
        }
    }
}


/*     
    if (name1.length > name2.length) {limit = name1.length}
    else {limit = name2.length}
    for (let i = 0 ; i < limit ; i++) {
        if (output_name1 == output_name2) {
            if (name1[i] != undefined) {output_name1 += name1[i]}
            if (name2[i] != undefined) {output_name2 += name2[i]}
        }
    }
    return [output_name1, output_name2]
} */
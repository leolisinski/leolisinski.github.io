var imgSrcList = []
var names = []
var familyNames = []
var alt1Wins = false
var alt2Wins = false
var alt3Wins = false
var score = 0
var pickedPhotoIndex = null
var pickedImgSrc = null
var pickedName = null
var wrongPhotoIndex = null
var wrongNameNr1 = null
var wrongNameNr2 = null
var wrongPhotoIndex = null
var correctAlternative = null

function photoSelector() {
    photos = document.getElementById('selectedPhotos').files
    imgSrcList = []
    names = []
    familyNames = []
    for (let k = 1; k <= photos.length; k++) {
        var fileName = photos[k-1].name
        var locationOfGap = fileName.indexOf("-")
        var name = fileName[0].toUpperCase() + fileName.substring(1,locationOfGap)
        var familyName = fileName[locationOfGap+1].toUpperCase() + fileName.substring(locationOfGap+2, fileName.length-7)
        var imgSrc = `img/${fileName}`
        imgSrcList.push(imgSrc)
        names.push(name)
        familyNames.push(familyName)
    }
    game()   
}

function game() {
    alt1Wins = false; alt2Wins = false; alt3Wins = false
    document.getElementById('instruction').innerHTML = 'Say my name!'
    pickedPhotoIndex = Math.round(Math.random()*(names.length-1))
    pickedImgSrc = imgSrcList.splice(pickedPhotoIndex,1)
    pickedName = names.splice(pickedPhotoIndex,1)

    document.getElementById('photo').src = pickedImgSrc

    wrongPhotoIndex = Math.round(Math.random()*(names.length-1))

    wrongNameNr1 = names.splice(wrongPhotoIndex,1)

    wrongPhotoIndex = Math.round(Math.random()*(names.length-1))
    
    wrongNameNr2 = names.splice(wrongPhotoIndex,1)

    correctAlternative = 1 + Math.round(Math.random() * 2)

    switch(correctAlternative) {
        case 1:
            alt1Wins = true; alt2Wins = false; alt3Wins = false
            document.getElementById('alt1').innerHTML= pickedName
            document.getElementById('alt2').innerHTML= wrongNameNr1
            document.getElementById('alt3').innerHTML= wrongNameNr2
            break
        case 2:
            alt1Wins = false; alt2Wins = true; alt3Wins = false
            document.getElementById('alt1').innerHTML= wrongNameNr1
            document.getElementById('alt2').innerHTML= pickedName
            document.getElementById('alt3').innerHTML= wrongNameNr2
            break
        case 3:
            alt1Wins = false; alt2Wins = false; alt3Wins = true
            document.getElementById('alt1').innerHTML= wrongNameNr1
            document.getElementById('alt2').innerHTML= wrongNameNr2
            document.getElementById('alt3').innerHTML= pickedName
            break
    }
}

document.getElementById('alt1').addEventListener('click', () => clickChecker('alt1'))
document.getElementById('alt2').addEventListener('click', () => clickChecker('alt2'))
document.getElementById('alt3').addEventListener('click', () => clickChecker('alt3'))

function clickChecker(alternative) {
    if (alternative == 'alt1' && alt1Wins) {score += 1; document.getElementById('score').innerHTML = score}
    else if (alternative == 'alt2' && alt2Wins) {score += 1; document.getElementById('score').innerHTML = score}
    else if (alternative == 'alt3' && alt3Wins) {score += 1; document.getElementById('score').innerHTML = score}
    else {score -= 1; document.getElementById('score').innerHTML = score}
    photoSelector()
}
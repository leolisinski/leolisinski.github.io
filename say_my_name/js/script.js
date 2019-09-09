//Global variable list
var imgSrcList = []
var names = []
var familyNames = []
var alt1Wins = false
var alt2Wins = false
var alt3Wins = false
var pickedPhotoIndex = null
var pickedImgSrc = null
var pickedName = null
var wrongPhotoIndex = null
var wrongNames = []
var wrongImgSrcs = []
var correctAlternative = null
var OPGactive = false
var TPGactive = false 
var score = 0
var photos = null

//eventListeners
document.getElementById('alt1').addEventListener('click', ()=>checkerOPG('alt1'))
document.getElementById('alt2').addEventListener('click', ()=>checkerOPG('alt2'))
document.getElementById('alt3').addEventListener('click', ()=>checkerOPG('alt3'))

document.getElementById('photo1').addEventListener('click', ()=>checkerTPG('alt1'))
document.getElementById('photo2').addEventListener('click', ()=>checkerTPG('alt2'))
document.getElementById('photo3').addEventListener('click', ()=>checkerTPG('alt3'))

document.getElementById('submitButton').addEventListener('click', ()=>photoLoader())
document.getElementById('selectedPhotos').addEventListener('change', ()=> {
    photos = document.getElementById('selectedPhotos').files
    document.getElementById('numberOfFiles').innerHTML = `${photos.length} valda bilder`
    document.getElementById('numberOfFiles').style.visibility = 'visible'
})

//default styling
document.getElementById('photo1').style.visibility = 'hidden'
document.getElementById('photo2').style.visibility = 'hidden'
document.getElementById('photo3').style.visibility = 'hidden'


function photoLoader() {
    document.getElementById('numberOfFiles').style.visibility = 'hidden'
    document.getElementById('photo1').style.visibility = 'hidden'
    document.getElementById('photo2').style.visibility = 'hidden'
    document.getElementById('photo3').style.visibility = 'hidden'
    document.getElementById('scoreSection').style.visibility = 'visible'
    imgSrcList = []
    names = []
    familyNames = []
    wrongNames = []
    wrongImgSrcs = []
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

    OPGactive = false
    TPGactive = false

    var gameChoice = 1 + Math.floor(Math.random()*2)

    if (gameChoice == 1) {onePhotoGame(); return}
    if (gameChoice == 2) {threePhotoGame(); return}
}

function threePhotoGame() {
    TPGactive = true
    document.getElementById('photo1').classList.add('gamePhoto')
    document.getElementById('photo2').classList.add('gamePhoto')
    document.getElementById('photo3').classList.add('gamePhoto')
    document.getElementById('alt1').style.visibility = 'hidden'
    document.getElementById('alt2').style.visibility = 'hidden'
    document.getElementById('alt3').style.visibility = 'hidden'
    alt1Wins = false; alt2Wins = false; alt3Wins = false

    pickedPhotoIndex = Math.floor(Math.random()*(names.length))
    pickedImgSrc = imgSrcList.splice(pickedPhotoIndex,1)
    pickedName = names.splice(pickedPhotoIndex,1)

    for (let k = 1; k<=2; k++) {
        wrongPhotoIndex = Math.floor(Math.random()*(names.length))
        wrongNames.push(names.splice(wrongPhotoIndex,1))
        wrongImgSrcs.push(imgSrcList.splice(wrongPhotoIndex,1))
    }

    document.getElementById('instruction').innerHTML = `Who is ${pickedName}?`
    document.getElementById('instruction').style.visibility = 'visible'

    correctAlternative = 1 + Math.floor(Math.random() * 3)

    switch(correctAlternative) {
        case 1:
            alt1Wins = true; alt2Wins = false; alt3Wins = false
            document.getElementById('photo1').src= pickedImgSrc
            document.getElementById('photo2').src= wrongImgSrcs[0]
            document.getElementById('photo3').src= wrongImgSrcs[1]
            break
        case 2:
            alt1Wins = false; alt2Wins = true; alt3Wins = false
            document.getElementById('photo1').src= wrongImgSrcs[0]
            document.getElementById('photo2').src= pickedImgSrc
            document.getElementById('photo3').src= wrongImgSrcs[1]
            break
        case 3:
            alt1Wins = false; alt2Wins = false; alt3Wins = true
            document.getElementById('photo1').src= wrongImgSrcs[0]
            document.getElementById('photo2').src= wrongImgSrcs[1]
            document.getElementById('photo3').src= pickedImgSrc
            break
    }
    document.getElementById('photo1').style.visibility = 'visible'
    document.getElementById('photo2').style.visibility = 'visible'
    document.getElementById('photo3').style.visibility = 'visible'
}

function onePhotoGame() {
    document.getElementById('photo1').style.visibility = 'hidden'
    document.getElementById('photo2').style.visibility = 'hidden'
    document.getElementById('photo3').style.visibility = 'hidden'
    OPGactive = true
    document.getElementById('alt1').style.visibility = 'visible'
    document.getElementById('alt2').style.visibility = 'visible'
    document.getElementById('alt3').style.visibility = 'visible'
    alt1Wins = false; alt2Wins = false; alt3Wins = false
    pickedPhotoIndex = Math.floor(Math.random()*(names.length))
    pickedImgSrc = imgSrcList.splice(pickedPhotoIndex,1)
    pickedName = names.splice(pickedPhotoIndex,1)
    document.getElementById('photo2').src = pickedImgSrc
    document.getElementById('photo2').style.visibility = 'visible'
    document.getElementById('instruction').innerHTML = 'Say my name!'

    for (let k = 1; k<=2; k++) {
        wrongPhotoIndex = Math.floor(Math.random()*(names.length))
        wrongNames.push(names.splice(wrongPhotoIndex,1))
    }

    correctAlternative = 1 + Math.floor(Math.random() * 3)

    switch(correctAlternative) {
        case 1:
            alt1Wins = true; alt2Wins = false; alt3Wins = false
            document.getElementById('alt1').innerHTML= pickedName
            document.getElementById('alt2').innerHTML= wrongNames[0]
            document.getElementById('alt3').innerHTML= wrongNames[1]
            break
        case 2:
            alt1Wins = false; alt2Wins = true; alt3Wins = false
            document.getElementById('alt1').innerHTML= wrongNames[0]
            document.getElementById('alt2').innerHTML= pickedName
            document.getElementById('alt3').innerHTML= wrongNames[1]
            break
        case 3:
            alt1Wins = false; alt2Wins = false; alt3Wins = true
            document.getElementById('alt1').innerHTML= wrongNames[0]
            document.getElementById('alt2').innerHTML= wrongNames[1]
            document.getElementById('alt3').innerHTML= pickedName
            break
    }

}

function checkerOPG(alternative) {
    if (OPGactive) {
    if (alternative == 'alt1' && alt1Wins) {score += 1; document.getElementById('score').innerHTML = score; photoLoader(); return}
    else if (alternative == 'alt2' && alt2Wins) {score += 1; document.getElementById('score').innerHTML = score; photoLoader(); return}
    else if (alternative == 'alt3' && alt3Wins) {score += 1; document.getElementById('score').innerHTML = score; photoLoader(); return}
    else {score -= 1; document.getElementById('score').innerHTML = score}
    }
}


function checkerTPG(alternative) {
    if (TPGactive) {
    if (alternative == 'alt1' && alt1Wins) {score += 1; document.getElementById('score').innerHTML = score; photoLoader(); return}
    else if (alternative == 'alt2' && alt2Wins) {score += 1; document.getElementById('score').innerHTML = score; photoLoader(); return}
    else if (alternative == 'alt3' && alt3Wins) {score += 1; document.getElementById('score').innerHTML = score; photoLoader(); return}
    else {score -= 1; document.getElementById('score').innerHTML = score}
    }
}
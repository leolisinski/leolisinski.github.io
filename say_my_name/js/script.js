function showPhotos() {

    var photos = document.getElementById('selectedPhotos').files

    for (let k = 1; k <= photos.length; k++) {
        var fileName = photos[k-1].name
        var locationOfGap = fileName.indexOf("_")
        var name = fileName[0].toUpperCase() + fileName.substring(1,locationOfGap)
        var familyName = fileName[locationOfGap+1].toUpperCase() + fileName.substring(locationOfGap+2, fileName.length-4)
        document.getElementById(`photo${k}`).src = `img/${fileName}`
        document.getElementById(`photo${k}`).title = `${name} ${familyName}`

        
    }
    
}
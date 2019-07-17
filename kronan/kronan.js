const ljud = new Ljud()
const kortlek = new Deck()
kortlek.generate_deck()
kortlek.shuffle()

c1 = []; c2 = []; c3 = []; c4 = []; c5 = []; c6 = []; c7 = []; c8 = []; c9 = []; c10 = []; c11 = []; c12 = []; c13 = []; c14 = [];

allPiles = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14]

function pileNames(){
allPiles_names = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14']
}

function Reset() {
    kortlek.clear_deck()
    kortlek.generate_deck()
    kortlek.shuffle()
    for (let k = 0; k<3; k++) {
            for (let m = 0; m<13; m++) {
                kortlek.deck[0].frontside = false
                allPiles[m].unshift(kortlek.deal())
            }
        }
    for (let k = 0; k<13; k++) {
        kortlek.deck[0].frontside = false
        c14.unshift(kortlek.deal())
        }
        c14[0].frontside = true
    update_topImages()
}

function update_imgSrc_topCards() {
    for (let k = 0; k < 14; k++) {
        if (allPiles[k].length > 0) {
        if (allPiles[k][0].frontside) {allPiles[k][0].imgSrc = allPiles[k][0].f_imgSrc}
        else {allPiles[k][0].imgSrc = allPiles[k][0].b_imgSrc}
        }
    }
}

function flipTopCard(pile) {
    if (pile[0].frontside === true) {pile[0].frontside = false}
    else {pile[0].frontside = true}
    update_topImages()
}

function checkForEmptyPiles() {
    for (let k = 0; k < 14; k++) {
        if (allPiles[k].length === 0) {
            pileNames()
            document.getElementById(allPiles_names[k]).src="images/empty.png"
        }
        }

    }

function update_topImages() {
    update_imgSrc_topCards()
    checkForEmptyPiles()
    if (c1.length > 0) {document.getElementById("c1").src=`${c1[0].imgSrc}`}
    if (c2.length > 0) {document.getElementById("c2").src=`${c2[0].imgSrc}`}
    if (c3.length > 0) {document.getElementById("c3").src=`${c3[0].imgSrc}`}
    if (c4.length > 0) {document.getElementById("c4").src=`${c4[0].imgSrc}`}
    if (c5.length > 0) {document.getElementById("c5").src=`${c5[0].imgSrc}`}
    if (c6.length > 0) {document.getElementById("c6").src=`${c6[0].imgSrc}`}
    if (c7.length > 0) {document.getElementById("c7").src=`${c7[0].imgSrc}`}
    if (c8.length > 0) {document.getElementById("c8").src=`${c8[0].imgSrc}`}
    if (c9.length > 0) {document.getElementById("c9").src=`${c9[0].imgSrc}`}
    if (c10.length > 0) {document.getElementById("c10").src=`${c10[0].imgSrc}`}
    if (c11.length > 0) {document.getElementById("c11").src=`${c11[0].imgSrc}`}
    if (c12.length > 0) {document.getElementById("c12").src=`${c12[0].imgSrc}`}
    if (c13.length > 0) {document.getElementById("c13").src=`${c13[0].imgSrc}`}
    if (c14.length > 0) {document.getElementById("c14").src=`${c14[0].imgSrc}`}
    
}

function moveMarkerChecker() {
    moveMarkers = []
    for (let k = 0; k < 14; k++) {
        if (allPiles[k].length > 0) {
        if (allPiles[k][0].marker) {moveMarkers.unshift(allPiles[k][0])}
    }}
    return moveMarkers.length
}

function moveHandler() {
    for (let k = 1; k < 15; k++) {
        document.getElementById(`c${k}`).addEventListener("click", () => {
            id = `c${k}`
            pileNames()
            pile_index = allPiles_names.indexOf(id)
            allPiles[pile_index][0].marker = true
            Cases(id)})
    }
}

function moveFrom(from_id) {
    for (let k = 1; k < 15; k++) {
            document.getElementById(`c${k}`).addEventListener("click", () => {
            to_id = `c${k}`
            pileNames()
            to_pile_index = allPiles_names.indexOf(to_id)
            from_pile_index = allPiles_names.indexOf(from_id)
            if (to_id === from_id) {
                document.getElementById(`${from_id}`).classList.remove('selected')
                moveMarkers[0].marker = false
                moveHandler()
            }
            else {
                allPiles[to_pile_index].push(allPiles[from_pile_index].shift())
                allPiles[to_pile_index][0].frontside = true
                if (allPiles[from_pile_index].length > 0) {
                allPiles[from_pile_index][0].frontside = false}
                document.getElementById(`${from_id}`).classList.remove('selected')
                document.getElementById(`${to_id}`).classList.remove('selected')
                update_topImages()
                moveHandler()
            }
            
        })
    }
}

function Cases(id) {
    switch(moveMarkerChecker()) {
        case 1:
            document.getElementById(`${id}`).classList.add('selected')
            moveFrom(id)
            break
        case 2:
            moveMarkers[0].marker = false
            moveMarkers[1].marker = false
            break
    }
}

document.getElementById("button").addEventListener("click", () => {
    c1.shift()
    update_topImages()
})

Reset()

moveHandler()
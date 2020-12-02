var deck_of_cards = [
    "hj_2",
    "hj_3",
    "hj_4",
    "hj_5",
    "hj_6",
    "hj_7",
    "hj_8",
    "hj_9",
    "hj_10",
    "hj_knekt",
    "hj_dam",
    "hj_kung",
    "hj_ess",
    "ru_2",
    "ru_3",
    "ru_4",
    "ru_5",
    "ru_6",
    "ru_7",
    "ru_8",
    "ru_9",
    "ru_10",
    "ru_knekt",
    "ru_dam",
    "ru_kung",
    "ru_ess",
    "sp_2",
    "sp_3",
    "sp_4",
    "sp_5",
    "sp_6",
    "sp_7",
    "sp_8",
    "sp_9",
    "sp_10",
    "sp_knekt",
    "sp_dam",
    "sp_kung",
    "sp_ess",
    "kl_2",
    "kl_3",
    "kl_4",
    "kl_5",
    "kl_6",
    "kl_7",
    "kl_8",
    "kl_9",
    "kl_10",
    "kl_knekt",
    "kl_dam",
    "kl_kung",
    "kl_ess",
]


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

function shuffleAndPickNrOfCards(number) {
    var shuffledCards = shuffle(deck_of_cards)
    var pickedCards = []
    for (let i = 1; i <= number; i++) {
        pickedCards.push(shuffledCards[i])
    }
    return pickedCards
}

function nrOfSpades(arrayWithCards) {
    var counter = 0
    for (let i = 0; i < arrayWithCards.length; i++) {
        if (arrayWithCards[i][0] == "s") {counter += 1}
    }
    return counter
}

function atLeastTwoSpades(arrayWithCards) {
    return (nrOfSpades(arrayWithCards) >= 2) 
}

function nrOfTimesAtLeastTwoSpades(nrOfTimesPickedFourCards) {
    var counter = 0
    for (let i = 1; i <= nrOfTimesPickedFourCards; i++) {
        var fourPickedCards = shuffleAndPickNrOfCards(4)
        if (atLeastTwoSpades(fourPickedCards)) {counter += 1}
    }
    return counter
}

function experimentalPropabilityOfAtLeastTwoSpades(nrOfTries) {
    return (nrOfTimesAtLeastTwoSpades(nrOfTries) / nrOfTries)
}

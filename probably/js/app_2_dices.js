const dice1 = document.getElementById("dice_1");
const dice2 = document.getElementById("dice_2");

const inputBox = document.getElementById("input_box_one_dice");

const counterRolls = document.getElementById("counterRolls");
const counterSum11 = document.getElementById("counterSum11");
const counterProduct12 = document.getElementById("counterProduct12");
const counterMixed = document.getElementById("counterMixed");

let rolls = 0;

let sum11 = 0;
let product12 = 0;
let mixed = 0;


// Slå de två tärningarna en gång
function rollDice() {

    const roll1 = Math.floor(Math.random() * 6) + 1;
    const roll2 = Math.floor(Math.random() * 6) + 1;

    rolls++;

    // Händelse 1:
    // Summan är 11
    if (roll1 + roll2 === 11) {
        sum11++;
    }

    // Händelse 2:
    // Produkten är större än eller lika med 12
    if (roll1 * roll2 >= 12) {
        product12++;
    }

    // Händelse 3:
    // En tärning är större än 3
    // och den andra är mindre än 5
    if (
        (roll1 > 3 && roll2 < 5) ||
        (roll2 > 3 && roll1 < 5)
    ) {
        mixed++;
    }

    return [roll1, roll2];
}


// Uppdatera räknarna på sidan
function updateCounters() {

    counterRolls.textContent = rolls;

    counterSum11.textContent =
        ((sum11 / rolls) * 100).toFixed(2);

    counterProduct12.textContent =
        ((product12 / rolls) * 100).toFixed(2);

    counterMixed.textContent =
        ((mixed / rolls) * 100).toFixed(2);
}


// Visa senaste tärningsslaget
function showDice(roll1, roll2) {

    dice1.src = "img/dice_" + roll1 + ".png";
    dice2.src = "img/dice_" + roll2 + ".png";
}


// Kör ett antal simuleringar
function simulate(numberOfRolls) {

    let lastRoll;

    for (let i = 0; i < numberOfRolls; i++) {
        lastRoll = rollDice();
    }

    showDice(lastRoll[0], lastRoll[1]);
    updateCounters();
}


// ENTER i inmatningsrutan
inputBox.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        const numberOfRolls = parseInt(inputBox.value);

        if (!isNaN(numberOfRolls) && numberOfRolls > 0) {

            simulate(numberOfRolls);

            inputBox.value = "Antal slag + ENTER";
        }
    }
});


// Klick på någon av tärningarna = ett slag
dice1.addEventListener("click", function() {
    simulate(1);
});

dice2.addEventListener("click", function() {
    simulate(1);
});


// Markera standardtexten när man klickar i rutan
inputBox.addEventListener("focus", function() {

    if (inputBox.value === "Antal slag + ENTER") {
        inputBox.select();
    }
});

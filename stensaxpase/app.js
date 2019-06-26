let userScore = 0;
let computerScore = 0;
let counter = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const counter_span = document.getElementById("counter");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("st");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("sa");

function getComputerChoice()    {
    const choices = ["st", "p", "sa"];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function convertToWord(letter) {
    if (letter === "st") return "Sten";
    if (letter === "p") return "Påse";
    return "Sax";
}

function win(userChoice,computerChoice) {
    const smallUserWord = "spelare".fontsize(2).sub().fontcolor("#E2584D");
    const smallCompWord = "dator".fontsize(2).sub().fontcolor("#E2584D");
    const userChoice_div = document.getElementById(userChoice);
    userScore++;
    counter++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    counter_span.innerHTML = counter;
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} vinner över ${convertToWord(computerChoice)}${smallCompWord}. Du vann!`;
    userChoice_div.classList.add("green-glow");
    setTimeout(() => userChoice_div.classList.remove("green-glow"), 300);
}



function lose(userChoice,computerChoice) {
    const smallUserWord = "spelare".fontsize(2).sub().fontcolor("#E2584D");
    const smallCompWord = "dator".fontsize(2).sub().fontcolor("#E2584D");
    const userChoice_div = document.getElementById(userChoice);
    computerScore++;
    counter++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    counter_span.innerHTML = counter;
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} förlorar över ${convertToWord(computerChoice)}${smallCompWord}. Du förlorade.`;
    userChoice_div.classList.add("red-glow");
    setTimeout(() => userChoice_div.classList.remove("red-glow"), 300);
}

function draw(userChoice) {
    const userChoice_div = document.getElementById(userChoice);
    counter++;
    counter_span.innerHTML = counter;
    result_p.innerHTML = `Både du och datorn valde ${convertToWord(userChoice)}. Det blev oavgjort`;
    userChoice_div.classList.add("gray-glow");
    setTimeout(() => userChoice_div.classList.remove("gray-glow"), 300);
}

function game(userChoice) {
    const computerChoice = getComputerChoice();    
    switch (userChoice + computerChoice) {
        case "stsa":
        case "pst":
        case "sap":
            win(userChoice,computerChoice);
            break;
        case "stp":
        case "psa":
        case "sast":
             lose(userChoice,computerChoice);
             break;
        case "stst":
        case "pp":
        case "sasa":
            draw(userChoice,computerChoice);
            break;
        
    }
}

function main() {
    rock_div.addEventListener('click', () => game("st"));
    scissors_div.addEventListener('click', () => game("sa"));
    paper_div.addEventListener('click', () => game("p"));
    }

main();
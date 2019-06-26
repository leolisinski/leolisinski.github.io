let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
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
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    const smallUserWord = "spelare".fontsize(2).sub();
    const smallCompWord = "dator".fontsize(2).sub();
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} vinner över ${convertToWord(computerChoice)}${smallCompWord}. Du vann!`;
    
}

function lose(userChoice,computerChoice) {
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    const smallUserWord = "spelare".fontsize(2).sub();
    const smallCompWord = "dator".fontsize(2).sub();
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} förlorar över ${convertToWord(computerChoice)}${smallCompWord}. Du förlorade.`;
}

function draw(userChoice) {
    computerScore++;
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `Både du och datorn valde ${convertToWord(userChoice)}. Det blev oavgjort`;
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
    rock_div.addEventListener('click',function() {
        game("st");
    })
    scissors_div.addEventListener('click',function() {
        game("sa");
    })
    paper_div.addEventListener('click',function() {
        game("p");
    })
    }

main();
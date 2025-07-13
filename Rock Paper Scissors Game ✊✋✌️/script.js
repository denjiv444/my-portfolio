let rock = document.getElementById("rock");
let paper = document.getElementById("paper");
let scissors = document.getElementById("scissors");
let result = document.getElementById("winner");
let playerScore = 0;
let computerScore = 0;
let playerScoreDisplay = document.getElementById("player-score");
let computerScoreDisplay = document.getElementById("computer-score");
let playerchoice = document.getElementById("player");
let computerchoice = document.getElementById("computer-choice");

function computerPlay() {
    let choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playrock() {
    let computerSelection = computerPlay();
    playerchoice.innerHTML = "your choice: Rock";
    let playerimage = document.createElement("img");
    playerimage.src = "fist.png";
    playerchoice.appendChild(playerimage);
    computerchoice.innerHTML = "computer choice: " + computerSelection;
    if (computerSelection === "rock") {
        result.innerHTML = "It's a tie!";
        let computerimage = document.createElement("img");
        computerimage.src = "fist.png"; 
        computerchoice.appendChild(computerimage);
    } else if (computerSelection === "paper") {
        result.innerHTML = "You lose! Paper beats Rock";
        let computerimage = document.createElement("img");
        computerimage.src = "hand-paper.png";
        computerchoice.appendChild(computerimage);
        computerScore++;
        computerScoreDisplay.innerHTML = "Computer Score: " + computerScore;
    } else {
        result.innerHTML = "You win! Rock beats Scissors";
        let computerimage = document.createElement("img");
        computerimage.src = "scissors.png";
        computerchoice.appendChild(computerimage);
        playerScore++;
        playerScoreDisplay.innerHTML = "Player Score: " + playerScore;
    }
}
function playpaper() {
    let computerSelection = computerPlay();
    playerchoice.innerHTML = "your choice: Paper";
    let playerimage = document.createElement("img");
    playerimage.src = "hand-paper.png";
    playerchoice.appendChild(playerimage);
    computerchoice.innerHTML = "computer choice: " + computerSelection;
    if (computerSelection === "paper") {
        result.innerHTML = "It's a tie!";
        let computerimage = document.createElement("img");
        computerimage.src = "hand-paper.png";
        computerchoice.appendChild(computerimage);
    } else if (computerSelection === "scissors") {
        result.innerHTML = "You lose! Scissors beats Paper";
        let computerimage = document.createElement("img");
        computerimage.src = "scissors.png";
        computerchoice.appendChild(computerimage);
        computerScore++;
        computerScoreDisplay.innerHTML = "Computer Score: " + computerScore;

    } else {
        result.innerHTML = "You win! Paper beats Rock";
        let computerimage = document.createElement("img");
        computerimage.src = "fist.png";
        computerchoice.appendChild(computerimage);
        playerScore++;
        playerScoreDisplay.innerHTML = "Player Score: " + playerScore;
    }
}
function playscissors() {
    let computerSelection = computerPlay();
    playerchoice.innerHTML = "your choice: Scissors";
    let playerimage = document.createElement("img");
    playerimage.src = "scissors.png";
    playerchoice.appendChild(playerimage);
    computerchoice.innerHTML = "computer choice: " + computerSelection;
    if (computerSelection === "scissors") {
        result.innerHTML = "It's a tie!";
        let computerimage = document.createElement("img");
        computerimage.src = "scissors.png";
        computerchoice.appendChild(computerimage);
    } else if (computerSelection === "rock") {
        result.innerHTML = "You lose! Rock beats Scissors";
        let computerimage = document.createElement("img");
        computerimage.src = "fist.png";
        computerchoice.appendChild(computerimage);
        computerScore++;
        computerScoreDisplay.innerHTML = "Computer Score: " + computerScore;
    } else {
        result.innerHTML = "You win! Scissors beats Paper";
        let computerimage = document.createElement("img");
        computerimage.src = "hand-paper.png";
        computerchoice.appendChild(computerimage);
        playerScore++;
        playerScoreDisplay.innerHTML = "Player Score: " + playerScore;
    }
}

// Add this at the end of your script to make the button work
rock.addEventListener("click", playrock);
paper.addEventListener("click", playpaper);
scissors.addEventListener("click", playscissors);

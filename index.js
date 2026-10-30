// Pseudocode:
// 1. get the computer choice
// 2. get the human choice
// 3. declare the playes scores
// 4. play a single round

let humanScore = 0
let computerScore = 0

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        console.log(`Tie! ${capitalize(humanChoice)} and ${capitalize(computerChoice)}`)
        return
    }

    if (humanChoice === "rock" && computerChoice === "paper"
        || humanChoice === "paper" && computerChoice === "scissors"
        || humanChoice === "scissors" && computerChoice === "rock") {
        console.log(`You lose! ${capitalize(computerChoice)} beats ${capitalize(humanChoice)}`)
        computerScore++
    } else { // All other combinations are win
        console.log(`You win! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}`)
        humanScore++
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function getComputerChoice() {
    // 1, 2 or 3
    const randomNum = Math.floor(Math.random() * 3) + 1
    if (randomNum === 1) {
        return "rock"
    }
    if (randomNum === 2) {
        return "paper"
    }
    if (randomNum === 3) {
        return "scissors"
    }
}

function getHumanChoice() {
    const choice = prompt("Enter your move (rock, paper or scissors?):")
    return choice.toLowerCase()
}

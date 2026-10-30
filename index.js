// Pseudocode:
// 1. get the computer choice
// 2. get the human choice
// 3. declare the playes scores
// 4. play a single round
// 5. game loop (5 rounds)

// UI pseudocode:
// 1. 3 buttons - 3 event listeners that call playRound
// 2. div to display results
// 3. show game scores
// 4. show results when someone gets 5 points
const rockBtn = document.querySelector("#rock")
const paperBtn = document.querySelector("#paper")
const scissorsBtn = document.querySelector("#scissors")

rockBtn.addEventListener("click", function () {
    playRound("rock", getComputerChoice())
})
paperBtn.addEventListener("click", function () {
    playRound("paper", getComputerChoice())
})
scissorsBtn.addEventListener("click", function () {
    playRound("scissors", getComputerChoice())
})

const resultsDiv = document.querySelector('#game-info')

const humanScoreSpan = document.querySelector('#human-score')
const computerScoreSpan = document.querySelector('#computer-score')

function gameLoop(rounds) {
    let humanScore = 0
    let computerScore = 0

    for (let i = 0; i < rounds; i++) {
        const humanChoice = getHumanChoice()
        const computerChoice = getComputerChoice()
        const result = playRound(humanChoice, computerChoice)
        if (result === "computer") {
            computerScore++
        } else if (result === "human") {
            humanScore++
        }
    }

    printSummary(humanScore, computerScore)
}

function playRound(humanChoice, computerChoice) {
    let winner = ""

    if (humanChoice === computerChoice) {
        logResults(`Tie! ${capitalize(humanChoice)} and ${capitalize(computerChoice)}`)
        winner = ""
    } else if (humanChoice === "rock" && computerChoice === "paper"
        || humanChoice === "paper" && computerChoice === "scissors"
        || humanChoice === "scissors" && computerChoice === "rock") {
        logResults(`You lose! ${capitalize(computerChoice)} beats ${capitalize(humanChoice)}`)
        winner = "computer"
    } else { // All other combinations are win
        logResults(`You win! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}`)
        winner = "human"
    }
    
    updateScores(winner)
}

function updateScores(roundResult) {
    let humanScore = +humanScoreSpan.textContent
    let computerScore = +computerScoreSpan.textContent

    if (roundResult === "computer") {
        computerScore++
        computerScoreSpan.textContent = computerScore
    } else if (roundResult === "human") {
        humanScore++
        humanScoreSpan.textContent = humanScore
    }

    announceWinner(humanScore, computerScore)
}

function announceWinner(humanScore, computerScore) {
    if (humanScore === 5 || computerScore === 5) {
        printSummary(humanScore, computerScore)
    }
}

function logResults(message, append = false, html = false) {
    if (!append) {
        if (!html) {
            resultsDiv.textContent = message
        } else if (html) {
            resultsDiv.innerHTML = message
        }
    } else if (append) {
        if (!html) {
            resultsDiv.textContent += message
        } else if (html) {
            resultsDiv.innerHTML += message
        }
    }
}

function printSummary(humanScore, computerScore) {
    logResults("<br>The final result is:", append=true, html=true)
    logResults(`<br>Human: ${humanScore}`, append=true, html=true)
    logResults(`<br>Computer: ${computerScore}`, append=true, html=true)
    
    if (humanScore > computerScore) {
        logResults("<br>Human won", append=true, html=true)
    } else if (humanScore < computerScore) {
        logResults("<br>Computer won", append=true, html=true)
    } else {
        logResults("<br>Tie", append=true, html=true)
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

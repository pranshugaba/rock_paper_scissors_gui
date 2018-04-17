var pick = document.getElementById("pick_up");
var actions = document.createElement('p');
var last_action = document.createElement('p');
var scores = document.createElement('p');
var reload = document.createElement('button');


reload.appendChild(document.createTextNode('Restart'));
actions.style.whiteSpace = "pre";
last_action.style.whiteSpace = "pre";
actions.textContent = '\r\n';
last_action.textContent = '\r\n';
pick.textContent = 'Pick a move!';
scores.textContent = "Your Score: 0, Computer Score: 0";

var winning_text = "Congrats! You reached 5 points first!";
var losing_text = "Sorry, the computer reached 5 points first. Better luck next time!";

document.body.appendChild(actions);
document.body.appendChild(last_action);
document.body.appendChild(scores);
document.body.appendChild(reload);
reload.style.visibility = "hidden";
// Generates a random move that the computer will play
function computerPlay () {
    computerMove = Math.floor(Math.random() * 3);
    if (computerMove === 0) {
        return 'rock';
    } else if (computerMove === 1) {
        return 'paper';
    } else {
        return 'scissors';
    }
}
var playerScore = 0;
var computerScore = 0;

// buttons is a node list. It looks and acts like an array
const buttons = document.querySelectorAll('button');

// we use the .forEach method to iterate through each button
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {

        if (playerScore < 5 && computerScore < 5) {
            playerSelection = button.id;
            computerSelection = computerPlay();
            score = playRound(playerSelection, computerSelection)

            if (score === 1) {
                playerScore += 1;
            }
            else if (score === -1) {
                computerScore += 1;
            }
            console.log("You have %d points", playerScore);
            scores.textContent = `Your Score: ${playerScore}, Computer Score: ${computerScore}`;
            console.log("Computer has %d points", computerScore);
        }

        if (playerScore === 5) {
            pick.textContent = winning_text;
            reload.style.visibility = "visible";
        }
        else if (computerScore === 5){
            pick.textContent = losing_text;
            reload.style.visibility = "visible";
        }

    });
});

reload.addEventListener('click', () => {
    location.reload();
})

function playRound (playerSelection, computerSelection) {
    console.log(`You played ${playerSelection}. Computer played ${computerSelection}.`);
    actions.textContent = `You played ${playerSelection}. Computer played ${computerSelection}.`;
    if (playerSelection === computerSelection) {
        last_action.textContent = "It's a draw!";
        console.log("It's a draw!");
        return 0;
    }  else {

        // player plays rock
        if (playerSelection === 'rock' && computerSelection === 'scissors') {
            last_action.textContent ="You win! Rock beats scissors.";
            console.log("You win! Rock beats scissors.");
            return 1;
        }
        if (playerSelection === 'rock' && computerSelection === 'paper') {
            last_action.textContent = "You lose. Rock is beaten by paper.";
            console.log("You lose. Rock is beaten by paper.");
            return -1;
        }

        //player plays scissors
        if (playerSelection === 'scissors' && computerSelection === 'rock') {
            last_action.textContent = "You lose. Scissors is beaten by rock.";
            console.log("You lose. Scissors is beaten by rock.");
            return -1;
        }
        if (playerSelection === 'scissors' && computerSelection === 'paper') {
            last_action.textContent = "You win! Scissors beats paper.";
            console.log("You win! Scissors beats paper.");
            return 1;
        }

        // player plays paper
        if (playerSelection === 'paper' && computerSelection === 'rock') {
            last_action.textContent = "You win! Paper beats rock.";
            console.log("You win! Paper beats rock.");
            return 1;
        }
        if (playerSelection === 'paper' && computerSelection === 'scissors') {
            last_action.textContent = "You lose! Paper is beaten by scissors.";
            console.log("You lose! Paper is beaten by scissors");
            return -1;
        }
    }
}


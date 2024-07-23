const dialog = document.querySelector("dialog");
const form = document.querySelector("#userData");
const score1 = document.querySelector("#score1");
const score2 = document.querySelector("#score2");
const tie = document.querySelector("#tie")

dialog.showModal()

let player1 
let player2 
let draw = 0

function player (name,  marker, score) {
    return {name, marker, score}
}

form.addEventListener("submit", function(event){
    event.preventDefault();

    const player1Name = document.querySelector("#player1Name").value.toLowerCase();
    const player2Name = document.querySelector("#player2Name").value.toLowerCase();

    player1 = player(player1Name,"X", 0);
    player2 = player(player2Name,"O", 0);

    const player1Paragraph = document.querySelector("#firstPlayer");
    const player2Paragraph = document.querySelector("#secondPlayer");

    player1Paragraph.textContent = player1.name
    player2Paragraph.textContent = player2.name


    dialog.close();
})
function createBoard (){
    const grid = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];
    return {grid}
}


let gameboard = createBoard()

function createStatus(){
    let round = 1
    let gameinprogress = true
    return {round, gameinprogress}
}

let gameboardStatus = createStatus()

document.querySelectorAll(".row div").forEach(div => {
    div.addEventListener("click", function(){
        let row = div.parentNode.classList[1];
        let col = div.getAttribute("data-number");

        if (gameboardStatus.gameinprogress) {
            if (gameboard.grid[row][col] !== 1 && gameboard.grid[row][col] !== 2) {
                if (gameboardStatus.round % 2 === 1) {
                    div.textContent = player1.marker;
                    gameboard.grid[row][col] = 1;
                } else if (gameboardStatus.round % 2 === 0) {
                    div.textContent = player2.marker;
                    gameboard.grid[row][col] = 2;
                }
                setTimeout(function(){
                    checkWinners()
                    gameboardStatus.round += 1;},10)
            } 
            else {
                alert("Press a valid square");
            }
        }
        else if(!gameboardStatus.gameinprogress){
            reset()
        }
    });
});

function reset() {
    gameboardStatus = createStatus()
    gameboard = createBoard()
    document.querySelectorAll(".row div").forEach(div => {
        div.textContent = " "
})
}

function checkWinners () {
    for (let i = 0; i < 3; i++){
        if(gameboard.grid[0][i]!==0 && gameboard.grid[0][i]==gameboard.grid[1][i] && gameboard.grid[0][i]==gameboard.grid[2][i]){
            if(gameboardStatus.round % 2 === 1){
                alert(`${player1.name} won`)
                player1.score += 1
                score1.textContent = player1.score
            }
            else if (gameboardStatus.round % 2 === 0){
                alert(`${player2.name} won`)
                player2.score += 1
                score2.textContent = player2.score
            }
            gameboardStatus.gameinprogress = false
        }
        else if(gameboard.grid[i][0]!==0 && gameboard.grid[i][0]==gameboard.grid[i][1] && gameboard.grid[i][0]==gameboard.grid[i][2]){
            if(gameboardStatus.round % 2 === 1){
                alert(`${player1.name} won`)
                player1.score += 1
                score1.textContent = player1.score
            }
            else if (gameboardStatus.round % 2 === 0){
                alert(`${player2.name} won`)
                player2.score += 1
                score2.textContent = player2.score
            }
            gameboardStatus.gameinprogress = false
        }
    }
    if(gameboard.grid[0][2] !==0 && gameboard.grid[0][2]==gameboard.grid[1][1] && gameboard.grid[0][2]==gameboard.grid[2][0]){
        if(gameboardStatus.round % 2 === 1){
            alert(`${player1.name} won`)
            player1.score += 1
            score1.textContent = player1.score
        }
        else if (gameboardStatus.round % 2 === 0){
            alert(`${player2.name} won`)
            player2.score += 1
            score2.textContent = player2.score
        }
        gameboardStatus.gameinprogress = false
    }
    else if(gameboard.grid[0][0] !==0 && gameboard.grid[0][0]==gameboard.grid[1][1] && gameboard.grid[0][0]==gameboard.grid[2][2]){
        if(gameboardStatus.round % 2 === 1){
            alert(`${player1.name} won`)
            player1.score += 1
            score1.textContent = player1.score
        }
        else if (gameboardStatus.round % 2 === 0){
            alert(`${player2.name} won`)
            player2.score += 1
            score2.textContent = player2.score
        }
        gameboardStatus.gameinprogress = false
    }
    else {
        const allFilled = gameboard.grid.flat().every(cell => cell !== 0);
        if (allFilled) {
            alert("It's a draw!");
            gameboardStatus.gameinprogress = false;
            draw +=1
            tie.textContent = draw
        }
    }
}
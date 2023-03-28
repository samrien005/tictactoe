/*window.addEventListener('DOMContentLoaded' , () =>{
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay =document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer =document.querySelector('.announcer');

    let board = ['', '', '',  '', '', '', '', '', '',];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    /* INDEXES
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
    
   const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
   ];

   function handleResultValidation() {
    let roundWon = false;
    for( let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }

    }
   }
   if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
   }
   if (!board.includes(''))
       announce(TIE);   

   const announce = (type) => {
    switch(type){
        case PLAYERO_WON:
            announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
            break;
        case PLAYERX_WON:
            announcer.innerHTML = 'Player <span class="playerX">X</span> Won';   
            break;
        case TIE:
            announcer.innerText = 'Tie';
    }
    announcer.classList.remove('hide');
   };
   const isValidAction = (tile) => {
    if (tile.innerText === 'X' || tile.innerText ==='O'){
        return false;
    }
    return true;
   };


   const updateBoard = (index) => {
    board[index] = currentPlayer;
   }

   const changePlayer = () => {
    playerDisplay .classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
   }

   const userAction = (tile, index) => {
    if(isValidAction(tile) && isGameActive) {
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
   }

   const resetBoard = () =>{
    board =  ['', '', '',  '', '', '', '', '', '',];
    isGameActive = true;
    announcer.classList.add('hide');

    if(currentPlayer === 'O'){
        changePlayer();
    }
    tiles.forEach(tile => {
        tile.innerText ='';
        tile.classList.remove('playerX');
        tile.classList.remove('playerO');
    });
   }
   tiles.forEach( (tile, index) =>{
    tile.addEventListener('click', () => userAction(tile, index));
   });


    resetButton.addEventListener('click' , resetBoard);

});*/

const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
 
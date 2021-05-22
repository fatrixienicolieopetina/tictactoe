const TicTacToe = (function() {
    
    let turn = 'X';
    let playerX;
    let playerO;

    const GameBoard = (function() {
        let gridItems = Array(9).fill('I');

        function resetBoard() {
            gridItems = Array(9).fill('I');
        }

        function setGridItemValue(index) {
            gridItems[index] = turn;
        }

        function checkWinner() {
            checkRowWin();
            checkColumnWin();
            checkDiagonalWin();

            if(checkDraw()) {
                DisplayController.updateInfo(`Tis a Draw`);
            }
        }

        function checkRowWin() {
            for(let i = 0; i < gridItems.length; i+=3) {
                if((gridItems[i] == gridItems[i+1] 
                    && gridItems[i+1] == gridItems[i+2]) 
                    && gridItems[i] != 'I') {
                    DisplayController.changeBackgroundOfWinningCombination(i,
                        i+1, i+2);
                    broadCastWinner();
                }
            }
        }

        function checkColumnWin() {
            for(let i = 0 ; i < (gridItems.length)/3; i++) {
                if((gridItems[i] == gridItems[i+3] 
                    && gridItems[i+3] == gridItems[i+6])
                    && gridItems[i] != 'I') {
                    DisplayController.changeBackgroundOfWinningCombination(i, i+3, i+6);
                    broadCastWinner();
                }
            }
        }

        function checkDiagonalWin() {
            let leftDiagonalWin = gridItems[0] == gridItems[4] 
                    && gridItems[4] == gridItems[8] 
                    && gridItems[0] != 'I';
            let rightDiagonalWin = gridItems[2] == gridItems[4] 
                    && gridItems[4] == gridItems[6] 
                    && gridItems[2] != 'I'

            if(leftDiagonalWin || rightDiagonalWin) {
                if(leftDiagonalWin) {
                    DisplayController.changeBackgroundOfWinningCombination(0, 4, 8);
                } else if(rightDiagonalWin) {
                    DisplayController.changeBackgroundOfWinningCombination(2, 4, 6);
                }
                broadCastWinner();
            }
        }

        function getPreviousTurn() {
            if(turn == 'X') return playerO.playerName;
            else if(turn == 'O') return playerX.playerName;
        }

        function checkDraw() {
            for(let i = 0; i < gridItems.length; i++) {
                if(gridItems[i] == 'I') {
                    return false;
                }
            }

            return true;
        }

        function broadCastWinner() {
            requestAnimationFrame(() => {
                setTimeout(() => {
                    DisplayController.updateInfo(`${getPreviousTurn()} WINS`);
                    DisplayController.removeListeners();
                });
            });
        }

        return {
            setGridItemValue,
            checkWinner,
            checkDraw,
            resetBoard
        }
    }());


    const DisplayController = (function() {
        function initDisplay() {
            let boardItems = document.getElementsByClassName("board-item");

            for(let i = 0; i < boardItems.length; i++) {
                boardItems[i].addEventListener('click', 
                    processPlayerMove, {once: true});
                
            }

            turn = 'X';
        }

        function resetDisplay() {
            let boardItems = document.getElementsByClassName("board-item");

            for(let i = 0; i < boardItems.length; i++) {
                boardItems[i].setAttribute('class', 'board-item');
            }

            initDisplay();
        }

        function removeListeners() {
            let boardItems = document.getElementsByClassName("board-item");

            for(let i = 0; i < boardItems.length; i++) {
                boardItems[i].removeEventListener('click', processPlayerMove);
            }
        }


        function processPlayerMove() {
            displayPlayerMove(this);
            switchTurn(turn);
            GameBoard.checkWinner();
        }

        function displayPlayerMove(element) {
            element.innerText = turn;
            element.setAttribute('class', 'board-item colored');
            GameBoard.setGridItemValue(parseInt(element.id));
        }

        function switchTurn(currentTurn) {
            if(!GameBoard.checkDraw()) {
                if(currentTurn == 'X') {
                    turn = 'O';
                    playerO.makeAmove();
                } else if (currentTurn == 'O') {
                    turn = 'X';
                    playerX.makeAmove();
                } 
            }
        }

        function updateInfo(infoText) {
            let info = document.getElementById("info");
            info.innerText = infoText;
        }

        function changeBackgroundOfWinningCombination(index1, index2, index3) {
            let boardItems = document.getElementsByClassName('board-item');
            boardItems[index1].setAttribute('class', 'board-item winner');
            boardItems[index2].setAttribute('class', 'board-item winner');
            boardItems[index3].setAttribute('class', 'board-item winner');
        }

        return {
            initDisplay,
            resetDisplay,
            updateInfo,
            removeListeners,
            changeBackgroundOfWinningCombination
        }
    })();

    //moveType would either be 'X' or 'O'
    const createPlayer = ({playerName, moveType}) => ({
        playerName,
        moveType,
        makeAmove() {
            requestAnimationFrame(() => {
                setTimeout(() => {
                    DisplayController.updateInfo(`${playerName} should make a move.`);
                });
              });
        }
    });

    function addRestartEventListener() {
        document.getElementById("restart-btn").addEventListener('click', function() {
            requestAnimationFrame(() => {
                setTimeout(() => {
                    DisplayController.updateInfo('X should make a move');
                    GameBoard.resetBoard();
                    DisplayController.resetDisplay();
                });
            });
        });
    }

    function start() {
        playerX = createPlayer({playerName: 'XXX', moveType: 'X'});
        playerO = createPlayer({playerName: 'OOO', moveType: 'O'});
        DisplayController.initDisplay();
        addRestartEventListener();
    }

    return {start};
})();

TicTacToe.start();

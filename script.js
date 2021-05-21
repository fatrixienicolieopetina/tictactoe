const TicTacToe = (function() {
    
    let turn = 'X';
    let playerX;
    let playerO;

    const GameBoard = (function() {
        let gridItems = Array(9).fill('I');

        function setValue(index) {
            gridItems[index] = turn;
        }

        function checkWinner() {
            //check row
            for(let i = 0; i < gridItems.length; i+=3) {
                if((gridItems[i] == gridItems[i+1] 
                    && gridItems[i+1] == gridItems[i+2]) 
                    && gridItems[0] != 'I') {
                    alert("winner");
                }
            }

            //check column
            for(let i = 0 ; i < (gridItems.length)/3; i++) {
                if((gridItems[i] == gridItems[i+3] 
                    && gridItems[i+3] == gridItems[i+6])
                    && gridItems[i] != 'I') {
                    alert("winner");
                }
            }

            //check diagonals
            if((gridItems[0] == gridItems[4] 
                && gridItems[4] == gridItems[8] 
                && gridItems[0] != 'I')|| 
                (gridItems[2] == gridItems[4] 
                    && gridItems[4] == gridItems[6] 
                    && gridItems[0] != 'I')) {
                    alert("winning")
            }

        }

        function itemsHaveTheSameValue(items) {
            return items.every((val, i, arr) => val === arr[0] )
        }

        return {
            setValue,
            checkWinner
        }
    }());


    const DisplayController = (function() {
        let latestMove = '';
        function initDisplay() {
            let boardItems = document.getElementsByClassName("board-item");

            for(let i = 0; i < boardItems.length; i++) {
                boardItems[i].addEventListener('click', 
                    processPlayerMove, {once: true});
                
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
            GameBoard.setValue(parseInt(element.id));
        }

        function switchTurn(currentTurn) {
            if(currentTurn == 'X') {
                turn = 'O'
                playerO.makeAmove();
            } else if (currentTurn == 'O') {
                turn = 'X';
                playerX.makeAmove();
            }
        }

        return {
            initDisplay
        }
    })();

    //moveType would either be 'X' or 'O'
    const createPlayer = ({playerName, moveType}) => ({
        playerName,
        moveType,
        makeAmove() {
            alert(`${playerName} makes a move`)
            /**
             * To-do : Add logic here for making a player move based on moveType
             */
        }
    });

    function setTurn() {

    }

    function start() {
        playerX = createPlayer({playerName: 'XXX', moveType: 'X'});
        playerO = createPlayer({playerName: 'OOO', moveType: 'O'});
        DisplayController.initDisplay();
        playerX.makeAmove();
    }

    return {start};
})();

TicTacToe.start();
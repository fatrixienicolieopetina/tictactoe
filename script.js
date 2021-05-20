const TicTacToe = (function() {
    
    let turn = 'X';

    const GameBoard = (function() {
        let gridItems = Array(3).fill(Array.fill(3).fill('I'));

        function checkWinner() {
            for(let i = 0; i < gridItems.length; i++) {
                let rowItems = gridItems[i];
                if(itemsHaveTheSameValue) {
                    break;
                }
            }

            for(let i = 0; i < gridItems.length * 3; i+=3) {
                if(gridItems[i] == gridItems[i+1] == gridItems[i+2]) {
                    break;
                }
            }

        }

        function itemsHaveTheSameValue(items) {
            return items.every((val, i, arr) => val === arr[0] )
        }
        return {
            gridItems,
        }
    }());


    const DisplayController = (function() {
        let latestMove = '';
        function initDisplay() {
            let boardItems = document.getElementsByClassName("board-item");

            for(let i = 0; i < boardItems.length; i++) {
                boardItems[i].addEventListener('click', 
                    displayPlayerMove, {once: true});
                
            }
        }

        function displayPlayerMove() {
            this.innerText = turn;
            this.setAttribute('class', 'board-item colored');
            switchTurn(turn);
            console.log("turn " + turn);
        }

        function switchTurn(currentTurn) {
            if(currentTurn == 'X') {
                turn = 'O'
            } else if (currentTurn == 'O') {
                turn = 'X';
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
            /**
             * To-do : Add logic here for making a player move based on moveType
             */
        }
    });

    function setTurn() {

    }

    function start() {
        let playerX = createPlayer({playerName: 'XXX', moveType: 'X'});
        let playerO = createPlayer({playerName: 'OOO', moveType: 'O'});
        DisplayController.initDisplay();
        playerX.makeAmove();
    }

    return {start};
})();

TicTacToe.start();
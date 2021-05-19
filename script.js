const TicTacToe = (function() {
    
    let turn = 'X';

    const GameBoard = (function() {
        let gridItems = Array(9).fill('I');

        function isGridItemNotFilled(index) {
            return gridItems[index] !== 'I';
        }

        function isGameBoardAllFilled() {
            return !gridItems.includes('I');
        }

        function fillGridItem(index, moveType) {
            if(gridItems[index] === 'I') {
                gridItems[index] = moveType;
            }
        }

        return {
            gridItems,
            isGridItemNotFilled,
            isGameBoardAllFilled,
            fillGridItem
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
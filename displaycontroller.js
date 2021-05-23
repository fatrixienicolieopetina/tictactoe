const DisplayController = (function() {

    let human = 'X';

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

        GameBoard.checkWinner(GameBoard.getGridItems());
    }

    function bestMove(board) {

        let bestScore = -Infinity;
        let bestMove;
        
        for (let i = 0; i < 9; i++) {
            if (board[i] == 'I') {
                board[i] = getAI();
                let score = GameBoard.minimax(board, 0, false);
                board[i] = 'I';
                if (score > bestScore) {
                    bestScore = score;
                    bestMove =  i;
                }
            }
        }

        if(bestMove != undefined) {
            board[bestMove] = getAI();
    
            let element = document.getElementById(bestMove);
            element.innerText = getAI();
            element.setAttribute('class', 'board-item colored');
            GameBoard.setGridItemValue(bestMove);
            turn = getHuman();
        }    
       
        
                
    }
    function displayPlayerMove(element) {
        element.innerText = turn;
        element.setAttribute('class', 'board-item colored');
        GameBoard.setGridItemValue(parseInt(element.id));
    }

    function switchTurn(currentTurn) {
        if(currentTurn == 'X') {
            turn = 'O';

            let board = GameBoard.getGridItems();
            bestMove(board);
            turn = 'X';    
        } else if (currentTurn == 'O') {
            turn = 'X';
            playerX.makeAmove();
        } 

        if(GameBoard.checkWinner(GameBoard.getGridItems()) != null) {
            GameBoard.broadCastWinner();
            let winningCombo = GameBoard.getWinningMoves(GameBoard.getGridItems());
            if(winningCombo != null) {
                changeBackgroundOfWinningCombination(winningCombo[0], winningCombo[1], winningCombo[2]);
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

    function getAI() {
        if(human == 'O') {
            return 'X';
        }

        return 'O';
    }

    function getHuman() {
        return human;
    }

    return {
        initDisplay,
        resetDisplay,
        updateInfo,
        getAI,
        getHuman,
        removeListeners,
        changeBackgroundOfWinningCombination
    }
})();
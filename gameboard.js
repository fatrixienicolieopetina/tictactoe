const GameBoard = (function() {
    let gridItems = Array(9).fill('I');

    function resetBoard() {
        gridItems = Array(9).fill('I');
    }

    function setGridItemValue(index) {
        gridItems[index] = turn;
    }

    function getGridItems() {
        return gridItems.slice(0);
    }

    function checkWinner(board) {
        if(checkDraw(board)) {
            return "tie";
        }

        if(checkRowWin(board) || checkColumnWin(board) || checkDiagonalWin(board)) {
            return winner;
        }

        return null;
    }

    function checkRowWin(board) {
        for(let i = 0; i < board.length; i+=3) {
            if((board[i] == board[i+1] 
                && board[i+1] == board[i+2]) 
                && board[i] != 'I') {
                winner = board[i];
                return true;
            }
        }

        return false;
    }

    function getWinningMoves(board) {
        for(let i = 0 ; i < (gridItems.length)/3; i++) {
            if((board[i] == board[i+3] 
                && board[i+3] == board[i+6])
                && board[i] != 'I') {
                    return [i, i+3, i+6];
            }
        }

        let leftDiagonalWin = board[0] == board[4] 
        && board[4] == board[8] 
        && board[0] != 'I';
        let rightDiagonalWin = board[2] == board[4] 
        && board[4] == board[6] 
        && board[2] != 'I';

        if(leftDiagonalWin || rightDiagonalWin) {
            if(leftDiagonalWin) {
                return [0, 4, 8];
            } else if(rightDiagonalWin) {
                return [2, 4, 6];
            }

        }

        for(let i = 0; i < board.length; i+=3) {
            if((board[i] == board[i+1] 
                && board[i+1] == board[i+2]) 
                && board[i] != 'I') {
                    return [i, i+1, i+2];
            }
        }
        
        return null;
    }

    function checkColumnWin(board) {
        for(let i = 0 ; i < (gridItems.length)/3; i++) {
            if((board[i] == board[i+3] 
                && board[i+3] == board[i+6])
                && board[i] != 'I') {
                winner = board[i];
                return true;
            }
        }

        return false;
    }

    function checkDiagonalWin(board) {
        let leftDiagonalWin = board[0] == board[4] 
                && board[4] == board[8] 
                && board[0] != 'I';
        let rightDiagonalWin = board[2] == board[4] 
                && board[4] == board[6] 
                && board[2] != 'I';

        if(leftDiagonalWin || rightDiagonalWin) {
            if(leftDiagonalWin) {
                winner = board[0];
            } else if(rightDiagonalWin) {
                winner = board[2];
            }

            return true;
        }

        return false;
    }

    function getPreviousTurn() {
        if(turn == 'X') return 'O';
        else if(turn == 'O') return 'X';
    }

    function checkDraw(board) {
        for(let i = 0; i < board.length; i++) {
            if(board[i] == 'I') {
                return false;
            }
        }

        return true;
    }

    function broadCastWinner() {
        requestAnimationFrame(() => {
            setTimeout(() => {
                let board = GameBoard.getGridItems();

                if(checkDraw(board)) {
                    DisplayController.updateInfo(`iz a draw`);
                } else {
                    DisplayController.updateInfo(`${getPreviousTurn()} WINS`);
                }
                
                DisplayController.removeListeners();
            });
        });
    }

    function minimax(board, depth, isMaximizing) {
        let win = checkWinner(board);
        if(win == 'X') {
           return -1;
        } else if(win == 'O') {
            return 1;
        } else if(win == 'tie') {
            return 0;
        }

        if(isMaximizing) {
            let bestScore = -Infinity;
            for(let i = 0; i < board.length; i++) {
                if(board[i] == 'I') {
                    board[i] = DisplayController.getAI(); 
                    let score = minimax(board, depth + 1, false);
                    board[i] = 'I';
                    bestScore = Math.max(score, bestScore);
                }
                
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for(let i = 0; i < board.length; i++) {
                if(board[i] == 'I') {
                    board[i] = DisplayController.getHuman(); 
                    let score = minimax(board, depth + 1, true);
                    bestScore = Math.min(score, bestScore);
                    board[i] = 'I';
                } 
            }
            return bestScore;
        }
    }
    
    return {
        setGridItemValue,
        checkWinner,
        checkDraw,
        resetBoard,
        minimax,
        getGridItems,
        broadCastWinner,
        getWinningMoves
    }
}());
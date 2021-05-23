

const TicTacToe = (function() {
    let turn = 'X';
    let playerX;
    let playerO;

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

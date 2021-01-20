// TTT
const Gameboard = (() => {
  resetBtn = document.getElementById('reset');
  message = document.getElementById('winning-message');

  let _board = [];
  let _gameOver = false;

  let player1 = '';
  let player2 = '';
  let _playerTurn = '';

  const validMove = (e) => {
    _gameOver
      ? false
      : e.target.classList.contains('game-square')
      ? _board.includes(`${player1.playerSymbol}${e.target.id}`) ||
        _board.includes(`${player2.playerSymbol}${e.target.id}`)
        ? false
        : displayMove(e)
      : false;
  };

  const displayMove = (e) => {
    _playerTurn === player1 ? (_playerTurn = player2) : (_playerTurn = player1);

    clickedSquare = document.getElementById(`${e.target.id}`);
    clickedSquare.innerHTML = _playerTurn.playerSymbol;

    _board.push(`${_playerTurn.playerSymbol}${e.target.id}`);

    if (_board.length >= 5) {
      checkEndGame();
    }
  };

  window.addEventListener('touchstart', validMove);
  window.addEventListener('click', validMove);

  const resetBoard = () => {
    _board = [];
    _gameOver = false;
    gameSquares = document.querySelectorAll('.game-square');
    gameSquares.forEach((square) => {
      square.innerHTML = '';
    });
    message.innerHTML = '';
  };

  resetBtn.addEventListener('click', resetBoard);

  const checkEndGame = () => {
    console.log(_board);

    const winningMessage = () => {
      _gameOver = true;
      _playerTurn.playerScore += 1;

      message.innerHTML = `${_playerTurn.playerName} Wins!`;
    };

    (_board.includes('X1') && _board.includes('X2') && _board.includes('X3')) ||
    (_board.includes('O1') && _board.includes('O2') && _board.includes('O3'))
      ? winningMessage()
      : false;

    (_board.includes('X4') && _board.includes('X5') && _board.includes('X6')) ||
    (_board.includes('O4') && _board.includes('O5') && _board.includes('O6'))
      ? winningMessage()
      : false;

    (_board.includes('X7') && _board.includes('X8') && _board.includes('X9')) ||
    (_board.includes('O7') && _board.includes('O8') && _board.includes('O9'))
      ? winningMessage()
      : false;

    (_board.includes('X1') && _board.includes('X4') && _board.includes('X7')) ||
    (_board.includes('O1') && _board.includes('O4') && _board.includes('O7'))
      ? winningMessage()
      : false;

    (_board.includes('X2') && _board.includes('X5') && _board.includes('X8')) ||
    (_board.includes('O2') && _board.includes('O5') && _board.includes('O8'))
      ? winningMessage()
      : false;

    (_board.includes('X3') && _board.includes('X6') && _board.includes('X9')) ||
    (_board.includes('O3') && _board.includes('O6') && _board.includes('O9'))
      ? winningMessage()
      : false;

    (_board.includes('X1') && _board.includes('X5') && _board.includes('X9')) ||
    (_board.includes('O1') && _board.includes('O5') && _board.includes('O9'))
      ? winningMessage()
      : false;

    (_board.includes('X3') && _board.includes('X5') && _board.includes('X7')) ||
    (_board.includes('O3') && _board.includes('O5') && _board.includes('O7'))
      ? winningMessage()
      : false;

    _board.length === 9 && !_gameOver
      ? ((_gameOver = true), (message.innerHTML = `It's a Draw!`))
      : false;
  };

  // Handle player data:
  const Player = (name, symbol, score, type) => {
    const playerName = name;
    const playerSymbol = symbol;
    const playerScore = score;
    const playerType = type;

    return { playerName, playerSymbol, playerScore, playerType };
  };

  const startGame = () => {
    const modal = document.getElementById('modal');
    let enteredPlayer1Name = document.getElementById('name1').value;
    let enteredPlayer2Name = document.getElementById('name2').value;

    player1 = Player(enteredPlayer1Name, 'X', 0, 'person');
    player2 = Player(enteredPlayer2Name, 'O', 0, 'person');

    enteredPlayer1Name && enteredPlayer2Name
      ? modal.classList.add('hide-modal')
      : false;
  };

  startBtn = document.getElementById('start-btn');
  startBtn.addEventListener('click', startGame);
})();

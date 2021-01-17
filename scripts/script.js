// Handle all visual changes:
const Gameboard = (() => {
  let _board = [];
  gameOver = false;
  // const checkBoard = () => {
  //   return _board;
  // };

  let _playerTurn = '';

  const validMove = (e) => {
    gameOver
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
    controller();
  };

  window.addEventListener('touchstart', validMove);
  window.addEventListener('click', validMove);

  const controller = () => {
    console.log(_board);

    // End Game
    (_board.includes('X1') && _board.includes('X2') && _board.includes('X3')) ||
    (_board.includes('O1') && _board.includes('O2') && _board.includes('O3'))
      ? ((gameOver = true), console.log(`${_playerTurn.playerName} Wins!`))
      : false;

    (_board.includes('X4') && _board.includes('X5') && _board.includes('X6')) ||
    (_board.includes('O4') && _board.includes('O5') && _board.includes('O6'))
      ? ((gameOver = true), console.log(`${_playerTurn.playerName} Wins!`))
      : false;

    (_board.includes('X7') && _board.includes('X8') && _board.includes('X9')) ||
    (_board.includes('O7') && _board.includes('O8') && _board.includes('O9'))
      ? ((gameOver = true), console.log(`${_playerTurn.playerName} Wins!`))
      : false;

    (_board.includes('X1') && _board.includes('X4') && _board.includes('X7')) ||
    (_board.includes('O1') && _board.includes('O4') && _board.includes('O7'))
      ? ((gameOver = true), console.log(`${_playerTurn.playerName} Wins!`))
      : false;

    (_board.includes('X2') && _board.includes('X5') && _board.includes('X8')) ||
    (_board.includes('O2') && _board.includes('O5') && _board.includes('O8'))
      ? ((gameOver = true), console.log(`${_playerTurn.playerName} Wins!`))
      : false;

    (_board.includes('X3') && _board.includes('X6') && _board.includes('X9')) ||
    (_board.includes('O3') && _board.includes('O6') && _board.includes('O9'))
      ? ((gameOver = true), console.log(`${_playerTurn.playerName} Wins!`))
      : false;

    (_board.includes('X1') && _board.includes('X5') && _board.includes('X9')) ||
    (_board.includes('O1') && _board.includes('O5') && _board.includes('O9'))
      ? ((gameOver = true), console.log(`${_playerTurn.playerName} Wins!`))
      : false;

    (_board.includes('X3') && _board.includes('X5') && _board.includes('X7')) ||
    (_board.includes('O3') && _board.includes('O5') && _board.includes('O7'))
      ? ((gameOver = true), console.log(`${_playerTurn.playerName} Wins!`))
      : false;

    _board.length === 9 && !gameOver ? (gameOver = true) : false;
  };

  // return { checkBoard };
})();

// Handle player data:
const Player = (name, symbol) => {
  const playerName = name;
  const playerSymbol = symbol;

  return { playerName, playerSymbol };
};

const player1 = Player('Riley', 'X');
const player2 = Player('Mary', 'O');

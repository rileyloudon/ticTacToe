// Handle all visual changes:
const Gameboard = (() => {
  const _board = [];
  const checkBoard = () => {
    return _board;
  };

  let _playerTurn = '';

  const userMove = (e) => {
    e.target.classList.contains('game-square')
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

    console.log(_board);
  };

  window.addEventListener('touchstart', userMove);
  window.addEventListener('click', userMove);

  return { checkBoard };
})();

// Handle player data:
const Player = (name, symbol) => {
  const playerName = name;
  const playerSymbol = symbol;

  return { playerName, playerSymbol };
};

const player1 = Player('Riley', 'X');
const player2 = Player('Loudon', 'O');

// Handle game backend
const Controller = (() => {})();

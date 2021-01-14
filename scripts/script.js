// Handle all visual changes:
const Gameboard = (() => {
  const _board = [];
  const checkBoard = () => {
    return _board;
  };

  const userMove = (e) => {
    e.target.classList.contains('game-square')
      ? _board.includes('X' + e.target.id || 'O' + e.target.id)
        ? false
        : displayMove(e)
      : false;
  };

  const displayMove = (e) => {
    clickedSquare = document.getElementById(`${e.target.id}`);
    clickedSquare.innerHTML = player1.checkSymbol;
    _board.push(`${player1.checkSymbol}` + e.target.id);

    console.log(_board);
  };

  window.addEventListener('touchstart', userMove);
  window.addEventListener('click', userMove);

  return { checkBoard };
})();

// Handle player data:
const Player = (name, symbol) => {
  const checkName = name;
  const checkSymbol = symbol;

  return { checkName, checkSymbol };
};

// Handle game backend
const Controller = (() => {
  // let playerTurn = player1;
  // playerTurn === player1 ? playerTurn === player2 : playerTurn === player1;
})();

const player1 = Player('Riley', 'X');
const player2 = Player('Loudon', 'O');

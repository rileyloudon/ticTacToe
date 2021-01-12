const Gameboard = (() => {
  const board = [];
  const checkBoard = () => {
    return board;
  };
  return { checkBoard };
})();

const Players = (name, symbol) => {
  const player1 = {
    name: 'Player 1',
    symbol: 'X',
  };
  const player2 = {
    name: 'Player 2',
    symbol: 'O',
  };
  return { player1, player2 };
};

const Controller = (() => {})();

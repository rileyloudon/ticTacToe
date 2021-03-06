// TTT
const Gameboard = (() => {
  const resetBtn = document.getElementById('reset');
  const message = document.getElementById('winning-message');

  let _board = [];
  let _gameOver = false;

  let player1 = '';
  let player2 = '';
  let _playerTurn = '';

  // Winning board combos
  const checkBoard = () => {
    return (
      (_board.includes('X1') &&
        _board.includes('X2') &&
        _board.includes('X3')) ||
      (_board.includes('O1') &&
        _board.includes('O2') &&
        _board.includes('O3')) ||
      (_board.includes('X4') &&
        _board.includes('X5') &&
        _board.includes('X6')) ||
      (_board.includes('O4') &&
        _board.includes('O5') &&
        _board.includes('O6')) ||
      (_board.includes('X7') &&
        _board.includes('X8') &&
        _board.includes('X9')) ||
      (_board.includes('O7') &&
        _board.includes('O8') &&
        _board.includes('O9')) ||
      (_board.includes('X1') &&
        _board.includes('X4') &&
        _board.includes('X7')) ||
      (_board.includes('O1') &&
        _board.includes('O4') &&
        _board.includes('O7')) ||
      (_board.includes('X2') &&
        _board.includes('X5') &&
        _board.includes('X8')) ||
      (_board.includes('O2') &&
        _board.includes('O5') &&
        _board.includes('O8')) ||
      (_board.includes('X3') &&
        _board.includes('X6') &&
        _board.includes('X9')) ||
      (_board.includes('O3') &&
        _board.includes('O6') &&
        _board.includes('O9')) ||
      (_board.includes('X1') &&
        _board.includes('X5') &&
        _board.includes('X9')) ||
      (_board.includes('O1') &&
        _board.includes('O5') &&
        _board.includes('O9')) ||
      (_board.includes('X3') &&
        _board.includes('X5') &&
        _board.includes('X7')) ||
      (_board.includes('O3') && _board.includes('O5') && _board.includes('O7'))
    );
  };

  // Human player type
  const validMove = (e) => {
    if (
      !_gameOver &&
      _playerTurn.playerType === 'human' &&
      e.target.classList.contains('game-square') &&
      !(
        _board.includes(`${player1.playerSymbol}${e.target.id}`) ||
        _board.includes(`${player2.playerSymbol}${e.target.id}`)
      )
    ) {
      displayMove(e);
    }
  };

  const displayMove = (e) => {
    const clickedSquare = document.getElementById(`${e.target.id}`);
    clickedSquare.innerHTML = _playerTurn.playerSymbol;

    _board.push(`${_playerTurn.playerSymbol}${e.target.id}`);

    if (_board.length >= 5) {
      checkEndGame();
    }

    _playerTurn === player1 ? (_playerTurn = player2) : (_playerTurn = player1);

    if (!_gameOver && _playerTurn.playerType === 'computer') {
      setTimeout(displayComputerMove, 500);
    }
  };

  window.addEventListener('touchstart', validMove);
  window.addEventListener('click', validMove);

  // Computer player type
  const displayComputerMove = () => {
    let computerSelection;
    let opponent =
      _playerTurn === player1 ? player2.playerSymbol : player1.playerSymbol;

    const allSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let availableSquares = allSquares.filter((square) => {
      return !_board.includes('X' + square) && !_board.includes('O' + square);
    });

    // check if the computer can win with this turn
    for (let i = 0; i < availableSquares.length; i++) {
      _board.push(`${_playerTurn.playerSymbol}${availableSquares[i]}`);
      if (checkBoard()) {
        computerSelection = availableSquares[i];
        _board.splice(-1, 1);
        break;
      } else {
        _board.splice(-1, 1);
      }
    }

    // if the computer can't win, check if the opponent can win
    if (!computerSelection) {
      for (let i = 0; i < availableSquares.length; i++) {
        _board.push(`${opponent}${availableSquares[i]}`);
        if (checkBoard()) {
          computerSelection = availableSquares[i];
          _board.splice(-1, 1);
          break;
        } else {
          _board.splice(-1, 1);
        }
      }
    }

    // If no one can win, pick a random square
    if (!computerSelection) {
      computerSelection =
        availableSquares[Math.floor(Math.random() * availableSquares.length)];
    }

    _board.push(`${_playerTurn.playerSymbol}${computerSelection}`);

    const computerSquare = document.getElementById(`${computerSelection}`);
    computerSquare.innerHTML = _playerTurn.playerSymbol;

    if (_board.length >= 5) {
      checkEndGame();
    }

    _playerTurn === player1 ? (_playerTurn = player2) : (_playerTurn = player1);

    if (!_gameOver && _playerTurn.playerType === 'computer') {
      setTimeout(displayComputerMove, 500);
    }
  };

  // Reset board for a new game with same players
  const resetBoard = () => {
    _board = [];
    _gameOver = false;
    const gameSquares = document.querySelectorAll('.game-square');
    gameSquares.forEach((square) => {
      square.innerHTML = '';
    });
    message.innerHTML = '';

    _playerTurn.playerType === 'computer'
      ? setTimeout(displayComputerMove, 250)
      : false;
  };

  resetBtn.addEventListener('click', resetBoard);

  // Check if win condition is met
  const checkEndGame = () => {
    const winningMessage = () => {
      _gameOver = true;
      _playerTurn.playerScore += 1;

      _playerTurn === player1
        ? (message.innerHTML = `${_playerTurn.playerName} Wins! The score is ${player1.playerScore} - ${player2.playerScore}`)
        : (message.innerHTML = `${_playerTurn.playerName} Wins! The score is ${player2.playerScore} - ${player1.playerScore}`);
    };

    checkBoard() ? winningMessage() : false;

    _board.length === 9 && !_gameOver
      ? ((_gameOver = true), (message.innerHTML = `It's a Draw!`))
      : false;
  };

  // Hide modal, start game with player data
  const startGame = () => {
    const modal = document.getElementById('modal');
    const enteredPlayer1Name = document.getElementById('name1').value;
    const enteredPlayer2Name = document.getElementById('name2').value;

    const player1Type = Array.from(document.getElementsByName('p1-type')).find(
      (item) => item.checked,
    ).value;
    const player2Type = Array.from(document.getElementsByName('p2-type')).find(
      (item) => item.checked,
    ).value;

    if (enteredPlayer1Name && enteredPlayer2Name) {
      modal.classList.add('hide-modal');
      player1 = Player(enteredPlayer1Name, 'X', 0, player1Type);
      player2 = Player(enteredPlayer2Name, 'O', 0, player2Type);
      _playerTurn = player1;
      player1Type === 'computer' ? setTimeout(displayComputerMove, 250) : false;
    }
  };

  const startBtn = document.getElementById('start-btn');
  startBtn.addEventListener('click', startGame);
})();

// Handle player data:
const Player = (name, symbol, score, type) => {
  const playerName = name;
  const playerSymbol = symbol;
  const playerScore = score;
  const playerType = type;

  return { playerName, playerSymbol, playerScore, playerType };
};

import Gamecontroller from './gamecontroller.js';

export function renderBoard(boardElement, gameboard) {
  boardElement.replaceChildren();
  const fragment = document.createDocumentFragment();
  const grid = gameboard.grid;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;

      if (grid[r][c] === 'hit') cell.classList.add('hit-cell');
      if (grid[r][c] === 'miss') cell.classList.add('miss-cell');
      if (
        boardElement.id === 'player-board' &&
        typeof grid[r][c] === 'object' &&
        grid[r][c] !== null
      ) {
        cell.classList.add('ship-cell');
      }

      fragment.appendChild(cell);
    }
  }
  boardElement.appendChild(fragment);
}

export function setupUI() {
  const game = new Gamecontroller();

  const playerBoardEl = document.getElementById('player-board');
  const computerBoardEl = document.getElementById('computer-board');

  renderBoard(playerBoardEl, game.realPlayer.gameboard);
  renderBoard(computerBoardEl, game.computerPlayer.gameboard);

  computerBoardEl.addEventListener('click', (e) => {
    if (!e.target.classList.contains('cell')) return;

    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);

    game.playRound([row, col]);

    renderBoard(playerBoardEl, game.realPlayer.gameboard);
    renderBoard(computerBoardEl, game.computerPlayer.gameboard);

    if (game.winner) {
      alert(
        `${game.winner.type === 'real' ? 'You' : 'The Computer'} has won the game!`
      );
    }
  });
}

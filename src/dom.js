import Gamecontroller from './gamecontroller.js';
import Ship from './ship.js';

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
      if (boardElement.id === 'player-board' && typeof grid[r][c] === 'object' && grid[r][c] !== null) {
        cell.classList.add('ship-cell');
      }

      fragment.appendChild(cell);
    }
  }
  boardElement.appendChild(fragment);
}

export function setupUI() {
  const game = new Gamecontroller();

  game.computerPlayer.placeComputerShips();

  let currentOrientation = 'horizontal';

  const rotateBtn = document.getElementById('rotate-btn');
  const dockyard = document.getElementById('dockyard');
  const layoutContainer = document.getElementById('layout-container');
  const ships = document.querySelectorAll('.ship');

  const playerBoardEl = document.getElementById('player-board');
  const computerBoardEl = document.getElementById('computer-board');

  rotateBtn.addEventListener('click', () => {
    currentOrientation = currentOrientation === 'horizontal' ? 'vertical' : 'horizontal';
    rotateBtn.textContent = `Rotate Ships: ${currentOrientation.toUpperCase()}`;
    dockyard.classList.toggle('vertical-layout');
    ships.forEach((ship) => {
      ship.classList.toggle('vertical');
    });
  });

  let draggedShipOffset = 0;

  ships.forEach((ship) => {
    ship.addEventListener('mousedown', (e) => {
      if (currentOrientation === 'horizontal') {
        draggedShipOffset = Math.floor(e.offsetX / 30);
      } else {
        draggedShipOffset = Math.floor(e.offsetY / 30);
      }
    });

    ship.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', ship.dataset.length);
      e.dataTransfer.setData('text/id', ship.id);
      e.dataTransfer.setData('text/offset', draggedShipOffset.toString());
    });
  });

  renderBoard(playerBoardEl, game.realPlayer.gameboard);
  renderBoard(computerBoardEl, game.computerPlayer.gameboard);

  playerBoardEl.addEventListener('dragover', (e) => {
    if (!e.target.classList.contains('cell')) return;
    e.preventDefault();
  });

  playerBoardEl.addEventListener('drop', (e) => {
    if (!e.target.classList.contains('cell')) return;

    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    const length = parseInt(e.dataTransfer.getData('text/plain'));
    const shipId = e.dataTransfer.getData('text/id');

    const offset = parseInt(e.dataTransfer.getData('text/offset'));
    let startRow = row;
    let startCol = col;

    if (currentOrientation === 'horizontal') {
      startCol -= offset;
    } else {
      startRow -= offset;
    }
    const newShip = new Ship(length);
    const success = game.realPlayer.gameboard.placeShip(newShip, [startRow, startCol], currentOrientation);

    if (success) {
      const placedShip = document.getElementById(shipId);
      if (placedShip) placedShip.remove();

      renderBoard(playerBoardEl, game.realPlayer.gameboard);

      if (dockyard.children.length === 0) {
        layoutContainer.classList.add('hidden');
        computerBoardEl.classList.remove('hidden');
      }
    }
  });

  computerBoardEl.addEventListener('click', (e) => {
    if (!layoutContainer.classList.contains('hidden')) return;
    if (!e.target.classList.contains('cell')) return;

    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);

    game.playRound([row, col]);

    renderBoard(playerBoardEl, game.realPlayer.gameboard);
    renderBoard(computerBoardEl, game.computerPlayer.gameboard);

    if (game.winner) {
      alert(`${game.winner.type === 'real' ? 'You' : 'The Computer'} has won the game!`);
    }
  });
}

import Gameboard from './gameboard.js';
import Ship from './ship.js';

export default class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard();
    if (this.type === 'computer') {
      this.attackedCoordinates = [];
      this.allShipSizes = [5, 4, 3, 3, 2];
      this.targetStack = [];
      this.firstHit = null;
      this.currentDirection = null;
    }
  }

  makeRandomMove(enemyBoard) {
    let row;
    let col;

    // Pick coordinate
    if (this.targetStack.length === 0) {
      // Random mode
      this.firstHit = null;
      this.currentDirection = null;

      let isUnique = false;
      while (!isUnique) {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
        if (!this.attackedCoordinates.includes(`${row},${col}`)) isUnique = true;
      }
    } else {
      // Target mode
      const nextTarget = this.targetStack.pop();
      row = nextTarget[0];
      col = nextTarget[1];
    }

    // Shoot at coordinate
    this.attackedCoordinates.push(`${row},${col}`);
    let isHit = enemyBoard.recieveAttack([row, col]);

    if (isHit) {
      if (!this.firstHit) {
        this.firstHit = [row, col]; // new ship

        // the 4 direction around the hit
        const potentials = [
          [row - 1, col, 'vertical'],
          [row + 1, col, 'vertical'],
          [row, col - 1, 'horizontal'],
          [row, col + 1, 'horizontal'],
        ];

        potentials.forEach(([r, c, dir]) => {
          if (r >= 0 && r < 10 && c >= 0 && c < 10 && !this.attackedCoordinates.includes(`${r},${c}`)) {
            this.targetStack.push([r, c, dir]);
          }
        });
      } else {
        // Expert mode (lock in the direction)
        if (!this.currentDirection) {
          this.currentDirection = row === this.firstHit[0] ? 'horizontal' : 'vertical';
          this.targetStack = this.targetStack.filter(([, , dir]) => dir === this.currentDirection);
        }

        const extensions = [];
        if (this.currentDirection === 'horizontal') {
          extensions.push([row, col - 1, 'horizontal']);
          extensions.push([row, col + 1, 'horizontal']);
        } else {
          extensions.push([row - 1, col, 'vertical']);
          extensions.push([row + 1, col, 'vertical']);
        }

        extensions.forEach(([r, c, dir]) => {
          const withinBounds = r >= 0 && r < 10 && c >= 0 && c < 10;
          const notAttacked = !this.attackedCoordinates.includes(`${r},${c}`);
          const notInStack = !this.targetStack.some(([sr, sc]) => sr === r && sc === c);

          if (withinBounds && notAttacked && notInStack) {
            this.targetStack.push([r, c, dir]);
          }
        });
      }
    }
  }

  placeComputerShips() {
    for (const shipSize of this.allShipSizes) {
      let isShipPlaced = false;

      while (!isShipPlaced) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const shipDirection = Math.random() > 0.5 ? 'horizontal' : 'vertical';

        const ship = new Ship(shipSize);

        isShipPlaced = this.gameboard.placeShip(ship, [row, col], shipDirection);
      }
    }
  }
}

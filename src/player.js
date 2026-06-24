import Gameboard from './gameboard.js';
import Ship from './ship.js';

export default class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard();
    if (this.type === 'computer') {
      this.attackedCoordinates = [];
      this.allShipSizes = [5, 4, 3, 3, 2];
    }
  }

  makeRandomMove(enemyBoard) {
    let row, col, coordString;
    let isUnique = false;

    while (!isUnique) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      coordString = `${row},${col}`;

      if (!this.attackedCoordinates.includes(coordString)) {
        isUnique = true;
      }
    }
    enemyBoard.recieveAttack([row, col]);
    this.attackedCoordinates.push(coordString);
  }

  placeComputerShips() {
    for (const shipSize of this.allShipShizes) {
      let isShipPlaced = false;

      while (!isShipPlaced) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const shipDirection = Math.random() > 0.5 ? 'horizontal' : 'vertical';

        const ship = new Ship(shipSize);

        isShipPlaced = this.gameboard.placeShip(
          ship,
          [row, col],
          shipDirection
        );
      }
    }
  }
}

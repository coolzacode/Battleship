import Gameboard from './gameboard.js';
export default class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard();
    if (this.type === 'computer') {
      this.attackedCoordinates = [];
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
}

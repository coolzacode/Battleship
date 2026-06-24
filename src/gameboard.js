export default class Gameboard {
  constructor() {
    this.grid = this.generateArray();
    this.missedAttacks = [];
    this.ships = [];
  }

  generateArray() {
    return Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => null));
  }

  placeShip(ship, coordinates, orientation) {
    const row = coordinates[0];
    const col = coordinates[1];

    // Validate placement
    for (let i = 0; i < ship.length; i++) {
      let r = row;
      let c = col;

      if (orientation === 'horizontal') c += i;
      if (orientation === 'vertical') r += i;

      if (r < 0 || r >= 10 || c < 0 || c >= 10) return false; // check out of bounds
      if (this.grid[r][c] !== null) return false; // check for another ship
    }

    // Place ship
    for (let i = 0; i < ship.length; i++) {
      if (orientation === 'horizontal') this.grid[row][col + i] = ship;
      if (orientation === 'vertical') this.grid[row + i][col] = ship;
    }
    this.ships.push(ship);
    return true;
  }

  recieveAttack(coordinates) {
    const row = coordinates[0];
    const col = coordinates[1];

    if (this.grid[row][col] === 'hit' || this.grid[row][col] === 'miss') {
      return false;
    }

    // Successful hit
    if (this.grid[row][col] !== null) {
      this.grid[row][col].hit();
      this.grid[row][col] = 'hit';
      return true;
    }

    // A miss
    this.grid[row][col] = 'miss';
    this.missedAttacks.push([row, col]);
    return false;
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

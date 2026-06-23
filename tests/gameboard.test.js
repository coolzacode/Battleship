import Gameboard from '../src/gameboard.js';
import Ship from '../src/ship.js';

describe('Gameboard Class', () => {
  test('should initialize a 10x10 grid filled with null', () => {
    const board = new Gameboard();
    expect(board.grid.length).toBe(10);
    expect(board.grid[0].length).toBe(10);
    expect(board.grid[0][0]).toBe(null);
  });

  test('should place a ship horizontally at specified coordinates', () => {
    const board = new Gameboard();
    const carrier = new Ship(3);

    // place the ship at Row 2, Column 4 horizontally
    board.placeShip(carrier, [2, 4], 'horizontal');
    expect(board.grid[2][4]).toBe(carrier);
    expect(board.grid[2][5]).toBe(carrier);
    expect(board.grid[2][6]).toBe(carrier);

    expect(board.grid[2][7]).toBe(null);
  });

  test('should return true', () => {
    const board = new Gameboard();
    const carrier = new Ship(3);
    board.placeShip(carrier, [2, 4], 'horizontal');
    expect(board.recieveAttack([2, 4])).toBe(true);
  });

  test('should return false and update missedAttack arr', () => {
    const board = new Gameboard();
    const carrier = new Ship(3);
    board.placeShip(carrier, [2, 4], 'horizontal');
    expect(board.recieveAttack([2, 3])).toBe(false);
    expect(board.missedAttacks.length).toBe(1);
  });

  test('shoult return true', () => {
    const board = new Gameboard();
    const ship = new Ship(1);
    board.placeShip(ship, [2, 4], 'horizontal');
    board.recieveAttack([2, 4]);
    expect(board.allShipsSunk()).toBe(true);
  });

  test('shoult return false', () => {
    const board = new Gameboard();
    const ship = new Ship(1);
    board.placeShip(ship, [2, 4], 'horizontal');
    board.recieveAttack([2, 3]);
    expect(board.allShipsSunk()).toBe(false);
  });
});

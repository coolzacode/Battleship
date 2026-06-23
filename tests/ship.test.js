import Ship from '../src/ship.js';

describe('Ship Class', () => {
  test('should initialize with a length, 0 hits, and not be sunk', () => {
    const smallShip = new Ship(2);
    expect(smallShip.length).toBe(2);
    expect(smallShip.timesHit).toBe(0);
    expect(smallShip.isSunk()).toBe(false);
  });

  test('should increment the hit count when hit() is called', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.timesHit).toBe(1);
  });

  test('should report false for isSunk() if hits are less than length', () => {
    const carrier = new Ship(5);
    carrier.hit();
    expect(carrier.isSunk()).toBe(false);
  });

  test('should report true for isSunk when hits equal length', () => {
    const patrolBoat = new Ship(2);
    patrolBoat.hit();
    patrolBoat.hit();
    expect(patrolBoat.isSunk()).toBe(true);
  });
});

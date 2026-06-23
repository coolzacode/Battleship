import Ship from '../src/ship.js';

describe('Ship Class', () => {
  let ship;
  beforeEach(() => {
    ship = new Ship();
  });
  // Test 1: hit()
  test('should increment the hit count', () => {
    ship.hit();
    expect(ship.timesHit).toBe(1);
  });
  // Test 2: isSunk()
  test('should return true', () => {
    ship.hit(); // +1;
    ship.hit(); // +2;
    ship.hit(); // +3;
    ship.isSunk();
    expect(ship.alive).toBe(false);
  });
});

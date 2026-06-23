import Gameboard from '../src/gameboard.js';

(describe('Gameboard Class'),
  () => {
    test('should initialize a 10x10 grid filled with null', () => {
      const board = new Gameboard();
      expect(board.grid.length).toBe(10);
      expect(board.grid[0].length).toBe(10);
      expect(board.grid[0][0]).toBe(null);
    });
  });

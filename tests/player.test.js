import Player from '../src/player.js';
import Gameboard from '../src/gameboard.js';

describe('Player Class', () => {
  test('should create a player with their own gameboard', () => {
    const player = new Player('real');
    expect(player.type).toBe('real');
    expect(player.gameboard).toBeDefined();
  });

  test('should make a random move and update attackCoordinates array', () => {
    const computer = new Player('computer');
    const humanBoard = new Gameboard();

    computer.makeRandomMove(humanBoard);
    expect(computer.attackedCoordinates.length).toBe(1);
  });

  test('should not repeat the same coordinates', () => {
    const computer = new Player('computer');
    const humanBoard = new Gameboard();

    // leaves only [9, 9] open
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        if (r === 9 && c === 9) continue;
        computer.attackedCoordinates.push(`${r},${c}`);
      }
    }
    computer.makeRandomMove(humanBoard);
    expect(computer.attackedCoordinates).toContain('9,9');
    expect(computer.attackedCoordinates.length).toBe(100);
  });
});

import Player from './player.js';

export default class Gamecontroller {
  constructor() {
    this.realPlayer = new Player('real');
    this.computerPlayer = new Player('computer');
    this.activePlayer = this.realPlayer;
    this.winner = null;
  }

  switchTurns() {
    if (this.activePlayer === this.realPlayer) {
      this.activePlayer = this.computerPlayer;
    } else {
      this.activePlayer = this.realPlayer;
    }
  }

  playRound(coordinates) {
    if (this.winner) return;

    if (this.activePlayer === this.realPlayer) {
      this.computerPlayer.gameboard.recieveAttack(coordinates);

      if (this.computerPlayer.gameboard.allShipsSunk()) {
        this.winner = this.realPlayer;
        return;
      }

      this.switchTurns();

      this.computerPlayer.makeRandomMove(this.realPlayer.gameboard);

      if (this.realPlayer.gameboard.allShipsSunk()) {
        this.winner = this.computerPlayer;
        return;
      }

      this.switchTurns();
    }
  }
}

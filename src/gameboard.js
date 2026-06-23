export default class Gameboard {
  constructor() {
    this.board = this.generateArray();
  }

  generateArray() {
    return Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => null)
    );
  }
}

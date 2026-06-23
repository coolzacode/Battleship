export default class Ship {
  constructor() {
    this.timesHit = 0;
    this.alive = true;
  }

  hit() {
    this.timesHit++;
  }
  isSunk() {
    if (this.timesHit >= 3) {
      this.alive = false;
    }
  }
}

// module.exports = Ship;

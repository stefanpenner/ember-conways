export default class Cell {
  constructor(x, y, isAlive) {
    this._x = x;
    this._y = y;

    this.a = isAlive;
    this.b = false;
  }

  get x()       { return this._x; }
  get y()       { return this._y; }
  isAlive(slot) { return this[slot]; }

  is(other) {
    return this.x === other.x &&
           this.y === other.y;
  }

  get key() {
    return `${this.x}x${this.y}`;
  }

  toString() {
    return `cell(x: ${this.x}, y: ${this.y})`;
  }
}

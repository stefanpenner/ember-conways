export default class Cell {
  constructor(x, y, isAlive) {
    this._x = x;
    this._y = y;
    this._isAlive = isAlive;
  }

  get x()       { return this._x; }
  get y()       { return this._y; }
  get isAlive() { return this._isAlive; }

  is(other) {
    return this.x === other.x &&
           this.y === other.y;
  }

  get key() {
    return `${this.x}x${this.y}`;
  }

  toString() {
    return `cell(x: ${this.x}, y: ${this.y}, isAlive: ${this.isAlive})`;
  }
}

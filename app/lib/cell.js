export default class Cell {
  constructor(x, y, isAlive) {
    this._x = x;
    this._y = y;

    this.key = `${this.x}x${this.y}`;
    this._isAlive = isAlive;
    this.isAlive = isAlive;
    this.a = isAlive;
    this.b = false;
  }

  get x()       { return this._x; }
  get y()       { return this._y; }
  //get isAlive() { return this._isAlive; }

  is(other) {
    return this.x === other.x &&
           this.y === other.y;
  }

  toString() {
    return `cell(x: ${this.x}, y: ${this.y})`;
  }
}

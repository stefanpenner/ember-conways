export default class Cell {
  constructor(x, y, isAlive) {
    this._x = x;
    this._y = y;
    this._isAlive = isAlive;
  }

  is(other) {
    return this._x === other._x && this._y === other._y;
  }

  isAlive() {
    return !!this._isAlive;
  }

  toString() {
    return `cell( x: ${this._x}, y: ${this._y}, alive: ${this._isAlive} )`;
  }
}

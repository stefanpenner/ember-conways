import fate, { LIVE } from './fate';
import Cell from './cell';

export function world(width, height, ..._cells) {
  let cells = _cells.map((state, index) => {
    return new Cell(index % width, Math.floor(index / width), state === LIVE);
  });

  return new World({ width, height, cells });
}

export default class World {
  constructor({ width, height, cells }) {
    this.width = width;
    this.height = height;
    this.cells = cells; // ensure sorted

    this._current = 'a';
    this._next    = 'b';
  }

  forEach() {
    this.cells.forEach(...arguments);
  }

  advance() {
    this.forEach(cell => {
      cell[this._next] = this.willLive(cell);
    });

    let tmp = this._current;
    this._current = this._next;
    this._next = tmp;
  }

  getAt(x, y) {
    let {
        width,
        height,
        cells
    } = this;

    if (x >= width  ||
        y >= height ||
        x < 0       ||
        y < 0) {
      return 0;
    }

    return cells[y * width + x].isAlive(this._current) ? 1 : 0;
  }

  willLive(cell) {
    return fate(this.sum(cell)) === LIVE;
  }

  sum(cell) {
    let { x, y } = cell;

    let sum = 0;

    sum += this.getAt(x - 1, y - 1);
    sum += this.getAt(x - 0, y - 1);
    sum += this.getAt(x + 1, y - 1);

    sum += this.getAt(x - 1, y - 0);
    sum += this.getAt(x - 0, y - 0);
    sum += this.getAt(x + 1, y - 0);

    sum += this.getAt(x - 1, y + 1);
    sum += this.getAt(x - 0, y + 1);
    sum += this.getAt(x + 1, y + 1);

    return sum;
  }
}

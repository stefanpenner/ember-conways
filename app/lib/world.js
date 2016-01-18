import fate, { LIVE } from './fate';

export default class World {
  constructor({ width, height, cells }) {
    this.width = width;
    this.height = height;
    this.cells = cells; // ensure sorted
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

    return cells[y * width + x].isAlive ? 1 : 0;
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

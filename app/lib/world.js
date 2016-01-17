import fate, { LIVE } from './fate';

export default class World {
  constructor(options) {
    this.cells = options.cells; // ensure sorted
  }

  willLive(cell) {
    return fate(this.sum(cell)) === LIVE;
  }

  sum(cell) {
    let index = false;

    for (let i = 0; i < this.cells.length; i++) {
      let current = this.cells[i];
      if (current.is(cell)) {
        index = i;
        break;
      }
    }

    if (index === false) {
      throw new TypeError('OMG');
    }

    let sum = 0;

    for (let i = (index - 4); i <= index + 4 && i < this.cells.length; i++) {
      if (i >=0 && this.cells[i].isAlive()) {
        sum++;
      }
    }

    return sum;
  }
}

import _ from "lodash";

function toIndex(row, column, size) {
  return row * size + column;
}

function toCoordinates(index, size) {
  return [Math.floor(index / size), index % size];
}

export default class Board {

  constructor(size) {
    this.size = size;
    this._values = _.times(size * size).map(() => null)
  }

  // Fetch a value on the board. If the space doesn't contain a value, this returns `null`. If the
  // row and column are out of bounds, this returns `undefined`.
  get(row, column) {
    return this._values[toIndex(row, column, this.size)];
  }

  // Set a value on the board.
  set(row, column, value) {
    let index = toIndex(row, column, this.size);
    if (index < 0 || index >= this.size * this.size) { return; }
    this._values[index] = value;
  }

  // Returns an array containing the coordinates of all of the spaces on the board.
  spaces() {
    return _.range(this.size * this.size).map(index => toCoordinates(index, this.size));
  }

  // Returns an array of row/column pairs representing the empty spaces on the board.
  emptySpaces() {
    return this.spaces().filter(coordinates => _.isEmpty(this.get(...coordinates)));
  }
}
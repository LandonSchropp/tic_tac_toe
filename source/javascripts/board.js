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
    this._marks = _.times(size * size).map(() => null)
  }

  // Fetch a mark on the board. If the space doesn't contain a mark, this returns `null`. If the
  // row and column are out of bounds, this returns `undefined`.
  get(row, column) {
    return this._marks[toIndex(row, column, this.size)];
  }

  // Set a mark on the board.
  set(row, column, mark) {
    let index = toIndex(row, column, this.size);
    if (index < 0 || index >= this.size * this.size) { return; }
    this._marks[index] = mark;
  }

  // Determine the the space at the provided coordinates is empty.
  isSpaceEmpty(row, column) {
    return _.isNil(this.get(row, column));
  }

  // Returns an array containing the coordinates of all of the spaces on the board.
  spaces() {
    return _.range(this.size * this.size).map(index => toCoordinates(index, this.size));
  }

  // Returns an array of row/column pairs representing the empty spaces on the board.
  emptySpaces() {
    return this.spaces().filter(coordinates => _.isEmpty(this.get(...coordinates)));
  }

  // Returns the score for the given mark.
  score(mark) {
    return Math.floor(Math.random() * 1000);
  }
}

import _ from "lodash";

const size = 3;

const matches = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function toIndex(row, column) {
  if (row < 0 || row >= size || column < 0 || column >= size) { return -1; }
  return row * size + column;
}

function toCoordinates(index) {
  if (index < 0 || index >= size * size) { return -1; }
  return [Math.floor(index / size), index % size];
}

export default class Board {

  constructor() {
    this._marks = _.times(size * size, _.constant(null));
    this.size = size;
  }

  // Fetch a mark on the board. If the space doesn't contain a mark, this returns `null`. If the
  // row and column are out of bounds, this returns `undefined`.
  get(row, column) {
    return this._marks[toIndex(row, column)];
  }

  // Set a mark on the board.
  set(row, column, mark) {
    let index = toIndex(row, column);
    if (index < 0 || index >= size * size) { return; }
    this._marks[index] = mark;
  }

  // Determine the the space at the provided coordinates is empty.
  isSpaceEmpty(row, column) {
    return _.isNil(this.get(row, column));
  }

  // Returns an array containing the coordinates of all of the spaces on the board.
  spaces() {
    return _.times(size * size, toCoordinates);
  }

  // Returns an array of row/column pairs representing the empty spaces on the board.
  emptySpaces() {
    return this.spaces().filter(coordinates => this.isSpaceEmpty(...coordinates));
  }
}

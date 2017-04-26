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
].map(match => match.map(toCoordinates));

function toIndex(row, column) {
  if (row < 0 || row >= size || column < 0 || column >= size) { return -1; }
  return row * size + column;
}

function toCoordinates(index) {
  if (index < 0 || index >= size * size) { return -1; }
  return [Math.floor(index / size), index % size];
}

function allEqualAndNotNil(array) {
  return _.uniq(array).length === 1 && !_.isNil(array[0]);
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

  // Returns the coordinates of the winning marks in the game. If there is no winner, this method
  // returns null.
  winnerCoordinates() {
    return _(matches)
      .filter((match) => allEqualAndNotNil(match.map(coordinates => this.get(...coordinates))))
      .get(0, null);
  }

  // Returns the winner. If no player has won, this method returns null.
  winner() {
    let coordinates = _.first(this.winnerCoordinates());
    return _.isNil(coordinates) ? null : this.get(...coordinates);
  }

  // Returns true if the game has ended.
  isGameOver() {
    return !_.isNil(this.winner()) || this.emptySpaces().length === 0;
  }
}

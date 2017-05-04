import _ from "lodash";

// Define the board size as a constant
export const BOARD_SIZE = 3;

// Convert the space coordinates to an index.
function toIndex(row, column) {
  if (row < 0 || row >= BOARD_SIZE || column < 0 || column >= BOARD_SIZE) { return -1; }
  return row * BOARD_SIZE + column;
}

// Convert an index to space coordinates
function toSpace(index) {
  if (index < 0 || index >= BOARD_SIZE * BOARD_SIZE) { return -1; }
  return [Math.floor(index / BOARD_SIZE), index % BOARD_SIZE];
}

// Define the empty board
export const EMPTY_BOARD = _.times(BOARD_SIZE * BOARD_SIZE, _.constant(null));

// Fetch a mark on the board. If the space doesn't contain a mark, this returns `null`. If the
// row and column are out of bounds, this returns `undefined`.
export function boardGet(board, row, column) {
  return board[toIndex(row, column)];
}

// Set a mark on the board.
export function boardSet(board, row, column, mark) {
  let index = toIndex(row, column);
  if (index < 0 || index >= BOARD_SIZE * BOARD_SIZE) { return board; }
  return _.set(_.clone(board), index, mark);
}

// Determine the the space at the provided space is empty.
export function boardIsSpaceEmpty(board, row, column) {
  let mark = boardGet(board, row, column);
  return _.isUndefined(mark) ? undefined : _.isNull(mark);
}

// Define all of the possible spaces
export const BOARD_SPACES = _.times(BOARD_SIZE * BOARD_SIZE, toSpace);

// Returns an array of row/column pairs representing the empty spaces on the board.
export function boardEmptySpaces(board) {
  return BOARD_SPACES.filter(space => boardIsSpaceEmpty(board, ...space));
}

// Define all of the possible winning space combinations
const BOARD_WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
].map(spaces => spaces.map(toSpace));

// Returns true if all of the elements in the array are equal and are not null or undefined.
function allEqualAndNotNil(array) {
  return _.uniq(array).length === 1 && !_.isNil(array[0]);
}

// Returns the space of the winning marks in the game. If there is no winner, this method
// returns null.
export function boardWinnerSpaces(board) {
  return _.find(BOARD_WINNING_COMBINATIONS, (spaces) => {
    let marks = spaces.map(space => boardGet(board, ...space))
    return allEqualAndNotNil(marks);
  }) || null;
}

// Returns the number of moves that have been made on the current board.
export function boardNumberOfMarks(board) {
  return _.compact(board).length;
}


// Returns the result of the current board. If a mark has one, this function returns that mark. If
// it's a draw, this function returns `"draw"`. Otherwise, if the game is still in progress, it
// returns `null`.
export function boardWinner(board) {
  let space = _.first(boardWinnerSpaces(board));
  if (!_.isNil(space)) { return boardGet(board, ...space) }
  if (boardNumberOfMarks(board) === 9) { return "draw"; }
  return null;
}
